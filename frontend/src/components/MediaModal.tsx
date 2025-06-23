
import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, X } from 'lucide-react';

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

interface MediaModalProps {
  item: FeedItem;
  isOpen: boolean;
  onClose: () => void;
  onLike: (id: string) => void;
  onSave: (id: string) => void;
  onSkip: (id: string) => void;
}

const MediaModal: React.FC<MediaModalProps> = ({
  item,
  isOpen,
  onClose,
  onLike,
  onSave,
  onSkip
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="relative max-w-4xl max-h-[90vh] w-full">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-black bg-opacity-50 text-white rounded-full z-10 flex items-center justify-center hover:bg-opacity-70 transition-colors"
        >
          <X size={20} />
        </button>
        
        <div className="bg-white rounded-lg overflow-hidden">
          <div className="relative">
            {item.type === 'photo' && (
              <img
                src={item.mediaUrl}
                alt={item.title}
                className="w-full max-h-[70vh] object-contain"
              />
            )}
            
            {item.type === 'reel' && (
              <div className="flex justify-center bg-black">
                <div className="relative aspect-[9/16] max-h-[70vh] bg-black">
                  <video
                    src={item.mediaUrl}
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                  />
                  
                  {/* Instagram-style overlay for reel in modal */}
                  <div className="absolute bottom-4 left-4 right-16 text-white z-10">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-gray-400 rounded-full mr-3"></div>
                      <span className="text-sm font-semibold">{item.author}</span>
                    </div>
                    <h3 className="font-medium text-sm mb-1">{item.title}</h3>
                    <p className="text-xs opacity-90">{item.description}</p>
                  </div>
                  
                  <div className="absolute bottom-4 right-4 flex flex-col items-center space-y-4 z-10">
                    <button 
                      onClick={() => onLike(item.id)}
                      className="flex flex-col items-center"
                    >
                      <Heart 
                        size={24} 
                        className={item.isLiked ? 'text-red-500 fill-red-500' : 'text-white'} 
                      />
                      <span className="text-xs text-white mt-1">{item.likes}</span>
                    </button>
                    
                    <button 
                      onClick={() => onSave(item.id)}
                      className="flex flex-col items-center"
                    >
                      <span className="text-white text-xl">{item.isSaved ? '🔖' : '📌'}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {item.type === 'video' && (
              <div className="aspect-video">
                <video
                  src={item.mediaUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              </div>
            )}
          </div>
          
          {item.type !== 'reel' && (
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h2>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <p className="text-gray-500 mb-4">by {item.author}</p>
              
              <div className="flex items-center gap-4">
                <Button
                  onClick={() => onLike(item.id)}
                  variant={item.isLiked ? "default" : "outline"}
                  className={item.isLiked ? "bg-red-500 hover:bg-red-600" : ""}
                >
                  <Heart size={16} className={`mr-2 ${item.isLiked ? 'fill-white' : ''}`} />
                  {item.likes} Likes
                </Button>
                
                <Button
                  onClick={() => onSave(item.id)}
                  variant={item.isSaved ? "default" : "outline"}
                  className={item.isSaved ? "bg-blue-500 hover:bg-blue-600" : ""}
                >
                  <span className="mr-2">{item.isSaved ? '🔖' : '📌'}</span>
                  {item.isSaved ? 'Saved' : 'Save'}
                </Button>
                
                <Button
                  onClick={() => {
                    onSkip(item.id);
                    onClose();
                  }}
                  variant="outline"
                  className="text-gray-500 hover:text-gray-700"
                >
                  Skip
                </Button>
                
                <span className="text-sm text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                  {item.category}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MediaModal;
