import { create } from 'zustand';

interface User {
  id: number;
  name: string;
  username: string;
  avatar: string;
}

interface Post {
  id: number;
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
}

interface Notification {
  id: number;
  type: string;
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  time: string;
  isRead: boolean;
  actionLink?: string;
  relatedImage?: string;
}

interface StoreState {
  currentUser: User | null;
  isAuthenticated: boolean;
  posts: Post[];
  notifications: Notification[];
  unreadNotificationsCount: number;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setCurrentUser: (user: User | null) => void;
  addPost: (post: Post) => void;
  addComment: (postId: number, comment: { author: { name: string; avatar: string; }; content: string; time: string; }) => void;
  toggleReaction: (postId: number, reactionType: string) => void;
  markNotificationAsRead: (notificationId: number) => void;
  markAllNotificationsAsRead: () => void;
  setError: (error: string | null) => void;
}

export const useStore = create<StoreState>((set) => ({
  currentUser: {
    id: 1,
    name: "Alex Morgan",
    username: "alexmorgan",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
  },
  isAuthenticated: true,
  posts: [],
  notifications: [],
  unreadNotificationsCount: 0,
  isLoading: false,
  error: null,
  
  // Actions
  setCurrentUser: (user) => set({ currentUser: user, isAuthenticated: !!user }),
  
  addPost: (post) => set((state) => ({ 
    posts: [post, ...state.posts] 
  })),
  
  addComment: (postId, comment) => set((state) => ({
    posts: state.posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            comments: {
              count: post.comments.count + 1,
              items: [...post.comments.items, comment]
            }
          }
        : post
    )
  })),
  
  toggleReaction: (postId, reactionType) => set((state) => ({
    posts: state.posts.map(post => {
      if (post.id !== postId) return post;
      
      const hasReaction = post.reactions.types.includes(reactionType);
      return {
        ...post,
        reactions: {
          count: hasReaction ? post.reactions.count - 1 : post.reactions.count + 1,
          types: hasReaction 
            ? post.reactions.types.filter(type => type !== reactionType)
            : [...post.reactions.types, reactionType]
        }
      };
    })
  })),
  
  markNotificationAsRead: (notificationId) => set((state) => {
    const updatedNotifications = state.notifications.map(notification => 
      notification.id === notificationId ? { ...notification, isRead: true } : notification
    );
    
    return {
      notifications: updatedNotifications,
      unreadNotificationsCount: updatedNotifications.filter(n => !n.isRead).length
    };
  }),
  
  markAllNotificationsAsRead: () => set((state) => ({
    notifications: state.notifications.map(notification => ({ ...notification, isRead: true })),
    unreadNotificationsCount: 0
  })),
  
  setError: (error) => set({ error })
}));
