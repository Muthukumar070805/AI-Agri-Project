
import React from 'react';
import type { Advisory } from '../types';
// FIX: UserIcon is not an exported member, replaced with UserCircleIcon
import { LeafIcon, UserCircleIcon } from './IconComponents';

interface AdvisoryCardProps {
  advisory: Advisory;
}

const LoadingDots: React.FC = () => (
  <div className="flex space-x-1">
    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
  </div>
);

export const AdvisoryCard: React.FC<AdvisoryCardProps> = ({ advisory }) => {
  if (advisory.isUser) {
    return (
      <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-800/50">
        <div className="flex-shrink-0 h-10 w-10 bg-gray-700 rounded-full flex items-center justify-center">
          {/* FIX: Use UserCircleIcon instead of UserIcon */}
          <UserCircleIcon className="h-6 w-6 text-gray-400" />
        </div>
        <div className="flex-grow pt-1.5">
          {advisory.imageUrl && (
            <img src={advisory.imageUrl} alt="User query" className="rounded-lg max-h-48 mb-2 border border-gray-600" />
          )}
          <p className="text-green-200 whitespace-pre-wrap">{advisory.query}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-4 p-4 rounded-lg bg-green-900/20 border border-green-500/20">
      <div className="flex-shrink-0 h-10 w-10 bg-green-500/20 rounded-full flex items-center justify-center">
        <LeafIcon className="h-6 w-6 text-green-400" />
      </div>
      <div className="flex-grow pt-1.5 prose prose-invert prose-p:text-gray-300 prose-strong:text-green-300 prose-headings:text-green-400 max-w-none">
        {advisory.isLoading ? (
          <LoadingDots />
        ) : (
          <p className="text-gray-200 whitespace-pre-wrap">{advisory.response}</p>
        )}
      </div>
    </div>
  );
};
