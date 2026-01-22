import React from 'react';
import Link from 'next/link';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">J</span>
            </div>
            <Link href="/" className="text-xl font-bold text-gray-900">
              JobMap
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Search
            </Link>
            <Link
              href="/saved"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Saved Jobs
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">
              Powered by Serply.io
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
