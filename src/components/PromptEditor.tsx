import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const PromptEditor = () => {
  return (
    <div className="flex flex-col h-full border border-panel-border rounded-lg bg-card overflow-hidden">
      <div className="border-b border-panel-border px-4 py-3 bg-muted/30">
        <h2 className="text-sm font-semibold text-foreground">Prompt Editor</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Center workspace / code-like editor</p>
      </div>
      <div className="flex-1 p-4 overflow-auto">
        <Label htmlFor="prompt" className="text-xs text-muted-foreground uppercase tracking-wide mb-2 block">
          Enter your prompt
        </Label>
        <Textarea
          id="prompt"
          placeholder="Write your prompt here..."
          className="min-h-[300px] font-mono text-sm bg-editor-bg border-border resize-none focus-visible:ring-primary"
        />
      </div>
    </div>
  );
};

export default PromptEditor;
