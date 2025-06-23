
import React, { useState, useEffect, useCallback } from 'react';
import FeedCard from './FeedCard';
import MediaModal from './MediaModal';

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

interface FeedProps {
  feedType: string;
  categories: string[];
  onItemsChange?: (items: FeedItem[]) => void;
}

// Mock data generator
const generateMockData = (type: string, categories: string[]): FeedItem[] => {
  const categoryNames = ['technology', 'sports', 'lifestyle', 'business', 'education', 'health', 'fashion', 'gaming'];
  const authors = ['John Doe', 'Jane Smith', 'Alex Johnson', 'Sarah Wilson', 'Mike Brown', 'Emma Davis'];
  
  // Use all categories if none specified, otherwise filter by selected categories
  const availableCategories = categories.length > 0 ? categories : categoryNames;
  
  return Array.from({ length: 20 }, (_, i) => ({
    id: `${type}-${Date.now()}-${i}`,
    type: type as 'photo' | 'reel' | 'video',
    title: `Amazing ${type} content #${i + 1}`,
    description: `This is a sample ${type} description that showcases the content. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    category: availableCategories[Math.floor(Math.random() * availableCategories.length)],
    mediaUrl: `https://picsum.photos/800/800?random=${Date.now()}-${i}`,
    thumbnailUrl: type !== 'photo' ? `https://picsum.photos/400/400?random=${Date.now()}-${i}` : undefined,
    author: authors[Math.floor(Math.random() * authors.length)],
    likes: Math.floor(Math.random() * 1000) + 10,
    isLiked: Math.random() > 0.8,
    isSaved: Math.random() > 0.9,
  }));
};

const Feed: React.FC<FeedProps> = ({ feedType, categories, onItemsChange }) => {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedItem, setSelectedItem] = useState<FeedItem | null>(null);
  const [currentReelIndex, setCurrentReelIndex] = useState(0);

  const loadMoreItems = useCallback(() => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newItems = generateMockData(feedType, categories);
      setItems(prev => {
        const updated = [...prev, ...newItems];
        onItemsChange?.(updated);
        return updated;
      });
      setLoading(false);
      
      // Simulate end of data after a few loads
      if (items.length > 100) {
        setHasMore(false);
      }
    }, 1000);
  }, [feedType, categories, loading, hasMore, items.length, onItemsChange]);

  useEffect(() => {
    setItems([]);
    setHasMore(true);
    setCurrentReelIndex(0);
    loadMoreItems();
  }, [feedType, categories]);

  useEffect(() => {
    if (feedType !== 'reel') {
      const handleScroll = () => {
        if (
          window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 1000
        ) {
          loadMoreItems();
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [loadMoreItems, feedType]);

  // Auto-scroll for reels (YouTube Shorts style)
  useEffect(() => {
    if (feedType === 'reel' && items.length > 0) {
      const handleScroll = () => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const newIndex = Math.round(scrollY / windowHeight);
        
        if (newIndex !== currentReelIndex && newIndex < items.length) {
          setCurrentReelIndex(newIndex);
        }
        
        // Load more when near the end
        if (newIndex >= items.length - 3) {
          loadMoreItems();
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [feedType, items.length, currentReelIndex, loadMoreItems]);

  const handleLike = (id: string) => {
    setItems(prev => {
      const updated = prev.map(item => 
        item.id === id 
          ? { ...item, isLiked: !item.isLiked, likes: item.isLiked ? item.likes - 1 : item.likes + 1 }
          : item
      );
      onItemsChange?.(updated);
      return updated;
    });
  };

  const handleSave = (id: string) => {
    setItems(prev => {
      const updated = prev.map(item => 
        item.id === id ? { ...item, isSaved: !item.isSaved } : item
      );
      onItemsChange?.(updated);
      return updated;
    });
  };

  const handleSkip = (id: string) => {
    setItems(prev => {
      const updated = prev.filter(item => item.id !== id);
      onItemsChange?.(updated);
      return updated;
    });
  };

  const handleClose = (id: string) => {
    setItems(prev => {
      const updated = prev.filter(item => item.id !== id);
      onItemsChange?.(updated);
      return updated;
    });
  };

  const handleMediaClick = (item: FeedItem) => {
    setSelectedItem(item);
  };

  const getGridClass = () => {
    switch (feedType) {
      case 'photo':
        // Instagram explore grid - responsive
        return 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 sm:gap-2';
      case 'reel':
        // YouTube Shorts style - centered single column
        return 'flex flex-col items-center';
      case 'video':
        // YouTube-style grid - responsive
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4';
      default:
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4';
    }
  };

  const getContainerClass = () => {
    if (feedType === 'reel') {
      return 'min-h-screen overflow-y-auto snap-y snap-mandatory bg-black';
    }
    return feedType === 'video' ? 'p-2 sm:p-4 lg:p-6' : 'p-1 sm:p-2';
  };

  return (
    <div className={getContainerClass()}>
      <div className={`${feedType === 'reel' ? 'space-y-4' : 'grid'} ${getGridClass()}`}>
        {items.map((item, index) => (
          <FeedCard
            key={item.id}
            item={item}
            onLike={handleLike}
            onSave={handleSave}
            onSkip={handleSkip}
            onClose={handleClose}
            onMediaClick={handleMediaClick}
            showNavigation={false}
            isReelActive={feedType === 'reel' && index === currentReelIndex}
          />
        ))}
      </div>
      
      {loading && feedType !== 'reel' && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      {!hasMore && feedType !== 'reel' && (
        <div className="text-center py-8 text-gray-500">
          No more content to load
        </div>
      )}
      
      <MediaModal
        item={selectedItem!}
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        onLike={handleLike}
        onSave={handleSave}
        onSkip={handleSkip}
      />
    </div>
  );
};

export default Feed;
