
import React from 'react';
import { BookOpenIcon } from './IconComponents';

const mockQuestions = [
  { id: 1, q: "നെല്ലിന് മഞ്ഞളിപ്പ്, എന്തു ചെയ്യണം?", a: "മഗ്നീഷ്യം കുറവ് ആകാം. വളം ചേർക്കുക." },
  { id: 2, q: "തെങ്ങിന് കൂമ്പ് ചീയൽ?", a: "ബോർഡോ മിശ്രിതം ഉപയോഗിക്കുക." },
  { id: 3, q: "വാഴയുടെ ഇലപ്പുള്ളി രോഗം?", a: "രോഗം ബാധിച്ച ഇലകൾ മുറിച്ചു മാറ്റുക." },
];

export const PeerQA: React.FC = () => {
  return (
    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
      <div className="flex items-center mb-4">
        <BookOpenIcon className="h-6 w-6 text-green-400 mr-3" />
        <h3 className="font-bold text-lg text-white">Verified Questions</h3>
      </div>
      <div className="space-y-4">
        {mockQuestions.map((item) => (
          <div key={item.id} className="text-sm">
            <p className="font-semibold text-gray-300">ചോദ്യം: {item.q}</p>
            <p className="text-green-400">ഉത്തരം: {item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
