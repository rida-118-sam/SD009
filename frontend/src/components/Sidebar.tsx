
import React from 'react';
import { Camera, Play, Video, Heart, Grid3X3 } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'photos', icon: Camera, label: 'Photos' },
    { id: 'reels', icon: Play, label: 'Reels' },
    { id: 'videos', icon: Video, label: 'Videos' },
    { id: 'liked', icon: Heart, label: 'Liked' },
    { id: 'categories', icon: Grid3X3, label: 'Categories' },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen bg-card border-r border-border z-10">
      {/* Mobile sidebar - icons only */}
      <div className="w-16 lg:hidden flex flex-col items-center py-4 space-y-6">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`p-3 rounded-lg transition-colors ${
                activeTab === item.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              }`}
            >
              <Icon size={24} />
            </button>
          );
        })}
      </div>

      {/* Desktop sidebar - full width */}
      <div className="hidden lg:block w-64 h-full">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-8">InfiniFeed</h1>
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
