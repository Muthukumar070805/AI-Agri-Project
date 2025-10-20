
import React from 'react';
import { LeafIcon, ImageIcon } from './IconComponents';

export const WelcomeScreen: React.FC = () => {
  return (
    <div className="text-center p-8 bg-gray-800/30 rounded-lg">
        <LeafIcon className="h-16 w-16 text-green-400 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-white mb-2">ഡിജിറ്റൽ കൃഷി ഓഫീസർ-ലേക്ക് സ്വാഗതം</h2>
        <p className="text-gray-400 mb-6">
            നിങ്ങളുടെ കൃഷി സംബന്ധമായ എല്ലാ സംശയങ്ങൾക്കും ഇവിടെ ഉത്തരം ലഭിക്കും.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4 text-left">
            <div className="bg-gray-800 p-4 rounded-lg flex-1">
                <h3 className="font-semibold text-green-400 mb-2">ചോദ്യം ചോദിക്കുക</h3>
                <p className="text-sm text-gray-300">നിങ്ങളുടെ സംശയം മലയാളത്തിൽ ടൈപ്പ് ചെയ്യുക.</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg flex-1">
                <h3 className="font-semibold text-green-400 mb-2 flex items-center">
                    <ImageIcon className="h-5 w-5 mr-2" />
                    ചിത്രം അയക്കുക
                </h3>
                <p className="text-sm text-gray-300">വിളയുടെ ചിത്രം എടുത്ത് പ്രശ്നം എന്താണെന്ന് ചോദിക്കുക.</p>
            </div>
        </div>
    </div>
  );
};
