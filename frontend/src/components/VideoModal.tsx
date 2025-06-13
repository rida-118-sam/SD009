
import React, { useState, useRef } from 'react';
import { X, Heart, Bookmark, Share, Play, Pause, Volume2, VolumeX, Maximize, ArrowLeft, ArrowRight } from 'lucide-react';

const VideoModal = ({ 
  video, 
  onClose, 
  onPrevious, 
  onNext, 
  hasPrevious, 
  hasNext, 
  onLike, 
  isLiked 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);

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

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const handleSeek = (e) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const clickTime = (clickX / width) * videoRef.current.duration;
      videoRef.current.currentTime = clickTime;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
      >
        <X size={32} />
      </button>

      {/* Navigation arrows */}
      {hasPrevious && (
        <button
          onClick={onPrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
        >
          <ArrowLeft size={48} />
        </button>
      )}

      {hasNext && (
        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
        >
          <ArrowRight size={48} />
        </button>
      )}

      <div className="w-full h-full max-w-6xl max-h-full flex flex-col lg:flex-row">
        {/* Video player */}
        <div className="flex-1 relative bg-black flex items-center justify-center">
          <div className="relative w-full h-full max-h-[80vh] lg:max-h-full">
            <img
              src={video.image_url}
              alt={video.title}
              className="w-full h-full object-contain"
            />
            
            {/* Video element (hidden until you have actual video URLs) */}
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-contain"
              muted={isMuted}
              onTimeUpdate={handleTimeUpdate}
              onEnded={() => setIsPlaying(false)}
              style={{ display: 'none' }} // Hide until you have actual video URLs
            >
              {/* Add your video source here */}
            </video>

            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={togglePlayPause}
                className="w-20 h-20 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                {isPlaying ? (
                  <Pause size={32} className="text-white" />
                ) : (
                  <Play size={32} className="text-white ml-1" />
                )}
              </button>
            </div>

            {/* Video controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              {/* Progress bar */}
              <div 
                className="w-full h-1 bg-white/30 rounded-full cursor-pointer mb-3"
                onClick={handleSeek}
              >
                <div 
                  className="h-full bg-red-500 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              {/* Control buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={togglePlayPause}
                    className="text-white hover:text-gray-300"
                  >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                  </button>
                  
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="text-white hover:text-gray-300"
                  >
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </button>
                  
                  <span className="text-white text-sm">0:00 / 5:30</span>
                </div>
                
                <button className="text-white hover:text-gray-300">
                  <Maximize size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Video info sidebar */}
        <div className="lg:w-80 bg-background p-6 overflow-y-auto">
          <h3 className="font-semibold text-xl mb-3">{video.title}</h3>
          
          <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm mb-4">
            {video.tag}
          </span>
          
          <p className="text-muted-foreground mb-6 leading-relaxed">
            {video.description}
          </p>
          
          <div className="flex flex-col space-y-3">
            <button
              onClick={onLike}
              className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
                isLiked ? 'bg-red-500 text-white' : 'bg-accent hover:bg-accent/80'
              }`}
            >
              <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
              <span>{isLiked ? 'Liked' : 'Like'}</span>
            </button>
            
            <button className="flex items-center justify-center space-x-2 px-4 py-3 rounded-lg bg-accent hover:bg-accent/80">
              <Bookmark size={20} />
              <span>Save</span>
            </button>
            
            <button className="flex items-center justify-center space-x-2 px-4 py-3 rounded-lg bg-accent hover:bg-accent/80">
              <Share size={20} />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
