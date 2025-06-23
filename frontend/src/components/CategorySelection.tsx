
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface CategorySelectionProps {
  onCategoriesSelected: (categories: string[]) => void;
}

const categories = [
  { id: 'technology', name: 'Technology', icon: '💻' },
  { id: 'sports', name: 'Sports', icon: '⚽' },
  { id: 'lifestyle', name: 'Lifestyle', icon: '🌟' },
  { id: 'business', name: 'Business', icon: '💼' },
  { id: 'education', name: 'Education', icon: '📚' },
  { id: 'health', name: 'Health & Fitness', icon: '💪' },
  { id: 'fashion', name: 'Fashion', icon: '👗' },
  { id: 'gaming', name: 'Gaming', icon: '🎮' },
];

const CategorySelection: React.FC<CategorySelectionProps> = ({ onCategoriesSelected }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleContinue = () => {
    if (selectedCategories.length > 0) {
      onCategoriesSelected(selectedCategories);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Interests</h1>
          <p className="text-gray-600">Select one or more categories to personalize your feed</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => toggleCategory(category.id)}
              className={`p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                selectedCategories.includes(category.id)
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="text-2xl mb-2">{category.icon}</div>
              <div className="text-sm font-medium">{category.name}</div>
            </button>
          ))}
        </div>
        
        <Button
          onClick={handleContinue}
          disabled={selectedCategories.length === 0}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue to FeedFlow ({selectedCategories.length} selected)
        </Button>
      </div>
    </div>
  );
};

export default CategorySelection;
