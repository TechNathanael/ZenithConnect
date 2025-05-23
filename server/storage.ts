import {
  users, User, InsertUser,
  posts, Post, InsertPost,
  comments, Comment, InsertComment,
  reactions, Reaction, InsertReaction,
  friendships, Friendship, InsertFriendship,
  notifications, Notification, InsertNotification,
  conversations, Conversation, InsertConversation,
  conversationParticipants, ConversationParticipant, InsertConversationParticipant,
  messages, Message, InsertMessage,
  userSettings, UserSettings, InsertUserSettings,
  stories, Story, InsertStory,
  events, Event, InsertEvent,
  groups, Group, InsertGroup
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, or, sql } from "drizzle-orm";

export interface IStorage {
  // User Operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, data: Partial<User>): Promise<User | undefined>;
  setUserOnlineStatus(id: number, isOnline: boolean): Promise<User | undefined>;
  
  // Post Operations
  getPosts(limit?: number, offset?: number): Promise<Post[]>;
  getUserPosts(userId: number): Promise<Post[]>;
  getPost(id: number): Promise<Post | undefined>;
  createPost(post: InsertPost): Promise<Post>;
  updatePost(id: number, data: Partial<Post>): Promise<Post | undefined>;
  deletePost(id: number): Promise<boolean>;
  
  // Comment Operations
  getPostComments(postId: number): Promise<Comment[]>;
  createComment(comment: InsertComment): Promise<Comment>;
  deleteComment(id: number): Promise<boolean>;
  
  // Reaction Operations
  getPostReactions(postId: number): Promise<Reaction[]>;
  getUserReaction(postId: number, userId: number): Promise<Reaction | undefined>;
  createReaction(reaction: InsertReaction): Promise<Reaction>;
  deleteReaction(id: number): Promise<boolean>;
  
  // Friendship Operations
  getFriendships(userId: number, status?: string): Promise<Friendship[]>;
  getFriendship(userId: number, friendId: number): Promise<Friendship | undefined>;
  createFriendship(friendship: InsertFriendship): Promise<Friendship>;
  updateFriendshipStatus(id: number, status: string): Promise<Friendship | undefined>;
  
  // Notification Operations
  getUserNotifications(userId: number): Promise<Notification[]>;
  getUnreadNotificationsCount(userId: number): Promise<number>;
  createNotification(notification: InsertNotification): Promise<Notification>;
  markNotificationAsRead(id: number): Promise<Notification | undefined>;
  markAllNotificationsAsRead(userId: number): Promise<boolean>;
  
  // Message Operations
  getUserConversations(userId: number): Promise<Conversation[]>;
  getConversationMessages(conversationId: number): Promise<Message[]>;
  createConversation(participants: number[]): Promise<Conversation>;
  addUserToConversation(conversationId: number, userId: number): Promise<ConversationParticipant>;
  sendMessage(message: InsertMessage): Promise<Message>;
  markMessageAsRead(id: number): Promise<Message | undefined>;
  
  // User Settings Operations
  getUserSettings(userId: number): Promise<UserSettings | undefined>;
  updateUserSettings(userId: number, settings: Partial<UserSettings>): Promise<UserSettings | undefined>;
  
  // Story Operations
  getUserStories(userId: number): Promise<Story[]>;
  getFriendsStories(userId: number): Promise<Story[]>;
  createStory(story: InsertStory): Promise<Story>;
  
  // Event Operations
  getEvents(limit?: number, offset?: number): Promise<Event[]>;
  createEvent(event: InsertEvent): Promise<Event>;
  
  // Group Operations
  getGroups(limit?: number, offset?: number, category?: string): Promise<Group[]>;
  createGroup(group: InsertGroup): Promise<Group>;
}

export class MemStorage implements IStorage {
  private _users: Map<number, User>;
  private _posts: Map<number, Post>;
  private _comments: Map<number, Comment>;
  private _reactions: Map<number, Reaction>;
  private _friendships: Map<number, Friendship>;
  private _notifications: Map<number, Notification>;
  private _conversations: Map<number, Conversation>;
  private _conversationParticipants: Map<number, ConversationParticipant>;
  private _messages: Map<number, Message>;
  private _userSettings: Map<number, UserSettings>;
  private _stories: Map<number, Story>;
  private _events: Map<number, Event>;
  private _groups: Map<number, Group>;
  
  private nextIds: {
    users: number;
    posts: number;
    comments: number;
    reactions: number;
    friendships: number;
    notifications: number;
    conversations: number;
    conversationParticipants: number;
    messages: number;
    userSettings: number;
    stories: number;
    events: number;
    groups: number;
  };

  constructor() {
    this._users = new Map();
    this._posts = new Map();
    this._comments = new Map();
    this._reactions = new Map();
    this._friendships = new Map();
    this._notifications = new Map();
    this._conversations = new Map();
    this._conversationParticipants = new Map();
    this._messages = new Map();
    this._userSettings = new Map();
    this._stories = new Map();
    this._events = new Map();
    this._groups = new Map();
    
    this.nextIds = {
      users: 1,
      posts: 1,
      comments: 1,
      reactions: 1,
      friendships: 1,
      notifications: 1,
      conversations: 1,
      conversationParticipants: 1,
      messages: 1,
      userSettings: 1,
      stories: 1,
      events: 1,
      groups: 1
    };
    
    // Initialize with demo data
    this.initializeDemoData();
  }

