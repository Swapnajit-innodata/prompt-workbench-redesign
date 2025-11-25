import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Copy, Settings, Upload, ArrowRight, Loader2 } from "lucide-react";

interface PromptCardProps {
  title: string;
  onCopy?: () => void;
  onCopilotClick?: () => void;
  onArrowClick?: () => void;
  responseTitle?: string;
  responseContent?: string;
}

const PromptCard = ({ title, onCopy, onCopilotClick, onArrowClick, responseTitle, responseContent }: PromptCardProps) => {
  const [promptValue, setPromptValue] = useState("");
  const [localResponse, setLocalResponse] = useState(responseContent || "");
  const [isCopilotLoading, setIsCopilotLoading] = useState(false);

  const handleSubmit = () => {
    if (promptValue.trim()) {
      // Generate dummy response
      const dummyResponse = `This is a dummy response for the prompt: "${promptValue}"\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;
      setLocalResponse(dummyResponse);
      if (onArrowClick) {
        onArrowClick();
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && promptValue.trim()) {
      handleSubmit();
    }
  };

  const handleCopilotClick = () => {
    const currentPrompt = promptValue.trim();
    if (currentPrompt && !isCopilotLoading) {
      setIsCopilotLoading(true);
      
      // Store original prompt value before processing
      const originalPrompt = currentPrompt;
      
      // Show loading for 1 second, then generate summarized prompt
      setTimeout(() => {
        // Generate summarization prompt using the specified format
        const summarizedPrompt = `Summarize the following: "${originalPrompt}"\n\nProvide a concise summary focusing on key points, main objectives, and actionable insights.`;
        
        // Update the prompt value
        setPromptValue(summarizedPrompt);
        setIsCopilotLoading(false);
        
        if (onCopilotClick) {
          onCopilotClick();
        }
      }, 1000);
    }
  };

  const isDisabled = !promptValue.trim() || isCopilotLoading;

  return (
    <div className="bg-prompt-card border border-border rounded-2xl p-6 shadow-sm flex flex-col h-full">
      <div className="flex items-center gap-2 flex-wrap mb-6">
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
        
        <Button variant="outline" size="sm" onClick={onCopy}>
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
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">{title}</h3>
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
                className={`absolute right-14 top-1/2 -translate-y-1/2 h-5 w-5 z-10 rounded transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 flex items-center justify-center ${
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
            className={`absolute right-3 top-1/2 -translate-y-1/2 h-7 w-7 p-0 z-10 rounded-full shadow-sm ${
              isDisabled 
                ? "bg-muted text-muted-foreground cursor-not-allowed opacity-50" 
                : "bg-primary hover:bg-primary/90 text-primary-foreground"
            }`}
            aria-label="Submit prompt"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Input 
            placeholder="Enter your prompt here..."
            className="pr-24"
            value={promptValue}
            onChange={(e) => setPromptValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
      </div>
      
      <div className="flex flex-col flex-1 min-h-0">
        <h3 className="text-lg font-semibold mb-3">{responseTitle || "Response"}</h3>
        <ScrollArea className="flex-1">
          <div className="text-sm text-muted-foreground whitespace-pre-wrap">
            {localResponse || responseContent || "Response will appear here..."}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default PromptCard;
