import React from 'react';
import { FileText } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-10 bg-white/80 dark:bg-secondary-900/80 backdrop-blur-sm shadow-sm py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <FileText size={24} className="text-primary-600 dark:text-primary-500" />
          <h1 className="text-xl md:text-2xl font-semibold text-secondary-900 dark:text-white">
            Invoice Creator
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;