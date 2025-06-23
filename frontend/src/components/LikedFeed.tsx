
import React, { useState, useEffect } from 'react';
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

interface LikedFeedProps {
  allItems: FeedItem[];
  onLike: (id: string) => void;
  onSave: (id: string) => void;
  onSkip: (id: string) => void;
}

const LikedFeed: React.FC<LikedFeedProps> = ({ allItems, onLike, onSave, onSkip }) => {
  const [likedItems, setLikedItems] = useState<FeedItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<FeedItem | null>(null);

  useEffect(() => {
    const filtered = allItems.filter(item => item.isLiked);
    setLikedItems(filtered);
  }, [allItems]);

  const handleMediaClick = (item: FeedItem) => {
    setSelectedItem(item);
  };

  const handleClose = (id: string) => {
    setLikedItems(prev => prev.filter(item => item.id !== id));
  };

  if (likedItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-gray-500">
        <div className="text-6xl mb-4">👍</div>
        <h2 className="text-2xl font-semibold mb-2">No liked content yet</h2>
        <p className="text-center">Start liking posts and they'll appear here!</p>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {likedItems.map((item) => (
          <FeedCard
            key={item.id}
            item={item}
            onLike={onLike}
            onSave={onSave}
            onSkip={onSkip}
            onClose={handleClose}
            onMediaClick={handleMediaClick}
            showNavigation={false}
          />
        ))}
      </div>
      
      <MediaModal
        item={selectedItem!}
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        onLike={onLike}
        onSave={onSave}
        onSkip={onSkip}
      />
    </div>
  );
};

export default LikedFeed;
