import { useState } from "react";
import UserAvatar from "@/components/common/UserAvatar";
import CreatePostModal from "@/components/modals/CreatePostModal";

export default function CreatePostCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-4">
        <div className="flex items-center space-x-2">
          <UserAvatar 
            src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
            alt="Your profile"
            size="sm"
          />
          <div className="flex-grow">
            <input 
              type="text" 
              className="w-full bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-550 dark:focus:ring-teal-450" 
              placeholder="What's on your mind, Alex?" 
              onClick={openModal}
              readOnly
            />
          </div>
        </div>
        <div className="flex mt-4 pt-2 border-t border-gray-200 dark:border-gray-700">
          <button 
            className="flex-1 flex items-center justify-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md py-1"
            onClick={openModal}
          >
            <span className="material-icons mr-1 text-red-500">videocam</span>
            Live Video
          </button>
          <button 
            className="flex-1 flex items-center justify-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md py-1"
            onClick={openModal}
          >
            <span className="material-icons mr-1 text-green-500">photo_library</span>
            Photo
          </button>
          <button 
            className="flex-1 flex items-center justify-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md py-1"
            onClick={openModal}
          >
            <span className="material-icons mr-1 text-indigo-550">mood</span>
            Feeling
          </button>
        </div>
      </div>

      <CreatePostModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}
