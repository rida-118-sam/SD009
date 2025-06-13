
import React, { useState, useEffect, useCallback } from 'react';
import VideoItem from './VideoItem';
import VideoModal from './VideoModal';
import { fetchVideos } from '../services/api';

const VideoFeed = ({ onLike, isLiked, selectedCategories = [] }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const loadVideos = useCallback(async () => {
    setLoading(true);
    try {
      let newVideos = await fetchVideos(page);
      
      // Filter by categories if any are selected
      if (selectedCategories.length > 0) {
        newVideos = newVideos.filter(video => 
          selectedCategories.includes(video.tag)
        );
      }
      
      setVideos(prev => [...prev, ...newVideos]);
    } catch (error) {
      console.error('Error loading videos:', error);
    } finally {
      setLoading(false);
    }
  }, [page, selectedCategories]);

  useEffect(() => {
    // Reset videos when categories change
    setVideos([]);
    setPage(1);
  }, [selectedCategories]);

  useEffect(() => {
    loadVideos();
  }, [loadVideos]);

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

  const handleVideoClick = (video, index) => {
    setSelectedVideo(video);
    setSelectedIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
  };

  const handlePrevious = () => {
    if (selectedIndex > 0) {
      const newIndex = selectedIndex - 1;
      setSelectedIndex(newIndex);
      setSelectedVideo(videos[newIndex]);
    }
  };

  const handleNext = () => {
    if (selectedIndex < videos.length - 1) {
      const newIndex = selectedIndex + 1;
      setSelectedIndex(newIndex);
      setSelectedVideo(videos[newIndex]);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 bg-background/80 backdrop-blur-md border-b border-border z-10 p-4">
        <h2 className="text-2xl font-bold">Videos</h2>
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
      
      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {videos.map((video, index) => (
            <VideoItem
              key={`${video.id}-${index}`}
              video={video}
              onLike={() => onLike(video, 'video')}
              isLiked={isLiked(video, 'video')}
              onClick={() => handleVideoClick(video, index)}
            />
          ))}
        </div>
      </div>
      
      {loading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}

      {selectedVideo && (
        <VideoModal
          video={selectedVideo}
          onClose={handleCloseModal}
          onPrevious={handlePrevious}
          onNext={handleNext}
          hasPrevious={selectedIndex > 0}
          hasNext={selectedIndex < videos.length - 1}
          onLike={() => onLike(selectedVideo, 'video')}
          isLiked={isLiked(selectedVideo, 'video')}
        />
      )}
    </div>
  );
};

export default VideoFeed;
