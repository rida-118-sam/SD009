
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

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

interface FeedCardProps {
  item: FeedItem;
  onLike: (id: string) => void;
  onSave: (id: string) => void;
  onSkip: (id: string) => void;
  onClose: (id: string) => void;
  onMediaClick: (item: FeedItem) => void;
  showNavigation?: boolean;
  isReelActive?: boolean;
}

const FeedCard: React.FC<FeedCardProps> = ({
  item,
  onLike,
  onSave,
  onSkip,
  onClose,
  onMediaClick,
  showNavigation = false,
  isReelActive = false
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto-play video when reel is active
  useEffect(() => {
    if (item.type === 'reel' && videoRef.current) {
      if (isReelActive) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isReelActive, item.type]);

  if (item.type === 'reel') {
    return (
      <div className="relative w-full max-w-sm mx-auto bg-black rounded-lg overflow-hidden snap-start">
        {/* Video Container with 9:16 aspect ratio */}
        <div className="relative aspect-[9/16] bg-black">
          <video
            ref={videoRef}
            src={item.mediaUrl}
            className="w-full h-full object-cover"
            loop
            muted
            playsInline
            onClick={() => onMediaClick(item)}
          />
          
          {/* YouTube Shorts style overlay */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Bottom gradient */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent h-32" />
            
            {/* Channel info and actions at bottom */}
            <div className="absolute bottom-4 left-4 right-16 pointer-events-auto">
              <div className="text-white">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-gray-400 rounded-full mr-2 flex-shrink-0"></div>
                  <span className="text-sm font-medium truncate">{item.author}</span>
                  <button className="ml-2 border border-white text-white px-3 py-1 rounded-full text-xs hover:bg-white hover:text-black transition-colors flex-shrink-0">
                    Follow
                  </button>
                </div>
                <p className="text-sm font-medium mb-1 line-clamp-2">{item.title}</p>
                <div className="flex items-center text-xs text-gray-300">
                  <span className="bg-gray-700 px-2 py-1 rounded">{item.category}</span>
                </div>
              </div>
            </div>
            
            {/* Side Actions */}
            <div className="absolute bottom-16 right-3 flex flex-col items-center space-y-4 pointer-events-auto">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onLike(item.id);
                }}
                className="flex flex-col items-center"
              >
                <div className="w-12 h-12 bg-gray-800 bg-opacity-60 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Heart 
                    size={24} 
                    className={item.isLiked ? 'text-red-500 fill-red-500' : 'text-white'} 
                  />
                </div>
                <span className="text-white text-xs mt-1 font-medium">{item.likes}</span>
              </button>
              
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onSave(item.id);
                }}
                className="flex flex-col items-center"
              >
                <div className="w-12 h-12 bg-gray-800 bg-opacity-60 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-6 h-6 text-white" fill={item.isSaved ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </div>
                <span className="text-white text-xs mt-1">Save</span>
              </button>
              
              <button className="flex flex-col items-center">
                <div className="w-12 h-12 bg-gray-800 bg-opacity-60 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                </div>
                <span className="text-white text-xs mt-1">Share</span>
              </button>
              
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onSkip(item.id);
                }}
                className="flex flex-col items-center"
              >
                <div className="w-12 h-12 bg-gray-800 bg-opacity-60 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <span className="text-white text-xs mt-1">Skip</span>
              </button>
            </div>
            
            {/* Three dots menu */}
            <div className="absolute top-4 right-4 pointer-events-auto">
              <button className="w-8 h-8 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`group relative overflow-hidden ${
      item.type === 'photo' 
        ? 'aspect-square bg-black cursor-pointer rounded-lg' 
        : 'bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300'
    }`}>
      
      <div 
        className="relative w-full h-full"
        onClick={() => onMediaClick(item)}
      >
        {item.type === 'photo' && (
          <div className="relative w-full h-full">
            <img
              src={item.mediaUrl}
              alt={item.title}
              className={`w-full h-full object-cover rounded-lg transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
            )}
            
            {/* Instagram-style overlay on hover */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center rounded-lg">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center space-x-6 text-white">
                <div className="flex items-center space-x-2">
                  <Heart className={`w-6 h-6 ${item.isLiked ? 'fill-red-500 text-red-500' : 'fill-white'}`} />
                  <span className="font-semibold">{item.likes}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                    <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
                  </svg>
                  <span className="font-semibold">Save</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {item.type === 'video' && (
          <div className="relative">
            <div className="aspect-video bg-gray-900 overflow-hidden rounded-t-xl">
              <img
                src={item.thumbnailUrl || item.mediaUrl}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <h3 className="font-semibold text-white mb-1 text-sm lg:text-base">{item.title}</h3>
                <p className="text-gray-300 text-xs lg:text-sm">{item.author}</p>
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
                  <svg className="w-6 h-6 lg:w-8 lg:h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="p-3 lg:p-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onLike(item.id);
                    }}
                    className={`flex items-center gap-1 text-sm transition-colors ${
                      item.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                    }`}
                  >
                    <Heart size={16} className={item.isLiked ? 'fill-red-500' : ''} />
                    <span>{item.likes}</span>
                  </button>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSave(item.id);
                    }}
                    className={`text-sm transition-colors ${
                      item.isSaved ? 'text-blue-500' : 'text-gray-500 hover:text-blue-500'
                    }`}
                  >
                    {item.isSaved ? '🔖' : '📌'}
                  </button>
                  
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>
                
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSkip(item.id);
                  }}
                  variant="outline"
                  size="sm"
                  className="text-gray-500 hover:text-gray-700 border-gray-300"
                >
                  Skip
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedCard;
