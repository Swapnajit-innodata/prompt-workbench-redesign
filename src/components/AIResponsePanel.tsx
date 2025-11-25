import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Copy, Download } from "lucide-react";

const AIResponsePanel = () => {
  return (
    <div className="flex flex-col h-full border border-panel-border rounded-lg bg-card overflow-hidden">
      <div className="border-b border-panel-border px-4 py-3 bg-muted/30 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-foreground">AI Response Panel</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Real-time output</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <Copy className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <Download className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
      <ScrollArea className="flex-1 p-4">
        <div className="font-mono text-sm text-muted-foreground leading-relaxed">
          <p className="mb-3">Response will appear here...</p>
          <div className="p-3 bg-editor-bg rounded border border-border/50">
            <code className="text-primary">// Waiting for input</code>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default AIResponsePanel;
