import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTheme } from "@/contexts/ThemeContext";
import { useToast } from "@/hooks/use-toast";
import UserAvatar from "@/components/common/UserAvatar";

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Profile Settings
  const [profileForm, setProfileForm] = useState({
    displayName: "Alex Morgan",
    username: "alexmorgan",
    bio: "UX/UI Designer based in San Francisco. I create user-centered digital products that help people and make them smile.",
    email: "alex.morgan@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, California",
    website: "https://alexmorgan.design"
  });
  
  // Privacy Settings
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "public",
    activityStatus: true,
    friendRequests: "everyone",
    searchVisibility: true,
    tagApproval: true,
    twoFactorAuth: false,
    locationSharing: false
  });
  
  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    directMessages: true,
    friendRequests: true,
    mentions: true,
    comments: true,
    reactions: true,
    groupActivity: true,
    emailNotifications: false,
    pushNotifications: true
  });
  
  // Appearance Settings
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: theme,
    contentDensity: "comfortable",
    animationsEnabled: true,
    highContrastMode: false,
    fontSizeAdjustment: "default"
  });
  
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePrivacyToggle = (setting: string) => {
    setPrivacySettings(prev => ({ 
      ...prev, 
      [setting]: typeof prev[setting as keyof typeof prev] === 'boolean' 
        ? !prev[setting as keyof typeof prev] 
        : prev[setting as keyof typeof prev]
    }));
  };
  
  const handlePrivacySelect = (value: string, setting: string) => {
    setPrivacySettings(prev => ({ ...prev, [setting]: value }));
  };
  
  const handleNotificationToggle = (setting: string) => {
    setNotificationSettings(prev => ({ ...prev, [setting]: !prev[setting as keyof typeof prev] }));
  };
  
  const handleAppearanceChange = (setting: string, value: any) => {
    if (setting === 'theme') {
      setTheme(value);
    }
    setAppearanceSettings(prev => ({ ...prev, [setting]: value }));
  };
  
  const handleSaveProfile = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Profile updated",
        description: "Your profile information has been saved successfully.",
      });
    }, 1000);
  };
  
  const handleSavePrivacy = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Privacy settings updated",
        description: "Your privacy preferences have been saved successfully.",
      });
    }, 1000);
  };
  
  const handleSaveNotifications = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Notification settings updated",
        description: "Your notification preferences have been saved successfully.",
      });
    }, 1000);
  };
  
  const handleSaveAppearance = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Appearance settings updated",
        description: "Your appearance preferences have been saved successfully.",
      });
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        
        <Tabs defaultValue="profile">
          <div className="flex mb-6">
            <TabsList className="flex-col space-y-1 h-auto bg-transparent mr-8 w-48 hidden md:flex">
              <TabsTrigger value="profile" className="justify-start w-full">Profile</TabsTrigger>
              <TabsTrigger value="privacy" className="justify-start w-full">Privacy & Security</TabsTrigger>
              <TabsTrigger value="notifications" className="justify-start w-full">Notifications</TabsTrigger>
              <TabsTrigger value="appearance" className="justify-start w-full">Appearance</TabsTrigger>
              <TabsTrigger value="account" className="justify-start w-full">Account</TabsTrigger>
              <TabsTrigger value="help" className="justify-start w-full">Help & Support</TabsTrigger>
            </TabsList>
            
            <TabsList className="grid grid-cols-3 h-auto md:hidden mb-6">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="help">Help</TabsTrigger>
            </TabsList>
          </div>
          
          <div className="flex-grow">
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your profile information and personal details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <UserAvatar 
                      src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
                      alt="Profile picture"
                      size="xl"
                    />
                    <div>
                      <Button className="mb-2 bg-indigo-550 hover:bg-indigo-600">
                        <span className="material-icons mr-2">upload</span>
                        Upload New Photo
                      </Button>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        JPG, GIF or PNG. Maximum size 5MB.
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="displayName">Display Name</Label>
                      <Input 
                        id="displayName" 
                        name="displayName"
                        value={profileForm.displayName}
                        onChange={handleProfileChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input 
                        id="username" 
                        name="username"
                        value={profileForm.username}
                        onChange={handleProfileChange}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea 
                      id="bio" 
                      name="bio"
                      value={profileForm.bio}
                      onChange={handleProfileChange}
                      className="min-h-[100px]"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email"
                        name="email" 
                        type="email"
                        value={profileForm.email}
                        onChange={handleProfileChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input 
                        id="phone"
                        name="phone" 
                        type="tel"
                        value={profileForm.phone}
                        onChange={handleProfileChange}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input 
                        id="location"
                        name="location"
                        value={profileForm.location}
                        onChange={handleProfileChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input 
                        id="website"
                        name="website" 
                        type="url"
                        value={profileForm.website}
                        onChange={handleProfileChange}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Reset</Button>
                  <Button 
                    className="bg-indigo-550 hover:bg-indigo-600"
                    onClick={handleSaveProfile}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="privacy">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy & Security</CardTitle>
                  <CardDescription>
                    Manage your privacy settings and account security
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Privacy Settings</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="profileVisibility">Profile Visibility</Label>
                      <Select 
                        value={privacySettings.profileVisibility} 
                        onValueChange={(value) => handlePrivacySelect(value, 'profileVisibility')}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select visibility" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public</SelectItem>
                          <SelectItem value="friends">Friends Only</SelectItem>
                          <SelectItem value="private">Private</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Online Activity Status</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Show when you're active on ZenithHub
                        </p>
                      </div>
                      <Switch 
                        checked={privacySettings.activityStatus}
                        onCheckedChange={() => handlePrivacyToggle('activityStatus')}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="friendRequests">Who can send you friend requests</Label>
                      <Select 
                        value={privacySettings.friendRequests} 
                        onValueChange={(value) => handlePrivacySelect(value, 'friendRequests')}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="everyone">Everyone</SelectItem>
                          <SelectItem value="friends-of-friends">Friends of Friends</SelectItem>
                          <SelectItem value="nobody">Nobody</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Search Engine Visibility</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Allow search engines to link to your profile
                        </p>
                      </div>
                      <Switch 
                        checked={privacySettings.searchVisibility}
                        onCheckedChange={() => handlePrivacyToggle('searchVisibility')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Tag Review</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Review tags before they appear on your profile
                        </p>
                      </div>
                      <Switch 
                        checked={privacySettings.tagApproval}
                        onCheckedChange={() => handlePrivacyToggle('tagApproval')}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium">Security Settings</h3>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Two-Factor Authentication</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <Switch 
                        checked={privacySettings.twoFactorAuth}
                        onCheckedChange={() => handlePrivacyToggle('twoFactorAuth')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Location Sharing</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Allow ZenithHub to access your location
                        </p>
                      </div>
                      <Switch 
                        checked={privacySettings.locationSharing}
                        onCheckedChange={() => handlePrivacyToggle('locationSharing')}
                      />
                    </div>
                    
                    <div className="pt-2">
                      <Button variant="outline" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950">
                        <span className="material-icons mr-2">lock_reset</span>
                        Change Password
                      </Button>
                    </div>
                    
                    <div>
                      <Button variant="outline" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950">
                        <span className="material-icons mr-2">delete</span>
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-indigo-550 hover:bg-indigo-600"
                    onClick={handleSavePrivacy}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Saving..." : "Save Privacy Settings"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Choose what notifications you want to receive
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">General Notifications</h3>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Direct Messages</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Receive notifications for new direct messages
                        </p>
                      </div>
                      <Switch 
                        checked={notificationSettings.directMessages}
                        onCheckedChange={() => handleNotificationToggle('directMessages')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Friend Requests</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Receive notifications for new friend requests
                        </p>
                      </div>
                      <Switch 
                        checked={notificationSettings.friendRequests}
                        onCheckedChange={() => handleNotificationToggle('friendRequests')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Mentions</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Receive notifications when you're mentioned
                        </p>
                      </div>
                      <Switch 
                        checked={notificationSettings.mentions}
                        onCheckedChange={() => handleNotificationToggle('mentions')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Comments</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Receive notifications for comments on your posts
                        </p>
                      </div>
                      <Switch 
                        checked={notificationSettings.comments}
                        onCheckedChange={() => handleNotificationToggle('comments')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Reactions</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Receive notifications for reactions to your posts
                        </p>
                      </div>
                      <Switch 
                        checked={notificationSettings.reactions}
                        onCheckedChange={() => handleNotificationToggle('reactions')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Group Activity</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Receive notifications for activity in your groups
                        </p>
                      </div>
                      <Switch 
                        checked={notificationSettings.groupActivity}
                        onCheckedChange={() => handleNotificationToggle('groupActivity')}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium">Notification Channels</h3>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Email Notifications</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Receive notifications via email
                        </p>
                      </div>
                      <Switch 
                        checked={notificationSettings.emailNotifications}
                        onCheckedChange={() => handleNotificationToggle('emailNotifications')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Push Notifications</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Receive push notifications in browser or app
                        </p>
                      </div>
                      <Switch 
                        checked={notificationSettings.pushNotifications}
                        onCheckedChange={() => handleNotificationToggle('pushNotifications')}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-indigo-550 hover:bg-indigo-600"
                    onClick={handleSaveNotifications}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Saving..." : "Save Notification Settings"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="appearance">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>
                    Customize how ZenithHub looks for you
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Theme</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div 
                        className={`relative rounded-lg border-2 overflow-hidden cursor-pointer ${
                          appearanceSettings.theme === 'light' ? 'border-indigo-550' : 'border-transparent'
                        }`}
                        onClick={() => handleAppearanceChange('theme', 'light')}
                      >
                        <div className="h-24 bg-white">
                          <div className="h-6 bg-gray-100 border-b border-gray-200 flex items-center">
                            <div className="w-3 h-3 rounded-full bg-gray-300 ml-2"></div>
                            <div className="w-24 h-3 rounded-full bg-gray-200 ml-2"></div>
                          </div>
                          <div className="p-2">
                            <div className="w-full h-3 rounded-full bg-gray-200 mb-2"></div>
                            <div className="w-2/3 h-3 rounded-full bg-gray-200"></div>
                          </div>
                        </div>
                        <div className="p-2 text-center bg-gray-50 border-t border-gray-200">
                          <h4 className="font-medium text-sm">Light</h4>
                        </div>
                        {appearanceSettings.theme === 'light' && (
                          <div className="absolute top-2 right-2 w-5 h-5 bg-indigo-550 rounded-full flex items-center justify-center text-white">
                            <span className="material-icons text-[14px]">check</span>
                          </div>
                        )}
                      </div>
                      
                      <div 
                        className={`relative rounded-lg border-2 overflow-hidden cursor-pointer ${
                          appearanceSettings.theme === 'dark' ? 'border-indigo-550' : 'border-transparent'
                        }`}
                        onClick={() => handleAppearanceChange('theme', 'dark')}
                      >
                        <div className="h-24 bg-gray-900">
                          <div className="h-6 bg-gray-800 border-b border-gray-700 flex items-center">
                            <div className="w-3 h-3 rounded-full bg-gray-600 ml-2"></div>
                            <div className="w-24 h-3 rounded-full bg-gray-700 ml-2"></div>
                          </div>
                          <div className="p-2">
                            <div className="w-full h-3 rounded-full bg-gray-700 mb-2"></div>
                            <div className="w-2/3 h-3 rounded-full bg-gray-700"></div>
                          </div>
                        </div>
                        <div className="p-2 text-center bg-gray-800 border-t border-gray-700 text-gray-200">
                          <h4 className="font-medium text-sm">Dark</h4>
                        </div>
                        {appearanceSettings.theme === 'dark' && (
                          <div className="absolute top-2 right-2 w-5 h-5 bg-indigo-550 rounded-full flex items-center justify-center text-white">
                            <span className="material-icons text-[14px]">check</span>
                          </div>
                        )}
                      </div>
                      
                      <div 
                        className={`relative rounded-lg border-2 overflow-hidden cursor-pointer ${
                          appearanceSettings.theme === 'system' ? 'border-indigo-550' : 'border-transparent'
                        }`}
                        onClick={() => handleAppearanceChange('theme', 'system')}
                      >
                        <div className="h-24 bg-gradient-to-r from-white to-gray-900">
                          <div className="h-6 bg-gradient-to-r from-gray-100 to-gray-800 border-b border-gray-300 flex items-center">
                            <div className="w-3 h-3 rounded-full bg-gray-400 ml-2"></div>
                            <div className="w-24 h-3 rounded-full bg-gradient-to-r from-gray-200 to-gray-700 ml-2"></div>
                          </div>
                          <div className="p-2">
                            <div className="w-full h-3 rounded-full bg-gradient-to-r from-gray-200 to-gray-700 mb-2"></div>
                            <div className="w-2/3 h-3 rounded-full bg-gradient-to-r from-gray-200 to-gray-700"></div>
                          </div>
                        </div>
                        <div className="p-2 text-center bg-gradient-to-r from-gray-50 to-gray-800 border-t border-gray-300">
                          <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300">System</h4>
                        </div>
                        {appearanceSettings.theme === 'system' && (
                          <div className="absolute top-2 right-2 w-5 h-5 bg-indigo-550 rounded-full flex items-center justify-center text-white">
                            <span className="material-icons text-[14px]">check</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium">Display Options</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="contentDensity">Content Density</Label>
                      <Select 
                        value={appearanceSettings.contentDensity} 
                        onValueChange={(value) => handleAppearanceChange('contentDensity', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select density" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="comfortable">Comfortable</SelectItem>
                          <SelectItem value="compact">Compact</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Enable Animations</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Use animations and transitions in the interface
                        </p>
                      </div>
                      <Switch 
                        checked={appearanceSettings.animationsEnabled}
                        onCheckedChange={(value) => handleAppearanceChange('animationsEnabled', value)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">High Contrast Mode</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Increase contrast for better visibility
                        </p>
                      </div>
                      <Switch 
                        checked={appearanceSettings.highContrastMode}
                        onCheckedChange={(value) => handleAppearanceChange('highContrastMode', value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="fontSizeAdjustment">Font Size</Label>
                      <Select 
                        value={appearanceSettings.fontSizeAdjustment} 
                        onValueChange={(value) => handleAppearanceChange('fontSizeAdjustment', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select font size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Small</SelectItem>
                          <SelectItem value="default">Default</SelectItem>
                          <SelectItem value="large">Large</SelectItem>
                          <SelectItem value="x-large">Extra Large</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-indigo-550 hover:bg-indigo-600"
                    onClick={handleSaveAppearance}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Saving..." : "Save Appearance Settings"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    Manage your account details and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Account Information</h3>
                    
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Account Type</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Standard Account
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Upgrade
                        </Button>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Email Address</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            alex.morgan@example.com
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Change
                        </Button>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Password</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Last changed 3 months ago
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Change
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium">Connected Accounts</h3>
                    
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                            <span className="material-icons">alternate_email</span>
                          </div>
                          <div>
                            <h4 className="font-medium">Google</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Not connected
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Connect
                        </Button>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                            <span className="material-icons">facebook</span>
                          </div>
                          <div>
                            <h4 className="font-medium">Facebook</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Not connected
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Connect
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium">Advanced</h3>
                    
                    <Button variant="outline" className="w-full justify-start">
                      <span className="material-icons mr-2">download</span>
                      Download Your Data
                    </Button>
                    
                    <Button variant="outline" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950">
                      <span className="material-icons mr-2">delete_forever</span>
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="help">
              <Card>
                <CardHeader>
                  <CardTitle>Help & Support</CardTitle>
                  <CardDescription>
                    Get help with ZenithHub and contact support
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Help Center</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="bg-gray-50 dark:bg-gray-800">
                        <CardContent className="p-6">
                          <div className="flex items-start">
                            <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-550 dark:text-indigo-300 mr-4">
                              <span className="material-icons">help_outline</span>
                            </div>
                            <div>
                              <h4 className="font-medium mb-1">FAQs</h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                                Find answers to frequently asked questions
                              </p>
                              <Button variant="outline" size="sm">View FAQs</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-gray-50 dark:bg-gray-800">
                        <CardContent className="p-6">
                          <div className="flex items-start">
                            <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-550 dark:text-indigo-300 mr-4">
                              <span className="material-icons">menu_book</span>
                            </div>
                            <div>
                              <h4 className="font-medium mb-1">User Guide</h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                                Learn how to use ZenithHub features
                              </p>
                              <Button variant="outline" size="sm">Read Guide</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-gray-50 dark:bg-gray-800">
                        <CardContent className="p-6">
                          <div className="flex items-start">
                            <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-550 dark:text-indigo-300 mr-4">
                              <span className="material-icons">support_agent</span>
                            </div>
                            <div>
                              <h4 className="font-medium mb-1">Contact Support</h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                                Get help from our support team
                              </p>
                              <Button variant="outline" size="sm">Contact Us</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-gray-50 dark:bg-gray-800">
                        <CardContent className="p-6">
                          <div className="flex items-start">
                            <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-550 dark:text-indigo-300 mr-4">
                              <span className="material-icons">bug_report</span>
                            </div>
                            <div>
                              <h4 className="font-medium mb-1">Report a Problem</h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                                Report bugs or issues with ZenithHub
                              </p>
                              <Button variant="outline" size="sm">Report Issue</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  
                  <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium">Support</h3>
                    
                    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center">
                      <h4 className="font-medium mb-2">Need Immediate Help?</h4>
                      <p className="text-gray-500 dark:text-gray-400 mb-4">
                        Our support team is available 24/7 to assist you with any issues or questions.
                      </p>
                      <Button className="bg-indigo-550 hover:bg-indigo-600">
                        <span className="material-icons mr-2">headset_mic</span>
                        Contact Support
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
