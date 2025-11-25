import { Button } from "@/components/ui/button";
import { Plus, MessageSquare, Save } from "lucide-react";

interface SidebarProps {
  activeView: 'comparison' | 'conversation';
  onViewChange: (view: 'comparison' | 'conversation') => void;
}

const Sidebar = ({ activeView, onViewChange }: SidebarProps) => {
  return (
    <div className="w-64 h-screen bg-sidebar-bg border-r border-sidebar-border flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-xl font-bold text-foreground">Prompt Workbench</h1>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        <Button 
          variant={activeView === 'comparison' ? 'secondary' : 'ghost'}
          className={`w-full justify-start ${activeView === 'comparison' ? 'text-primary hover:text-primary' : ''}`}
          onClick={() => onViewChange('comparison')}
        >
          <Plus className="mr-2 h-4 w-4" />
          New Prompt
        </Button>
        
        <Button 
          variant={activeView === 'conversation' ? 'secondary' : 'ghost'}
          className={`w-full justify-start ${activeView === 'conversation' ? 'text-primary hover:text-primary' : ''}`}
          onClick={() => onViewChange('conversation')}
        >
          <MessageSquare className="mr-2 h-4 w-4" />
          Multi-turn conversation
        </Button>
        
        <Button variant="ghost" className="w-full justify-start">
          <Save className="mr-2 h-4 w-4" />
          Save
        </Button>
      </nav>
    </div>
  );
};

export default Sidebar;
