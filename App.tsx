
import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardPage } from './pages/Dashboard';
import { generateTextAdvisory, generateVisualAdvisory, generateSchemesAdvisory } from './services/geminiService';
import type { AdvisoryResponse } from './types';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState('Dashboard');

  const [textAdvisory, setTextAdvisory] = useState<AdvisoryResponse>({ data: null, error: null });
  const [isTextLoading, setIsTextLoading] = useState(false);

  const [visualAdvisory, setVisualAdvisory] = useState<AdvisoryResponse>({ data: null, error: null });
  const [isVisualLoading, setIsVisualLoading] = useState(false);

  const [schemesAdvisory, setSchemesAdvisory] = useState<AdvisoryResponse>({ data: null, error: null });
  const [isSchemesLoading, setIsSchemesLoading] = useState(false);

  const handleTextQuery = async (prompt: string) => {
    if (!prompt.trim()) return;
    setIsTextLoading(true);
    setTextAdvisory({ data: null, error: null });
    try {
      const responseText = await generateTextAdvisory(prompt);
      setTextAdvisory({ data: responseText, error: null });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setTextAdvisory({ data: null, error: errorMessage });
    } finally {
      setIsTextLoading(false);
    }
  };

  const handleVisualQuery = async (image: { data: string; mimeType: string }) => {
    setIsVisualLoading(true);
    setVisualAdvisory({ data: null, error: null });
    const prompt = "Analyze this crop image for diseases, pests, or nutrient deficiencies and provide a concise advisory in simple Malayalam.";
    try {
      const responseText = await generateVisualAdvisory(prompt, image.data, image.mimeType);
      setVisualAdvisory({ data: responseText, error: null });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setVisualAdvisory({ data: null, error: errorMessage });
    } finally {
      setIsVisualLoading(false);
    }
  };
  
  const handleSchemesQuery = async (location: string, crops: string) => {
    setIsSchemesLoading(true);
    setSchemesAdvisory({ data: null, error: null });
    try {
      const responseText = await generateSchemesAdvisory(location, crops);
      setSchemesAdvisory({ data: responseText, error: null });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setSchemesAdvisory({ data: null, error: errorMessage });
    } finally {
      setIsSchemesLoading(false);
    }
  };

  const renderPage = () => {
    switch (activePage) {
      case 'Dashboard':
        return (
          <DashboardPage
            onTextSubmit={handleTextQuery}
            textAdvisory={textAdvisory}
            isTextLoading={isTextLoading}
            onVisualSubmit={handleVisualQuery}
            visualAdvisory={visualAdvisory}
            isVisualLoading={isVisualLoading}
            onSchemesSubmit={handleSchemesQuery}
            schemesAdvisory={schemesAdvisory}
            isSchemesLoading={isSchemesLoading}
          />
        );
      case 'Disease Detection':
        return <div className="text-center p-10 bg-white rounded-lg shadow">Disease Detection Page Coming Soon...</div>;
      case 'Govt. Schemes':
        return <div className="text-center p-10 bg-white rounded-lg shadow">Government Schemes Page Coming Soon...</div>;
      case 'Q&A Forum':
        return <div className="text-center p-10 bg-white rounded-lg shadow">Q&A Forum Page Coming Soon...</div>;
      default:
        return <DashboardPage
            onTextSubmit={handleTextQuery}
            textAdvisory={textAdvisory}
            isTextLoading={isTextLoading}
            onVisualSubmit={handleVisualQuery}
            visualAdvisory={visualAdvisory}
            isVisualLoading={isVisualLoading}
            onSchemesSubmit={handleSchemesQuery}
            schemesAdvisory={schemesAdvisory}
            isSchemesLoading={isSchemesLoading}
          />;
    }
  };

  return (
    <div className="flex min-h-screen font-sans">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div className="flex-1 flex flex-col bg-slate-50">
        <Header />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default App;
