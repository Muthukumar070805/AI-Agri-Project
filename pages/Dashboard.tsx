
import React, { useState, useRef } from 'react';
import type { AdvisoryResponse } from '../types';
import {
  SparklesIcon, LightBulbIcon, CloudArrowUpIcon, XCircleIcon,
  MicrophoneIcon, LeafIcon, PhoneIcon, DocumentTextIcon
} from '../components/IconComponents';

interface DashboardPageProps {
  onTextSubmit: (prompt: string) => void;
  textAdvisory: AdvisoryResponse;
  isTextLoading: boolean;
  onVisualSubmit: (image: { data: string; mimeType: string }) => void;
  visualAdvisory: AdvisoryResponse;
  isVisualLoading: boolean;
  onSchemesSubmit: (location: string, crops: string) => void;
  schemesAdvisory: AdvisoryResponse;
  isSchemesLoading: boolean;
}

const Card: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-slate-200/80 p-6 ${className}`}>
    {children}
  </div>
);

const CardHeader: React.FC<{ icon: React.ElementType, title: string, subtitle: string }> = ({ icon: Icon, title, subtitle }) => (
  <div className="flex items-start mb-4">
    <div className="bg-emerald-100 p-2 rounded-lg mr-4">
      <Icon className="w-6 h-6 text-emerald-700" />
    </div>
    <div>
      <h3 className="font-bold text-lg text-slate-800">{title}</h3>
      <p className="text-sm text-slate-500">{subtitle}</p>
    </div>
  </div>
);

const LoadingIndicator: React.FC = () => (
    <div className="flex items-center space-x-2 text-slate-500">
        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
        <span>Analyzing...</span>
    </div>
);

const AIAdvisoryCard: React.FC<Pick<DashboardPageProps, 'onTextSubmit' | 'textAdvisory' | 'isTextLoading'>> =
  ({ onTextSubmit, textAdvisory, isTextLoading }) => {
    const [prompt, setPrompt] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onTextSubmit(prompt);
    };

    return (
      <Card className="col-span-1 lg:col-span-2">
        <CardHeader icon={SparklesIcon} title="AI Advisory" subtitle="Ask your farming-related questions in any language." />
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="question" className="text-sm font-medium text-slate-600 block mb-1">Your Question</label>
            <div className="relative">
              <textarea
                id="question"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="I am a farmer from Palakkad, I want to plant vala maram first, help me prepare along with me"
                className="w-full border border-slate-300 rounded-lg p-3 pr-20 h-28 resize-none focus:ring-2 focus:ring-emerald-500 focus:outline-none placeholder:text-slate-400"
                disabled={isTextLoading}
              />
              <button type="button" className="absolute top-3 right-3 text-slate-400 hover:text-emerald-600">
                <MicrophoneIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
          <button type="submit" disabled={isTextLoading || !prompt.trim()} className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg hover:bg-emerald-700 disabled:bg-slate-300 transition-colors">
            {isTextLoading ? 'Getting Advice...' : 'Get Advice'}
          </button>
        </form>
        {(isTextLoading || textAdvisory.data || textAdvisory.error) && (
          <div className="mt-6">
            <h4 className="font-semibold text-slate-700 flex items-center mb-2">
              <LightBulbIcon className="w-5 h-5 mr-2 text-emerald-600"/>
              AI Generated Response
            </h4>
            <div className="bg-emerald-50/70 p-4 rounded-lg text-sm text-slate-700 prose max-w-none">
              {isTextLoading && <LoadingIndicator />}
              {textAdvisory.error && <p className="text-red-600">{textAdvisory.error}</p>}
              {textAdvisory.data && <p className="whitespace-pre-wrap">{textAdvisory.data}</p>}
            </div>
          </div>
        )}
      </Card>
    );
  };

const CropDiseaseDetectionCard: React.FC<Pick<DashboardPageProps, 'onVisualSubmit' | 'visualAdvisory' | 'isVisualLoading'>> =
 ({ onVisualSubmit, visualAdvisory, isVisualLoading }) => {
    const [image, setImage] = useState<{ data: string; mimeType: string; name: string } | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage({ data: reader.result as string, mimeType: file.type, name: file.name });
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleAnalyze = () => {
      if (image) {
        onVisualSubmit(image);
      }
    };

    return (
      <Card>
        <CardHeader icon={LeafIcon} title="Crop Disease Detection" subtitle="Upload an image to detect potential diseases." />
         <div className="h-48 border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center text-center p-4 bg-slate-50/50">
            {image ? (
                <div className="relative">
                    <img src={image.data} alt="Upload preview" className="max-h-32 rounded-md"/>
                    <button onClick={() => setImage(null)} className="absolute -top-2 -right-2 bg-white rounded-full">
                      <XCircleIcon className="w-6 h-6 text-red-500"/>
                    </button>
                </div>
            ) : (
                <>
                <CloudArrowUpIcon className="w-10 h-10 text-slate-400 mb-2" />
                <button type="button" onClick={() => fileInputRef.current?.click()} className="text-sm font-semibold text-emerald-600 hover:underline">
                    Click to upload image
                </button>
                <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
                </>
            )}
        </div>
        <button onClick={handleAnalyze} disabled={isVisualLoading || !image} className="w-full mt-4 bg-emerald-600 text-white font-bold py-3 rounded-lg hover:bg-emerald-700 disabled:bg-slate-300 transition-colors">
            {isVisualLoading ? 'Analyzing...' : 'Analyze Image'}
        </button>
         {(isVisualLoading || visualAdvisory.data || visualAdvisory.error) && (
          <div className="mt-6">
            <h4 className="font-semibold text-slate-700 flex items-center mb-2">
              <LightBulbIcon className="w-5 h-5 mr-2 text-emerald-600"/>
              AI Analysis
            </h4>
            <div className="bg-emerald-50/70 p-4 rounded-lg text-sm text-slate-700 prose max-w-none">
              {isVisualLoading && <LoadingIndicator />}
              {visualAdvisory.error && <p className="text-red-600">{visualAdvisory.error}</p>}
              {visualAdvisory.data && <p className="whitespace-pre-wrap">{visualAdvisory.data}</p>}
            </div>
          </div>
        )}
      </Card>
    );
};

const GovernmentSchemesCard: React.FC<Pick<DashboardPageProps, 'onSchemesSubmit' | 'schemesAdvisory' | 'isSchemesLoading'>> = 
  ({ onSchemesSubmit, schemesAdvisory, isSchemesLoading }) => {
    const [location, setLocation] = useState('');
    const [crops, setCrops] = useState('');

    const handleFindSchemes = () => {
        if (location.trim() && crops.trim()) {
            onSchemesSubmit(location, crops);
        }
    };

    return (
        <Card>
            <CardHeader icon={DocumentTextIcon} title="Government Schemes" subtitle="Find schemes relevant to you." />
            <div className="space-y-4">
                <div>
                    <label htmlFor="location" className="text-sm font-medium text-slate-600 block mb-1">Your Location</label>
                    <input 
                        type="text" 
                        id="location" 
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g., Alappuzha" 
                        className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        disabled={isSchemesLoading}
                    />
                </div>
                 <div>
                    <label htmlFor="crops" className="text-sm font-medium text-slate-600 block mb-1">Your Crops</label>
                    <input 
                        type="text" 
                        id="crops" 
                        value={crops}
                        onChange={(e) => setCrops(e.target.value)}
                        placeholder="e.g., Coconut, Paddy" 
                        className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        disabled={isSchemesLoading}
                    />
                </div>
                <button 
                    onClick={handleFindSchemes}
                    disabled={isSchemesLoading || !location.trim() || !crops.trim()}
                    className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg hover:bg-emerald-700 disabled:bg-slate-300 transition-colors flex items-center justify-center"
                >
                    {isSchemesLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Finding Schemes...
                        </>
                    ) : (
                        'Find Schemes'
                    )}
                </button>
            </div>
            {(isSchemesLoading || schemesAdvisory.data || schemesAdvisory.error) && (
              <div className="mt-6 border-t border-slate-200 pt-4">
                <h4 className="font-semibold text-slate-700 flex items-center mb-2">
                  <LightBulbIcon className="w-5 h-5 mr-2 text-emerald-600"/>
                  Relevant Schemes
                </h4>
                <div className="bg-emerald-50/70 p-4 rounded-lg text-sm text-slate-700 prose max-w-none">
                  {isSchemesLoading && <LoadingIndicator />}
                  {schemesAdvisory.error && <p className="text-red-600">{schemesAdvisory.error}</p>}
                  {schemesAdvisory.data && <p className="whitespace-pre-wrap">{schemesAdvisory.data}</p>}
                </div>
              </div>
            )}
        </Card>
    );
};

const PeerQAForumCard: React.FC = () => {
    const mockQuestions = [
      { id: 1, q: "എൻ്റെ തെങ്ങിൻ്റെ ഓലകൾ മഞ്ഞളിക്കുന്നു, എന്താണ് പ്രതിവിധി?" },
      { id: 2, q: "വാഴ കൃഷിക്ക് ഏറ്റവും നല്ല വളം ഏതാണ്?" },
      { id: 3, q: "നെല്ലിന് മുഞ്ഞ ശല്യം എങ്ങനെ നിയന്ത്രിക്കാം?" },
    ];
    return (
        <Card className="col-span-1 lg:col-span-2">
            <CardHeader icon={SparklesIcon} title="Peer Q&A Forum" subtitle="See questions from other farmers in your community." />
            <div className="space-y-3">
                {mockQuestions.map(item => (
                    <div key={item.id} className="text-sm p-3 bg-slate-50 rounded-md border border-slate-200 cursor-pointer hover:border-emerald-400">
                        <p className="font-semibold text-slate-700">{item.q}</p>
                    </div>
                ))}
            </div>
        </Card>
    );
};

const FeaturePhoneHelplineCard: React.FC = () => (
    <Card>
         <CardHeader icon={PhoneIcon} title="Feature Phone Helpline" subtitle="Get basic advice on any phone, no internet needed." />
         <div className="text-center p-4 bg-slate-100 rounded-lg">
            <p className="text-xs text-slate-500">For 24/7 AI-powered advisory, give a missed call to:</p>
            <p className="text-2xl font-bold text-emerald-700 my-2">+91 0477 225 2626</p>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">Toll-Free AI Helpline</span>
         </div>
    </Card>
);


export const DashboardPage: React.FC<DashboardPageProps> = (props) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AIAdvisoryCard {...props} />
        <CropDiseaseDetectionCard {...props} />
        <GovernmentSchemesCard {...props} />
        <PeerQAForumCard/>
        <FeaturePhoneHelplineCard />
    </div>
  );
};