import { Link } from "wouter";
import UserAvatar from "@/components/common/UserAvatar";

type CommentProps = {
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  time: string;
};

export default function Comment({ author, content, time }: CommentProps) {
  return (
    <div className="flex space-x-2">
      <UserAvatar 
        src={author.avatar}
        alt={`${author.name}'s profile`}
        size="xs"
        className="mt-1"
      />
      <div>
        <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-3 py-2">
          <div className="font-medium text-xs">{author.name}</div>
          <p className="text-sm">{content}</p>
        </div>
        <div className="flex items-center ml-2 mt-1 text-xs text-gray-500 dark:text-gray-400">
          <button className="font-medium hover:underline">Like</button>
          <span className="mx-1">•</span>
          <button className="font-medium hover:underline">Reply</button>
          <span className="mx-1">•</span>
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
}
