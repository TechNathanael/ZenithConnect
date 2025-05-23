import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserAvatar from "@/components/common/UserAvatar";
import { Button } from "@/components/ui/button";

type Notification = {
  id: number;
  type: "like" | "comment" | "friend" | "mention" | "tag" | "event";
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  time: string;
  isRead: boolean;
  actionLink?: string;
  relatedImage?: string;
};

const notifications: Notification[] = [
  {
    id: 1,
    type: "like",
    user: {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
    },
    content: "liked your post about the new design system",
    time: "5 minutes ago",
    isRead: false,
    actionLink: "#",
    relatedImage: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
  },
  {
    id: 2,
    type: "comment",
    user: {
      name: "Mike Williams",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
    },
    content: "commented on your post: \"Great insight! I've been thinking about this as well...\"",
    time: "32 minutes ago",
    isRead: false,
    actionLink: "#"
  },
  {
    id: 3,
    type: "friend",
    user: {
      name: "Jordan Lee",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
    },
    content: "accepted your friend request",
    time: "1 hour ago",
    isRead: true,
    actionLink: "#"
  },
  {
    id: 4,
    type: "event",
    user: {
      name: "ZenithHub",
      avatar: ""
    },
    content: "\"Web Design Trends 2023\" event is starting in 1 hour",
    time: "2 hours ago",
    isRead: true,
    actionLink: "#"
  },
  {
    id: 5,
    type: "tag",
    user: {
      name: "Emma Wilson",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
    },
    content: "tagged you in a photo",
    time: "Yesterday",
    isRead: true,
    actionLink: "#",
    relatedImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
  },
  {
    id: 6,
    type: "mention",
    user: {
      name: "David Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
    },
    content: "mentioned you in a comment: \"I think @alexmorgan would have some great insights on this.\"",
    time: "2 days ago",
    isRead: true,
    actionLink: "#"
  }
];

export default function Notifications() {
  const [activeTab, setActiveTab] = useState("all");
  const [notificationsList, setNotificationsList] = useState(notifications);
  
  // Filter notifications based on active tab
  const filteredNotifications = activeTab === "all" 
    ? notificationsList 
    : activeTab === "unread" 
      ? notificationsList.filter(n => !n.isRead)
      : notificationsList.filter(n => n.type === activeTab);
  
  const unreadCount = notificationsList.filter(n => !n.isRead).length;
  
  const markAllAsRead = () => {
    setNotificationsList(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };
  
  const markAsRead = (id: number) => {
    setNotificationsList(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true } 
          : notification
      )
    );
  };
  
  // Get notification icon based on type
  const getNotificationIcon = (type: string) => {
    switch(type) {
      case "like": return "favorite";
      case "comment": return "chat_bubble";
      case "friend": return "person_add";
      case "mention": return "alternate_email";
      case "tag": return "local_offer";
      case "event": return "event";
      default: return "notifications";
    }
  };
  
  // Get notification icon color based on type
  const getNotificationIconColor = (type: string) => {
    switch(type) {
      case "like": return "text-red-500";
      case "comment": return "text-blue-500";
      case "friend": return "text-green-500";
      case "mention": return "text-indigo-550";
      case "tag": return "text-purple-500";
      case "event": return "text-amber-500";
      default: return "text-gray-500";
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Notifications</h1>
          {unreadCount > 0 && (
            <Button variant="ghost" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>
        
        <Tabs defaultValue="all" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6 mb-6">
            <TabsTrigger value="all">
              All
              {unreadCount > 0 && (
                <span className="ml-1.5 bg-indigo-550 text-white text-xs rounded-full px-1.5 py-0.5">
                  {unreadCount}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="like">Likes</TabsTrigger>
            <TabsTrigger value="comment">Comments</TabsTrigger>
            <TabsTrigger value="friend">Friends</TabsTrigger>
            <TabsTrigger value="event">Events</TabsTrigger>
          </TabsList>
          
          <Card>
            <CardContent className="p-0">
              {filteredNotifications.length > 0 ? (
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredNotifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-4 flex ${!notification.isRead ? 'bg-indigo-50 dark:bg-indigo-900/10' : ''}`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="mr-4">
                        {notification.type === "event" ? (
                          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r from-indigo-550 to-teal-450 text-white">
                            <span className="material-icons">event</span>
                          </div>
                        ) : (
                          <UserAvatar 
                            src={notification.user.avatar}
                            alt={`${notification.user.name}'s profile`}
                            size="md"
                            fallback={notification.user.name.charAt(0)}
                          />
                        )}
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-start">
                          <p className="text-sm flex-grow">
                            <span className="font-medium">{notification.user.name}</span> {notification.content}
                          </p>
                          <span className="text-xs text-gray-500 dark:text-gray-400 ml-2 whitespace-nowrap">
                            {notification.time}
                          </span>
                        </div>
                        {notification.relatedImage && (
                          <img 
                            src={notification.relatedImage} 
                            alt="Related content" 
                            className="mt-2 h-12 w-12 object-cover rounded"
                          />
                        )}
                        <div className="mt-2 flex">
                          <span className={`material-icons mr-1.5 ${getNotificationIconColor(notification.type)}`}>
                            {getNotificationIcon(notification.type)}
                          </span>
                          <Button size="sm" variant="outline" className="mr-2 h-8">
                            View
                          </Button>
                          {notification.type === "friend" && (
                            <Button size="sm" className="h-8 bg-indigo-550 hover:bg-indigo-600">
                              View Profile
                            </Button>
                          )}
                        </div>
                      </div>
                      {!notification.isRead && (
                        <div className="ml-2 mt-1 flex-shrink-0">
                          <div className="w-2 h-2 bg-indigo-550 rounded-full"></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <span className="material-icons text-gray-400 text-5xl mb-4">notifications_off</span>
                  <h3 className="text-lg font-medium mb-1">No notifications</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-sm">
                    {activeTab === "all" 
                      ? "You don't have any notifications yet. When you get notifications, they'll show up here."
                      : `You don't have any ${activeTab} notifications at the moment.`
                    }
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </Tabs>
      </div>
    </div>
  );
}
