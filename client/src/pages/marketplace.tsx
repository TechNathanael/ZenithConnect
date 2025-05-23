import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Search, Filter, Heart, MessageCircle, Share2, ChevronDown } from 'lucide-react';

interface ProductCategory {
  id: number;
  name: string;
  count: number;
}

interface ProductListing {
  id: number;
  title: string;
  price: number;
  location: string;
  distance: string;
  condition: string;
  images: string[];
  seller: {
    id: number;
    name: string;
    avatar: string;
    rating: number;
    isVerified: boolean;
  };
  likeCount: number;
  isLiked: boolean;
  isBookmarked: boolean;
  postedAt: string;
  description: string;
}

const Marketplace: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const [categories, setCategories] = useState<ProductCategory[]>([
    { id: 1, name: 'Electronics', count: 1283 },
    { id: 2, name: 'Furniture', count: 856 },
    { id: 3, name: 'Clothing', count: 1547 },
    { id: 4, name: 'Vehicles', count: 423 },
    { id: 5, name: 'Home Goods', count: 912 },
    { id: 6, name: 'Real Estate', count: 194 },
    { id: 7, name: 'Sports & Outdoors', count: 637 },
    { id: 8, name: 'Toys & Games', count: 498 },
    { id: 9, name: 'Books & Media', count: 723 },
    { id: 10, name: 'Services', count: 346 }
  ]);
  
  const [products, setProducts] = useState<ProductListing[]>([
    {
      id: 1,
      title: 'iPhone 14 Pro Max - 256GB - Excellent Condition',
      price: 899.99,
      location: 'San Francisco, CA',
      distance: '3.2 miles away',
      condition: 'Like new',
      images: [
        'https://images.unsplash.com/photo-1675031596780-59ffb46ad1e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600',
        'https://images.unsplash.com/photo-1675031593166-61fc1a37a067?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600'
      ],
      seller: {
        id: 1,
        name: 'Alex Morgan',
        avatar: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100',
        rating: 4.9,
        isVerified: true
      },
      likeCount: 27,
      isLiked: false,
      isBookmarked: false,
      postedAt: '2025-05-20T14:30:00',
      description: 'Selling my iPhone 14 Pro Max. Only used for 6 months. No scratches or dents. Comes with original box, charger, and a premium case. Battery health at 99%. Unlocked for all carriers.'
    },
    {
      id: 2,
      title: 'Modern Sectional Sofa - Grey Fabric',
      price: 650,
      location: 'Berkeley, CA',
      distance: '8.7 miles away',
      condition: 'Good',
      images: [
        'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600'
      ],
      seller: {
        id: 2,
        name: 'Jamie Lee',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100',
        rating: 4.7,
        isVerified: true
      },
      likeCount: 14,
      isLiked: false,
      isBookmarked: true,
      postedAt: '2025-05-21T09:45:00',
      description: 'Modern L-shaped sectional sofa in grey fabric. About 2 years old from West Elm. Very comfortable and in good condition. Minor wear on armrests but otherwise great condition. Selling due to moving to a smaller apartment.'
    },
    {
      id: 3,
      title: 'Trek Mountain Bike - 29" - Excellent Condition',
      price: 850,
      location: 'Oakland, CA',
      distance: '5.3 miles away',
      condition: 'Excellent',
      images: [
        'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600'
      ],
      seller: {
        id: 3,
        name: 'Michael Chen',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100',
        rating: 5.0,
        isVerified: true
      },
      likeCount: 32,
      isLiked: true,
      isBookmarked: false,
      postedAt: '2025-05-22T11:20:00',
      description: 'Trek Marlin 7 mountain bike in excellent condition. 29" wheels, hydraulic disc brakes, front suspension. Only ridden a few times on beginner trails. No damage or issues. Selling because I am upgrading to a full-suspension bike.'
    },
    {
      id: 4,
      title: 'Sony A7 III - Full Frame Mirrorless Camera Bundle',
      price: 1750,
      location: 'San Jose, CA',
      distance: '42.1 miles away',
      condition: 'Like new',
      images: [
        'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600'
      ],
      seller: {
        id: 4,
        name: 'Rebecca Wong',
        avatar: 'https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100',
        rating: 4.8,
        isVerified: false
      },
      likeCount: 42,
      isLiked: false,
      isBookmarked: false,
      postedAt: '2025-05-22T16:50:00',
      description: 'Sony A7 III full frame mirrorless camera. Includes 28-70mm kit lens, 50mm f/1.8 prime lens, 3 batteries, charger, SD cards, camera bag, and tripod. Shutter count approx. 5000. Perfect working condition. Selling because I switched to Canon.'
    },
    {
      id: 5,
      title: 'Designer Coffee Table - Walnut and Steel',
      price: 320,
      location: 'Palo Alto, CA',
      distance: '34.6 miles away',
      condition: 'Good',
      images: [
        'https://images.unsplash.com/photo-1499933374294-4584851497cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600'
      ],
      seller: {
        id: 5,
        name: 'Daniel Garcia',
        avatar: 'https://images.unsplash.com/photo-1624561172888-ac93c696e10c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100',
        rating: 4.5,
        isVerified: true
      },
      likeCount: 19,
      isLiked: false,
      isBookmarked: false,
      postedAt: '2025-05-23T08:15:00',
      description: 'Article Niva coffee table in walnut with black steel legs. Rectangular design with open shelf underneath. Some minor scratches on the top surface but still looks beautiful. Selling as we are redecorating our living room.'
    },
    {
      id: 6,
      title: 'Macbook Pro 16" 2023 - M2 Pro - 32GB RAM - 1TB',
      price: 2450,
      location: 'San Francisco, CA',
      distance: '1.8 miles away',
      condition: 'Like new',
      images: [
        'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600'
      ],
      seller: {
        id: 6,
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100',
        rating: 4.9,
        isVerified: true
      },
      likeCount: 56,
      isLiked: false,
      isBookmarked: true,
      postedAt: '2025-05-23T10:40:00',
      description: 'Macbook Pro 16" with M2 Pro chip, 32GB RAM, and 1TB SSD. Space Gray. Purchased 3 months ago. Like new condition with only 22 battery cycles. Original box and charger included. AppleCare+ until March 2026. Selling because I received a work laptop.'
    }
  ]);

  // Format relative time
  const getRelativeTime = (timestamp: string) => {
    const now = new Date();
    const posted = new Date(timestamp);
    const diffInSeconds = Math.floor((now.getTime() - posted.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return 'Just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    } else {
      return posted.toLocaleDateString();
    }
  };
  
  // Handle load more
  const loadMoreProducts = () => {
    setIsLoading(true);
    
    // Simulate loading delay
    setTimeout(() => {
      // Add more products (you'd fetch from API in real app)
      const moreProducts: ProductListing[] = [
        {
          id: 7,
          title: 'Canon EOS R5 Mirrorless Camera',
          price: 3299,
          location: 'San Francisco, CA',
          distance: '2.5 miles away',
          condition: 'Excellent',
          images: [
            'https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600'
          ],
          seller: {
            id: 7,
            name: 'Luke Peterson',
            avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100',
            rating: 4.7,
            isVerified: true
          },
          likeCount: 38,
          isLiked: false,
          isBookmarked: false,
          postedAt: '2025-05-22T15:20:00',
          description: 'Canon EOS R5 full-frame mirrorless camera. 45MP, 8K video, in-body image stabilization. Includes RF 24-105mm f/4L IS USM lens. Low shutter count, excellent condition. Selling to switch systems.'
        },
        {
          id: 8,
          title: 'Vintage Vinyl Record Collection - 200+ Albums',
          price: 950,
          location: 'Oakland, CA',
          distance: '6.1 miles away',
          condition: 'Good',
          images: [
            'https://images.unsplash.com/photo-1603049489988-53ebe4cd1c38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600'
          ],
          seller: {
            id: 8,
            name: 'Marcus Reynolds',
            avatar: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100',
            rating: 4.9,
            isVerified: true
          },
          likeCount: 64,
          isLiked: false,
          isBookmarked: false,
          postedAt: '2025-05-21T17:35:00',
          description: 'Collection of over 200 vinyl records spanning classic rock, jazz, soul, and more. 1960s-1980s. Most in VG+ condition. Artists include Beatles, Rolling Stones, Miles Davis, John Coltrane, and many more. Selling as a complete collection only.'
        }
      ];
      
      setProducts(prevProducts => [...prevProducts, ...moreProducts]);
      setPage(prevPage => prevPage + 1);
      setIsLoading(false);
    }, 1000);
  };
  
  // Toggle like
  const toggleLike = (productId: number) => {
    setProducts(prevProducts => 
      prevProducts.map(product => {
        if (product.id === productId) {
          const isLiked = !product.isLiked;
          return {
            ...product,
            isLiked,
            likeCount: isLiked ? product.likeCount + 1 : product.likeCount - 1
          };
        }
        return product;
      })
    );
  };
  
  // Toggle bookmark
  const toggleBookmark = (productId: number) => {
    setProducts(prevProducts => 
      prevProducts.map(product => {
        if (product.id === productId) {
          return {
            ...product,
            isBookmarked: !product.isBookmarked
          };
        }
        return product;
      })
    );
  };
  
  // Handle category selection
  const selectCategory = (categoryId: number) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
  };
  
  // Filter products
  const filteredProducts = products.filter(product => {
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }
    
    // Apply category filter
    if (selectedCategory) {
      // In a real app, you'd have a category field on products
      // For demo, we'll just pretend certain products match certain categories
      if (selectedCategory === 1) { // Electronics
        return [1, 4, 6, 7].includes(product.id);
      } else if (selectedCategory === 2) { // Furniture
        return [2, 5].includes(product.id);
      } else if (selectedCategory === 7) { // Sports & Outdoors
        return [3].includes(product.id);
      } else if (selectedCategory === 9) { // Books & Media
        return [8].includes(product.id);
      }
    }
    
    return true;
  });

  // Track scroll for infinite loading
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 500 &&
        !isLoading
      ) {
        loadMoreProducts();
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 md:mb-0">Marketplace</h1>
        
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          {/* Search Bar */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search Marketplace..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-teal-400"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500 dark:text-gray-400" />
          </div>
          
          {/* Sell Button */}
          <button className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors">
            + Sell Something
          </button>
        </div>
      </div>
      
      {/* Categories */}
      <div className="mb-6 overflow-x-auto no-scrollbar">
        <div className="flex space-x-3 pb-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => selectCategory(category.id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </div>
      
      {/* Filters */}
      <div className="mb-6">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <Filter className="h-5 w-5" />
          <span>Filters</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isFilterOpen && (
          <div className="mt-3 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Price Range
                </label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    className="w-full px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                  />
                  <span className="text-gray-500 dark:text-gray-400 self-center">to</span>
                  <input
                    type="number"
                    placeholder="Max"
                    className="w-full px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Condition
                </label>
                <select className="w-full px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100">
                  <option value="">Any condition</option>
                  <option value="new">New</option>
                  <option value="like_new">Like new</option>
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="salvage">For parts or not working</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Distance
                </label>
                <select className="w-full px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100">
                  <option value="5">Within 5 miles</option>
                  <option value="10">Within 10 miles</option>
                  <option value="25">Within 25 miles</option>
                  <option value="50">Within 50 miles</option>
                  <option value="100">Within 100 miles</option>
                  <option value="any">Any distance</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end mt-4">
              <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-lg">
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Product Listings */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
              {/* Product Image */}
              <div className="relative aspect-[4/3] bg-gray-100 dark:bg-gray-700 overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                
                <button
                  onClick={() => toggleBookmark(product.id)}
                  className={`absolute top-2 right-2 p-2 rounded-full ${
                    product.isBookmarked
                      ? 'bg-indigo-500 text-white'
                      : 'bg-white/80 text-gray-700 dark:bg-gray-800/80 dark:text-gray-200'
                  } shadow-sm hover:shadow-md transition-all`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                  </svg>
                </button>
              </div>
              
              {/* Product Content */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
                    {product.title}
                  </h3>
                </div>
                
                <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                  ${product.price.toLocaleString()}
                </div>
                
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <span className="truncate">{product.location}</span>
                  <span className="mx-2">•</span>
                  <span>{product.distance}</span>
                </div>
                
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                    <img
                      src={product.seller.avatar}
                      alt={product.seller.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {product.seller.name}
                      </span>
                      {product.seller.isVerified && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div className="flex items-center text-xs text-yellow-500">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-3 w-3 ${i < Math.floor(product.seller.rating) ? 'text-yellow-500' : 'text-gray-300 dark:text-gray-600'}`}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="ml-1 text-gray-500 dark:text-gray-400">
                        {product.seller.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => toggleLike(product.id)}
                    className={`flex items-center space-x-1 text-sm ${
                      product.isLiked
                        ? 'text-red-500'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${product.isLiked ? 'fill-current' : ''}`} />
                    <span>{product.likeCount}</span>
                  </button>
                  
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {getRelativeTime(product.postedAt)}
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="grid grid-cols-2 divide-x divide-gray-200 dark:divide-gray-700 border-t border-gray-200 dark:border-gray-700">
                <button className="flex items-center justify-center py-3 text-indigo-500 hover:bg-indigo-50 dark:hover:bg-gray-700 font-medium">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  Message
                </button>
                <button className="flex items-center justify-center py-3 text-indigo-500 hover:bg-indigo-50 dark:hover:bg-gray-700 font-medium">
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-4">
            <Search className="h-12 w-12 text-gray-400 dark:text-gray-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No items found</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md">
            We couldn't find any items matching your criteria. Try adjusting your filters or search terms.
          </p>
        </div>
      )}
      
      {/* Loading indicator */}
      {isLoading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
        </div>
      )}
    </div>
  );
};

export default Marketplace;