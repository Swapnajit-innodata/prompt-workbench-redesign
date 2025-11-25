import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import ComparisonView from "@/components/ComparisonView";
import ConversationView from "@/components/ConversationView";

const Index = () => {
  const [activeView, setActiveView] = useState<'comparison' | 'conversation'>('comparison');

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      
      <main className="flex-1 overflow-auto">
        {activeView === 'comparison' ? <ComparisonView /> : <ConversationView />}
      </main>
    </div>
  );
};

export default Index;
