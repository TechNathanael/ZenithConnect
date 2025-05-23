import { useState } from "react";
import UserAvatar from "@/components/common/UserAvatar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Conversation = {
  id: number;
  user: {
    name: string;
    avatar: string;
    online: boolean;
  };
  lastMessage: {
    text: string;
    time: string;
    isUnread: boolean;
  };
};

type Message = {
  id: number;
  text: string;
  time: string;
  isFromMe: boolean;
  sender?: {
    name: string;
    avatar: string;
  };
};

const conversations: Conversation[] = [
  {
    id: 1,
    user: {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
      online: true
    },
    lastMessage: {
      text: "Yes, I can help with the design review tomorrow!",
      time: "5m",
      isUnread: true
    }
  },
  {
    id: 2,
    user: {
      name: "Mike Williams",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
      online: true
    },
    lastMessage: {
      text: "Did you see the latest project requirements?",
      time: "30m",
      isUnread: false
    }
  },
  {
    id: 3,
    user: {
      name: "David Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
      online: true
    },
    lastMessage: {
      text: "Let's catch up about the dashboard project",
      time: "1h",
      isUnread: false
    }
  },
  {
    id: 4,
    user: {
      name: "Emma Wilson",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
      online: true
    },
    lastMessage: {
      text: "I've sent the illustrations you requested",
      time: "3h",
      isUnread: false
    }
  },
  {
    id: 5,
    user: {
      name: "Jamal Thomas",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
      online: false
    },
    lastMessage: {
      text: "We need to finalize the project timeline",
      time: "1d",
      isUnread: false
    }
  }
];

const messages: Record<number, Message[]> = {
  1: [
    {
      id: 1,
      text: "Hey Alex, how's it going?",
      time: "10:15 AM",
      isFromMe: false,
      sender: {
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
      }
    },
    {
      id: 2,
      text: "Hi Sarah! I'm doing well, just finishing up some work on the project. How about you?",
      time: "10:18 AM",
      isFromMe: true
    },
    {
      id: 3,
      text: "I'm good! I was wondering if you could help me with a design review tomorrow?",
      time: "10:22 AM",
      isFromMe: false,
      sender: {
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
      }
    },
    {
      id: 4,
      text: "Yes, I can help with the design review tomorrow!",
      time: "10:25 AM",
      isFromMe: true
    }
  ],
  2: [
    {
      id: 1,
      text: "Alex, did you get a chance to look at those requirements?",
      time: "9:45 AM",
      isFromMe: false,
      sender: {
        name: "Mike Williams",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
      }
    },
    {
      id: 2,
      text: "Not yet, I'll check them today. Anything specific I should focus on?",
      time: "9:50 AM",
      isFromMe: true
    },
    {
      id: 3,
      text: "Did you see the latest project requirements?",
      time: "10:30 AM",
      isFromMe: false,
      sender: {
        name: "Mike Williams",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
      }
    }
  ]
};

