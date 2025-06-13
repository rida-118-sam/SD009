
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import PhotoFeed from './components/PhotoFeed';
import ReelFeed from './components/ReelFeed';
import VideoFeed from './components/VideoFeed';
import LikedContent from './components/LikedContent';
import Categories from './components/Categories';

const App = () => {
  const [activeTab, setActiveTab] = useState('photos');
  const [likedItems, setLikedItems] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleLike = (item, type) => {
    const likedItem = { ...item, type };
    setLikedItems(prev => {
      const exists = prev.find(liked => liked.id === item.id && liked.type === type);
      if (exists) {
        return prev.filter(liked => !(liked.id === item.id && liked.type === type));
      } else {
        return [...prev, likedItem];
      }
    });
  };

  const isLiked = (item, type) => {
    return likedItems.some(liked => liked.id === item.id && liked.type === type);
  };

  const handlePlayFeed = (categories) => {
    setSelectedCategories(categories);
    setActiveTab('photos'); // Switch to photos feed by default
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'photos':
        return <PhotoFeed onLike={handleLike} isLiked={isLiked} selectedCategories={selectedCategories} />;
      case 'reels':
        return <ReelFeed onLike={handleLike} isLiked={isLiked} selectedCategories={selectedCategories} />;
      case 'videos':
        return <VideoFeed onLike={handleLike} isLiked={isLiked} selectedCategories={selectedCategories} />;
      case 'liked':
        return <LikedContent likedItems={likedItems} onLike={handleLike} isLiked={isLiked} />;
      case 'categories':
        return <Categories onPlayFeed={handlePlayFeed} />;
      default:
        return <PhotoFeed onLike={handleLike} isLiked={isLiked} selectedCategories={selectedCategories} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 ml-16 lg:ml-64">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
