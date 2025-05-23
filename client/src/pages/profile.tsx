import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PostCard from "@/components/feed/PostCard";
import UserAvatar from "@/components/common/UserAvatar";
import { Link } from "wouter";

// Mock data for profile posts
const profilePosts = [
  {
    id: 1,
    author: {
      name: "Alex Morgan",
      username: "alexmorgan",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
    },
    content: "Just finished working on the new design system for our client project. Really happy with how the components turned out! #DesignSystem #UI",
    timestamp: "2 days ago",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&h=800",
    tags: ["DesignSystem", "UI"],
    reactions: {
      count: 42,
      types: ["like", "love"]
    },
    comments: {
      count: 5,
      items: [
        {
          author: {
            name: "David Chen",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
          },
          content: "This looks amazing! Love the attention to detail in the components.",
          time: "1d"
        }
      ]
    },
    shares: 3
  },
  {
    id: 2,
    author: {
      name: "Alex Morgan",
      username: "alexmorgan",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
    },
    content: "Some inspiration for my next project. I love how these colors work together. What do you think?",
    timestamp: "4 days ago",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&h=800",
    reactions: {
      count: 28,
      types: ["like", "love", "wow"]
    },
    comments: {
      count: 3,
      items: [
        {
          author: {
            name: "Emma Wilson",
            avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
          },
          content: "Beautiful color palette! I especially love the gradient transition.",
          time: "3d"
        }
      ]
    },
    shares: 5
  }
];

const photos = [
  "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
  "https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
  "https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
  "https://images.unsplash.com/photo-1579403124614-197f69d8187b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400"
];

const friends = [
  { 
    id: 1, 
    name: "Sarah Johnson", 
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
    mutualFriends: 24
  },
  { 
    id: 2, 
    name: "Mike Williams", 
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
    mutualFriends: 16
  },
  { 
    id: 3, 
    name: "David Chen", 
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
    mutualFriends: 32
  },
  { 
    id: 4, 
    name: "Emma Wilson", 
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
    mutualFriends: 8
  },
  { 
    id: 5, 
    name: "Jamal Thomas", 
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
    mutualFriends: 15
  },
  { 
    id: 6, 
    name: "Sophia Rodriguez", 
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
    mutualFriends: 11
  },
  { 
    id: 7, 
    name: "Liam Jackson", 
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
    mutualFriends: 7
  },
  { 
    id: 8, 
    name: "Olivia Kim", 
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
    mutualFriends: 19
  }
];

const about = {
  bio: "UX/UI Designer based in San Francisco. I create user-centered digital products that help people and make them smile.",
  workplaces: [
    { 
      id: 1,
      company: "Design Solutions Inc.",
      role: "Senior UX Designer",
      period: "2020 - Present",
      icon: "work"
    },
    { 
      id: 2,
      company: "CreativeMinds Agency",
      role: "UI Designer",
      period: "2017 - 2020",
      icon: "work"
    }
  ],
  education: [
    {
      id: 1,
      institution: "California Design Institute",
      degree: "Master's in User Experience Design",
      period: "2015 - 2017",
      icon: "school"
    },
    {
      id: 2,
      institution: "State University",
      degree: "Bachelor's in Graphic Design",
      period: "2011 - 2015",
      icon: "school"
    }
  ],
  location: "San Francisco, California",
  joined: "January 2018"
};

