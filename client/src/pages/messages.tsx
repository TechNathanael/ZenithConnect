import React, { useState, useEffect, useRef } from 'react';
import { Search, Phone, Video, Info, Send, Image, Smile, Paperclip, Mic } from 'lucide-react';

interface Message {
  id: number;
  content: string;
  senderId: number;
  timestamp: string;
  isRead: boolean;
}

interface Conversation {
  id: number;
  user: {
    id: number;
    name: string;
    avatar: string;
    isOnline: boolean;
    lastActive?: string;
  };
  lastMessage?: string;
  unreadCount: number;
  messages: Message[];
}

const Messages: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 1,
      user: {
        id: 2,
        name: 'Emma Wilson',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150',
        isOnline: true,
      },
      lastMessage: 'I just saw your new post! 😍',
      unreadCount: 2,
      messages: [
        { id: 1, content: 'Hey there!', senderId: 2, timestamp: '2025-05-22T10:30:00', isRead: true },
        { id: 2, content: 'I loved your latest post about the tech conference.', senderId: 2, timestamp: '2025-05-22T10:32:00', isRead: true },
        { id: 3, content: 'Thanks! It was an amazing experience.', senderId: 1, timestamp: '2025-05-22T10:35:00', isRead: true },
        { id: 4, content: 'Did you get to try out the new VR demos?', senderId: 2, timestamp: '2025-05-22T10:37:00', isRead: true },
        { id: 5, content: 'Yes! The AR presentation was incredible too!', senderId: 1, timestamp: '2025-05-22T10:40:00', isRead: true },
        { id: 6, content: 'I just saw your new post! 😍', senderId: 2, timestamp: '2025-05-23T09:15:00', isRead: false },
        { id: 7, content: 'We should collaborate on a project sometime!', senderId: 2, timestamp: '2025-05-23T09:16:00', isRead: false },
      ]
    },
    {
      id: 2,
      user: {
        id: 3,
        name: 'David Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150',
        isOnline: false,
        lastActive: '5m ago'
      },
      lastMessage: 'Are we still meeting tomorrow?',
      unreadCount: 0,
      messages: [
        { id: 1, content: 'Hey, are you free to discuss the project tomorrow?', senderId: 3, timestamp: '2025-05-22T15:10:00', isRead: true },
        { id: 2, content: 'Yes, what time works for you?', senderId: 1, timestamp: '2025-05-22T15:15:00', isRead: true },
        { id: 3, content: 'How about 2pm?', senderId: 3, timestamp: '2025-05-22T15:20:00', isRead: true },
        { id: 4, content: 'Sounds good to me!', senderId: 1, timestamp: '2025-05-22T15:25:00', isRead: true },
        { id: 5, content: 'Are we still meeting tomorrow?', senderId: 3, timestamp: '2025-05-23T08:30:00', isRead: true },
      ]
    },
    {
      id: 3,
      user: {
        id: 4,
        name: 'Sophia Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150',
        isOnline: true,
      },
      lastMessage: 'Check out this awesome design!',
      unreadCount: 1,
      messages: [
        { id: 1, content: 'Hi! I wanted to show you something.', senderId: 4, timestamp: '2025-05-22T17:45:00', isRead: true },
        { id: 2, content: 'Sure, what is it?', senderId: 1, timestamp: '2025-05-22T17:48:00', isRead: true },
        { id: 3, content: 'Check out this awesome design!', senderId: 4, timestamp: '2025-05-22T17:50:00', isRead: false },
      ]
    },
    {
      id: 4,
      user: {
        id: 5,
        name: 'James Thompson',
        avatar: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150',
        isOnline: false,
        lastActive: '2h ago'
      },
      lastMessage: 'Let me know when you get a chance to review the document I sent.',
      unreadCount: 0,
      messages: [
        { id: 1, content: 'I just sent you the document for review.', senderId: 5, timestamp: '2025-05-21T14:30:00', isRead: true },
        { id: 2, content: 'Let me know when you get a chance to review the document I sent.', senderId: 5, timestamp: '2025-05-22T09:15:00', isRead: true },
      ]
    },
    {
      id: 5,
      user: {
        id: 6,
        name: 'Olivia Parker',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150',
        isOnline: true,
      },
      lastMessage: 'Thanks for the help with the code issue!',
      unreadCount: 0,
      messages: [
        { id: 1, content: 'Hey, I\'m having trouble with this code snippet.', senderId: 6, timestamp: '2025-05-21T11:20:00', isRead: true },
        { id: 2, content: 'What seems to be the problem?', senderId: 1, timestamp: '2025-05-21T11:25:00', isRead: true },
        { id: 3, content: 'I\'m getting a weird error with the API call.', senderId: 6, timestamp: '2025-05-21T11:28:00', isRead: true },
        { id: 4, content: 'Try adding the authorization header.', senderId: 1, timestamp: '2025-05-21T11:30:00', isRead: true },
        { id: 5, content: 'Thanks for the help with the code issue!', senderId: 6, timestamp: '2025-05-21T11:45:00', isRead: true },
      ]
    }
  ]);
  
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [messageText, setMessageText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Set the first conversation as active by default
  useEffect(() => {
    if (conversations.length > 0 && !activeConversation) {
      setActiveConversation(conversations[0]);
      
      // Mark messages as read when conversation is opened
      const updatedConversations = [...conversations];
      updatedConversations[0].messages = updatedConversations[0].messages.map(msg => ({
        ...msg,
        isRead: true
      }));
      updatedConversations[0].unreadCount = 0;
      setConversations(updatedConversations);
    }
  }, [conversations]);
  
  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation]);
  
  const handleSendMessage = () => {
    if (!messageText.trim() || !activeConversation) return;
    
    const newMessage: Message = {
      id: Math.max(...activeConversation.messages.map(m => m.id)) + 1,
      content: messageText,
      senderId: 1, // Current user
      timestamp: new Date().toISOString(),
      isRead: true,
    };
    
    const updatedConversations = conversations.map(conv => {
      if (conv.id === activeConversation.id) {
        return {
          ...conv,
          messages: [...conv.messages, newMessage],
          lastMessage: messageText,
        };
      }
      return conv;
    });
    
    setConversations(updatedConversations);
    setMessageText('');
    
    // Update the active conversation
    const updatedActiveConversation = updatedConversations.find(c => c.id === activeConversation.id)!;
    setActiveConversation(updatedActiveConversation);
  };
  
  const handleSelectConversation = (conversation: Conversation) => {
    // Mark messages as read when conversation is opened
    const updatedConversations = conversations.map(conv => {
      if (conv.id === conversation.id) {
        return {
          ...conv,
          messages: conv.messages.map(msg => ({ ...msg, isRead: true })),
          unreadCount: 0,
        };
      }
      return conv;
    });
    
    setConversations(updatedConversations);
    
    // Set active conversation to the updated version
    const updatedConversation = updatedConversations.find(c => c.id === conversation.id)!;
    setActiveConversation(updatedConversation);
  };
  
  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex h-[calc(100vh-12rem)] rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Conversations List */}
        <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 flex flex-col bg-white dark:bg-gray-800">
          {/* Conversations Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Messages</h2>
            <div className="mt-2 relative">
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 rounded-full border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            </div>
          </div>
          
          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-4 flex items-center hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${
                  activeConversation?.id === conversation.id ? 'bg-gray-50 dark:bg-gray-700' : ''
                }`}
                onClick={() => handleSelectConversation(conversation)}
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img 
                      src={conversation.user.avatar} 
                      alt={conversation.user.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {conversation.user.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                  )}
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <p className="font-medium text-gray-900 dark:text-white truncate">{conversation.user.name}</p>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {conversation.user.isOnline ? 'Online' : conversation.user.lastActive}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{conversation.lastMessage}</p>
                    {conversation.unreadCount > 0 && (
                      <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-indigo-500 rounded-full">
                        {conversation.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Conversation Detail */}
        {activeConversation ? (
          <div className="w-2/3 flex flex-col bg-gray-50 dark:bg-gray-900">
            {/* Conversation Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex justify-between items-center">
              <div className="flex items-center">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img 
                      src={activeConversation.user.avatar} 
                      alt={activeConversation.user.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {activeConversation.user.isOnline && (
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                  )}
                </div>
                <div className="ml-3">
                  <p className="font-medium text-gray-900 dark:text-white">{activeConversation.user.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {activeConversation.user.isOnline ? 'Online' : `Last active ${activeConversation.user.lastActive}`}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Phone className="h-5 w-5" />
                </button>
                <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Video className="h-5 w-5" />
                </button>
                <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Info className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            {/* Message List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {activeConversation.messages.map((message) => (
                <div key={message.id} className={`flex ${message.senderId === 1 ? 'justify-end' : 'justify-start'}`}>
                  {message.senderId !== 1 && (
                    <div className="w-8 h-8 rounded-full overflow-hidden mr-2 flex-shrink-0">
                      <img 
                        src={activeConversation.user.avatar} 
                        alt={activeConversation.user.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div 
                    className={`max-w-[70%] px-4 py-2 rounded-lg ${
                      message.senderId === 1 
                        ? 'bg-indigo-500 text-white' 
                        : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <div className={`text-xs mt-1 ${message.senderId === 1 ? 'text-indigo-200' : 'text-gray-500 dark:text-gray-400'}`}>
                      {formatMessageTime(message.timestamp)}
                      {message.senderId === 1 && (
                        <span className="ml-1">
                          {message.isRead ? '• Read' : '• Sent'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <div className="flex items-end">
                <div className="flex space-x-2 mr-3">
                  <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Paperclip className="h-5 w-5" />
                  </button>
                  <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Image className="h-5 w-5" />
                  </button>
                  <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Smile className="h-5 w-5" />
                  </button>
                </div>
                <div className="flex-1 relative">
                  <textarea
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Type a message..."
                    className="w-full pr-10 pl-4 py-3 text-sm bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-teal-400 resize-none max-h-32"
                    rows={1}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <div className="absolute right-3 bottom-3">
                    <button className="p-1 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                      <Mic className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!messageText.trim()}
                  className="ml-3 p-3 rounded-full bg-indigo-500 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-600"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-2/3 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="text-center">
              <p className="text-gray-500 dark:text-gray-400">Select a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;