import { useRef, useState, useEffect } from 'react';
import { usePageNavigation } from '../../hooks/usePageNavigation';
import { Navigation } from './Navigation';
import { CoverPage } from '../Pages/CoverPage';
import { ChallengePage } from '../Pages/ChallengePage';
import { CustomerOverview } from '../Pages/CustomerOverview';
import { StrategiesIntro } from '../Pages/StrategiesIntro';
import { SpeedOptimizedMap } from '../Pages/SpeedOptimizedMap';
import { SpaceOptimizedMap } from '../Pages/SpaceOptimizedMap';
import { ComparisonPage } from '../Pages/ComparisonPage';
import { ProfitabilityPage } from '../Pages/ProfitabilityPage';
import { SimulationPage } from '../Pages/SimulationPage';
import { RecommendationsPage } from '../Pages/RecommendationsPage';
import { BackCover } from '../Pages/BackCover';

const pages = [
  { component: CoverPage, title: 'Cover' },
  { component: ChallengePage, title: 'The Challenge' },
  { component: CustomerOverview, title: 'Our Customers' },
  { component: StrategiesIntro, title: 'Two Strategies' },
  { component: SpeedOptimizedMap, title: 'Speed-Optimized' },
  { component: SpaceOptimizedMap, title: 'Space-Optimized' },
  { component: ComparisonPage, title: 'The Verdict' },
  { component: ProfitabilityPage, title: 'The Hidden Loss' },
  { component: SimulationPage, title: 'Route Simulation' },
  { component: RecommendationsPage, title: 'Recommendations' },
  { component: BackCover, title: 'Thank You' },
];

export const Book = () => {
  const { currentPage, isAnimating, isBookOpen, openBook, direction } = usePageNavigation();
  const bookRef = useRef<HTMLDivElement>(null);
  const [flippingPage, setFlippingPage] = useState<number | null>(null);
  const prevPageRef = useRef(currentPage);

  useEffect(() => {
    if (currentPage !== prevPageRef.current) {
      setFlippingPage(prevPageRef.current);
      const timer = setTimeout(() => {
        setFlippingPage(null);
        prevPageRef.current = currentPage;
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [currentPage]);

  return (
    <div className="min-h-screen flex flex-col bg-rh-cream">
      <div className="flex-1 flex items-center justify-center p-4 md:p-6">
        <div
          ref={bookRef}
          className="book-scene"
          style={{ perspective: '2500px', width: '100%', maxWidth: '1100px' }}
        >
          {/* Closed cover state */}
          {!isBookOpen && (
            <div
              className="book-cover"
              onClick={openBook}
              style={{
                width: '100%',
                minHeight: '75vh',
                cursor: 'pointer',
                transformStyle: 'preserve-3d',
                transition: 'transform 1.2s cubic-bezier(0.645, 0.045, 0.355, 1)',
                transform: isAnimating ? 'rotateY(-180deg)' : 'rotateY(0deg)',
                transformOrigin: 'left center',
                position: 'relative',
              }}
            >
              {/* Front of cover */}
              <div
                className="absolute inset-0 rounded-r-lg overflow-hidden"
                style={{
                  backfaceVisibility: 'hidden',
                  background: 'linear-gradient(135deg, #1a365d 0%, #2c5282 50%, #1a365d 100%)',
                  boxShadow: '4px 4px 30px rgba(26, 54, 93, 0.4), inset -3px 0 10px rgba(0,0,0,0.15)',
                }}
              >
                <CoverPage isActive={true} />
              </div>
              {/* Back of cover (visible when flipped) */}
              <div
                className="absolute inset-0 bg-white rounded-r-lg"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                }}
              />
            </div>
          )}

          {/* Open book state */}
          {isBookOpen && (
            <div
              className="book-open relative"
              style={{
                width: '100%',
                minHeight: '75vh',
              }}
            >
              {/* Book base (the pages underneath) */}
              <div
                className="absolute inset-0 bg-white rounded-lg"
                style={{
                  boxShadow: '0 4px 30px rgba(26, 54, 93, 0.2)',
                }}
              />

              {/* Left edge decoration - book thickness */}
              <div
                className="absolute left-0 top-2 bottom-2 w-1 rounded-l"
                style={{
                  background: 'linear-gradient(to right, #d4c5a0, #e8dcc8)',
                  boxShadow: '-2px 0 8px rgba(0,0,0,0.1)',
                }}
              />

              {/* Flipping page (outgoing) */}
              {flippingPage !== null && flippingPage > 0 && flippingPage < pages.length && (
                <div
                  className="absolute inset-0 z-20"
                  style={{
                    transformStyle: 'preserve-3d',
                    transformOrigin: 'left center',
                    animation: direction === 'forward'
                      ? 'pageFlipForward 0.8s cubic-bezier(0.645, 0.045, 0.355, 1) forwards'
                      : 'pageFlipBackward 0.8s cubic-bezier(0.645, 0.045, 0.355, 1) forwards',
                  }}
                >
                  <div
                    className="absolute inset-0 bg-white rounded-lg overflow-hidden"
                    style={{
                      backfaceVisibility: 'hidden',
                      boxShadow: '2px 0 15px rgba(0,0,0,0.15)',
                    }}
                  >
                    <div className="book-page-content">
                      {(() => {
                        const PageComp = pages[flippingPage].component;
                        return <PageComp isActive={false} />;
                      })()}
                    </div>
                  </div>
                  {/* Back side of flipping page */}
                  <div
                    className="absolute inset-0 rounded-lg"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      background: 'linear-gradient(to left, #f5f0e8, #faf8f5)',
                      boxShadow: '-2px 0 15px rgba(0,0,0,0.1)',
                    }}
                  />
                </div>
              )}

              {/* Current page content */}
              {currentPage > 0 && currentPage < pages.length && (
                <div
                  className="relative z-10 bg-white rounded-lg overflow-hidden"
                  style={{
                    minHeight: '75vh',
                    boxShadow: '0 2px 20px rgba(26, 54, 93, 0.12)',
                  }}
                >
                  <div className="book-page-content">
                    {(() => {
                      const PageComp = pages[currentPage].component;
                      return <PageComp isActive={true} />;
                    })()}
                  </div>

                  {/* Page edge shadow (right side) */}
                  <div
                    className="absolute top-0 right-0 bottom-0 w-8 pointer-events-none"
                    style={{
                      background: 'linear-gradient(to left, rgba(0,0,0,0.04), transparent)',
                    }}
                  />

                  {/* Page edge shadow (left side - simulates page stack) */}
                  <div
                    className="absolute top-0 left-0 bottom-0 w-4 pointer-events-none"
                    style={{
                      background: 'linear-gradient(to right, rgba(0,0,0,0.06), transparent)',
                    }}
                  />
                </div>
              )}

              {/* Stacked pages effect underneath */}
              <div
                className="absolute top-1 left-1 right-0 bottom-0 bg-gray-100 rounded-lg -z-10"
                style={{ transform: 'translate(2px, 2px)' }}
              />
              <div
                className="absolute top-1 left-1 right-0 bottom-0 bg-gray-200 rounded-lg -z-20"
                style={{ transform: 'translate(4px, 4px)' }}
              />
            </div>
          )}
        </div>
      </div>
      <Navigation totalPages={pages.length} />
    </div>
  );
};
