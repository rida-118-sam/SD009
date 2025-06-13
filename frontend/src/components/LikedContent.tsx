
import React from 'react';
import PhotoItem from './PhotoItem';
import VideoItem from './VideoItem';

const LikedContent = ({ likedItems, onLike, isLiked }) => {
  const photos = likedItems.filter(item => item.type === 'photo');
  const videos = likedItems.filter(item => item.type === 'video');
  const reels = likedItems.filter(item => item.type === 'reel');

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 bg-background/80 backdrop-blur-md border-b border-border z-10 p-4">
        <h2 className="text-2xl font-bold">Liked Content</h2>
      </div>
      
      <div className="p-4 space-y-8">
        {photos.length > 0 && (
          <section>
            <h3 className="text-xl font-semibold mb-4">Liked Photos</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1">
              {photos.map((photo, index) => (
                <PhotoItem
                  key={`liked-photo-${photo.id}-${index}`}
                  photo={photo}
                  onLike={() => onLike(photo, 'photo')}
                  isLiked={isLiked(photo, 'photo')}
                />
              ))}
            </div>
          </section>
        )}

        {videos.length > 0 && (
          <section>
            <h3 className="text-xl font-semibold mb-4">Liked Videos</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
              {videos.map((video, index) => (
                <VideoItem
                  key={`liked-video-${video.id}-${index}`}
                  video={video}
                  onLike={() => onLike(video, 'video')}
                  isLiked={isLiked(video, 'video')}
                  onClick={() => {}} // Empty click handler for liked content
                />
              ))}
            </div>
          </section>
        )}

        {reels.length > 0 && (
          <section>
            <h3 className="text-xl font-semibold mb-4">Liked Reels</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {reels.map((reel, index) => (
                <div key={`liked-reel-${reel.id}-${index}`} className="aspect-[9/16] bg-gray-900 rounded-lg overflow-hidden">
                  <img
                    src={reel.image_url}
                    alt={reel.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {likedItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No liked content yet</p>
            <p className="text-muted-foreground">Start exploring and like content to see it here!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LikedContent;
