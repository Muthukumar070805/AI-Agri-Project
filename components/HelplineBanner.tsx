
import React from 'react';
import { PhoneIcon } from './IconComponents';

export const HelplineBanner: React.FC = () => {
  return (
    <div className="bg-green-900/30 p-4 rounded-lg text-center border border-green-500/30">
      <PhoneIcon className="h-8 w-8 text-green-400 mx-auto mb-2" />
      <h3 className="font-bold text-lg text-white">AI Helpline</h3>
      <p className="text-gray-300 text-sm mb-3">Get advice on your feature phone.</p>
      <div className="bg-gray-800 text-white text-2xl font-mono tracking-widest py-2 px-4 rounded-md">
        1800-KRISHI-00
      </div>
    </div>
  );
};