export default function Messages() {
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(conversations[0]);
  const [newMessage, setNewMessage] = useState("");
  const [activeMessages, setActiveMessages] = useState<Message[]>(messages[conversations[0].id] || []);
  
  const handleConversationSelect = (conversation: Conversation) => {
    setActiveConversation(conversation);
    setActiveMessages(messages[conversation.id] || []);
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !activeConversation) return;
    
    const newMessageObj: Message = {
      id: activeMessages.length + 1,
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isFromMe: true
    };
    
    setActiveMessages([...activeMessages, newMessageObj]);
    setNewMessage("");
  };
  
  return (
    <div className="container mx-auto px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Messages</h1>
        
        <Card className="h-[calc(80vh-100px)] flex">
          {/* Conversations List */}
          <div className="w-1/3 border-r border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-icons text-gray-400 text-lg">search</span>
                </span>
                <input 
                  type="text" 
                  className="block w-full bg-gray-100 dark:bg-gray-700 border-0 rounded-full pl-10 pr-4 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-550 dark:focus:ring-teal-450" 
                  placeholder="Search messages..." 
                />
              </div>
            </div>
            
            <Tabs defaultValue="primary">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="primary">Primary</TabsTrigger>
                <TabsTrigger value="requests">Requests</TabsTrigger>
                <TabsTrigger value="archived">Archived</TabsTrigger>
              </TabsList>
              
              <TabsContent value="primary" className="m-0">
                <ScrollArea className="h-[calc(80vh-200px)]">
                  <div className="p-2 space-y-1">
                    {conversations.map(conversation => (
                      <div 
                        key={conversation.id}
                        className={`flex items-center p-3 rounded-lg cursor-pointer ${activeConversation?.id === conversation.id ? 'bg-indigo-50 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                        onClick={() => handleConversationSelect(conversation)}
                      >
                        <div className="relative">
                          <UserAvatar 
                            src={conversation.user.avatar}
                            alt={`${conversation.user.name}'s profile`}
                            size="md"
                          />
                          {conversation.user.online && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                          )}
                        </div>
                        <div className="ml-3 flex-grow min-w-0">
                          <div className="flex justify-between items-baseline">
                            <h3 className="font-medium truncate">{conversation.user.name}</h3>
                            <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-2">{conversation.lastMessage.time}</span>
                          </div>
                          <div className="flex items-center">
                            <p className={`text-sm truncate ${conversation.lastMessage.isUnread ? 'font-medium text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                              {conversation.lastMessage.text}
                            </p>
                            {conversation.lastMessage.isUnread && (
                              <div className="ml-2 w-2 h-2 bg-indigo-550 rounded-full"></div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
              <TabsContent value="requests" className="m-0 p-4 flex flex-col items-center justify-center h-[calc(80vh-200px)]">
                <div className="text-center">
                  <span className="material-icons text-gray-400 text-5xl mb-2">inbox</span>
                  <h3 className="text-lg font-medium mb-1">No Message Requests</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">When someone you're not connected with sends you a message, it will appear here.</p>
                </div>
              </TabsContent>
              <TabsContent value="archived" className="m-0 p-4 flex flex-col items-center justify-center h-[calc(80vh-200px)]">
                <div className="text-center">
                  <span className="material-icons text-gray-400 text-5xl mb-2">archive</span>
                  <h3 className="text-lg font-medium mb-1">No Archived Chats</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Conversations you archive will appear here.</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Chat Area */}
          <div className="w-2/3 flex flex-col">
            {activeConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                  <div className="flex items-center">
                    <UserAvatar 
                      src={activeConversation.user.avatar}
                      alt={`${activeConversation.user.name}'s profile`}
                      size="sm"
                    />
                    <div className="ml-3">
                      <h3 className="font-medium">{activeConversation.user.name}</h3>
                      <p className="text-xs text-green-500">{activeConversation.user.online ? 'Online' : 'Offline'}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                      <span className="material-icons text-gray-500">phone</span>
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                      <span className="material-icons text-gray-500">videocam</span>
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                      <span className="material-icons text-gray-500">info</span>
                    </button>
                  </div>
                </div>
                
                {/* Messages */}
                <ScrollArea className="flex-grow p-4">
                  <div className="space-y-4">
                    {activeMessages.map(message => (
                      <div 
                        key={message.id} 
                        className={`flex ${message.isFromMe ? 'justify-end' : 'justify-start'}`}
                      >
                        {!message.isFromMe && message.sender && (
                          <UserAvatar 
                            src={message.sender.avatar}
                            alt={`${message.sender.name}'s profile`}
                            size="xs"
                            className="mt-1 mr-2"
                          />
                        )}
                        <div>
                          <div 
                            className={`rounded-2xl px-4 py-2 max-w-xs ${
                              message.isFromMe 
                                ? 'bg-indigo-550 text-white' 
                                : 'bg-gray-100 dark:bg-gray-700'
                            }`}
                          >
                            <p className="text-sm">{message.text}</p>
                          </div>
                          <div className={`text-xs text-gray-500 mt-1 ${message.isFromMe ? 'text-right' : 'text-left'}`}>
                            {message.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                
                {/* Message Input */}
                <CardContent className="border-t border-gray-200 dark:border-gray-700 p-4">
                  <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                    <button type="button" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                      <span className="material-icons text-gray-500">add_circle</span>
                    </button>
                    <button type="button" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                      <span className="material-icons text-gray-500">image</span>
                    </button>
                    <button type="button" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                      <span className="material-icons text-gray-500">mic</span>
                    </button>
                    <Input 
                      type="text" 
                      placeholder="Type a message..." 
                      className="flex-grow"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button 
                      type="submit" 
                      className="p-2 rounded-full bg-indigo-550 hover:bg-indigo-600 text-white disabled:opacity-50"
                      disabled={!newMessage.trim()}
                    >
                      <span className="material-icons">send</span>
                    </button>
                  </form>
                </CardContent>
              </>
            ) : (
              <div className="flex-grow flex flex-col items-center justify-center p-4">
                <div className="text-center">
                  <span className="material-icons text-gray-400 text-5xl mb-4">forum</span>
                  <h3 className="text-xl font-medium mb-2">Your Messages</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">Select a conversation to start chatting.</p>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
