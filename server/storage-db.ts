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
import { IStorage } from "./storage";

// This is our implementation that uses the PostgreSQL database
export class DatabaseStorage implements IStorage {
  // User Operations
  async getUser(id: number): Promise<User | undefined> {
    const users = await db.select().from(users).where(eq(users.id, id));
    return users.length > 0 ? users[0] : undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const users = await db.select().from(users).where(eq(users.username, username));
    return users.length > 0 ? users[0] : undefined;
  }

  async createUser(user: InsertUser): Promise<User> {
    const newUser = await db.insert(users).values(user).returning();
    return newUser[0];
  }

  async updateUser(id: number, data: Partial<User>): Promise<User | undefined> {
    const updatedUser = await db
      .update(users)
      .set(data)
      .where(eq(users.id, id))
      .returning();
    return updatedUser.length > 0 ? updatedUser[0] : undefined;
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
    const results = await db.select().from(posts).where(eq(posts.id, id));
    return results.length > 0 ? results[0] : undefined;
  }

  async createPost(post: InsertPost): Promise<Post> {
    const newPost = await db.insert(posts).values(post).returning();
    return newPost[0];
  }

  async updatePost(id: number, data: Partial<Post>): Promise<Post | undefined> {
    const updatedPost = await db
      .update(posts)
      .set(data)
      .where(eq(posts.id, id))
      .returning();
    return updatedPost.length > 0 ? updatedPost[0] : undefined;
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
    const newComment = await db.insert(comments).values(comment).returning();
    return newComment[0];
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
    const reaction = await db
      .select()
      .from(reactions)
      .where(and(eq(reactions.postId, postId), eq(reactions.userId, userId)));
    return reaction.length > 0 ? reaction[0] : undefined;
  }

  async createReaction(reaction: InsertReaction): Promise<Reaction> {
    // Check if user already reacted to this post
    const existingReaction = await this.getUserReaction(reaction.postId, reaction.userId);
    
    if (existingReaction) {
      // If type is different, update it
      if (existingReaction.type !== reaction.type) {
        const updatedReaction = await db
          .update(reactions)
          .set({ type: reaction.type })
          .where(eq(reactions.id, existingReaction.id))
          .returning();
        return updatedReaction[0];
      }
      return existingReaction;
    }
    
    // Otherwise create new reaction
    const newReaction = await db.insert(reactions).values(reaction).returning();
    return newReaction[0];
  }

  async deleteReaction(id: number): Promise<boolean> {
    const result = await db.delete(reactions).where(eq(reactions.id, id)).returning();
    return result.length > 0;
  }

  // Friendship Operations
  async getFriendships(userId: number, status?: string): Promise<Friendship[]> {
    let query = db
      .select()
      .from(friendships)
      .where(or(eq(friendships.userId, userId), eq(friendships.friendId, userId)));
    
    if (status) {
      query = query.where(eq(friendships.status, status));
    }
    
    return query.orderBy(desc(friendships.updatedAt));
  }

  async getFriendship(userId: number, friendId: number): Promise<Friendship | undefined> {
    const friendship = await db
      .select()
      .from(friendships)
      .where(
        or(
          and(eq(friendships.userId, userId), eq(friendships.friendId, friendId)),
          and(eq(friendships.userId, friendId), eq(friendships.friendId, userId))
        )
      );
    return friendship.length > 0 ? friendship[0] : undefined;
  }

  async createFriendship(friendship: InsertFriendship): Promise<Friendship> {
    const newFriendship = await db.insert(friendships).values(friendship).returning();
    return newFriendship[0];
  }

  async updateFriendshipStatus(id: number, status: string): Promise<Friendship | undefined> {
    const updatedFriendship = await db
      .update(friendships)
      .set({ status, updatedAt: new Date() })
      .where(eq(friendships.id, id))
      .returning();
    return updatedFriendship.length > 0 ? updatedFriendship[0] : undefined;
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
    const newNotification = await db.insert(notifications).values(notification).returning();
    return newNotification[0];
  }

