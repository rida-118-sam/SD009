
import React, { useState, useEffect, useCallback } from 'react';
import ReelItem from './ReelItem';
import { fetchReels } from '../services/api';

const ReelFeed = ({ onLike, isLiked, selectedCategories = [] }) => {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);

  const loadReels = useCallback(async () => {
    setLoading(true);
    try {
      let newReels = await fetchReels(page);
      
      // Filter by categories if any are selected
      if (selectedCategories.length > 0) {
        newReels = newReels.filter(reel => 
          selectedCategories.includes(reel.tag)
        );
      }
      
      setReels(prev => [...prev, ...newReels]);
    } catch (error) {
      console.error('Error loading reels:', error);
    } finally {
      setLoading(false);
    }
  }, [page, selectedCategories]);

  useEffect(() => {
    // Reset reels when categories change
    setReels([]);
    setPage(1);
  }, [selectedCategories]);

  useEffect(() => {
    loadReels();
  }, [loadReels]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        >= document.documentElement.offsetHeight - 1000
      ) {
        setPage(prev => prev + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <div className="sticky top-0 bg-black/80 backdrop-blur-md border-b border-gray-800 z-10 p-4">
        <h2 className="text-2xl font-bold text-white">Reels</h2>
        {selectedCategories.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedCategories.map(category => (
              <span
                key={category}
                className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs"
              >
                {category}
              </span>
            ))}
          </div>
        )}
      </div>
      
      <div className="max-w-md mx-auto">
        {reels.map((reel, index) => (
          <ReelItem
            key={`${reel.id}-${index}`}
            reel={reel}
            onLike={() => onLike(reel, 'reel')}
            isLiked={isLiked(reel, 'reel')}
            isActive={index === currentIndex}
          />
        ))}
      </div>
      
      {loading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      )}
    </div>
  );
};

export default ReelFeed;
