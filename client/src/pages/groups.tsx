import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Search, Users, Plus, Globe, Lock, User, Calendar, MessageCircle, Settings } from 'lucide-react';

interface Group {
  id: number;
  name: string;
  description: string;
  coverImage: string;
  icon?: string;
  memberCount: number;
  postCount: number;
  privacy: 'public' | 'private' | 'closed';
  category: string;
  isMember: boolean;
  isAdmin: boolean;
  createdAt: string;
  lastActive: string;
}

const Groups: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPrivacy, setSelectedPrivacy] = useState<string | null>(null);
  const [isJoined, setIsJoined] = useState<boolean | null>(null);
  const [groups, setGroups] = useState<Group[]>([
    {
      id: 1,
      name: 'Tech Enthusiasts',
      description: 'A community for discussing the latest in technology, gadgets, and innovation.',
      coverImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&h=400',
      memberCount: 3452,
      postCount: 257,
      privacy: 'public',
      category: 'Technology',
      isMember: true,
      isAdmin: false,
      createdAt: '2023-08-15T10:00:00Z',
      lastActive: '2025-05-23T08:45:00Z',
    },
    {
      id: 2,
      name: 'Healthy Living',
      description: 'Share tips, recipes, and advice for maintaining a healthy lifestyle.',
      coverImage: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&h=400',
      memberCount: 2187,
      postCount: 189,
      privacy: 'public',
      category: 'Health & Fitness',
      isMember: false,
      isAdmin: false,
      createdAt: '2024-01-10T14:30:00Z',
      lastActive: '2025-05-23T10:20:00Z',
    },
    {
      id: 3,
      name: 'Photography Lovers',
      description: 'A place to share your photos, techniques, and equipment recommendations.',
      coverImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&h=400',
      memberCount: 5693,
      postCount: 843,
      privacy: 'public',
      category: 'Arts & Photography',
      isMember: true,
      isAdmin: true,
      createdAt: '2023-06-22T09:15:00Z',
      lastActive: '2025-05-23T11:05:00Z',
    },
    {
      id: 4,
      name: 'Startup Founders',
      description: 'Connect with other founders, share experiences, and get advice for your startup journey.',
      coverImage: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&h=400',
      memberCount: 1256,
      postCount: 321,
      privacy: 'closed',
      category: 'Business',
      isMember: true,
      isAdmin: false,
      createdAt: '2024-03-05T16:45:00Z',
      lastActive: '2025-05-22T22:30:00Z',
    },
    {
      id: 5,
      name: 'Book Club',
      description: 'Discuss your favorite books, get recommendations, and join our monthly book discussions.',
      coverImage: 'https://images.unsplash.com/photo-1526243741027-444d633d7365?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&h=400',
      memberCount: 876,
      postCount: 167,
      privacy: 'public',
      category: 'Books & Literature',
      isMember: false,
      isAdmin: false,
      createdAt: '2024-02-12T11:20:00Z',
      lastActive: '2025-05-23T07:15:00Z',
    },
    {
      id: 6,
      name: 'Travel Adventures',
      description: 'Share your travel stories, tips, and destination recommendations.',
      coverImage: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&h=400',
      memberCount: 3421,
      postCount: 542,
      privacy: 'public',
      category: 'Travel',
      isMember: true,
      isAdmin: false,
      createdAt: '2023-11-08T13:10:00Z',
      lastActive: '2025-05-23T09:50:00Z',
    },
    {
      id: 7,
      name: 'Developers Guild',
      description: 'A private community for software developers to collaborate, share code, and solve problems.',
      coverImage: 'https://images.unsplash.com/photo-1629904853716-f0bc54eea481?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&h=400',
      memberCount: 2879,
      postCount: 1254,
      privacy: 'private',
      category: 'Technology',
      isMember: true,
      isAdmin: false,
      createdAt: '2023-09-30T08:40:00Z',
      lastActive: '2025-05-23T11:30:00Z',
    },
    {
      id: 8,
      name: 'Music Production',
      description: 'Learn about music production, share your tracks, and get feedback from other producers.',
      coverImage: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&h=400',
      memberCount: 1683,
      postCount: 486,
      privacy: 'public',
      category: 'Music',
      isMember: false,
      isAdmin: false,
      createdAt: '2024-01-25T15:20:00Z',
      lastActive: '2025-05-22T19:45:00Z',
    },
  ]);
  
  const [categories, setCategories] = useState([
    'Technology',
    'Health & Fitness',
    'Arts & Photography',
    'Business',
    'Books & Literature',
    'Travel',
    'Music',
    'Food & Cooking',
    'Sports',
    'Gaming',
    'Education',
    'Fashion',
    'Science',
    'Pets & Animals',
    'Parenting',
  ]);
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');
  const [newGroupPrivacy, setNewGroupPrivacy] = useState<'public' | 'private' | 'closed'>('public');
  const [newGroupCategory, setNewGroupCategory] = useState('');
  
  // Toggle group membership
  const toggleMembership = (groupId: number) => {
    setGroups(prevGroups => 
      prevGroups.map(group => {
        if (group.id === groupId) {
          return {
            ...group,
            isMember: !group.isMember,
            memberCount: !group.isMember ? group.memberCount + 1 : group.memberCount - 1
          };
        }
        return group;
      })
    );
  };
  
  // Create new group
  const handleCreateGroup = () => {
    if (!newGroupName.trim() || !newGroupDescription.trim() || !newGroupCategory) {
      return; // Basic validation
    }
    
    const newGroup: Group = {
      id: Math.max(...groups.map(g => g.id)) + 1,
      name: newGroupName,
      description: newGroupDescription,
      coverImage: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&h=400',
      memberCount: 1, // Creator is first member
      postCount: 0,
      privacy: newGroupPrivacy,
      category: newGroupCategory,
      isMember: true,
      isAdmin: true,
      createdAt: new Date().toISOString(),
      lastActive: new Date().toISOString(),
    };
    
    setGroups(prevGroups => [...prevGroups, newGroup]);
    setIsCreateModalOpen(false);
    resetNewGroupForm();
  };
  
  const resetNewGroupForm = () => {
    setNewGroupName('');
    setNewGroupDescription('');
    setNewGroupPrivacy('public');
    setNewGroupCategory('');
  };
  
  // Filter groups based on search and filters
  const filteredGroups = groups.filter(group => {
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (
        !group.name.toLowerCase().includes(query) &&
        !group.description.toLowerCase().includes(query)
      ) {
        return false;
      }
    }
    
    // Apply category filter
    if (selectedCategory && group.category !== selectedCategory) {
      return false;
    }
    
    // Apply privacy filter
    if (selectedPrivacy && group.privacy !== selectedPrivacy) {
      return false;
    }
    
    // Apply joined/not joined filter
    if (isJoined !== null && group.isMember !== isJoined) {
      return false;
    }
    
    return true;
  });
  
  // Format relative time
  const getRelativeTime = (timestamp: string) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
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
      return date.toLocaleDateString();
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 md:mb-0">Groups</h1>
        
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          {/* Search Bar */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search Groups..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-teal-400"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500 dark:text-gray-400" />
          </div>
          
          {/* Create Group Button */}
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors flex items-center justify-center"
          >
            <Plus className="h-5 w-5 mr-1" />
            Create Group
          </button>
        </div>
      </div>
      
      {/* Filters */}
      <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Category
          </label>
          <select
            value={selectedCategory || ''}
            onChange={(e) => setSelectedCategory(e.target.value || null)}
            className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        
        {/* Privacy Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Privacy
          </label>
          <select
            value={selectedPrivacy || ''}
            onChange={(e) => setSelectedPrivacy(e.target.value || null)}
            className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="">All Privacy Types</option>
            <option value="public">Public</option>
            <option value="closed">Closed</option>
            <option value="private">Private</option>
          </select>
        </div>
        
        {/* Joined Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Membership
          </label>
          <select
            value={isJoined === null ? '' : isJoined ? 'true' : 'false'}
            onChange={(e) => {
              const value = e.target.value;
              setIsJoined(value === '' ? null : value === 'true');
            }}
            className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="">All Groups</option>
            <option value="true">Joined</option>
            <option value="false">Not Joined</option>
          </select>
        </div>
        
        {/* Sort Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Sort By
          </label>
          <select
            className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="recent">Recently Active</option>
            <option value="newest">Newest</option>
            <option value="popular">Most Members</option>
            <option value="active">Most Active</option>
          </select>
        </div>
      </div>
      
      {/* Group List */}
      {filteredGroups.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredGroups.map(group => (
            <div key={group.id} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
              {/* Group Cover */}
              <div className="relative h-36 bg-gray-300 dark:bg-gray-700 overflow-hidden">
                <img
                  src={group.coverImage}
                  alt={`${group.name} cover`}
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end">
                  <h3 className="text-xl font-bold text-white">{group.name}</h3>
                  
                  <div className="flex items-center space-x-1 text-white text-sm">
                    {group.privacy === 'public' && <Globe className="h-4 w-4" />}
                    {group.privacy === 'closed' && <Lock className="h-4 w-4" />}
                    {group.privacy === 'private' && <Lock className="h-4 w-4" />}
                    <span className="capitalize">{group.privacy}</span>
                  </div>
                </div>
              </div>
              
              {/* Group Content */}
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-indigo-500 dark:text-indigo-400 font-medium">
                    {group.category}
                  </span>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Created {new Date(group.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                  {group.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{group.memberCount.toLocaleString()} members</span>
                  </div>
                  
                  <div className="flex items-center">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    <span>{group.postCount.toLocaleString()} posts</span>
                  </div>
                  
                  <div>
                    <span>Active {getRelativeTime(group.lastActive)}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  {group.isMember ? (
                    <div className="flex space-x-2">
                      <Link href={`/groups/${group.id}`}>
                        <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-lg transition-colors">
                          Visit Group
                        </button>
                      </Link>
                      
                      {group.isAdmin && (
                        <button className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                          <Settings className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  ) : (
                    <button 
                      onClick={() => toggleMembership(group.id)}
                      className="px-4 py-2 border border-indigo-500 text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900 text-sm font-medium rounded-lg transition-colors"
                    >
                      + Join Group
                    </button>
                  )}
                  
                  {group.isMember && (
                    <button 
                      onClick={() => toggleMembership(group.id)}
                      className="text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400"
                    >
                      Leave Group
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-4">
            <Users className="h-10 w-10 text-gray-400 dark:text-gray-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No groups found</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md">
            We couldn't find any groups matching your criteria. Try adjusting your filters or create a new group.
          </p>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="mt-4 px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-lg transition-colors"
          >
            Create a Group
          </button>
        </div>
      )}
      
      {/* Create Group Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            
            <div className="relative inline-block bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
              <div className="px-6 pt-5 pb-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Create New Group</h3>
              </div>
              
              <div className="px-6 py-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Group Name
                  </label>
                  <input
                    type="text"
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                    placeholder="Enter group name"
                    className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    value={newGroupDescription}
                    onChange={(e) => setNewGroupDescription(e.target.value)}
                    placeholder="What is this group about?"
                    rows={3}
                    className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 resize-none"
                  ></textarea>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Privacy
                    </label>
                    <select
                      value={newGroupPrivacy}
                      onChange={(e) => setNewGroupPrivacy(e.target.value as 'public' | 'private' | 'closed')}
                      className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                    >
                      <option value="public">Public</option>
                      <option value="closed">Closed</option>
                      <option value="private">Private</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Category
                    </label>
                    <select
                      value={newGroupCategory}
                      onChange={(e) => setNewGroupCategory(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                    >
                      <option value="">Select a category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                  {newGroupPrivacy === 'public' && (
                    <div className="flex items-center mb-1">
                      <Globe className="h-4 w-4 mr-1" />
                      <span>Anyone can see who's in the group and what they post.</span>
                    </div>
                  )}
                  {newGroupPrivacy === 'closed' && (
                    <div className="flex items-center mb-1">
                      <User className="h-4 w-4 mr-1" />
                      <span>Anyone can find the group and see who's in it. Only members can see posts.</span>
                    </div>
                  )}
                  {newGroupPrivacy === 'private' && (
                    <div className="flex items-center mb-1">
                      <Lock className="h-4 w-4 mr-1" />
                      <span>Only members can find the group and see who's in it and what they post.</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreateModalOpen(false);
                    resetNewGroupForm();
                  }}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 text-sm font-medium rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleCreateGroup}
                  disabled={!newGroupName.trim() || !newGroupDescription.trim() || !newGroupCategory}
                  className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create Group
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Groups;