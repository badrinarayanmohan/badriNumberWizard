import type { ReactNode } from 'react';

interface PageProps {
  children: ReactNode;
  isVisible: boolean;
  isPrevious: boolean;
  isNext: boolean;
  isAnimating: boolean;
  pageIndex: number;
  currentPage: number;
}

export const Page = ({
  children,
  isVisible,
}: PageProps) => {
  if (!isVisible) return null;
  return (
    <div className="w-full">
      {children}
    </div>
  );
};
