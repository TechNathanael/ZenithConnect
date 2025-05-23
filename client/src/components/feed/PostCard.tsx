import { useState } from "react";
import { Link } from "wouter";
import UserAvatar from "@/components/common/UserAvatar";
import Comment from "@/components/feed/Comment";

type PostCardProps = {
  author: {
    name: string;
    username?: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  image?: string;
  tags?: string[];
  reactions: {
    count: number;
    types: string[];
  };
  comments: {
    count: number;
    items: {
      author: {
        name: string;
        avatar: string;
      };
      content: string;
      time: string;
    }[];
  };
  shares: number;
};

export default function PostCard({
  author,
  content,
  timestamp,
  image,
  tags,
  reactions,
  comments,
  shares,
}: PostCardProps) {
  const [newComment, setNewComment] = useState("");
  
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, we would submit the comment to the server
    // and then update our local state with the new comment
    setNewComment("");
  };
  
  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow mb-4 overflow-hidden">
      {/* Post Header */}
      <div className="p-4">
        <div className="flex items-start">
          <Link href="#" className="flex-shrink-0">
            <UserAvatar 
              src={author.avatar}
              alt={`${author.name}'s profile`}
              size="sm"
            />
          </Link>
          <div className="ml-3 flex-grow">
            <div className="flex items-center justify-between">
              <div>
                <Link href="#" className="font-medium text-gray-900 dark:text-white hover:underline">{author.name}</Link>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <span>{timestamp}</span>
                  <span className="mx-1">•</span>
                  <span className="flex items-center"><span className="material-icons text-xs mr-1">public</span>Public</span>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300" aria-label="Post options">
                <span className="material-icons">more_horiz</span>
              </button>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <p className="text-sm text-gray-800 dark:text-gray-200">{content}</p>
          {tags && tags.length > 0 && (
            <div className="mt-2">
              {tags.map((tag, index) => (
                <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 mr-1">
                  <span className="material-icons text-xs mr-1">tag</span>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Post Image */}
      {image && (
        <img src={image} alt="Post content" className="w-full h-auto" />
      )}
      
      {/* Post Stats */}
      <div className="px-4 py-2 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 border-t border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <div className="flex -space-x-1">
            <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs">
              <span className="material-icons text-xs">favorite</span>
            </div>
            <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
              <span className="material-icons text-xs">thumb_up</span>
            </div>
            <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs">
              <span className="material-icons text-xs">emoji_emotions</span>
            </div>
          </div>
          <span className="ml-2">{reactions.count} reactions</span>
        </div>
        <div>
          <span>{comments.count} comments • {shares} shares</span>
        </div>
      </div>
      
      {/* Post Actions */}
      <div className="px-4 py-2 flex justify-between">
        <button className="flex items-center justify-center space-x-1 flex-1 py-1 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
          <span className="material-icons text-gray-500">thumb_up</span>
          <span>Like</span>
        </button>
        <button className="flex items-center justify-center space-x-1 flex-1 py-1 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
          <span className="material-icons text-gray-500">chat_bubble_outline</span>
          <span>Comment</span>
        </button>
        <button className="flex items-center justify-center space-x-1 flex-1 py-1 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
          <span className="material-icons text-gray-500">share</span>
          <span>Share</span>
        </button>
      </div>
      
      {/* Post Comments */}
      <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
        {/* Comment Input */}
        <form onSubmit={handleCommentSubmit} className="flex items-center space-x-2">
          <UserAvatar 
            src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
            alt="Your profile"
            size="xs"
          />
          <div className="flex-grow relative">
            <input 
              type="text" 
              className="w-full bg-gray-100 dark:bg-gray-700 rounded-full pl-4 pr-10 py-1 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-550 dark:focus:ring-teal-450" 
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex space-x-1">
              <button type="button" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <span className="material-icons text-sm">sentiment_satisfied_alt</span>
              </button>
              <button type="button" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <span className="material-icons text-sm">attach_file</span>
              </button>
            </div>
          </div>
        </form>
        
        {/* Comments List */}
        <div className="mt-2 space-y-2">
          {comments.items.map((comment, index) => (
            <Comment 
              key={index}
              author={comment.author}
              content={comment.content}
              time={comment.time}
            />
          ))}
        </div>
      </div>
    </article>
  );
}
