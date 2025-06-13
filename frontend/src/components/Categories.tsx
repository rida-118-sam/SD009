
import React, { useState } from 'react';
import { Laptop, Trophy, Coffee, BookOpen, Briefcase, Heart, Shirt, Gamepad2, Play } from 'lucide-react';

const Categories = ({ onPlayFeed }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const categories = [
    { id: 'technology', name: 'Technology', icon: Laptop, color: 'bg-blue-500' },
    { id: 'sports', name: 'Sports', icon: Trophy, color: 'bg-green-500' },
    { id: 'lifestyle', name: 'Lifestyle', icon: Coffee, color: 'bg-purple-500' },
    { id: 'education', name: 'Education', icon: BookOpen, color: 'bg-orange-500' },
    { id: 'business', name: 'Business', icon: Briefcase, color: 'bg-gray-600' },
    { id: 'health_and_fitness', name: 'Health & Fitness', icon: Heart, color: 'bg-red-500' },
    { id: 'fashion', name: 'Fashion', icon: Shirt, color: 'bg-pink-500' },
    { id: 'gaming', name: 'Gaming', icon: Gamepad2, color: 'bg-indigo-500' },
  ];

  const toggleCategory = (categoryId) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  const handlePlayFeed = () => {
    onPlayFeed(selectedCategories);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 bg-background/80 backdrop-blur-md border-b border-border z-10 p-4">
        <h2 className="text-2xl font-bold">Categories</h2>
        <p className="text-muted-foreground">Select your interests to personalize your feed</p>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
          {categories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategories.includes(category.id);
            
            return (
              <button
                key={category.id}
                onClick={() => toggleCategory(category.id)}
                className={`p-6 rounded-xl border-2 transition-all ${
                  isSelected
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mb-4 mx-auto`}>
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="font-semibold text-center">{category.name}</h3>
              </button>
            );
          })}
        </div>

        {selectedCategories.length > 0 && (
          <div className="bg-card p-6 rounded-lg border border-border space-y-4">
            <h3 className="font-semibold mb-4">Selected Categories ({selectedCategories.length})</h3>
            <div className="flex flex-wrap gap-2">
              {selectedCategories.map(categoryId => {
                const category = categories.find(c => c.id === categoryId);
                return (
                  <span
                    key={categoryId}
                    className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                  >
                    {category.name}
                  </span>
                );
              })}
            </div>
            <button
              onClick={handlePlayFeed}
              className="w-full flex items-center justify-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Play size={20} />
              <span>Play Feed</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
