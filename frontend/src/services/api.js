
// Import the JSON data files
import reelsData from '../data/reels.json';
import photosData from '../data/photos.json';
import videosData from '../data/videos.json';

// Add console logs to verify data is loaded
console.log('Reels data loaded:', reelsData?.length || 0, 'items');
console.log('Photos data loaded:', photosData?.length || 0, 'items');
console.log('Videos data loaded:', videosData?.length || 0, 'items');

// Helper function to paginate data
const paginateData = (data, page = 1, limit = 20) => {
  console.log(`Paginating ${data?.length || 0} items, page ${page}, limit ${limit}`);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const result = data?.slice(startIndex, endIndex) || [];
  console.log(`Returning ${result.length} items for page ${page}`);
  return result;
};

// Photos API
export const fetchPhotos = async (page = 1) => {
  try {
    console.log('Fetching photos for page:', page);
    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        const result = paginateData(photosData, page, 20);
        console.log('Photos fetch result:', result);
        resolve(result);
      }, 500);
    });
  } catch (error) {
    console.error('Error fetching photos:', error);
    return [];
  }
};

// Reels API
export const fetchReels = async (page = 1) => {
  try {
    console.log('Fetching reels for page:', page);
    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        const result = paginateData(reelsData, page, 10);
        console.log('Reels fetch result:', result);
        resolve(result);
      }, 500);
    });
  } catch (error) {
    console.error('Error fetching reels:', error);
    return [];
  }
};

// Videos API
export const fetchVideos = async (page = 1) => {
  try {
    console.log('Fetching videos for page:', page);
    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        const result = paginateData(videosData, page, 10);
        console.log('Videos fetch result:', result);
        resolve(result);
      }, 500);
    });
  } catch (error) {
    console.error('Error fetching videos:', error);
    return [];
  }
};

// Categories API
export const fetchCategories = async () => {
  try {
    return [
      'technology', 'sports', 'lifestyle', 'education',
      'business', 'health_and_fitness', 'fashion', 'gaming'
    ];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

// Search API
export const searchContent = async (query, type = 'all') => {
  try {
    console.log('Searching for:', query, 'type:', type);
    return new Promise((resolve) => {
      setTimeout(() => {
        let allData = [];
        
        if (type === 'all' || type === 'photo') {
          allData = [...allData, ...photosData.map(item => ({ ...item, type: 'photo' }))];
        }
        if (type === 'all' || type === 'reel') {
          allData = [...allData, ...reelsData.map(item => ({ ...item, type: 'reel' }))];
        }
        if (type === 'all' || type === 'video') {
          allData = [...allData, ...videosData.map(item => ({ ...item, type: 'video' }))];
        }
        
        // Filter by query
        const filtered = allData.filter(item => 
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()) ||
          item.tag.toLowerCase().includes(query.toLowerCase())
        );
        
        console.log('Search result:', filtered);
        resolve(filtered);
      }, 300);
    });
  } catch (error) {
    console.error('Error searching content:', error);
    return [];
  }
};
