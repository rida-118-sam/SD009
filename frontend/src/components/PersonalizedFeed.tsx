
import React, { useState } from 'react';
import Feed from './Feed';

interface FeedItem {
  id: string;
  type: 'photo' | 'reel' | 'video';
  title: string;
  description: string;
  category: string;
  mediaUrl: string;
  thumbnailUrl?: string;
  author: string;
  likes: number;
  isLiked: boolean;
  isSaved: boolean;
}

interface PersonalizedFeedProps {
  categories: string[];
  onItemsChange?: (items: FeedItem[]) => void;
}

const PersonalizedFeed: React.FC<PersonalizedFeedProps> = ({ categories, onItemsChange }) => {
  const [activeSubTab, setActiveSubTab] = useState('photos');

  const subTabs = [
    { id: 'photos', name: 'Photos', icon: '📷' },
    { id: 'videos', name: 'Videos', icon: '📺' },
    { id: 'reels', name: 'Reels', icon: '🎬' },
  ];

  return (
    <div>
      {/* Instagram-style sub navigation */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-20">
        <div className="flex space-x-0 overflow-x-auto px-2 sm:px-0">
          {subTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`flex-1 min-w-0 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeSubTab === tab.id
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              <span className="hidden sm:inline">{tab.name}</span>
            </button>
          ))}
        </div>
      </div>
      
      <Feed 
        feedType={activeSubTab === 'photos' ? 'photo' : activeSubTab === 'videos' ? 'video' : 'reel'}
        categories={categories}
        onItemsChange={onItemsChange}
      />
    </div>
  );
};

export default PersonalizedFeed;
