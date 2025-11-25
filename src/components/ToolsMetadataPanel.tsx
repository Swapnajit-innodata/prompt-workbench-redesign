import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

const ToolsMetadataPanel = () => {
  return (
    <div className="flex flex-col h-full border border-panel-border rounded-lg bg-card overflow-hidden">
      <div className="border-b border-panel-border px-4 py-3 bg-muted/30">
        <h2 className="text-sm font-semibold text-foreground">Tools & Metadata</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Variables, models, system prompts</p>
      </div>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="model" className="text-xs text-muted-foreground uppercase tracking-wide">
              Model
            </Label>
            <Select defaultValue="gpt-4">
              <SelectTrigger id="model" className="bg-editor-bg border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt-4">GPT-4</SelectItem>
                <SelectItem value="gpt-3.5">GPT-3.5</SelectItem>
                <SelectItem value="claude">Claude</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="temperature" className="text-xs text-muted-foreground uppercase tracking-wide">
              Temperature: <span className="text-primary font-mono">0.7</span>
            </Label>
            <Slider
              id="temperature"
              defaultValue={[0.7]}
              max={1}
              step={0.1}
              className="[&_[role=slider]]:bg-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="max-tokens" className="text-xs text-muted-foreground uppercase tracking-wide">
              Max Tokens
            </Label>
            <Input
              id="max-tokens"
              type="number"
              defaultValue={2048}
              className="bg-editor-bg border-border font-mono"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="system-prompt" className="text-xs text-muted-foreground uppercase tracking-wide">
              System Prompt
            </Label>
            <Input
              id="system-prompt"
              placeholder="You are a helpful assistant..."
              className="bg-editor-bg border-border"
            />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default ToolsMetadataPanel;
