import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Feed from './Feed';
import PersonalizedFeed from './PersonalizedFeed';
import LikedFeed from './LikedFeed';
import CategorySelection from './CategorySelection';

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

const MainApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState('photo');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showCategorySelection, setShowCategorySelection] = useState(false);
  const [allFeedItems, setAllFeedItems] = useState<FeedItem[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Check if user has selected categories before
    const savedCategories = localStorage.getItem('selectedCategories');
    if (savedCategories) {
      setSelectedCategories(JSON.parse(savedCategories));
    } else {
      setShowCategorySelection(true);
    }
  }, []);

  const handleCategoriesSelected = (categories: string[]) => {
    setSelectedCategories(categories);
    localStorage.setItem('selectedCategories', JSON.stringify(categories));
    setShowCategorySelection(false);
  };

  const handleCategoryChange = () => {
    setShowCategorySelection(true);
  };

  const handleItemsChange = (items: FeedItem[]) => {
    setAllFeedItems(prev => {
      const existingIds = prev.map(item => item.id);
      const newItems = items.filter(item => !existingIds.includes(item.id));
      return [...prev, ...newItems];
    });
  };

  const handleLike = (id: string) => {
    setAllFeedItems(prev => prev.map(item => 
      item.id === id 
        ? { ...item, isLiked: !item.isLiked, likes: item.likes ? item.likes - 1 : item.likes + 1 }
        : item
    ));
  };

  const handleSave = (id: string) => {
    setAllFeedItems(prev => prev.map(item => 
      item.id === id ? { ...item, isSaved: !item.isSaved } : item
    ));
  };

  const handleSkip = (id: string) => {
    setAllFeedItems(prev => prev.filter(item => item.id !== id));
  };

  if (showCategorySelection) {
    return <CategorySelection onCategoriesSelected={handleCategoriesSelected} />;
  }

  const getPageTitle = () => {
    switch(activeTab) {
      case 'personalized': return 'For You';
      case 'liked': return 'Liked';
      default: return `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}s`;
    }
  };

  const getPageDescription = () => {
    switch(activeTab) {
      case 'personalized': return `Discover content from ${selectedCategories.join(', ')}`;
      case 'liked': return 'Your liked content';
      default: return 'Discover amazing content';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex relative">
      {/* Mobile Sidebar Overlay */}
      <div className={`lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setSidebarOpen(false)} />
      
      {/* Mobile Sidebar */}
      <div className={`lg:hidden fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 z-50 transform transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6">
          <div className="mb-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">FeedApp</h1>
            <button onClick={() => setSidebarOpen(false)} className="p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <nav className="space-y-2 mb-8">
            <button
              onClick={() => setActiveTab('personalized')}
              className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                activeTab === 'personalized'
                  ? 'bg-gray-100 text-gray-900 font-medium'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span className="mr-3 text-lg">❤️</span>
              For You
            </button>
            <button
              onClick={() => setActiveTab('photo')}
              className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                activeTab === 'photo'
                  ? 'bg-gray-100 text-gray-900 font-medium'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span className="mr-3 text-lg">📷</span>
              Photos
            </button>
            <button
              onClick={() => setActiveTab('reel')}
              className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                activeTab === 'reel'
                  ? 'bg-gray-100 text-gray-900 font-medium'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span className="mr-3 text-lg">🎬</span>
              Reels
            </button>
            <button
              onClick={() => setActiveTab('video')}
              className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                activeTab === 'video'
                  ? 'bg-gray-100 text-gray-900 font-medium'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span className="mr-3 text-lg">📺</span>
              Videos
            </button>
            <button
              onClick={() => setActiveTab('liked')}
              className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                activeTab === 'liked'
                  ? 'bg-gray-100 text-gray-900 font-medium'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span className="mr-3 text-lg">👍</span>
              Liked
            </button>
          </nav>
          
          <div className="border-t border-gray-200 pt-6 space-y-2">
            <button
              onClick={handleCategoryChange}
              className="w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <span className="mr-3 text-lg">⚙️</span>
              Categories
            </button>
            
            <button
              onClick={() => {}}
              className="w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors text-red-600 hover:bg-red-50"
            >
              <span className="mr-3 text-lg">🚪</span>
              Logout
            </button>
          </div>
        </div>
      </div>
      
      {/* Desktop Sidebar */}
      <Sidebar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onCategoryChange={handleCategoryChange}
      />
      
      <div className="flex-1 lg:ml-64 min-h-screen">
        {/* Header */}
        <div className="sticky top-0 bg-white shadow-sm border-b border-gray-200 z-30">
          <div className="px-4 lg:px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center">
                  <button 
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden p-2 mr-2 hover:bg-gray-100 rounded-lg"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                  <h1 className="text-xl lg:text-2xl font-bold text-gray-900">
                    {getPageTitle()}
                  </h1>
                </div>
                <p className="text-gray-600 text-sm mt-1 hidden sm:block">
                  {getPageDescription()}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="min-h-screen">
          {activeTab === 'personalized' ? (
            <PersonalizedFeed categories={selectedCategories} onItemsChange={handleItemsChange} />
          ) : activeTab === 'liked' ? (
            <LikedFeed 
              allItems={allFeedItems}
              onLike={handleLike}
              onSave={handleSave}
              onSkip={handleSkip}
            />
          ) : (
            <Feed 
              feedType={activeTab}
              categories={[]} // Show all categories for individual feed types
              onItemsChange={handleItemsChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MainApp;
