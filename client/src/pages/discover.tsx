import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/common/UserAvatar";
import { Input } from "@/components/ui/input";

type TrendingTopic = {
  id: number;
  tag: string;
  postsCount: string;
  category: string;
};

type GroupSuggestion = {
  id: number;
  name: string;
  coverImage: string;
  membersCount: number;
  description: string;
  category: string;
};

type EventSuggestion = {
  id: number;
  title: string;
  image: string;
  date: string;
  time: string;
  location: string;
  attendees: {
    count: number;
    avatars: string[];
  };
  category: string;
};

const trendingTopics: TrendingTopic[] = [
  { id: 1, tag: "AITechnology", postsCount: "2.3K", category: "technology" },
  { id: 2, tag: "ProductDesign", postsCount: "1.8K", category: "design" },
  { id: 3, tag: "WebDevelopment", postsCount: "1.2K", category: "technology" },
  { id: 4, tag: "UXDesign", postsCount: "950", category: "design" },
  { id: 5, tag: "MobileDevelopment", postsCount: "845", category: "technology" },
  { id: 6, tag: "DataVisualization", postsCount: "780", category: "technology" },
  { id: 7, tag: "WorkplaceWellness", postsCount: "720", category: "lifestyle" },
  { id: 8, tag: "RemoteWork", postsCount: "690", category: "work" },
  { id: 9, tag: "SustainableDesign", postsCount: "650", category: "design" },
  { id: 10, tag: "ArtificialIntelligence", postsCount: "615", category: "technology" }
];

const groupSuggestions: GroupSuggestion[] = [
  {
    id: 1,
    name: "UX/UI Design Community",
    coverImage: "https://images.unsplash.com/photo-1541462608143-67571c6738dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    membersCount: 15432,
    description: "A community for UX/UI designers to share work, get feedback, and discuss industry trends.",
    category: "design"
  },
  {
    id: 2,
    name: "Frontend Developers Hub",
    coverImage: "https://images.unsplash.com/photo-1484417894907-623942c8ee29?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    membersCount: 24189,
    description: "Connecting frontend developers worldwide. Share code, solve problems, and grow together.",
    category: "technology"
  },
  {
    id: 3,
    name: "Digital Nomads Network",
    coverImage: "https://images.unsplash.com/photo-1533105079780-92b9be482077?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    membersCount: 9856,
    description: "For remote workers and digital nomads to connect, share experiences, and find new opportunities.",
    category: "work"
  },
  {
    id: 4,
    name: "Data Science Enthusiasts",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    membersCount: 12675,
    description: "Discussing data science, machine learning, AI, and data visualization techniques.",
    category: "technology"
  },
  {
    id: 5,
    name: "Creative Workspace Ideas",
    coverImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    membersCount: 7328,
    description: "Share your workspace setups, get inspiration, and discover productivity hacks.",
    category: "lifestyle"
  },
  {
    id: 6,
    name: "Mindful Professionals",
    coverImage: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    membersCount: 5982,
    description: "Balancing work and wellbeing through mindfulness practices, stress reduction, and healthy habits.",
    category: "lifestyle"
  }
];

const eventSuggestions: EventSuggestion[] = [
  {
    id: 1,
    title: "Web Design Trends 2023",
    image: "https://images.unsplash.com/photo-1540304453618-4a25ddd5e752?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    date: "JUN 15",
    time: "3:00 PM",
    location: "Online",
    attendees: {
      count: 245,
      avatars: [
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
      ]
    },
    category: "design"
  },
  {
    id: 2,
    title: "Tech Meetup: AI & Design",
    image: "https://images.unsplash.com/photo-1591115765373-5207764f72e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    date: "JUN 22",
    time: "6:30 PM",
    location: "San Francisco",
    attendees: {
      count: 178,
      avatars: [
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
      ]
    },
    category: "technology"
  },
  {
    id: 3,
    title: "Remote Work Summit",
    image: "https://images.unsplash.com/photo-1515169067868-5387ec356754?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    date: "JUL 05",
    time: "10:00 AM",
    location: "Online",
    attendees: {
      count: 342,
      avatars: [
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
      ]
    },
    category: "work"
  },
  {
    id: 4,
    title: "Wellness & Productivity Workshop",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    date: "JUL 12",
    time: "4:00 PM",
    location: "New York",
    attendees: {
      count: 124,
      avatars: [
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
      ]
    },
    category: "lifestyle"
  }
];

