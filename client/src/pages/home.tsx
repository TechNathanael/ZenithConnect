import { useState } from "react";
import StoriesTray from "@/components/feed/StoriesTray";
import CreatePostCard from "@/components/feed/CreatePostCard";
import AISuggestion from "@/components/feed/AISuggestion";
import PostCard from "@/components/feed/PostCard";
import Sidebar from "@/components/layout/Sidebar";
import RightSidebar from "@/components/layout/RightSidebar";

// Mock data for our posts
const mockPosts = [
  {
    id: 1,
    author: {
      name: "David Chen",
      username: "davidchen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
    },
    content: "Just launched our new product dashboard! After months of work, it's finally live. Would love to hear your thoughts and feedback!",
    timestamp: "3 hours ago",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080",
    tags: ["ProductDesign", "UXDesign"],
    reactions: {
      count: 148,
      types: ["like", "love", "haha"]
    },
    comments: {
      count: 32,
      items: [
        {
          author: {
            name: "Sarah Johnson",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
          },
          content: "This looks amazing! Love the color scheme and the layout. Is there a mobile version coming soon?",
          time: "2h"
        },
        {
          author: {
            name: "Mike Williams",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
          },
          content: "Great work David! The analytics section is exactly what I needed for my project.",
          time: "1h"
        }
      ]
    },
    shares: 14
  },
  {
    id: 2,
    author: {
      name: "Emma Wilson",
      username: "emmawilson",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
    },
    content: "Just finished this illustration for a client project. What do you think of the color palette? #Illustration #DigitalArt",
    timestamp: "Yesterday",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080",
    reactions: {
      count: 217,
      types: ["like", "love"]
    },
    comments: {
      count: 45,
      items: []
    },
    shares: 23
  }
];

export default function Home() {
  const [feedType, setFeedType] = useState<"forYou" | "recent">("forYou");
  const [posts, setPosts] = useState(mockPosts);
  
  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Left Sidebar */}
        <Sidebar />
        
        {/* Feed / Main Content */}
        <div className="flex-grow max-w-2xl mx-auto">
          {/* Stories */}
          <StoriesTray />
          
          {/* Create Post Card */}
          <CreatePostCard />
          
          {/* Feed Tabs */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-2 mb-4">
            <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2 px-2">
              <button 
                className={`flex-1 px-4 py-2 text-sm font-medium ${feedType === "forYou" ? "text-indigo-550 dark:text-teal-450 border-b-2 border-indigo-550 dark:border-teal-450" : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"}`}
                onClick={() => setFeedType("forYou")}
              >
                For You
              </button>
              <button 
                className={`flex-1 px-4 py-2 text-sm font-medium ${feedType === "recent" ? "text-indigo-550 dark:text-teal-450 border-b-2 border-indigo-550 dark:border-teal-450" : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"}`}
                onClick={() => setFeedType("recent")}
              >
                Recent
              </button>
            </div>
          </div>
          
          {/* AI Suggestion */}
          <AISuggestion />
          
          {/* Posts Feed */}
          {posts.map(post => (
            <PostCard 
              key={post.id}
              author={post.author}
              content={post.content}
              timestamp={post.timestamp}
              image={post.image}
              tags={post.tags}
              reactions={post.reactions}
              comments={post.comments}
              shares={post.shares}
            />
          ))}
          
          {/* Load More */}
          <div className="flex justify-center mb-4">
            <button className="px-4 py-2 text-sm font-medium text-indigo-550 dark:text-teal-450 border border-indigo-550 dark:border-teal-450 rounded-md hover:bg-indigo-50 dark:hover:bg-gray-800">
              Load More
            </button>
          </div>
        </div>
        
        {/* Right Sidebar */}
        <RightSidebar />
      </div>
    </div>
  );
}
