import React, { useState, useEffect, useCallback } from 'react';
import FeedCard from './FeedCard';
import MediaModal from './MediaModal';

// Import static data
import reelsData from '../data/reels.json';
import videosData from '../data/videos.json';
import photosData from '../data/photos.json';

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

const Feed: React.FC<FeedProps> = ({ feedType, categories, onItemsChange }) => {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedItem, setSelectedItem] = useState<FeedItem | null>(null);
  const [currentReelIndex, setCurrentReelIndex] = useState(0);

  // Load static data based on feedType
  useEffect(() => {
    let data: FeedItem[] = [];
    if (feedType === 'reel') {
      type ReelDataItem = {
        id: string | number;
        title: string;
        description: string;
        tag?: string;
        reel_url: string;
        thumbnailUrl?: string;
        author?: string;
        likes?: number;
        isLiked?: boolean;
        isSaved?: boolean;
      };
      data = reelsData.map((item: ReelDataItem) => ({
        id: String(item.id),
        type: 'reel',
        title: item.title,
        description: item.description,
        category: item.tag || 'General',
        mediaUrl: item.reel_url,
        thumbnailUrl: item.thumbnailUrl || '', // or generate/leave empty
        author: item.author || 'Unknown',
        likes: item.likes || 0,
        isLiked: item.isLiked ?? false,
        isSaved: item.isSaved ?? false,
      }));
    } else if (feedType === 'video') {
      data = videosData.map((item: {
        id: string | number;
        title: string;
        description: string;
        tag?: string;
        video_url: string;
        thumbnailUrl?: string;
        author?: string;
        likes?: number;
        isLiked?: boolean;
        isSaved?: boolean;
      }) => ({
        id: String(item.id),
        type: 'video',
        title: item.title,
        description: item.description,
        category: item.tag || 'General',
        mediaUrl: item.video_url,
        thumbnailUrl: item.thumbnailUrl || '', // or generate/leave empty
        author: item.author || 'Unknown',
        likes: item.likes || 0,
        isLiked: item.isLiked ?? false,
        isSaved: item.isSaved ?? false,
      }));
    } else if (feedType === 'photo') {
      type PhotoDataItem = {
        id: string | number;
        title: string;
        description: string;
        tag?: string;
        image_url: string;
        thumbnailUrl?: string;
        author?: string;
        likes?: number;
        isLiked?: boolean;
        isSaved?: boolean;
      };
      data = photosData.map((item: PhotoDataItem) => ({
        id: String(item.id),
        type: 'photo',
        title: item.title,
        description: item.description,
        category: item.tag || 'General',
        mediaUrl: item.image_url,
        thumbnailUrl: item.thumbnailUrl || '', // or generate/leave empty
        author: item.author || 'Unknown',
        likes: item.likes || 0,
        isLiked: item.isLiked ?? false,
        isSaved: item.isSaved ?? false,
      }));
    }
    // Optionally filter by categories
    if (categories && categories.length > 0) {
      data = data.filter(item => categories.includes(item.category));
    }
    setItems(data);
    setHasMore(false); // No infinite scroll for static data
    onItemsChange?.(data);
    setCurrentReelIndex(0);
  }, [feedType, categories, onItemsChange]);

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
