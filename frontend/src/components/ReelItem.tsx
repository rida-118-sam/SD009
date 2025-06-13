
import React, { useState, useRef, useEffect } from 'react';
import { Heart, Bookmark, Share, Volume2, VolumeX } from 'lucide-react';

const ReelItem = ({ reel, onLike, isLiked, isActive }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive && !isPlaying) {
        videoRef.current.play();
        setIsPlaying(true);
      } else if (!isActive && isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [isActive, isPlaying]);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="relative h-screen snap-start flex items-center justify-center bg-black">
      {/* Video placeholder - replace with actual video */}
      <div 
        className="relative w-full max-w-sm h-full bg-gray-900 rounded-lg overflow-hidden cursor-pointer"
        onClick={togglePlayPause}
      >
        <img
          src={reel.image_url}
          alt={reel.title}
          className="w-full h-full object-cover"
        />
        
        {/* Video overlay - this would be your actual video element */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          loop
          muted={isMuted}
          playsInline
          style={{ display: 'none' }} // Hide until you have actual video URLs
        >
          {/* Add your video source here */}
        </video>

        {/* Play/Pause overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center">
              <div className="w-0 h-0 border-l-8 border-l-white border-t-4 border-t-transparent border-b-4 border-b-transparent ml-1"></div>
            </div>
          </div>
        )}

        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <h3 className="text-white font-semibold mb-1">{reel.title}</h3>
          <p className="text-white/80 text-sm mb-2">{reel.description}</p>
          <span className="bg-primary/80 text-white px-2 py-1 rounded text-xs">
            {reel.tag}
          </span>
        </div>

        {/* Action buttons */}
        <div className="absolute right-4 bottom-20 flex flex-col space-y-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onLike();
            }}
            className={`p-3 rounded-full ${
              isLiked ? 'bg-red-500' : 'bg-white/20'
            } transition-colors`}
          >
            <Heart size={24} className="text-white" fill={isLiked ? 'currentColor' : 'none'} />
          </button>
          
          <button 
            onClick={(e) => e.stopPropagation()}
            className="p-3 rounded-full bg-white/20"
          >
            <Bookmark size={24} className="text-white" />
          </button>
          
          <button 
            onClick={(e) => e.stopPropagation()}
            className="p-3 rounded-full bg-white/20"
          >
            <Share size={24} className="text-white" />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMuted(!isMuted);
            }}
            className="p-3 rounded-full bg-white/20"
          >
            {isMuted ? <VolumeX size={24} className="text-white" /> : <Volume2 size={24} className="text-white" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReelItem;
