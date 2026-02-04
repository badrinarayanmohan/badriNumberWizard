import { usePageNavigation } from '../../hooks/usePageNavigation';
import { Navigation } from './Navigation';
import { Page } from './Page';
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
  const { currentPage, isAnimating } = usePageNavigation();

  return (
    <div className="min-h-screen flex flex-col bg-rh-cream">
      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="book-container w-full max-w-6xl">
          <div className="book relative w-full" style={{ minHeight: '70vh' }}>
            {pages.map((page, index) => {
              const PageComponent = page.component;
              const isVisible = index === currentPage;
              const isPrevious = index === currentPage - 1;
              const isNext = index === currentPage + 1;

              return (
                <Page
                  key={index}
                  isVisible={isVisible}
                  isPrevious={isPrevious}
                  isNext={isNext}
                  isAnimating={isAnimating}
                  pageIndex={index}
                  currentPage={currentPage}
                >
                  <PageComponent isActive={isVisible} />
                </Page>
              );
            })}
          </div>
        </div>
      </div>
      <Navigation totalPages={pages.length} />
    </div>
  );
};
