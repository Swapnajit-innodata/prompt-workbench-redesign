import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Copy, Settings, Upload, ArrowRight, ChevronDown, Loader2 } from "lucide-react";

interface Conversation {
  id: number;
  prompt: string;
  response: string;
}

const ConversationView = () => {
  const [promptValue, setPromptValue] = useState("");
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());
  const [isCopilotLoading, setIsCopilotLoading] = useState(false);

  const handleSubmit = () => {
    if (promptValue.trim()) {
      // Generate dummy response
      const dummyResponse = `This is a dummy response for the prompt: "${promptValue}"\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;
      
      const newConversation: Conversation = {
        id: Date.now(),
        prompt: promptValue,
        response: dummyResponse,
      };
      
      setConversations([...conversations, newConversation]);
      setPromptValue("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && promptValue.trim()) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleCopilotClick = () => {
    const currentPrompt = promptValue.trim();
    if (currentPrompt && !isCopilotLoading) {
      setIsCopilotLoading(true);
      
      const originalPrompt = currentPrompt;
      
      setTimeout(() => {
        const summarizedPrompt = `Summarize the following: "${originalPrompt}"\n\nProvide a concise summary focusing on key points, main objectives, and actionable insights.`;
        setPromptValue(summarizedPrompt);
        setIsCopilotLoading(false);
      }, 1000);
    }
  };

  const toggleExpanded = (id: number) => {
    const newExpanded = new Set(expandedIds);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedIds(newExpanded);
  };

  const isDisabled = !promptValue.trim() || isCopilotLoading;

  return (
    <div className="p-8 max-w-4xl flex flex-col h-[calc(100vh-2rem)]">
      <div className="bg-prompt-card border border-border rounded-2xl p-6 mb-6 shadow-sm">
        <div className="flex items-center gap-2 flex-wrap mb-4">
          <Select defaultValue="gpt-4">
            <SelectTrigger className="w-[140px] h-9">
              <SelectValue placeholder="Select Model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gpt-4">GPT-4</SelectItem>
              <SelectItem value="gpt-3.5">GPT-3.5</SelectItem>
              <SelectItem value="claude">Claude</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="sm">
            <Copy className="h-4 w-4 mr-1" />
            copy
          </Button>
          
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-1" />
            Parameters
          </Button>
          
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-1" />
            +file
          </Button>
          
          <Button variant="outline" size="sm">
            Select System Prompt
          </Button>
        </div>
        
        <div>
          <h3 className="text-base font-semibold mb-2">Write/Select System Prompt</h3>
          <Input 
            placeholder="Enter system prompt..."
            className="h-8"
          />
        </div>
      </div>
      
      <div className="flex-1 mb-6 flex flex-col">
        <h3 className="text-base font-semibold mb-4">Prompt History</h3>
        <ScrollArea className="flex-1">
          <div className="space-y-4">
            {conversations.map((conv) => (
            <Collapsible
              key={conv.id}
              open={expandedIds.has(conv.id)}
              onOpenChange={() => toggleExpanded(conv.id)}
            >
              <div className="bg-prompt-card border border-border rounded-2xl shadow-sm">
                <CollapsibleTrigger className="w-full">
                  <div className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors rounded-2xl">
                    <div className="flex-1 text-left">
                      <div className="font-semibold mb-1">User Prompt</div>
                      <div className="text-sm text-muted-foreground line-clamp-1">
                        {conv.prompt}
                      </div>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${
                        expandedIds.has(conv.id) ? "transform rotate-180" : ""
                      }`}
                    />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="px-4 pb-4 space-y-4 border-t border-border pt-4">
                    <div>
                      <div className="font-semibold mb-2 text-sm">User Prompt</div>
                      <div className="text-sm text-muted-foreground whitespace-pre-wrap bg-muted/30 p-3 rounded-lg">
                        {conv.prompt}
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold mb-2 text-sm">Response</div>
                      <div className="text-sm text-muted-foreground whitespace-pre-wrap bg-muted/30 p-3 rounded-lg">
                        {conv.response}
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="bg-prompt-card border border-border rounded-2xl p-4 shadow-sm">
        <h3 className="text-base font-semibold mb-3">User Prompt</h3>
        <div className="relative">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  handleCopilotClick();
                }}
                disabled={!promptValue.trim() || isCopilotLoading}
                className={`absolute right-14 top-3 h-5 w-5 z-10 rounded transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 flex items-center justify-center ${
                  !promptValue.trim() || isCopilotLoading
                    ? "cursor-not-allowed opacity-50" 
                    : "cursor-pointer hover:opacity-80"
                }`}
                aria-label="Summarize prompt"
              >
                {isCopilotLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <img 
                    src={`${import.meta.env.BASE_URL}copilot-icon.svg`}
                    alt="Copilot" 
                    className="h-5 w-5"
                  />
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Summarize prompt</p>
            </TooltipContent>
          </Tooltip>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isDisabled}
            size="sm"
            className={`absolute right-3 top-3 h-7 w-7 p-0 z-10 rounded-full shadow-sm ${
              isDisabled 
                ? "bg-muted text-muted-foreground cursor-not-allowed opacity-50" 
                : "bg-primary hover:bg-primary/90 text-primary-foreground"
            }`}
            aria-label="Submit prompt"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Textarea
            placeholder="Enter your prompt here..."
            className="pr-24 min-h-[80px] resize-none"
            value={promptValue}
            onChange={(e) => setPromptValue(e.target.value)}
            onKeyDown={handleKeyPress}
          />
        </div>
      </div>
    </div>
  );
};

export default ConversationView;
