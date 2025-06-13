
import React, { useState } from 'react';
import { Heart, Bookmark, X } from 'lucide-react';

const PhotoItem = ({ photo, onLike, isLiked }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div 
        className="relative aspect-square bg-muted rounded-lg overflow-hidden cursor-pointer group"
        onClick={() => setIsModalOpen(true)}
      >
        <img
          src={photo.image_url}
          alt={photo.title}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="text-white text-center p-2">
            <h3 className="font-semibold text-sm mb-1">{photo.title}</h3>
            <span className="text-xs bg-primary/80 px-2 py-1 rounded">{photo.tag}</span>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full bg-card rounded-lg overflow-hidden">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/70"
            >
              <X size={20} />
            </button>
            
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-2/3">
                <img
                  src={photo.image_url}
                  alt={photo.title}
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
              </div>
              
              <div className="lg:w-1/3 p-6 flex flex-col">
                <h2 className="text-xl font-bold mb-2">{photo.title}</h2>
                <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm mb-4">
                  {photo.tag}
                </span>
                <p className="text-muted-foreground mb-6 flex-1">{photo.description}</p>
                
                <div className="flex space-x-4">
                  <button
                    onClick={() => onLike()}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      isLiked ? 'bg-red-500 text-white' : 'bg-accent hover:bg-accent/80'
                    }`}
                  >
                    <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
                    <span>{isLiked ? 'Liked' : 'Like'}</span>
                  </button>
                  
                  <button className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-accent hover:bg-accent/80">
                    <Bookmark size={20} />
                    <span>Save</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PhotoItem;