  private initializeDemoData() {
    // Create demo users
    const demoUsers: InsertUser[] = [
      {
        username: "alexmorgan",
        password: "password123", // In a real app, this would be hashed
        displayName: "Alex Morgan",
        email: "alex.morgan@example.com",
        bio: "UX/UI Designer based in San Francisco. I create user-centered digital products that help people and make them smile.",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
        location: "San Francisco, California",
        website: "https://alexmorgan.design"
      },
      {
        username: "sarahjohnson",
        password: "password123",
        displayName: "Sarah Johnson",
        email: "sarah.johnson@example.com",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
      },
      {
        username: "mikewilliams",
        password: "password123",
        displayName: "Mike Williams",
        email: "mike.williams@example.com",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
      },
      {
        username: "davidchen",
        password: "password123",
        displayName: "David Chen",
        email: "david.chen@example.com",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
      },
      {
        username: "emmawilson",
        password: "password123",
        displayName: "Emma Wilson",
        email: "emma.wilson@example.com",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
      },
      {
        username: "jamalthomas",
        password: "password123",
        displayName: "Jamal Thomas",
        email: "jamal.thomas@example.com",
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
      }
    ];

    demoUsers.forEach(user => this.createUser(user));

    // Create demo posts
    const demoPosts: InsertPost[] = [
      {
        userId: 4, // David Chen
        content: "Just launched our new product dashboard! After months of work, it's finally live. Would love to hear your thoughts and feedback!",
        image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080",
        tags: ["ProductDesign", "UXDesign"],
      },
      {
        userId: 5, // Emma Wilson
        content: "Just finished this illustration for a client project. What do you think of the color palette? #Illustration #DigitalArt",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080",
      },
      {
        userId: 1, // Alex Morgan
        content: "Just finished working on the new design system for our client project. Really happy with how the components turned out! #DesignSystem #UI",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&h=800",
        tags: ["DesignSystem", "UI"],
      },
      {
        userId: 1, // Alex Morgan
        content: "Some inspiration for my next project. I love how these colors work together. What do you think?",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&h=800",
      }
    ];

    demoPosts.forEach(post => this.createPost(post));

    // Create demo comments
    const demoComments: InsertComment[] = [
      {
        postId: 1,
        userId: 2, // Sarah Johnson
        content: "This looks amazing! Love the color scheme and the layout. Is there a mobile version coming soon?"
      },
      {
        postId: 1,
        userId: 3, // Mike Williams
        content: "Great work David! The analytics section is exactly what I needed for my project."
      },
      {
        postId: 3,
        userId: 4, // David Chen
        content: "This looks amazing! Love the attention to detail in the components."
      },
      {
        postId: 4,
        userId: 5, // Emma Wilson
        content: "Beautiful color palette! I especially love the gradient transition."
      }
    ];

    demoComments.forEach(comment => this.createComment(comment));

    // Create demo reactions
    const demoReactions: InsertReaction[] = [
      { postId: 1, userId: 2, type: "like" },
      { postId: 1, userId: 3, type: "love" },
      { postId: 1, userId: 5, type: "wow" },
      { postId: 2, userId: 1, type: "love" },
      { postId: 2, userId: 4, type: "like" },
      { postId: 3, userId: 2, type: "like" },
      { postId: 3, userId: 4, type: "love" },
      { postId: 4, userId: 3, type: "like" },
      { postId: 4, userId: 4, type: "love" },
      { postId: 4, userId: 5, type: "wow" }
    ];

    demoReactions.forEach(reaction => this.createReaction(reaction));

    // Create demo friendships
    const demoFriendships: InsertFriendship[] = [
      { userId: 1, friendId: 2, status: "accepted" },
      { userId: 1, friendId: 3, status: "accepted" },
      { userId: 1, friendId: 4, status: "accepted" },
      { userId: 1, friendId: 5, status: "accepted" },
      { userId: 1, friendId: 6, status: "accepted" },
      { userId: 2, friendId: 3, status: "accepted" },
      { userId: 2, friendId: 4, status: "accepted" },
      { userId: 3, friendId: 4, status: "accepted" },
      { userId: 3, friendId: 5, status: "accepted" },
      { userId: 4, friendId: 5, status: "accepted" },
      { userId: 4, friendId: 6, status: "accepted" },
      { userId: 5, friendId: 6, status: "accepted" }
    ];

    demoFriendships.forEach(friendship => this.createFriendship(friendship));

    // Create demo notifications
    const demoNotifications: InsertNotification[] = [
      {
        userId: 1,
        triggeredBy: 2,
        type: "like",
        content: "liked your post about the new design system",
        link: "#",
        relatedImage: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
      },
      {
        userId: 1,
        triggeredBy: 3,
        type: "comment",
        content: "commented on your post: \"Great insight! I've been thinking about this as well...\"",
        link: "#"
      },
      {
        userId: 1,
        triggeredBy: 6,
        type: "friend",
        content: "accepted your friend request",
        link: "#"
      },
      {
        userId: 1,
        triggeredBy: 1, // System notification
        type: "event",
        content: "\"Web Design Trends 2023\" event is starting in 1 hour",
        link: "#"
      }
    ];

    demoNotifications.forEach(notification => this.createNotification(notification));

    // Create demo conversations and messages
    // Conversation between Alex and Sarah
    const conv1 = this.createConversation([1, 2]);
    
    // Add messages
    this.sendMessage({
      conversationId: conv1.id,
      userId: 2,
      content: "Hey Alex, how's it going?"
    });
    
    this.sendMessage({
      conversationId: conv1.id,
      userId: 1,
      content: "Hi Sarah! I'm doing well, just finishing up some work on the project. How about you?"
    });
    
    this.sendMessage({
      conversationId: conv1.id,
      userId: 2,
      content: "I'm good! I was wondering if you could help me with a design review tomorrow?"
    });
    
    this.sendMessage({
      conversationId: conv1.id,
      userId: 1,
      content: "Yes, I can help with the design review tomorrow!"
    });

    // Conversation between Alex and Mike
    const conv2 = this.createConversation([1, 3]);
    
    this.sendMessage({
      conversationId: conv2.id,
      userId: 3,
      content: "Alex, did you get a chance to look at those requirements?"
    });
    
    this.sendMessage({
      conversationId: conv2.id,
      userId: 1,
      content: "Not yet, I'll check them today. Anything specific I should focus on?"
    });
    
    this.sendMessage({
      conversationId: conv2.id,
      userId: 3,
      content: "Did you see the latest project requirements?"
    });

    // Create demo user settings
    const demoUserSettings: InsertUserSettings = {
      userId: 1,
      theme: "light",
      privacySettings: {
        profileVisibility: "public",
        activityStatus: true,
        friendRequests: "everyone",
        searchVisibility: true,
        tagApproval: true,
        twoFactorAuth: false,
        locationSharing: false
      },
      notificationSettings: {
        directMessages: true,
        friendRequests: true,
        mentions: true,
        comments: true,
        reactions: true,
        groupActivity: true,
        emailNotifications: false,
        pushNotifications: true
      },
      appearanceSettings: {
        theme: "light",
        contentDensity: "comfortable",
        animationsEnabled: true,
        highContrastMode: false,
        fontSizeAdjustment: "default"
      }
    };

    this.createUserSettings(demoUserSettings);

    // Create demo events
    const demoEvents: InsertEvent[] = [
      {
        title: "Web Design Trends 2023",
        description: "Join us for a discussion on the latest web design trends for 2023.",
        image: "https://images.unsplash.com/photo-1540304453618-4a25ddd5e752?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
        location: "Online",
        startDate: new Date("2023-06-15T15:00:00"),
        creatorId: 1
      },
      {
        title: "Tech Meetup: AI & Design",
        description: "Exploring the intersection of AI and design.",
        image: "https://images.unsplash.com/photo-1591115765373-5207764f72e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
        location: "San Francisco",
        startDate: new Date("2023-06-22T18:30:00"),
        creatorId: 4
      }
    ];

    demoEvents.forEach(event => this.createEvent(event));

    // Create demo groups
    const demoGroups: InsertGroup[] = [
      {
        name: "UX/UI Design Community",
        description: "A community for UX/UI designers to share work, get feedback, and discuss industry trends.",
        coverImage: "https://images.unsplash.com/photo-1541462608143-67571c6738dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
        category: "design",
        creatorId: 1
      },
      {
        name: "Frontend Developers Hub",
        description: "Connecting frontend developers worldwide. Share code, solve problems, and grow together.",
        coverImage: "https://images.unsplash.com/photo-1484417894907-623942c8ee29?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
        category: "technology",
        creatorId: 3
      }
    ];

    demoGroups.forEach(group => this.createGroup(group));
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this._users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this._users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(user: InsertUser): Promise<User> {
    const id = this.nextIds.users++;
    const timestamp = new Date();
    const newUser: User = {
      ...user,
      id,
      createdAt: timestamp,
      isOnline: false
    };
    this._users.set(id, newUser);
    return newUser;
  }

  async updateUser(id: number, data: Partial<User>): Promise<User | undefined> {
    const user = await this.getUser(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...data };
    this._users.set(id, updatedUser);
    return updatedUser;
  }

  async setUserOnlineStatus(id: number, isOnline: boolean): Promise<User | undefined> {
    return this.updateUser(id, { isOnline });
  }

  // Post methods
  async getPosts(limit: number = 20, offset: number = 0): Promise<Post[]> {
    return Array.from(this._posts.values())
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(offset, offset + limit);
  }

  async getUserPosts(userId: number): Promise<Post[]> {
    return Array.from(this._posts.values())
      .filter(post => post.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getPost(id: number): Promise<Post | undefined> {
    return this._posts.get(id);
  }

  async createPost(post: InsertPost): Promise<Post> {
    const id = this.nextIds.posts++;
    const timestamp = new Date();
    const newPost: Post = {
      ...post,
      id,
      createdAt: timestamp
    };
    this._posts.set(id, newPost);
    return newPost;
  }

  async updatePost(id: number, data: Partial<Post>): Promise<Post | undefined> {
    const post = await this.getPost(id);
    if (!post) return undefined;
    
    const updatedPost = { ...post, ...data };
    this._posts.set(id, updatedPost);
    return updatedPost;
  }

  async deletePost(id: number): Promise<boolean> {
    return this._posts.delete(id);
  }

  // Comment methods
  async getPostComments(postId: number): Promise<Comment[]> {
    return Array.from(this._comments.values())
      .filter(comment => comment.postId === postId)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  }

  async createComment(comment: InsertComment): Promise<Comment> {
    const id = this.nextIds.comments++;
    const timestamp = new Date();
    const newComment: Comment = {
      ...comment,
      id,
      createdAt: timestamp
    };
    this._comments.set(id, newComment);
    return newComment;
  }

  async deleteComment(id: number): Promise<boolean> {
    return this._comments.delete(id);
  }

  // Reaction methods
  async getPostReactions(postId: number): Promise<Reaction[]> {
    return Array.from(this._reactions.values())
      .filter(reaction => reaction.postId === postId);
  }

  async getUserReaction(postId: number, userId: number): Promise<Reaction | undefined> {
    return Array.from(this._reactions.values())
      .find(reaction => reaction.postId === postId && reaction.userId === userId);
  }

  async createReaction(reaction: InsertReaction): Promise<Reaction> {
    // Check if user already reacted to this post
    const existingReaction = await this.getUserReaction(reaction.postId, reaction.userId);
    
    if (existingReaction) {
      // If reaction type is the same, delete it (toggle off)
      if (existingReaction.type === reaction.type) {
        this._reactions.delete(existingReaction.id);
        return existingReaction;
      }
      
      // If different type, update it
      const updatedReaction = { ...existingReaction, type: reaction.type };
      this._reactions.set(existingReaction.id, updatedReaction);
      return updatedReaction;
    }
    
    // Create new reaction
    const id = this.nextIds.reactions++;
    const timestamp = new Date();
    const newReaction: Reaction = {
      ...reaction,
      id,
      createdAt: timestamp
    };
    this._reactions.set(id, newReaction);
    return newReaction;
  }

  async deleteReaction(id: number): Promise<boolean> {
    return this._reactions.delete(id);
  }

  // Friendship methods
  async getFriendships(userId: number, status?: string): Promise<Friendship[]> {
    return Array.from(this._friendships.values())
      .filter(friendship => 
        (friendship.userId === userId || friendship.friendId === userId) &&
        (status ? friendship.status === status : true)
      );
  }

  async getFriendship(userId: number, friendId: number): Promise<Friendship | undefined> {
    return Array.from(this._friendships.values())
      .find(friendship => 
        (friendship.userId === userId && friendship.friendId === friendId) ||
        (friendship.userId === friendId && friendship.friendId === userId)
      );
  }

  async createFriendship(friendship: InsertFriendship): Promise<Friendship> {
    const id = this.nextIds.friendships++;
    const timestamp = new Date();
    const newFriendship: Friendship = {
      ...friendship,
      id,
      createdAt: timestamp,
      updatedAt: timestamp
    };
    this._friendships.set(id, newFriendship);
    return newFriendship;
  }

  async updateFriendshipStatus(id: number, status: string): Promise<Friendship | undefined> {
    const friendship = this._friendships.get(id);
    if (!friendship) return undefined;
    
    const timestamp = new Date();
    const updatedFriendship = { ...friendship, status, updatedAt: timestamp };
    this._friendships.set(id, updatedFriendship);
    return updatedFriendship;
  }

  // Notification methods
  async getUserNotifications(userId: number): Promise<Notification[]> {
    return Array.from(this._notifications.values())
      .filter(notification => notification.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getUnreadNotificationsCount(userId: number): Promise<number> {
    return Array.from(this._notifications.values())
      .filter(notification => notification.userId === userId && !notification.isRead)
      .length;
  }

  async createNotification(notification: InsertNotification): Promise<Notification> {
    const id = this.nextIds.notifications++;
    const timestamp = new Date();
    const newNotification: Notification = {
      ...notification,
      id,
      isRead: false,
      createdAt: timestamp
    };
    this._notifications.set(id, newNotification);
    return newNotification;
  }

  async markNotificationAsRead(id: number): Promise<Notification | undefined> {
    const notification = this._notifications.get(id);
    if (!notification) return undefined;
    
    const updatedNotification = { ...notification, isRead: true };
    this._notifications.set(id, updatedNotification);
    return updatedNotification;
  }

  async markAllNotificationsAsRead(userId: number): Promise<boolean> {
    const userNotifications = await this.getUserNotifications(userId);
    userNotifications.forEach(notification => {
      this._notifications.set(notification.id, { ...notification, isRead: true });
    });
    return true;
  }

  // Message methods
  async getUserConversations(userId: number): Promise<Conversation[]> {
    // Get all conversation IDs where the user is a participant
    const participantEntries = Array.from(this._conversationParticipants.values())
      .filter(participant => participant.userId === userId)
      .map(participant => participant.conversationId);
    
    // Get the actual conversation objects
    const conversations = participantEntries
      .map(convId => this._conversations.get(convId))
      .filter(Boolean) as Conversation[];
    
    // Sort by last message timestamp (updatedAt)
    return conversations.sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  }

  async getConversationMessages(conversationId: number): Promise<Message[]> {
    return Array.from(this._messages.values())
      .filter(message => message.conversationId === conversationId)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  }

  async createConversation(participants: number[]): Promise<Conversation> {
    const id = this.nextIds.conversations++;
    const timestamp = new Date();
    const newConversation: Conversation = {
      id,
      createdAt: timestamp,
      updatedAt: timestamp
    };
    this._conversations.set(id, newConversation);
    
    // Add participants to the conversation
    participants.forEach(userId => {
      this.addUserToConversation(id, userId);
    });
    
    return newConversation;
  }

  async addUserToConversation(conversationId: number, userId: number): Promise<ConversationParticipant> {
    const id = this.nextIds.conversationParticipants++;
    const timestamp = new Date();
    const newParticipant: ConversationParticipant = {
      id,
      conversationId,
      userId,
      joinedAt: timestamp
    };
    this._conversationParticipants.set(id, newParticipant);
    return newParticipant;
  }

  async sendMessage(message: InsertMessage): Promise<Message> {
    const id = this.nextIds.messages++;
    const timestamp = new Date();
    const newMessage: Message = {
      ...message,
      id,
      isRead: false,
      createdAt: timestamp
    };
    this._messages.set(id, newMessage);
    
    // Update conversation's updatedAt timestamp
    const conversation = this._conversations.get(message.conversationId);
    if (conversation) {
      this._conversations.set(message.conversationId, {
        ...conversation,
        updatedAt: timestamp
      });
    }
    
    return newMessage;
  }

  async markMessageAsRead(id: number): Promise<Message | undefined> {
    const message = this._messages.get(id);
    if (!message) return undefined;
    
    const updatedMessage = { ...message, isRead: true };
    this._messages.set(id, updatedMessage);
    return updatedMessage;
  }

  // User Settings methods
  async getUserSettings(userId: number): Promise<UserSettings | undefined> {
    return Array.from(this._userSettings.values())
      .find(settings => settings.userId === userId);
  }

  async createUserSettings(settings: InsertUserSettings): Promise<UserSettings> {
    const id = this.nextIds.userSettings++;
    const timestamp = new Date();
    const newSettings: UserSettings = {
      ...settings,
      id,
      updatedAt: timestamp
    };
    this._userSettings.set(id, newSettings);
    return newSettings;
  }

  async updateUserSettings(userId: number, data: Partial<UserSettings>): Promise<UserSettings | undefined> {
    const settings = await this.getUserSettings(userId);
    if (!settings) return undefined;
    
    const timestamp = new Date();
    const updatedSettings = { 
      ...settings, 
      ...data,
      updatedAt: timestamp
    };
    this._userSettings.set(settings.id, updatedSettings);
    return updatedSettings;
  }

  // Story methods
  async getUserStories(userId: number): Promise<Story[]> {
    const now = new Date();
    return Array.from(this._stories.values())
      .filter(story => 
        story.userId === userId && 
        new Date(story.expiresAt) > now
      )
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getFriendsStories(userId: number): Promise<Story[]> {
    // Get user's friend IDs
    const friendships = await this.getFriendships(userId, "accepted");
    const friendIds = friendships.map(friendship => 
      friendship.userId === userId ? friendship.friendId : friendship.userId
    );
    
    // Get stories for all friends that haven't expired
    const now = new Date();
    return Array.from(this._stories.values())
      .filter(story => 
        friendIds.includes(story.userId) && 
        new Date(story.expiresAt) > now
      )
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async createStory(story: InsertStory): Promise<Story> {
    const id = this.nextIds.stories++;
    const timestamp = new Date();
    const newStory: Story = {
      ...story,
      id,
      createdAt: timestamp
    };
    this._stories.set(id, newStory);
    return newStory;
  }

  // Event methods
  async getEvents(limit: number = 20, offset: number = 0): Promise<Event[]> {
    return Array.from(this._events.values())
      .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
      .slice(offset, offset + limit);
  }

  async createEvent(event: InsertEvent): Promise<Event> {
    const id = this.nextIds.events++;
    const timestamp = new Date();
    const newEvent: Event = {
      ...event,
      id,
      createdAt: timestamp
    };
    this._events.set(id, newEvent);
    return newEvent;
  }

  // Group methods
  async getGroups(limit: number = 20, offset: number = 0, category?: string): Promise<Group[]> {
    let groups = Array.from(this._groups.values());
    
    if (category) {
      groups = groups.filter(group => group.category === category);
    }
    
    return groups
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(offset, offset + limit);
  }

  async createGroup(group: InsertGroup): Promise<Group> {
    const id = this.nextIds.groups++;
    const timestamp = new Date();
    const newGroup: Group = {
      ...group,
      id,
      createdAt: timestamp
    };
    this._groups.set(id, newGroup);
    return newGroup;
  }
}

// Use in-memory storage for development
export class MemStorage implements IStorage {
  private _users: Map<number, User>;
  private _posts: Map<number, Post>;
  private _comments: Map<number, Comment>;
  private _reactions: Map<number, Reaction>;
  private _friendships: Map<number, Friendship>;
  private _notifications: Map<number, Notification>;
  private _conversations: Map<number, Conversation>;
  private _conversationParticipants: Map<number, ConversationParticipant>;
  private _messages: Map<number, Message>;
  private _userSettings: Map<number, UserSettings>;
  private _stories: Map<number, Story>;
  private _events: Map<number, Event>;
  private _groups: Map<number, Group>;
  
  private nextIds: {
    users: number;
    posts: number;
    comments: number;
    reactions: number;
    friendships: number;
    notifications: number;
    conversations: number;
    conversationParticipants: number;
    messages: number;
    userSettings: number;
    stories: number;
    events: number;
    groups: number;
  };

  constructor() {
    this._users = new Map();
    this._posts = new Map();
    this._comments = new Map();
    this._reactions = new Map();
    this._friendships = new Map();
    this._notifications = new Map();
    this._conversations = new Map();
    this._conversationParticipants = new Map();
    this._messages = new Map();
    this._userSettings = new Map();
    this._stories = new Map();
    this._events = new Map();
    this._groups = new Map();
    
    this.nextIds = {
      users: 1,
      posts: 1,
      comments: 1,
      reactions: 1,
      friendships: 1,
      notifications: 1,
      conversations: 1,
      conversationParticipants: 1,
      messages: 1,
      userSettings: 1,
      stories: 1,
      events: 1,
      groups: 1
    };
    
    // Initialize with demo data
    this.initializeDemoData();
  }

  private initializeDemoData() {
    // Create demo users
    const demoUsers: InsertUser[] = [
      {
        username: "alexmorgan",
        password: "password123", // In a real app, this would be hashed
        displayName: "Alex Morgan",
        email: "alex.morgan@example.com",
        bio: "UX/UI Designer based in San Francisco. I create user-centered digital products that help people and make them smile.",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
        location: "San Francisco, California",
        website: "https://alexmorgan.design"
      },
      {
        username: "sarahjohnson",
        password: "password123",
        displayName: "Sarah Johnson",
        email: "sarah.johnson@example.com",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
      },
      {
        username: "mikewilliams",
        password: "password123",
        displayName: "Mike Williams",
        email: "mike.williams@example.com",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
      },
      {
        username: "davidchen",
        password: "password123",
        displayName: "David Chen",
        email: "david.chen@example.com",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
      },
      {
        username: "emmawilson",
        password: "password123",
        displayName: "Emma Wilson",
        email: "emma.wilson@example.com",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
      },
      {
        username: "jamalthomas",
        password: "password123",
        displayName: "Jamal Thomas",
        email: "jamal.thomas@example.com",
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
      }
    ];

    demoUsers.forEach(user => this.createUser(user));

    // Create demo posts
    const demoPosts: InsertPost[] = [
      {
        userId: 4, // David Chen
        content: "Just launched our new product dashboard! After months of work, it's finally live. Would love to hear your thoughts and feedback!",
        image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080",
        tags: ["ProductDesign", "UXDesign"],
      },
      {
        userId: 5, // Emma Wilson
        content: "Just finished this illustration for a client project. What do you think of the color palette? #Illustration #DigitalArt",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080",
      },
      {
        userId: 1, // Alex Morgan
        content: "Just finished working on the new design system for our client project. Really happy with how the components turned out! #DesignSystem #UI",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&h=800",
        tags: ["DesignSystem", "UI"],
      },
      {
        userId: 1, // Alex Morgan
        content: "Some inspiration for my next project. I love how these colors work together. What do you think?",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&h=800",
      }
    ];

    demoPosts.forEach(post => this.createPost(post));

    // Create demo comments
    const demoComments: InsertComment[] = [
      {
        postId: 1,
        userId: 2, // Sarah Johnson
        content: "This looks amazing! Love the color scheme and the layout. Is there a mobile version coming soon?"
      },
      {
        postId: 1,
        userId: 3, // Mike Williams
        content: "Great work David! The analytics section is exactly what I needed for my project."
      },
      {
        postId: 3,
        userId: 4, // David Chen
        content: "This looks amazing! Love the attention to detail in the components."
      },
      {
        postId: 4,
        userId: 5, // Emma Wilson
        content: "Beautiful color palette! I especially love the gradient transition."
      }
    ];

    demoComments.forEach(comment => this.createComment(comment));

    // Create demo reactions
    const demoReactions: InsertReaction[] = [
      { postId: 1, userId: 2, type: "like" },
      { postId: 1, userId: 3, type: "love" },
      { postId: 1, userId: 5, type: "wow" },
      { postId: 2, userId: 1, type: "love" },
      { postId: 2, userId: 4, type: "like" },
      { postId: 3, userId: 2, type: "like" },
      { postId: 3, userId: 4, type: "love" },
      { postId: 4, userId: 3, type: "like" },
      { postId: 4, userId: 4, type: "love" },
      { postId: 4, userId: 5, type: "wow" }
    ];

    demoReactions.forEach(reaction => this.createReaction(reaction));

    // Create demo friendships
    const demoFriendships: InsertFriendship[] = [
      { userId: 1, friendId: 2, status: "accepted" },
      { userId: 1, friendId: 3, status: "accepted" },
      { userId: 1, friendId: 4, status: "accepted" },
      { userId: 1, friendId: 5, status: "accepted" },
      { userId: 1, friendId: 6, status: "accepted" },
      { userId: 2, friendId: 3, status: "accepted" },
      { userId: 2, friendId: 4, status: "accepted" },
      { userId: 3, friendId: 4, status: "accepted" },
      { userId: 3, friendId: 5, status: "accepted" },
      { userId: 4, friendId: 5, status: "accepted" },
      { userId: 4, friendId: 6, status: "accepted" },
      { userId: 5, friendId: 6, status: "accepted" }
    ];

    demoFriendships.forEach(friendship => this.createFriendship(friendship));

    // Create demo notifications
    const demoNotifications: InsertNotification[] = [
      {
        userId: 1,
        triggeredBy: 2,
        type: "like",
        content: "liked your post about the new design system",
        link: "#",
        relatedImage: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
      },
      {
        userId: 1,
        triggeredBy: 3,
        type: "comment",
        content: "commented on your post: \"Great insight! I've been thinking about this as well...\"",
        link: "#"
      },
      {
        userId: 1,
        triggeredBy: 6,
        type: "friend",
        content: "accepted your friend request",
        link: "#"
      },
      {
        userId: 1,
        triggeredBy: 1, // System notification
        type: "event",
        content: "\"Web Design Trends 2023\" event is starting in 1 hour",
        link: "#"
      }
    ];

    demoNotifications.forEach(notification => this.createNotification(notification));

    // Create demo conversations and messages
    // Conversation between Alex and Sarah
    const conv1 = this.createConversation([1, 2]);
    
    // Add messages
    this.sendMessage({
      conversationId: conv1.id,
      userId: 2,
      content: "Hey Alex, how's it going?"
    });
    
    this.sendMessage({
      conversationId: conv1.id,
      userId: 1,
      content: "Hi Sarah! I'm doing well, just finishing up some work on the project. How about you?"
    });
    
    this.sendMessage({
      conversationId: conv1.id,
      userId: 2,
      content: "I'm good! I was wondering if you could help me with a design review tomorrow?"
    });
    
    this.sendMessage({
      conversationId: conv1.id,
      userId: 1,
      content: "Yes, I can help with the design review tomorrow!"
    });

    // Conversation between Alex and Mike
    const conv2 = this.createConversation([1, 3]);
    
    this.sendMessage({
      conversationId: conv2.id,
      userId: 3,
      content: "Alex, did you get a chance to look at those requirements?"
    });
    
    this.sendMessage({
      conversationId: conv2.id,
      userId: 1,
      content: "Not yet, I'll check them today. Anything specific I should focus on?"
    });
    
    this.sendMessage({
      conversationId: conv2.id,
      userId: 3,
      content: "Did you see the latest project requirements?"
    });

    // Create demo user settings
    const demoUserSettings: InsertUserSettings = {
      userId: 1,
      theme: "light",
      privacySettings: {
        profileVisibility: "public",
        activityStatus: true,
        friendRequests: "everyone",
        searchVisibility: true,
        tagApproval: true,
        twoFactorAuth: false,
        locationSharing: false
      },
      notificationSettings: {
        directMessages: true,
        friendRequests: true,
        mentions: true,
        comments: true,
        reactions: true,
        groupActivity: true,
        emailNotifications: false,
        pushNotifications: true
      },
      appearanceSettings: {
        theme: "light",
        contentDensity: "comfortable",
        animationsEnabled: true,
        highContrastMode: false,
        fontSizeAdjustment: "default"
      }
    };

    this.createUserSettings(demoUserSettings);

    // Create demo events
    const demoEvents: InsertEvent[] = [
      {
        title: "Web Design Trends 2023",
        description: "Join us for a discussion on the latest web design trends for 2023.",
        image: "https://images.unsplash.com/photo-1540304453618-4a25ddd5e752?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
        location: "Online",
        startDate: new Date("2023-06-15T15:00:00"),
        creatorId: 1
      },
      {
        title: "Tech Meetup: AI & Design",
        description: "Exploring the intersection of AI and design.",
        image: "https://images.unsplash.com/photo-1591115765373-5207764f72e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
        location: "San Francisco",
        startDate: new Date("2023-06-22T18:30:00"),
        creatorId: 4
      }
    ];

    demoEvents.forEach(event => this.createEvent(event));

    // Create demo groups
    const demoGroups: InsertGroup[] = [
      {
        name: "UX/UI Designers",
        description: "A community for UX/UI designers to share work, get feedback, and discuss industry trends.",
        coverImage: "https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
        category: "Design",
        creatorId: 1
      },
      {
        name: "JavaScript Developers",
        description: "Discuss JavaScript frameworks, libraries, and best practices.",
        coverImage: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
        category: "Development",
        creatorId: 3
      }
    ];

    demoGroups.forEach(group => this.createGroup(group));

    // Create demo stories
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);

    const demoStories: InsertStory[] = [
      {
        userId: 1,
        type: "image",
        content: "Working on a new project!",
        mediaUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=900",
        expiresAt: tomorrow
      },
      {
        userId: 2,
        type: "image",
        content: "Beautiful sunset today",
        mediaUrl: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=900",
        expiresAt: tomorrow
      }
    ];

    demoStories.forEach(story => this.createStory(story));
  }

  // User Operations
  async getUser(id: number): Promise<User | undefined> {
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(user: InsertUser): Promise<User> {
    const [newUser] = await db.insert(users).values(user).returning();
    return newUser;
  }

  async updateUser(id: number, data: Partial<User>): Promise<User | undefined> {
    const [updatedUser] = await db
      .update(users)
      .set({ ...data })
      .where(eq(users.id, id))
      .returning();
    return updatedUser;
  }

  async setUserOnlineStatus(id: number, isOnline: boolean): Promise<User | undefined> {
    return this.updateUser(id, { isOnline });
  }

  // Post Operations
  async getPosts(limit: number = 20, offset: number = 0): Promise<Post[]> {
    return db
      .select()
      .from(posts)
      .orderBy(desc(posts.createdAt))
      .limit(limit)
      .offset(offset);
  }

  async getUserPosts(userId: number): Promise<Post[]> {
    return db
      .select()
      .from(posts)
      .where(eq(posts.userId, userId))
      .orderBy(desc(posts.createdAt));
  }

  async getPost(id: number): Promise<Post | undefined> {
    const [post] = await db.select().from(posts).where(eq(posts.id, id));
    return post;
  }

  async createPost(post: InsertPost): Promise<Post> {
    const [newPost] = await db.insert(posts).values(post).returning();
    return newPost;
  }

  async updatePost(id: number, data: Partial<Post>): Promise<Post | undefined> {
    const [updatedPost] = await db
      .update(posts)
      .set(data)
      .where(eq(posts.id, id))
      .returning();
    return updatedPost;
  }

  async deletePost(id: number): Promise<boolean> {
    // Delete associated reactions first
    await db.delete(reactions).where(eq(reactions.postId, id));
    
    // Delete associated comments
    await db.delete(comments).where(eq(comments.postId, id));
    
    // Delete the post
    const result = await db.delete(posts).where(eq(posts.id, id)).returning();
    return result.length > 0;
  }

  // Comment Operations
  async getPostComments(postId: number): Promise<Comment[]> {
    return db
      .select()
      .from(comments)
      .where(eq(comments.postId, postId))
      .orderBy(comments.createdAt);
  }

  async createComment(comment: InsertComment): Promise<Comment> {
    const [newComment] = await db.insert(comments).values(comment).returning();
    return newComment;
  }

  async deleteComment(id: number): Promise<boolean> {
    const result = await db.delete(comments).where(eq(comments.id, id)).returning();
    return result.length > 0;
  }

  // Reaction Operations
  async getPostReactions(postId: number): Promise<Reaction[]> {
    return db.select().from(reactions).where(eq(reactions.postId, postId));
  }

  async getUserReaction(postId: number, userId: number): Promise<Reaction | undefined> {
    const [reaction] = await db
      .select()
      .from(reactions)
      .where(and(eq(reactions.postId, postId), eq(reactions.userId, userId)));
    return reaction;
  }

  async createReaction(reaction: InsertReaction): Promise<Reaction> {
    // Check if user already reacted to this post
    const existingReaction = await this.getUserReaction(reaction.postId, reaction.userId);
    
    if (existingReaction) {
      // If type is different, update it
      if (existingReaction.type !== reaction.type) {
        const [updatedReaction] = await db
          .update(reactions)
          .set({ type: reaction.type })
          .where(eq(reactions.id, existingReaction.id))
          .returning();
        return updatedReaction;
      }
      return existingReaction;
    }
    
    // Otherwise create new reaction
    const [newReaction] = await db.insert(reactions).values(reaction).returning();
    return newReaction;
  }

  async deleteReaction(id: number): Promise<boolean> {
    const result = await db.delete(reactions).where(eq(reactions.id, id)).returning();
    return result.length > 0;
  }

  // Friendship Operations
  async getFriendships(userId: number, status?: string): Promise<Friendship[]> {
    const query = db
      .select()
      .from(friendships)
      .where(or(eq(friendships.userId, userId), eq(friendships.friendId, userId)));
    
    if (status) {
      query.where(eq(friendships.status, status));
    }
    
    return query.orderBy(desc(friendships.updatedAt));
  }

  async getFriendship(userId: number, friendId: number): Promise<Friendship | undefined> {
    const [friendship] = await db
      .select()
      .from(friendships)
      .where(
        or(
          and(eq(friendships.userId, userId), eq(friendships.friendId, friendId)),
          and(eq(friendships.userId, friendId), eq(friendships.friendId, userId))
        )
      );
    return friendship;
  }

  async createFriendship(friendship: InsertFriendship): Promise<Friendship> {
    const [newFriendship] = await db.insert(friendships).values(friendship).returning();
    return newFriendship;
  }

  async updateFriendshipStatus(id: number, status: string): Promise<Friendship | undefined> {
    const [updatedFriendship] = await db
      .update(friendships)
      .set({ status, updatedAt: new Date() })
      .where(eq(friendships.id, id))
      .returning();
    return updatedFriendship;
  }

  // Notification Operations
  async getUserNotifications(userId: number): Promise<Notification[]> {
    return db
      .select()
      .from(notifications)
      .where(eq(notifications.userId, userId))
      .orderBy(desc(notifications.createdAt));
  }

  async getUnreadNotificationsCount(userId: number): Promise<number> {
    const result = await db
      .select({ count: sql<number>`count(*)` })
      .from(notifications)
      .where(and(eq(notifications.userId, userId), eq(notifications.isRead, false)));
    
    return result[0]?.count || 0;
  }

  async createNotification(notification: InsertNotification): Promise<Notification> {
    const [newNotification] = await db.insert(notifications).values(notification).returning();
    return newNotification;
  }

  async markNotificationAsRead(id: number): Promise<Notification | undefined> {
    const [updatedNotification] = await db
      .update(notifications)
      .set({ isRead: true })
      .where(eq(notifications.id, id))
      .returning();
    return updatedNotification;
  }

  async markAllNotificationsAsRead(userId: number): Promise<boolean> {
    const result = await db
      .update(notifications)
      .set({ isRead: true })
      .where(and(eq(notifications.userId, userId), eq(notifications.isRead, false)))
      .returning();
    return result.length > 0;
  }

  // Message Operations
  async getUserConversations(userId: number): Promise<any[]> {
    // First get all conversation participants for this user
    const userConversations = await db
      .select()
      .from(conversationParticipants)
      .where(eq(conversationParticipants.userId, userId));
    
    if (userConversations.length === 0) {
      return [];
    }
    
    const conversationIds = userConversations.map(uc => uc.conversationId);
    
    // For each conversation, get the most recent message and other participants
    const enhancedConversations = [];
    
    for (const convId of conversationIds) {
      // Get conversation
      const [conv] = await db
        .select()
        .from(conversations)
        .where(eq(conversations.id, convId));
      
      if (!conv) continue;
      
      // Get other participants
      const participants = await db
        .select({
          id: conversationParticipants.id,
          userId: conversationParticipants.userId,
          conversationId: conversationParticipants.conversationId,
          joinedAt: conversationParticipants.joinedAt
        })
        .from(conversationParticipants)
        .where(and(
          eq(conversationParticipants.conversationId, convId),
          sql`${conversationParticipants.userId} != ${userId}`
        ));
      
      // Get user info for each participant
      const enhancedParticipants = [];
      for (const p of participants) {
        const user = await this.getUser(p.userId);
        if (user) {
          enhancedParticipants.push({
            ...p,
            user: {
              id: user.id,
              username: user.username,
              displayName: user.displayName,
              avatar: user.avatar,
              isOnline: user.isOnline
            }
          });
        }
      }
      
      // Get most recent message
      const [latestMessage] = await db
        .select()
        .from(messages)
        .where(eq(messages.conversationId, convId))
        .orderBy(desc(messages.createdAt))
        .limit(1);
      
      // Count unread messages
      const unreadCount = await db
        .select({ count: sql<number>`count(*)` })
        .from(messages)
        .where(and(
          eq(messages.conversationId, convId),
          sql`${messages.userId} != ${userId}`,
          eq(messages.isRead, false)
        ));
      
      enhancedConversations.push({
        ...conv,
        participants: enhancedParticipants,
        latestMessage,
        unreadCount: unreadCount[0]?.count || 0
      });
    }
    
    // Sort by most recent message
    enhancedConversations.sort((a, b) => {
      if (!a.latestMessage) return 1;
      if (!b.latestMessage) return -1;
      return new Date(b.latestMessage.createdAt).getTime() - new Date(a.latestMessage.createdAt).getTime();
    });
    
    return enhancedConversations;
  }

  async getConversationMessages(conversationId: number): Promise<Message[]> {
    return db
      .select()
      .from(messages)
      .where(eq(messages.conversationId, conversationId))
      .orderBy(messages.createdAt);
  }

  async createConversation(participants: number[]): Promise<Conversation> {
    // Check if conversation between these participants already exists
    if (participants.length === 2) {
      const existingConversations = await this.getUserConversations(participants[0]);
      
      for (const conv of existingConversations) {
        if (conv.participants.length === 1 && conv.participants[0].userId === participants[1]) {
          return conv;
        }
      }
    }
    
    // Create new conversation
    const [newConversation] = await db
      .insert(conversations)
      .values({})
      .returning();
    
    // Add all participants
    for (const userId of participants) {
      await this.addUserToConversation(newConversation.id, userId);
    }
    
    return newConversation;
  }

  async addUserToConversation(conversationId: number, userId: number): Promise<ConversationParticipant> {
    const [participant] = await db
      .insert(conversationParticipants)
      .values({ conversationId, userId })
      .returning();
    return participant;
  }

  async sendMessage(message: InsertMessage): Promise<Message> {
    const [newMessage] = await db.insert(messages).values(message).returning();
    
    // Update conversation's updatedAt
    await db
      .update(conversations)
      .set({ updatedAt: new Date() })
      .where(eq(conversations.id, message.conversationId));
    
    return newMessage;
  }

  async markMessageAsRead(id: number): Promise<Message | undefined> {
    const [updatedMessage] = await db
      .update(messages)
      .set({ isRead: true })
      .where(eq(messages.id, id))
      .returning();
    return updatedMessage;
  }

  // User Settings Operations
  async getUserSettings(userId: number): Promise<UserSettings | undefined> {
    const [settings] = await db
      .select()
      .from(userSettings)
      .where(eq(userSettings.userId, userId));
    
    if (!settings) {
      // Create default settings if none exist
      return this.createUserSettings({
        userId,
        theme: "light",
        privacySettings: {
          profileVisibility: "public",
          activityStatus: true,
          friendRequests: "everyone",
          searchVisibility: true,
          tagApproval: true,
          twoFactorAuth: false,
          locationSharing: false
        },
        notificationSettings: {
          directMessages: true,
          friendRequests: true,
          mentions: true,
          comments: true,
          reactions: true,
          groupActivity: true,
          emailNotifications: false,
          pushNotifications: true
        },
        appearanceSettings: {
          theme: "light",
          contentDensity: "comfortable",
          animationsEnabled: true,
          highContrastMode: false,
          fontSizeAdjustment: "default"
        }
      });
    }
    
    return settings;
  }

  private async createUserSettings(settings: InsertUserSettings): Promise<UserSettings> {
    const [newSettings] = await db.insert(userSettings).values(settings).returning();
    return newSettings;
  }

  async updateUserSettings(userId: number, data: Partial<UserSettings>): Promise<UserSettings | undefined> {
    const settings = await this.getUserSettings(userId);
    
    if (!settings) {
      return undefined;
    }
    
    const [updatedSettings] = await db
      .update(userSettings)
      .set({
        ...data,
        updatedAt: new Date()
      })
      .where(eq(userSettings.userId, userId))
      .returning();
    
    return updatedSettings;
  }

  // Story Operations
  async getUserStories(userId: number): Promise<Story[]> {
    const now = new Date();
    return db
      .select()
      .from(stories)
      .where(and(
        eq(stories.userId, userId),
        sql`${stories.expiresAt} > ${now.toISOString()}`
      ))
      .orderBy(desc(stories.createdAt));
  }

  async getFriendsStories(userId: number): Promise<Story[]> {
    // Get all friends
    const friendships = await this.getFriendships(userId, 'accepted');
    
    if (friendships.length === 0) {
      return [];
    }
    
    // Extract friend IDs
    const friendIds = friendships.map(f => 
      f.userId === userId ? f.friendId : f.userId
    );
    
    // Get stories from all friends that haven't expired
    const now = new Date();
    const allStories = await db
      .select()
      .from(stories)
      .where(and(
        sql`${stories.userId} IN (${friendIds.join(', ')})`,
        sql`${stories.expiresAt} > ${now.toISOString()}`
      ))
      .orderBy(desc(stories.createdAt));
    
    return allStories;
  }

  async createStory(story: InsertStory): Promise<Story> {
    const [newStory] = await db.insert(stories).values(story).returning();
    return newStory;
  }

  // Event Operations
  async getEvents(limit: number = 20, offset: number = 0): Promise<Event[]> {
    return db
      .select()
      .from(events)
      .orderBy(events.startDate)
      .limit(limit)
      .offset(offset);
  }

  async createEvent(event: InsertEvent): Promise<Event> {
    const [newEvent] = await db.insert(events).values(event).returning();
    return newEvent;
  }

  // Group Operations
  async getGroups(limit: number = 20, offset: number = 0, category?: string): Promise<Group[]> {
    const query = db
      .select()
      .from(groups)
      .orderBy(groups.name);
    
    if (category) {
      query.where(eq(groups.category, category));
    }
    
    return query.limit(limit).offset(offset);
  }

  async createGroup(group: InsertGroup): Promise<Group> {
    const [newGroup] = await db.insert(groups).values(group).returning();
    return newGroup;
  }
}

// Use the DatabaseStorage implementation
export const storage = new DatabaseStorage();