export default function Profile() {
  const [activeTab, setActiveTab] = useState("posts");
  
  return (
    <div className="container mx-auto px-4">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="mb-6">
          <div className="relative h-64 bg-gradient-to-r from-indigo-550 to-teal-450 rounded-lg overflow-hidden">
            <Button 
              variant="outline" 
              size="sm" 
              className="absolute top-4 right-4 bg-white dark:bg-gray-800 backdrop-blur-sm bg-opacity-70 dark:bg-opacity-70"
            >
              <span className="material-icons text-sm mr-1">edit</span>
              Edit Cover
            </Button>
          </div>
          
          <div className="flex flex-col md:flex-row items-start md:items-end -mt-16 md:-mt-12 px-4 md:px-6">
            <div className="relative z-10">
              <UserAvatar 
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
                alt="Profile picture"
                size="xl"
                className="border-4 border-white dark:border-gray-800"
              />
              <Button 
                variant="outline" 
                size="icon" 
                className="absolute bottom-0 right-0 rounded-full bg-white dark:bg-gray-800"
              >
                <span className="material-icons">photo_camera</span>
              </Button>
            </div>
            
            <div className="flex-grow mt-4 md:mt-0 md:ml-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold">Alex Morgan</h1>
                  <p className="text-gray-600 dark:text-gray-400">@alexmorgan</p>
                </div>
                <div className="mt-4 md:mt-0 flex gap-2">
                  <Button className="bg-indigo-550 hover:bg-indigo-600">
                    <span className="material-icons mr-1">edit</span>
                    Edit Profile
                  </Button>
                  <Button variant="outline">
                    <span className="material-icons mr-1">share</span>
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-between mt-6 border-b border-gray-200 dark:border-gray-700 px-4 md:px-6">
            <div className="flex space-x-8 mb-4">
              <div className="text-center">
                <div className="font-bold text-lg">89</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Posts</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-lg">1,234</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Followers</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-lg">567</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Following</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Profile Content */}
        <Tabs defaultValue="posts" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="friends">Friends</TabsTrigger>
            <TabsTrigger value="photos">Photos</TabsTrigger>
          </TabsList>
          
          {/* Posts Tab */}
          <TabsContent value="posts">
            <div className="max-w-2xl mx-auto">
              {profilePosts.map(post => (
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
              
              <div className="flex justify-center mb-4">
                <Button variant="outline" className="px-8">
                  Load More
                </Button>
              </div>
            </div>
          </TabsContent>
          
          {/* About Tab */}
          <TabsContent value="about">
            <div className="max-w-2xl mx-auto">
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">About</h3>
                  <p className="mb-6 text-gray-700 dark:text-gray-300">{about.bio}</p>
                  
                  <div className="space-y-4">
                    {about.workplaces.map(workplace => (
                      <div key={workplace.id} className="flex items-start">
                        <div className="mr-4 mt-0.5">
                          <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-indigo-550 dark:text-indigo-400">
                            <span className="material-icons">{workplace.icon}</span>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium">{workplace.role}</h4>
                          <p className="text-gray-600 dark:text-gray-400">{workplace.company}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-500">{workplace.period}</p>
                        </div>
                      </div>
                    ))}
                    
                    {about.education.map(education => (
                      <div key={education.id} className="flex items-start">
                        <div className="mr-4 mt-0.5">
                          <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-indigo-550 dark:text-indigo-400">
                            <span className="material-icons">{education.icon}</span>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium">{education.degree}</h4>
                          <p className="text-gray-600 dark:text-gray-400">{education.institution}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-500">{education.period}</p>
                        </div>
                      </div>
                    ))}
                    
                    <div className="flex items-start">
                      <div className="mr-4 mt-0.5">
                        <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-indigo-550 dark:text-indigo-400">
                          <span className="material-icons">location_on</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium">Lives in</h4>
                        <p className="text-gray-600 dark:text-gray-400">{about.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="mr-4 mt-0.5">
                        <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-indigo-550 dark:text-indigo-400">
                          <span className="material-icons">calendar_today</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium">Joined</h4>
                        <p className="text-gray-600 dark:text-gray-400">{about.joined}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Friends Tab */}
          <TabsContent value="friends">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold">Friends ({friends.length})</h3>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="material-icons text-gray-400 text-lg">search</span>
                    </span>
                    <input 
                      type="text" 
                      className="block w-64 bg-gray-100 dark:bg-gray-700 border-0 rounded-full pl-10 pr-4 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-550 dark:focus:ring-teal-450" 
                      placeholder="Search friends..." 
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {friends.map(friend => (
                    <div key={friend.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                      <div className="flex flex-col items-center text-center">
                        <UserAvatar 
                          src={friend.avatar}
                          alt={`${friend.name}'s profile`}
                          size="lg"
                          className="mb-3"
                        />
                        <h4 className="font-medium mb-1">{friend.name}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{friend.mutualFriends} mutual friends</p>
                        <div className="flex space-x-2 w-full">
                          <Button variant="outline" className="flex-1 h-8 text-xs">
                            <span className="material-icons text-sm mr-1">chat</span>
                            Message
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <span className="material-icons text-sm">more_horiz</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Photos Tab */}
          <TabsContent value="photos">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold">Photos ({photos.length})</h3>
                  <Button variant="outline">
                    <span className="material-icons mr-1">cloud_upload</span>
                    Upload Photos
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {photos.map((photo, index) => (
                    <div key={index} className="aspect-square rounded-lg overflow-hidden relative group">
                      <img 
                        src={photo} 
                        alt={`Photo ${index+1}`} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="flex space-x-2">
                          <Button variant="outline" size="icon" className="bg-white/70 dark:bg-gray-800/70 h-9 w-9">
                            <span className="material-icons">visibility</span>
                          </Button>
                          <Button variant="outline" size="icon" className="bg-white/70 dark:bg-gray-800/70 h-9 w-9">
                            <span className="material-icons">favorite_border</span>
                          </Button>
                          <Button variant="outline" size="icon" className="bg-white/70 dark:bg-gray-800/70 h-9 w-9">
                            <span className="material-icons">share</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
