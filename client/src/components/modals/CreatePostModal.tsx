import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import UserAvatar from "@/components/common/UserAvatar";
import { useToast } from "@/hooks/use-toast";

type CreatePostModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CreatePostModal({ isOpen, onClose }: CreatePostModalProps) {
  const [postContent, setPostContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!postContent.trim()) {
      toast({
        title: "Error",
        description: "Please write something before posting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate post creation
    setTimeout(() => {
      toast({
        title: "Success!",
        description: "Your post has been created.",
      });
      
      setPostContent("");
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold">Create Post</DialogTitle>
        </DialogHeader>
        
        <div className="flex items-center mt-2 mb-4">
          <UserAvatar 
            src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
            alt="Your profile"
            size="sm"
          />
          <div className="ml-2">
            <p className="text-sm font-medium">Alex Morgan</p>
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <span className="material-icons text-xs mr-1">public</span>
              Public
            </div>
          </div>
        </div>

        <Textarea
          placeholder="What's on your mind, Alex?"
          className="resize-none min-h-[120px] border-0 focus-visible:ring-0 text-base p-0"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        />
        
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 mt-2">
          <p className="text-sm font-medium mb-2">Add to your post</p>
          <div className="flex justify-between">
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
              <span className="material-icons text-green-500">photo_library</span>
            </button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
              <span className="material-icons text-blue-500">person_add</span>
            </button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
              <span className="material-icons text-yellow-500">emoji_emotions</span>
            </button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
              <span className="material-icons text-red-500">location_on</span>
            </button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
              <span className="material-icons text-purple-500">flag</span>
            </button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
              <span className="material-icons text-gray-500">more_horiz</span>
            </button>
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            className="w-full bg-gradient-to-r from-indigo-550 to-teal-450 hover:from-indigo-600 hover:to-teal-500"
            disabled={isSubmitting}
            onClick={handleSubmit}
          >
            {isSubmitting ? "Posting..." : "Post"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
