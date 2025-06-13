
import React, { useState, useEffect, useCallback } from 'react';
import PhotoItem from './PhotoItem';
import { fetchPhotos } from '../services/api';

const PhotoFeed = ({ onLike, isLiked, selectedCategories = [] }) => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const loadPhotos = useCallback(async () => {
    setLoading(true);
    try {
      let newPhotos = await fetchPhotos(page);
      
      // Filter by categories if any are selected
      if (selectedCategories.length > 0) {
        newPhotos = newPhotos.filter(photo => 
          selectedCategories.includes(photo.tag)
        );
      }
      
      setPhotos(prev => [...prev, ...newPhotos]);
    } catch (error) {
      console.error('Error loading photos:', error);
    } finally {
      setLoading(false);
    }
  }, [page, selectedCategories]);

  useEffect(() => {
    // Reset photos when categories change
    setPhotos([]);
    setPage(1);
  }, [selectedCategories]);

  useEffect(() => {
    loadPhotos();
  }, [loadPhotos]);

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
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 bg-background/80 backdrop-blur-md border-b border-border z-10 p-4">
        <h2 className="text-2xl font-bold">Explore Photos</h2>
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
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 p-4">
        {photos.map((photo, index) => (
          <PhotoItem
            key={`${photo.id}-${index}`}
            photo={photo}
            onLike={() => onLike(photo, 'photo')}
            isLiked={isLiked(photo, 'photo')}
          />
        ))}
      </div>
      
      {loading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}
    </div>
  );
};

export default PhotoFeed;
