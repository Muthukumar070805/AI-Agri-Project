import React from 'react';
import { LeafIcon, DashboardIcon, VirusIcon, DocumentTextIcon, ChatBubbleLeftRightIcon, PhoneIcon } from './IconComponents';

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

const NavItem: React.FC<{
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon: Icon, label, isActive, onClick }) => {
  return (
    <li>
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
        className={`flex items-center p-3 rounded-lg transition-colors ${
          isActive
            ? 'bg-emerald-100 text-emerald-800 font-bold'
            : 'text-slate-600 hover:bg-slate-100'
        }`}
      >
        <Icon className="w-6 h-6 mr-3" />
        <span className="text-sm">{label}</span>
      </a>
    </li>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage }) => {
  const navItems = [
    { label: 'Dashboard', icon: DashboardIcon },
    { label: 'Disease Detection', icon: VirusIcon },
    { label: 'Govt. Schemes', icon: DocumentTextIcon },
    { label: 'Q&A Forum', icon: ChatBubbleLeftRightIcon },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex-col flex">
      <div className="p-4 border-b border-slate-200">
        <div className="flex items-center space-x-3">
          <LeafIcon className="h-8 w-8 text-emerald-600" />
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">
            Krishi Sahayak
          </h1>
        </div>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <NavItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              isActive={activePage === item.label}
              onClick={() => setActivePage(item.label)}
            />
          ))}
        </ul>
      </nav>
      <div className="p-4 mt-auto">
        <div className="p-4 bg-slate-100 rounded-lg text-center">
            <PhoneIcon className="w-7 h-7 mx-auto text-slate-500 mb-2"/>
            <h4 className="font-semibold text-slate-700">Helpline</h4>
            <p className="text-xs text-slate-500">Need help? Call us.</p>
        </div>
      </div>
    </aside>
  );
};
