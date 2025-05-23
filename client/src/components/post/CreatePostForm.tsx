import React, { useState, useRef } from 'react';
import { Image, Video, Smile, MapPin, X, Camera, Film, Paperclip } from 'lucide-react';

interface CreatePostFormProps {
  onSubmit: (content: string, media?: File[]) => void;
  isSubmitting?: boolean;
  placeholder?: string;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({ 
  onSubmit, 
  isSubmitting = false,
  placeholder = "What's on your mind?"
}) => {
  const [content, setContent] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...files]);
      
      // Generate previews
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setPreviews(prev => [...prev, e.target!.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };
  
  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() || selectedFiles.length > 0) {
      onSubmit(content, selectedFiles.length > 0 ? selectedFiles : undefined);
      setContent('');
      setSelectedFiles([]);
      setPreviews([]);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-start">
        <div className="w-10 h-10 rounded-full overflow-hidden mr-3 flex-shrink-0">
          <img 
            src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150" 
            alt="Your profile" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={placeholder}
            className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-teal-400 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 resize-none min-h-[100px]"
          />
          
          {/* Media Previews */}
          {previews.length > 0 && (
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
              {previews.map((preview, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                    {selectedFiles[index].type.startsWith('image/') ? (
                      <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                    ) : selectedFiles[index].type.startsWith('video/') ? (
                      <video src={preview} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Paperclip className="h-10 w-10 text-gray-400 dark:text-gray-500" />
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                          {selectedFiles[index].name}
                        </p>
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="absolute top-1 right-1 bg-gray-900/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-3 flex items-center justify-between">
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-teal-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              >
                <Image className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-teal-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              >
                <Video className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-teal-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              >
                <Smile className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-teal-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              >
                <MapPin className="h-5 w-5" />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                multiple
                accept="image/*,video/*"
                className="hidden"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting || (!content.trim() && selectedFiles.length === 0)}
              className="px-4 py-2 bg-indigo-500 text-white rounded-lg font-medium hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Posting...' : 'Post'}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreatePostForm;