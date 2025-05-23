import { apiRequest } from "@/lib/queryClient";

// Auth API
export const authApi = {
  login: async (username: string, password: string) => {
    const res = await apiRequest("POST", "/api/auth/login", { username, password });
    return res.json();
  },
  
  register: async (username: string, password: string) => {
    const res = await apiRequest("POST", "/api/auth/register", { username, password });
    return res.json();
  },
  
  logout: async () => {
    const res = await apiRequest("POST", "/api/auth/logout", {});
    return res.json();
  },
  
  me: async () => {
    const res = await apiRequest("GET", "/api/auth/me", undefined);
    return res.json();
  }
};

// Posts API
export const postsApi = {
  getAllPosts: async () => {
    const res = await apiRequest("GET", "/api/posts", undefined);
    return res.json();
  },
  
  createPost: async (content: string, image?: string, tags?: string[]) => {
    const res = await apiRequest("POST", "/api/posts", { content, image, tags });
    return res.json();
  },
  
  getPostById: async (id: number) => {
    const res = await apiRequest("GET", `/api/posts/${id}`, undefined);
    return res.json();
  },
  
  addComment: async (postId: number, content: string) => {
    const res = await apiRequest("POST", `/api/posts/${postId}/comments`, { content });
    return res.json();
  },
  
  toggleReaction: async (postId: number, reactionType: string) => {
    const res = await apiRequest("POST", `/api/posts/${postId}/reactions`, { reactionType });
    return res.json();
  },
  
  sharePost: async (postId: number) => {
    const res = await apiRequest("POST", `/api/posts/${postId}/share`, {});
    return res.json();
  }
};

// User API
export const userApi = {
  getUserProfile: async (username: string) => {
    const res = await apiRequest("GET", `/api/users/${username}`, undefined);
    return res.json();
  },
  
  updateProfile: async (data: any) => {
    const res = await apiRequest("PATCH", "/api/users/profile", data);
    return res.json();
  },
  
  getFriends: async () => {
    const res = await apiRequest("GET", "/api/users/friends", undefined);
    return res.json();
  },
  
  getFriendRequests: async () => {
    const res = await apiRequest("GET", "/api/users/friend-requests", undefined);
    return res.json();
  },
  
  sendFriendRequest: async (userId: number) => {
    const res = await apiRequest("POST", `/api/users/${userId}/friend-request`, {});
    return res.json();
  },
  
  respondToFriendRequest: async (requestId: number, accept: boolean) => {
    const res = await apiRequest("POST", `/api/users/friend-requests/${requestId}`, { accept });
    return res.json();
  }
};

// Notifications API
export const notificationsApi = {
  getNotifications: async () => {
    const res = await apiRequest("GET", "/api/notifications", undefined);
    return res.json();
  },
  
  markAsRead: async (notificationId: number) => {
    const res = await apiRequest("PATCH", `/api/notifications/${notificationId}`, { isRead: true });
    return res.json();
  },
  
  markAllAsRead: async () => {
    const res = await apiRequest("PATCH", "/api/notifications/mark-all-read", {});
    return res.json();
  }
};

// Settings API
export const settingsApi = {
  getSettings: async () => {
    const res = await apiRequest("GET", "/api/settings", undefined);
    return res.json();
  },
  
  updateSettings: async (settings: any) => {
    const res = await apiRequest("PATCH", "/api/settings", settings);
    return res.json();
  }
};

// Messages API
export const messagesApi = {
  getConversations: async () => {
    const res = await apiRequest("GET", "/api/messages/conversations", undefined);
    return res.json();
  },
  
  getMessages: async (conversationId: number) => {
    const res = await apiRequest("GET", `/api/messages/conversations/${conversationId}`, undefined);
    return res.json();
  },
  
  sendMessage: async (conversationId: number, content: string) => {
    const res = await apiRequest("POST", `/api/messages/conversations/${conversationId}`, { content });
    return res.json();
  },
  
  createConversation: async (userId: number) => {
    const res = await apiRequest("POST", "/api/messages/conversations", { userId });
    return res.json();
  }
};

// Discover API
export const discoverApi = {
  getTrendingTopics: async () => {
    const res = await apiRequest("GET", "/api/discover/trending", undefined);
    return res.json();
  },
  
  getGroups: async () => {
    const res = await apiRequest("GET", "/api/discover/groups", undefined);
    return res.json();
  },
  
  getEvents: async () => {
    const res = await apiRequest("GET", "/api/discover/events", undefined);
    return res.json();
  }
};
