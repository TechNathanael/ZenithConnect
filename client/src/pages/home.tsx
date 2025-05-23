import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Camera, Image, Smile, MapPin, Heart, MessageCircle, Share2 } from 'lucide-react';
import { getRelativeTime, truncateText } from '@/lib/utils';

const Home: React.FC = () => {
  const [postContent, setPostContent] = useState('');

  // Fetch posts
  const { data: posts, isLoading } = useQuery({
    queryKey: ['/api/posts'],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!postContent.trim()) return;
    
    // TODO: Implement post creation once backend is ready
    console.log('Creating post:', postContent);
    
    // Reset form
    setPostContent('');
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-2xl mx-auto">
        {/* Create Post Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
          <div className="p-4">
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                <img 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <form onSubmit={handleCreatePost} className="flex-1">
                <textarea
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  placeholder="What's on your mind?"
                  className="w-full rounded-lg px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-teal-400 resize-none min-h-[80px]"
                />
                <div className="flex items-center justify-between mt-3">
                  <div className="flex space-x-2">
                    <button type="button" className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <Image className="h-5 w-5" />
                    </button>
                    <button type="button" className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <Camera className="h-5 w-5" />
                    </button>
                    <button type="button" className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <Smile className="h-5 w-5" />
                    </button>
                    <button type="button" className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <MapPin className="h-5 w-5" />
                    </button>
                  </div>
                  <button 
                    type="submit" 
                    disabled={!postContent.trim()}
                    className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-teal-400 text-white rounded-full text-sm font-medium hover:from-indigo-600 hover:to-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-indigo-500 disabled:hover:to-teal-400"
                  >
                    Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        {/* Story Tray */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex space-x-4 py-2 px-1">
            {/* Add Story */}
            <div className="flex-shrink-0 w-24">
              <div className="rounded-lg overflow-hidden h-40 bg-gray-100 dark:bg-gray-700 relative flex flex-col items-center justify-center shadow-sm border border-gray-200 dark:border-gray-600">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-teal-400 flex items-center justify-center text-white">
                  <span className="text-xl font-bold">+</span>
                </div>
                <span className="mt-2 text-xs font-medium text-gray-700 dark:text-gray-300">Add Story</span>
              </div>
            </div>
            
            {/* Demo Stories */}
            {[1, 2, 3, 4, 5].map((story) => (
              <div key={story} className="flex-shrink-0 w-24">
                <div className="rounded-lg overflow-hidden h-40 relative shadow-sm">
                  <img 
                    src={`https://picsum.photos/200/300?random=${story}`} 
                    alt="Story" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-indigo-500">
                      <img 
                        src={`https://randomuser.me/api/portraits/men/${story + 10}.jpg`} 
                        alt="User" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-xs font-medium text-white mt-1 truncate">User Name</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Posts Feed */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((placeholder) => (
              <div key={placeholder} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 animate-pulse">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 mr-3"></div>
                  <div className="flex-1">
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                  </div>
                </div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Demo posts since we're still setting up the backend */}
            {[
              {
                id: 1,
                user: {
                  id: 4,
                  displayName: "David Chen",
                  username: "davidchen",
                  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
                },
                content: "Just launched our new product dashboard! After months of work, it's finally live. Would love to hear your thoughts and feedback!",
                image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080",
                createdAt: new Date(Date.now() - 3600000).toISOString(),
                likeCount: 24,
                commentCount: 5
              },
              {
                id: 2,
                user: {
                  id: 5,
                  displayName: "Emma Wilson",
                  username: "emmawilson",
                  avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
                },
                content: "Just finished this illustration for a client project. What do you think of the color palette? #Illustration #DigitalArt",
                image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080",
                createdAt: new Date(Date.now() - 7200000).toISOString(),
                likeCount: 42,
                commentCount: 8
              },
              {
                id: 3,
                user: {
                  id: 1,
                  displayName: "Alex Morgan",
                  username: "alexmorgan",
                  avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
                },
                content: "Just finished working on the new design system for our client project. Really happy with how the components turned out! #DesignSystem #UI",
                image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&h=800",
                createdAt: new Date(Date.now() - 86400000).toISOString(),
                likeCount: 56,
                commentCount: 12
              }
            ].map((post) => (
              <div key={post.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                {/* Post Header */}
                <div className="p-4 flex items-center">
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3 cursor-pointer">
                    <Link href={`/profile/${post.user.username}`}>
                      <img 
                        src={post.user.avatar} 
                        alt={post.user.displayName} 
                        className="w-full h-full object-cover"
                      />
                    </Link>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 dark:text-white text-sm hover:underline cursor-pointer">
                      <Link href={`/profile/${post.user.username}`}>
                        {post.user.displayName}
                      </Link>
                    </div>
                    <div className="text-gray-500 dark:text-gray-400 text-xs">
                      {getRelativeTime(post.createdAt)}
                    </div>
                  </div>
                  <div className="relative">
                    <button 
                      onClick={() => {
                        const optionsMenu = document.getElementById(`post-options-${post.id}`);
                        if (optionsMenu) {
                          optionsMenu.classList.toggle('hidden');
                        }
                      }}
                      className="text-gray-500 dark:text-gray-400 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                    
                    {/* Post Options Menu */}
                    <div id={`post-options-${post.id}`} className="hidden absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50 border border-gray-200 dark:border-gray-700">
                      <div className="py-1" role="menu" aria-orientation="vertical">
                        <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" role="menuitem">
                          Save post
                        </button>
                        <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" role="menuitem">
                          Edit post
                        </button>
                        <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" role="menuitem">
                          Turn off notifications for this post
                        </button>
                        <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" role="menuitem">
                          Download
                        </button>
                        <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" role="menuitem">
                          Report post
                        </button>
                        <button className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700" role="menuitem">
                          Hide post
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Post Content */}
                <div className="px-4 pb-2">
                  <p className="text-gray-800 dark:text-gray-200 text-sm mb-2">{post.content}</p>
                </div>
                
                {/* Post Image */}
                {post.image && (
                  <div className="aspect-auto max-h-[32rem] overflow-hidden">
                    <img 
                      src={post.image} 
                      alt="Post" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                {/* Post Stats */}
                <div className="px-4 py-2 flex items-center justify-between text-gray-500 dark:text-gray-400 text-sm">
                  <div className="flex items-center space-x-1">
                    <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                    <span>{post.likeCount}</span>
                  </div>
                  <div>
                    <span>{post.commentCount} comments</span>
                  </div>
                </div>
                
                {/* Post Actions */}
                <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 grid grid-cols-3 divide-x divide-gray-200 dark:divide-gray-700">
                  <button 
                    onClick={() => {
                      console.log(`Liked post: ${post.id}`);
                      // Show feedback for the user
                      const likeButton = document.getElementById(`like-button-${post.id}`);
                      if (likeButton) {
                        likeButton.classList.add('text-red-500');
                        // Update the UI to show liked state
                        const likeCount = document.getElementById(`like-count-${post.id}`);
                        if (likeCount) {
                          const currentCount = parseInt(likeCount.innerText);
                          likeCount.innerText = (currentCount + 1).toString();
                        }
                      }
                    }}
                    id={`like-button-${post.id}`}
                    className="flex items-center justify-center py-1 text-gray-600 dark:text-gray-300 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md hover:text-red-500 transition-colors"
                  >
                    <Heart className="h-5 w-5 mr-1" />
                    Like
                  </button>
                  <button 
                    onClick={() => {
                      console.log(`Comment on post: ${post.id}`);
                      // Show comment form
                      const commentForm = document.getElementById(`comment-form-${post.id}`);
                      if (commentForm) {
                        commentForm.classList.toggle('hidden');
                        const textarea = commentForm.querySelector('textarea');
                        if (textarea) {
                          textarea.focus();
                        }
                      }
                    }}
                    className="flex items-center justify-center py-1 text-gray-600 dark:text-gray-300 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md"
                  >
                    <MessageCircle className="h-5 w-5 mr-1" />
                    Comment
                  </button>
                  <button 
                    onClick={() => {
                      console.log(`Share post: ${post.id}`);
                      
                      // Create a share menu popup
                      const shareMenu = document.getElementById(`share-menu-${post.id}`);
                      if (shareMenu) {
                        shareMenu.classList.toggle('hidden');
                      }
                    }}
                    className="flex items-center justify-center py-1 text-gray-600 dark:text-gray-300 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md"
                  >
                    <Share2 className="h-5 w-5 mr-1" />
                    Share
                  </button>
                </div>
                
                {/* Comment Form */}
                <div id={`comment-form-${post.id}`} className="hidden px-4 py-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                      <img 
                        src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150" 
                        alt="Your profile" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <textarea
                        placeholder="Write a comment..."
                        className="w-full px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-teal-400 resize-none min-h-[80px]"
                      ></textarea>
                      <div className="flex justify-end mt-2">
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            const commentForm = document.getElementById(`comment-form-${post.id}`);
                            const textarea = commentForm?.querySelector('textarea');
                            if (textarea) {
                              const commentText = textarea.value;
                              console.log(`New comment on post ${post.id}: ${commentText}`);
                              
                              // Add new comment to UI
                              const commentsSection = document.getElementById(`comments-section-${post.id}`);
                              if (commentsSection && commentText.trim()) {
                                // Create new comment element
                                const newComment = document.createElement('div');
                                newComment.className = 'flex items-start mb-3';
                                newComment.innerHTML = `
                                  <div class="w-8 h-8 rounded-full overflow-hidden mr-2">
                                    <img 
                                      src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150" 
                                      alt="Your profile" 
                                      class="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div class="flex-1 bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2">
                                    <div class="font-medium text-sm text-gray-900 dark:text-white">You</div>
                                    <p class="text-sm text-gray-800 dark:text-gray-200">${commentText}</p>
                                    <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">Just now</div>
                                  </div>
                                `;
                                commentsSection.appendChild(newComment);
                                
                                // Update comment count
                                const commentCount = document.getElementById(`comment-count-${post.id}`);
                                if (commentCount) {
                                  const count = parseInt(commentCount.innerText.split(' ')[0]) + 1;
                                  commentCount.innerText = `${count} comments`;
                                }
                                
                                // Clear textarea
                                textarea.value = '';
                              }
                            }
                          }}
                          className="px-4 py-1 bg-indigo-500 text-white rounded-full text-sm font-medium hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Post
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Comments Section */}
                <div id={`comments-section-${post.id}`} className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 space-y-3">
                  {post.commentCount > 0 && (
                    <div className="text-sm text-gray-500 dark:text-gray-400 cursor-pointer hover:underline">
                      View all comments
                    </div>
                  )}
                </div>
                
                {/* Share Menu */}
                <div id={`share-menu-${post.id}`} className="hidden absolute right-4 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50 border border-gray-200 dark:border-gray-700">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" role="menuitem">
                      Share to your timeline
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" role="menuitem">
                      Share in a message
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" role="menuitem">
                      Share to a group
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" role="menuitem">
                      Copy link
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;