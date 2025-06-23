
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '../contexts/AuthContext';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onCategoryChange: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onCategoryChange }) => {
  const { logout } = useAuth();

  const tabs = [
    { id: 'personalized', name: 'For You', icon: '❤️' },
    { id: 'photo', name: 'Photos', icon: '📷' },
    { id: 'reel', name: 'Reels', icon: '🎬' },
    { id: 'video', name: 'Videos', icon: '📺' },
    { id: 'liked', name: 'Liked', icon: '👍' },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 z-50 lg:block hidden">
      <div className="p-6">
        {/* Logo/Brand */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">FeedApp</h1>
        </div>
        
        {/* Navigation */}
        <nav className="space-y-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-gray-100 text-gray-900 font-medium'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span className="mr-3 text-lg">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </nav>
        
        {/* Settings */}
        <div className="border-t border-gray-200 pt-6 space-y-2">
          <Button
            onClick={onCategoryChange}
            variant="outline"
            className="w-full justify-start"
          >
            <span className="mr-2">⚙️</span>
            Categories
          </Button>
          
          <Button
            onClick={logout}
            variant="outline"
            className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
          >
            <span className="mr-2">🚪</span>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
