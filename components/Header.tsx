import React from 'react';
import { LanguageIcon, UserCircleIcon } from './IconComponents';

export const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
            <p className="text-sm text-slate-500">Welcome, Farmer!</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 text-slate-600 hover:text-emerald-600">
              <LanguageIcon className="w-6 h-6" />
              <span className="text-sm font-medium">മലയാളം</span>
            </button>
            <button>
              <UserCircleIcon className="w-9 h-9 text-slate-400 hover:text-emerald-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
