import UserAvatar from "@/components/common/UserAvatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const friendRequests = [
  { 
    id: 1, 
    name: "Jordan Lee", 
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
    mutualFriends: 3
  },
  { 
    id: 2, 
    name: "Taylor Kim", 
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
    mutualFriends: 5
  },
  { 
    id: 3, 
    name: "Riley Smith", 
    avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
    mutualFriends: 2
  }
];

const friendSuggestions = [
  { 
    id: 1, 
    name: "Jamie Rodriguez", 
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
    mutualFriends: 8,
    suggestedReason: "Worked at TechCorp"
  },
  { 
    id: 2, 
    name: "Casey Johnson", 
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
    mutualFriends: 12,
    suggestedReason: "From your hometown"
  },
  { 
    id: 3, 
    name: "Alex Rivera", 
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
    mutualFriends: 6,
    suggestedReason: "Studied at University of Design"
  },
  { 
    id: 4, 
    name: "Morgan Taylor", 
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
    mutualFriends: 4,
    suggestedReason: "Friend of David Chen"
  }
];

const myFriends = [
  { 
    id: 1, 
    name: "Sarah Johnson", 
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
  },
  { 
    id: 2, 
    name: "Mike Williams", 
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
  },
  { 
    id: 3, 
    name: "David Chen", 
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
  },
  { 
    id: 4, 
    name: "Emma Wilson", 
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
  },
  { 
    id: 5, 
    name: "Jamal Thomas", 
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
  }
];

export default function Friends() {
  return (
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Friends</h1>
        
        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="all">All Friends</TabsTrigger>
            <TabsTrigger value="requests">Requests</TabsTrigger>
            <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
            <TabsTrigger value="lists">Friend Lists</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>All Friends ({myFriends.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {myFriends.map(friend => (
                    <div key={friend.id} className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                      <UserAvatar 
                        src={friend.avatar}
                        alt={`${friend.name}'s profile`}
                        size="md"
                      />
                      <div className="ml-4 flex-grow">
                        <h3 className="font-medium">{friend.name}</h3>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <span className="material-icons text-sm mr-1">message</span>
                          Message
                        </Button>
                        <Button variant="ghost" size="icon">
                          <span className="material-icons">more_horiz</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="requests">
            <Card>
              <CardHeader>
                <CardTitle>Friend Requests ({friendRequests.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {friendRequests.map(request => (
                    <div key={request.id} className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                      <UserAvatar 
                        src={request.avatar}
                        alt={`${request.name}'s profile`}
                        size="md"
                      />
                      <div className="ml-4 flex-grow">
                        <h3 className="font-medium">{request.name}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{request.mutualFriends} mutual friends</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button className="bg-indigo-550 hover:bg-indigo-600" size="sm">Accept</Button>
                        <Button variant="outline" size="sm">Decline</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="suggestions">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>AI Suggested Friends</CardTitle>
                <span className="text-xs px-2 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-550 dark:text-indigo-300">AI</span>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {friendSuggestions.map(suggestion => (
                    <div key={suggestion.id} className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                      <UserAvatar 
                        src={suggestion.avatar}
                        alt={`${suggestion.name}'s profile`}
                        size="md"
                      />
                      <div className="ml-4 flex-grow">
                        <h3 className="font-medium">{suggestion.name}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{suggestion.mutualFriends} mutual friends</p>
                        <p className="text-xs text-indigo-550 dark:text-teal-450 mt-1">{suggestion.suggestedReason}</p>
                      </div>
                      <div>
                        <Button className="bg-indigo-550 hover:bg-indigo-600" size="sm">
                          <span className="material-icons text-sm mr-1">person_add</span>
                          Add
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="lists">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <span className="material-icons mr-2 text-gray-500">work</span>
                    Colleagues
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <UserAvatar 
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
                      alt="Sarah's profile"
                      size="sm"
                    />
                    <UserAvatar 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
                      alt="David's profile"
                      size="sm"
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <span className="material-icons mr-2 text-gray-500">school</span>
                    College Friends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <UserAvatar 
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
                      alt="Mike's profile"
                      size="sm"
                    />
                    <UserAvatar 
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
                      alt="Emma's profile"
                      size="sm"
                    />
                    <UserAvatar 
                      src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
                      alt="Jamal's profile"
                      size="sm"
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <span className="material-icons mr-2 text-gray-500">favorite</span>
                    Close Friends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <UserAvatar 
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
                      alt="Mike's profile"
                      size="sm"
                    />
                    <UserAvatar 
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
                      alt="Sarah's profile"
                      size="sm"
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-50 dark:bg-gray-900 border-dashed border-2">
                <CardContent className="flex flex-col items-center justify-center h-40">
                  <span className="material-icons text-3xl text-gray-400 mb-2">add_circle</span>
                  <p className="text-gray-500">Create New List</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