export default function Discover() {
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  const filterItems = <T extends { category: string }>(items: T[], filter: string | null, query: string): T[] => {
    return items.filter(item => 
      (filter === null || item.category === filter) && 
      (query === "" || JSON.stringify(item).toLowerCase().includes(query.toLowerCase()))
    );
  };
  
  const filteredTopics = filterItems(trendingTopics, categoryFilter, searchQuery);
  const filteredGroups = filterItems(groupSuggestions, categoryFilter, searchQuery);
  const filteredEvents = filterItems(eventSuggestions, categoryFilter, searchQuery);
  
  return (
    <div className="container mx-auto px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">Discover</h1>
            <p className="text-gray-600 dark:text-gray-400">Find trending content, groups, and events</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative w-full sm:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-icons text-gray-400 text-lg">search</span>
              </div>
              <Input 
                type="text" 
                placeholder="Search discover..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant={categoryFilter === null ? "default" : "outline"} 
                onClick={() => setCategoryFilter(null)}
                className={categoryFilter === null ? "bg-indigo-550 hover:bg-indigo-600" : ""}
              >
                All
              </Button>
              <Button 
                variant={categoryFilter === "technology" ? "default" : "outline"} 
                onClick={() => setCategoryFilter("technology")}
                className={categoryFilter === "technology" ? "bg-indigo-550 hover:bg-indigo-600" : ""}
              >
                Tech
              </Button>
              <Button 
                variant={categoryFilter === "design" ? "default" : "outline"} 
                onClick={() => setCategoryFilter("design")}
                className={categoryFilter === "design" ? "bg-indigo-550 hover:bg-indigo-600" : ""}
              >
                Design
              </Button>
              <Button 
                variant={categoryFilter === "work" ? "default" : "outline"} 
                onClick={() => setCategoryFilter("work")}
                className={categoryFilter === "work" ? "bg-indigo-550 hover:bg-indigo-600" : ""}
              >
                Work
              </Button>
              <Button 
                variant={categoryFilter === "lifestyle" ? "default" : "outline"} 
                onClick={() => setCategoryFilter("lifestyle")}
                className={categoryFilter === "lifestyle" ? "bg-indigo-550 hover:bg-indigo-600" : ""}
              >
                Lifestyle
              </Button>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="trending">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="groups">Groups</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>
          
          <TabsContent value="trending">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTopics.length > 0 ? (
                filteredTopics.map(topic => (
                  <Card key={topic.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-md flex items-center">
                          <span className="material-icons mr-2 text-gray-400">trending_up</span>
                          #{topic.tag}
                        </CardTitle>
                        <Button variant="ghost" size="icon">
                          <span className="material-icons">bookmark_border</span>
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {topic.postsCount} posts today
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Explore
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-3 flex flex-col items-center justify-center py-12">
                  <span className="material-icons text-gray-400 text-5xl mb-4">search_off</span>
                  <h3 className="text-lg font-medium mb-1">No trending topics found</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-sm">
                    Try adjusting your search or filters to find what you're looking for.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="groups">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredGroups.length > 0 ? (
                filteredGroups.map(group => (
                  <Card key={group.id} className="overflow-hidden">
                    <div className="h-40 overflow-hidden">
                      <img 
                        src={group.coverImage} 
                        alt={group.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{group.name}</CardTitle>
                        <Button variant="ghost" size="icon">
                          <span className="material-icons">more_horiz</span>
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {group.membersCount.toLocaleString()} members
                      </p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm line-clamp-2">
                        {group.description}
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button className="bg-indigo-550 hover:bg-indigo-600">
                        <span className="material-icons mr-2">add</span>
                        Join Group
                      </Button>
                      <Button variant="outline">Learn More</Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-2 flex flex-col items-center justify-center py-12">
                  <span className="material-icons text-gray-400 text-5xl mb-4">groups_off</span>
                  <h3 className="text-lg font-medium mb-1">No groups found</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-sm">
                    Try adjusting your search or filters to find what you're looking for.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="events">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredEvents.length > 0 ? (
                filteredEvents.map(event => (
                  <Card key={event.id} className="overflow-hidden">
                    <div className="h-40 overflow-hidden relative">
                      <img 
                        src={event.image} 
                        alt={event.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4 w-14 h-14 rounded-lg bg-white dark:bg-gray-800 flex flex-col items-center justify-center text-indigo-550 dark:text-indigo-300">
                        <span className="text-xs font-bold">{event.date.split(" ")[0]}</span>
                        <span className="text-sm font-bold">{event.date.split(" ")[1]}</span>
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <span className="material-icons text-sm mr-1">schedule</span>
                        {event.time}
                        <span className="mx-2">•</span>
                        <span className="material-icons text-sm mr-1">location_on</span>
                        {event.location}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center">
                        <div className="flex -space-x-2 mr-2">
                          {event.attendees.avatars.map((avatar, index) => (
                            <img 
                              key={index}
                              src={avatar} 
                              alt="Attendee" 
                              className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-800"
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          +{event.attendees.count} going
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button className="bg-indigo-550 hover:bg-indigo-600">
                        Interested
                      </Button>
                      <Button variant="outline">
                        Share
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-2 flex flex-col items-center justify-center py-12">
                  <span className="material-icons text-gray-400 text-5xl mb-4">event_busy</span>
                  <h3 className="text-lg font-medium mb-1">No events found</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-sm">
                    Try adjusting your search or filters to find what you're looking for.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-8 mb-4 flex justify-center">
          <Button variant="outline" className="px-8">
            Load More
          </Button>
        </div>
      </div>
    </div>
  );
}
