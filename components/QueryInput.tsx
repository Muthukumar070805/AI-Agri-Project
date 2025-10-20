
import React, { useState, useRef } from 'react';
import { ImageIcon, SendIcon, XCircleIcon } from './IconComponents';

interface QueryInputProps {
  onSubmit: (prompt: string, image?: { data: string; mimeType: string }) => void;
  isLoading: boolean;
}

export const QueryInput: React.FC<QueryInputProps> = ({ onSubmit, isLoading }) => {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState<{ data: string; mimeType: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage({ data: reader.result as string, mimeType: file.type });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() || image) {
      onSubmit(prompt, image ?? undefined);
      setPrompt('');
      setImage(null);
       if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {image && (
        <div className="relative w-32 h-32 rounded-lg overflow-hidden">
          <img src={image.data} alt="Upload preview" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => setImage(null)}
            className="absolute top-1 right-1 bg-black/50 rounded-full text-white hover:bg-black/80 transition-colors"
          >
            <XCircleIcon className="w-6 h-6" />
          </button>
        </div>
      )}
      <div className="flex items-center bg-gray-800 border border-gray-700 rounded-full p-2 shadow-lg focus-within:ring-2 focus-within:ring-green-500 transition-shadow">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
          accept="image/*"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-2 text-gray-400 hover:text-green-400 rounded-full transition-colors"
          aria-label="Upload image"
        >
          <ImageIcon className="h-6 w-6" />
        </button>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          placeholder="വിളയെക്കുറിച്ച് ചോദിക്കുക..."
          className="flex-grow bg-transparent text-gray-100 placeholder-gray-500 focus:outline-none resize-none px-4"
          rows={1}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || (!prompt.trim() && !image)}
          className="p-2 bg-green-600 text-white rounded-full hover:bg-green-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
          aria-label="Send query"
        >
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <SendIcon className="h-6 w-6" />
          )}
        </button>
      </div>
    </form>
  );
};
