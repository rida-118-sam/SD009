
import React from 'react';
import { Heart, Bookmark, Share } from 'lucide-react';

const VideoItem = ({ video, onLike, isLiked, onClick }) => {
  return (
    <div className="bg-card rounded-lg overflow-hidden border border-border cursor-pointer hover:shadow-lg transition-shadow">
      <div className="relative aspect-video bg-black" onClick={onClick}>
        <img
          src={video.image_url}
          alt={video.title}
          className="w-full h-full object-cover"
        />
        
        {/* Duration overlay */}
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
          5:30
        </div>
        
        {/* Play overlay on hover */}
        <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
            <div className="w-0 h-0 border-l-[8px] border-l-black border-y-[6px] border-y-transparent ml-1"></div>
          </div>
        </div>
      </div>

      <div className="p-3">
        <h3 className="font-medium text-sm line-clamp-2 mb-2 leading-tight">
          {video.title}
        </h3>
        
        <span className="inline-block bg-primary/10 text-primary px-2 py-1 rounded-full text-xs mb-2">
          {video.tag}
        </span>
        
        <p className="text-muted-foreground text-xs line-clamp-2 mb-3">
          {video.description}
        </p>
        
        <div className="flex items-center justify-between">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onLike();
            }}
            className={`flex items-center space-x-1 px-2 py-1 rounded text-xs transition-colors ${
              isLiked ? 'bg-red-500 text-white' : 'bg-accent hover:bg-accent/80'
            }`}
          >
            <Heart size={12} fill={isLiked ? 'currentColor' : 'none'} />
          </button>
          
          <div className="flex space-x-1">
            <button 
              onClick={(e) => e.stopPropagation()}
              className="p-1 rounded bg-accent hover:bg-accent/80"
            >
              <Bookmark size={12} />
            </button>
            
            <button 
              onClick={(e) => e.stopPropagation()}
              className="p-1 rounded bg-accent hover:bg-accent/80"
            >
              <Share size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoItem;