  async markNotificationAsRead(id: number): Promise<Notification | undefined> {
    const updatedNotification = await db
      .update(notifications)
      .set({ isRead: true })
      .where(eq(notifications.id, id))
      .returning();
    return updatedNotification.length > 0 ? updatedNotification[0] : undefined;
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
      const conv = await db
        .select()
        .from(conversations)
        .where(eq(conversations.id, convId));
      
      if (conv.length === 0) continue;
      
      // Get other participants
      const participants = await db
        .select()
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
      const latestMessages = await db
        .select()
        .from(messages)
        .where(eq(messages.conversationId, convId))
        .orderBy(desc(messages.createdAt))
        .limit(1);
      
      const latestMessage = latestMessages.length > 0 ? latestMessages[0] : null;
      
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
        ...conv[0],
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
    const newConversation = await db
      .insert(conversations)
      .values({})
      .returning();
    
    // Add all participants
    for (const userId of participants) {
      await this.addUserToConversation(newConversation[0].id, userId);
    }
    
    return newConversation[0];
  }

  async addUserToConversation(conversationId: number, userId: number): Promise<ConversationParticipant> {
    const participant = await db
      .insert(conversationParticipants)
      .values({ conversationId, userId })
      .returning();
    return participant[0];
  }

  async sendMessage(message: InsertMessage): Promise<Message> {
    const newMessage = await db.insert(messages).values(message).returning();
    
    // Update conversation's updatedAt
    await db
      .update(conversations)
      .set({ updatedAt: new Date() })
      .where(eq(conversations.id, message.conversationId));
    
    return newMessage[0];
  }

  async markMessageAsRead(id: number): Promise<Message | undefined> {
    const updatedMessage = await db
      .update(messages)
      .set({ isRead: true })
      .where(eq(messages.id, id))
      .returning();
    return updatedMessage.length > 0 ? updatedMessage[0] : undefined;
  }

  // User Settings Operations
  async getUserSettings(userId: number): Promise<UserSettings | undefined> {
    const settings = await db
      .select()
      .from(userSettings)
      .where(eq(userSettings.userId, userId));
    
    if (settings.length === 0) {
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
    
    return settings[0];
  }

  private async createUserSettings(settings: InsertUserSettings): Promise<UserSettings> {
    const newSettings = await db.insert(userSettings).values(settings).returning();
    return newSettings[0];
  }

  async updateUserSettings(userId: number, data: Partial<UserSettings>): Promise<UserSettings | undefined> {
    const settings = await this.getUserSettings(userId);
    
    if (!settings) {
      return undefined;
    }
    
    const updatedSettings = await db
      .update(userSettings)
      .set({
        ...data,
        updatedAt: new Date()
      })
      .where(eq(userSettings.userId, userId))
      .returning();
    
    return updatedSettings.length > 0 ? updatedSettings[0] : undefined;
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
    
    if (friendIds.length === 0) {
      return [];
    }
    
    // Get stories from all friends that haven't expired
    const now = new Date();
    
    // Convert friendIds array to a format suitable for SQL IN clause
    const friendIdsStr = friendIds.join(',');
    
    const allStories = await db
      .select()
      .from(stories)
      .where(and(
        sql`${stories.userId} IN (${friendIdsStr})`,
        sql`${stories.expiresAt} > ${now.toISOString()}`
      ))
      .orderBy(desc(stories.createdAt));
    
    return allStories;
  }

  async createStory(story: InsertStory): Promise<Story> {
    const newStory = await db.insert(stories).values(story).returning();
    return newStory[0];
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
    const newEvent = await db.insert(events).values(event).returning();
    return newEvent[0];
  }

  // Group Operations
  async getGroups(limit: number = 20, offset: number = 0, category?: string): Promise<Group[]> {
    let query = db
      .select()
      .from(groups);
    
    if (category) {
      query = query.where(eq(groups.category, category));
    }
    
    return query.orderBy(groups.name).limit(limit).offset(offset);
  }

  async createGroup(group: InsertGroup): Promise<Group> {
    const newGroup = await db.insert(groups).values(group).returning();
    return newGroup[0];
  }
}