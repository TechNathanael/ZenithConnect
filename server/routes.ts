import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertPostSchema, insertCommentSchema, insertReactionSchema, insertUserSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);
  
  console.log('Starting ZenithHub server...');
  
  // Authentication Routes
  app.post('/api/auth/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
      }
      
      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) {  // In a real app, use bcrypt to compare hashed passwords
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      // In a real app, use JWT or session for authentication
      // For simplicity, we'll just set user as logged in and return user data
      await storage.setUserOnlineStatus(user.id, true);
      
      // Send back user data without password
      const { password: _, ...userWithoutPassword } = user;
      return res.status(200).json(userWithoutPassword);
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  app.post('/api/auth/register', async (req, res) => {
    try {
      const userSchema = insertUserSchema.extend({
        confirmPassword: z.string()
      }).refine(data => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
      });
      
      const result = userSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          message: 'Validation error', 
          errors: result.error.format() 
        });
      }
      
      const { confirmPassword, ...userData } = result.data;
      
      // Check if username or email already exists
      const existingUser = await storage.getUserByUsername(userData.username);
      if (existingUser) {
        return res.status(409).json({ message: 'Username already taken' });
      }
      
      // Create user
      const newUser = await storage.createUser(userData);
      
      // Send back user data without password
      const { password, ...userWithoutPassword } = newUser;
      return res.status(201).json(userWithoutPassword);
    } catch (error) {
      console.error('Registration error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  app.post('/api/auth/logout', async (req, res) => {
    try {
      const userId = req.body.userId;
      
      if (userId) {
        await storage.setUserOnlineStatus(userId, false);
      }
      
      return res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
      console.error('Logout error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  // Post Routes
  app.get('/api/posts', async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 20;
      const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;
      
      const posts = await storage.getPosts(limit, offset);
      
      // Enhance posts with author info, comments count, and reactions
      const enhancedPosts = await Promise.all(posts.map(async (post) => {
        const author = await storage.getUser(post.userId);
        const comments = await storage.getPostComments(post.id);
        const reactions = await storage.getPostReactions(post.id);
        
        // Group reactions by type
        const reactionTypes = Array.from(new Set(reactions.map(r => r.type)));
        
        return {
          ...post,
          author: author ? {
            id: author.id,
            username: author.username,
            displayName: author.displayName,
            avatar: author.avatar,
          } : undefined,
          commentsCount: comments.length,
          reactions: {
            count: reactions.length,
            types: reactionTypes
          }
        };
      }));
      
      return res.status(200).json(enhancedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  app.get('/api/posts/:id', async (req, res) => {
    try {
      const postId = parseInt(req.params.id);
      const post = await storage.getPost(postId);
      
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      
      const author = await storage.getUser(post.userId);
      const comments = await storage.getPostComments(post.id);
      const reactions = await storage.getPostReactions(post.id);
      const reactionTypes = Array.from(new Set(reactions.map(r => r.type)));
      
      // Get enhanced comments with author info
      const enhancedComments = await Promise.all(comments.map(async (comment) => {
        const commentAuthor = await storage.getUser(comment.userId);
        return {
          ...comment,
          author: commentAuthor ? {
            id: commentAuthor.id,
            username: commentAuthor.username,
            displayName: commentAuthor.displayName,
            avatar: commentAuthor.avatar,
          } : undefined
        };
      }));
      
      const enhancedPost = {
        ...post,
        author: author ? {
          id: author.id,
          username: author.username,
          displayName: author.displayName,
          avatar: author.avatar,
        } : undefined,
        comments: enhancedComments,
        reactions: {
          count: reactions.length,
          types: reactionTypes
        }
      };
      
      return res.status(200).json(enhancedPost);
    } catch (error) {
      console.error('Error fetching post:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  app.post('/api/posts', async (req, res) => {
    try {
      const result = insertPostSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          message: 'Validation error', 
          errors: result.error.format() 
        });
      }
      
      const newPost = await storage.createPost(result.data);
      
      return res.status(201).json(newPost);
    } catch (error) {
      console.error('Error creating post:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  app.get('/api/users/:userId/posts', async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      const posts = await storage.getUserPosts(userId);
      
      // Enhance posts with author info, comments count, and reactions
      const enhancedPosts = await Promise.all(posts.map(async (post) => {
        const comments = await storage.getPostComments(post.id);
        const reactions = await storage.getPostReactions(post.id);
        const reactionTypes = Array.from(new Set(reactions.map(r => r.type)));
        
        return {
          ...post,
          author: {
            id: user.id,
            username: user.username,
            displayName: user.displayName,
            avatar: user.avatar,
          },
          commentsCount: comments.length,
          reactions: {
            count: reactions.length,
            types: reactionTypes
          }
        };
      }));
      
      return res.status(200).json(enhancedPosts);
    } catch (error) {
      console.error('Error fetching user posts:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  // Comment Routes
  app.get('/api/posts/:postId/comments', async (req, res) => {
    try {
      const postId = parseInt(req.params.postId);
      const post = await storage.getPost(postId);
      
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      
      const comments = await storage.getPostComments(postId);
      
      // Enhance comments with author info
      const enhancedComments = await Promise.all(comments.map(async (comment) => {
        const author = await storage.getUser(comment.userId);
        return {
          ...comment,
          author: author ? {
            id: author.id,
            username: author.username,
            displayName: author.displayName,
            avatar: author.avatar,
          } : undefined
        };
      }));
      
      return res.status(200).json(enhancedComments);
    } catch (error) {
      console.error('Error fetching comments:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  app.post('/api/posts/:postId/comments', async (req, res) => {
    try {
      const postId = parseInt(req.params.postId);
      const post = await storage.getPost(postId);
      
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      
      const commentData = {
        ...req.body,
        postId
      };
      
      const result = insertCommentSchema.safeParse(commentData);
      
      if (!result.success) {
        return res.status(400).json({ 
          message: 'Validation error', 
          errors: result.error.format() 
        });
      }
      
      const newComment = await storage.createComment(result.data);
      
      // Get author info for the response
      const author = await storage.getUser(newComment.userId);
      const enhancedComment = {
        ...newComment,
        author: author ? {
          id: author.id,
          username: author.username,
          displayName: author.displayName,
          avatar: author.avatar,
        } : undefined
      };
      
      // Create notification for post owner if commenter is not the post owner
      if (post.userId !== newComment.userId) {
        const commenter = await storage.getUser(newComment.userId);
        if (commenter) {
          await storage.createNotification({
            userId: post.userId,
            triggeredBy: newComment.userId,
            type: 'comment',
            content: `commented on your post: "${newComment.content.substring(0, 50)}${newComment.content.length > 50 ? '...' : ''}"`,
            link: `/posts/${post.id}`
          });
        }
      }
      
      return res.status(201).json(enhancedComment);
    } catch (error) {
      console.error('Error creating comment:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  // Reaction Routes
  app.post('/api/posts/:postId/reactions', async (req, res) => {
    try {
      const postId = parseInt(req.params.postId);
      const post = await storage.getPost(postId);
      
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      
      const reactionData = {
        ...req.body,
        postId
      };
      
      const result = insertReactionSchema.safeParse(reactionData);
      
      if (!result.success) {
        return res.status(400).json({ 
          message: 'Validation error', 
          errors: result.error.format() 
        });
      }
      
      const reaction = await storage.createReaction(result.data);
      
      // Create notification for post owner if reactor is not the post owner
      if (post.userId !== reaction.userId) {
        const reactor = await storage.getUser(reaction.userId);
        if (reactor) {
          await storage.createNotification({
            userId: post.userId,
            triggeredBy: reaction.userId,
            type: 'like',
            content: `${reaction.type}d your post`,
            link: `/posts/${post.id}`
          });
        }
      }
      
      // Get updated reactions for the post
      const reactions = await storage.getPostReactions(postId);
      const reactionTypes = Array.from(new Set(reactions.map(r => r.type)));
      
      return res.status(200).json({
        reaction,
        totalReactions: reactions.length,
        types: reactionTypes
      });
    } catch (error) {
      console.error('Error handling reaction:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  // User Routes
  app.get('/api/users/:username', async (req, res) => {
    try {
      const username = req.params.username;
      const user = await storage.getUserByUsername(username);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      // Don't send the password back
      const { password, ...userWithoutPassword } = user;
      
      return res.status(200).json(userWithoutPassword);
    } catch (error) {
      console.error('Error fetching user:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  app.patch('/api/users/profile', async (req, res) => {
    try {
      const userId = req.body.id;
      
      if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
      }
      
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      // Remove fields that shouldn't be updated
      const { id, password, isOnline, createdAt, ...updateData } = req.body;
      
      const updatedUser = await storage.updateUser(userId, updateData);
      
      if (!updatedUser) {
        return res.status(404).json({ message: 'Failed to update user' });
      }
      
      // Don't send the password back
      const { password: _, ...userWithoutPassword } = updatedUser;
      
      return res.status(200).json(userWithoutPassword);
    } catch (error) {
      console.error('Error updating user profile:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  // Notification Routes
  app.get('/api/notifications', async (req, res) => {
    try {
      const userId = req.query.userId ? parseInt(req.query.userId as string) : 0;
      
      if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
      }
      
      const notifications = await storage.getUserNotifications(userId);
      
      // Enhance notifications with triggeredBy user info
      const enhancedNotifications = await Promise.all(notifications.map(async (notification) => {
        const triggeredByUser = await storage.getUser(notification.triggeredBy);
        return {
          ...notification,
          triggeredByUser: triggeredByUser ? {
            id: triggeredByUser.id,
            username: triggeredByUser.username,
            displayName: triggeredByUser.displayName,
            avatar: triggeredByUser.avatar,
          } : undefined
        };
      }));
      
      return res.status(200).json(enhancedNotifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  app.get('/api/notifications/unread/count', async (req, res) => {
    try {
      const userId = req.query.userId ? parseInt(req.query.userId as string) : 0;
      
      if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
      }
      
      const count = await storage.getUnreadNotificationsCount(userId);
      
      return res.status(200).json({ count });
    } catch (error) {
      console.error('Error fetching unread notifications count:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  app.patch('/api/notifications/:id/read', async (req, res) => {
    try {
      const notificationId = parseInt(req.params.id);
      
      const notification = await storage.markNotificationAsRead(notificationId);
      
      if (!notification) {
        return res.status(404).json({ message: 'Notification not found' });
      }
      
      return res.status(200).json(notification);
    } catch (error) {
      console.error('Error marking notification as read:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  app.patch('/api/notifications/read-all', async (req, res) => {
    try {
      const userId = req.body.userId;
      
      if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
      }
      
      const result = await storage.markAllNotificationsAsRead(userId);
      
      return res.status(200).json({ success: result });
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  // Friendship Routes
  app.get('/api/friends', async (req, res) => {
    try {
      const userId = req.query.userId ? parseInt(req.query.userId as string) : 0;
      const status = req.query.status as string || 'accepted';
      
      if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
      }
      
      const friendships = await storage.getFriendships(userId, status);
      
      // Enhance friendships with friend info
      const enhancedFriendships = await Promise.all(friendships.map(async (friendship) => {
        const friendId = friendship.userId === userId ? friendship.friendId : friendship.userId;
        const friend = await storage.getUser(friendId);
        return {
          ...friendship,
          friend: friend ? {
            id: friend.id,
            username: friend.username,
            displayName: friend.displayName,
            avatar: friend.avatar,
            isOnline: friend.isOnline
          } : undefined
        };
      }));
      
      return res.status(200).json(enhancedFriendships);
    } catch (error) {
      console.error('Error fetching friendships:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  app.post('/api/friends/request', async (req, res) => {
    try {
      const { userId, friendId } = req.body;
      
      if (!userId || !friendId) {
        return res.status(400).json({ message: 'User ID and Friend ID are required' });
      }
      
      // Check if users exist
      const user = await storage.getUser(userId);
      const friend = await storage.getUser(friendId);
      
      if (!user || !friend) {
        return res.status(404).json({ message: 'User or friend not found' });
      }
      
      // Check if friendship already exists
      const existingFriendship = await storage.getFriendship(userId, friendId);
      
      if (existingFriendship) {
        return res.status(409).json({ 
          message: 'Friendship already exists', 
          status: existingFriendship.status 
        });
      }
      
      // Create friendship request
      const friendship = await storage.createFriendship({
        userId,
        friendId,
        status: 'pending'
      });
      
      // Create notification for friend
      await storage.createNotification({
        userId: friendId,
        triggeredBy: userId,
        type: 'friend',
        content: 'sent you a friend request',
        link: `/profile/${user.username}`
      });
      
      return res.status(201).json(friendship);
    } catch (error) {
      console.error('Error creating friend request:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  app.patch('/api/friends/:id/status', async (req, res) => {
    try {
      const friendshipId = parseInt(req.params.id);
      const { status, userId } = req.body;
      
      if (!status || !userId) {
        return res.status(400).json({ message: 'Status and User ID are required' });
      }
      
      const friendship = await storage.updateFriendshipStatus(friendshipId, status);
      
      if (!friendship) {
        return res.status(404).json({ message: 'Friendship not found' });
      }
      
      // If accepted, create notification for the requester
      if (status === 'accepted' && friendship.userId !== userId) {
        const user = await storage.getUser(userId);
        if (user) {
          await storage.createNotification({
            userId: friendship.userId,
            triggeredBy: userId,
            type: 'friend',
            content: 'accepted your friend request',
            link: `/profile/${user.username}`
          });
        }
      }
      
      return res.status(200).json(friendship);
    } catch (error) {
      console.error('Error updating friendship status:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  // Messages Routes
  app.get('/api/conversations', async (req, res) => {
    try {
      const userId = req.query.userId ? parseInt(req.query.userId as string) : 0;
      
      if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
      }
      
      const conversations = await storage.getUserConversations(userId);
      
      return res.status(200).json(conversations);
    } catch (error) {
      console.error('Error fetching conversations:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  app.get('/api/conversations/:id/messages', async (req, res) => {
    try {
      const conversationId = parseInt(req.params.id);
      
      const messages = await storage.getConversationMessages(conversationId);
      
      // Mark messages as read
      await Promise.all(messages.map(async (message) => {
        if (!message.isRead && message.userId !== parseInt(req.query.userId as string)) {
          await storage.markMessageAsRead(message.id);
        }
      }));
      
      // Re-fetch messages to get updated read status
      const updatedMessages = await storage.getConversationMessages(conversationId);
      
      return res.status(200).json(updatedMessages);
    } catch (error) {
      console.error('Error fetching conversation messages:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  app.post('/api/conversations', async (req, res) => {
    try {
      const { participants } = req.body;
      
      if (!participants || !Array.isArray(participants) || participants.length < 2) {
        return res.status(400).json({ message: 'At least two participants are required' });
      }
      
      const conversation = await storage.createConversation(participants);
      
      return res.status(201).json(conversation);
    } catch (error) {
      console.error('Error creating conversation:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  app.post('/api/messages', async (req, res) => {
    try {
      const messageData = req.body;
      
      const message = await storage.sendMessage(messageData);
      
      return res.status(201).json(message);
    } catch (error) {
      console.error('Error sending message:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  // User Settings Routes
  app.get('/api/users/:userId/settings', async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      
      const settings = await storage.getUserSettings(userId);
      
      if (!settings) {
        return res.status(404).json({ message: 'Settings not found' });
      }
      
      return res.status(200).json(settings);
    } catch (error) {
      console.error('Error fetching user settings:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  app.patch('/api/users/:userId/settings', async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const settingsData = req.body;
      
      const updatedSettings = await storage.updateUserSettings(userId, settingsData);
      
      if (!updatedSettings) {
        return res.status(404).json({ message: 'Settings not found' });
      }
      
      return res.status(200).json(updatedSettings);
    } catch (error) {
      console.error('Error updating user settings:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  return httpServer;
}