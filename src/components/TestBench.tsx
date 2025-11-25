import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Play, Plus } from "lucide-react";

const TestBench = () => {
  const variations = [
    { id: 1, name: "Variation A", status: "ready" },
    { id: 2, name: "Variation B", status: "ready" },
    { id: 3, name: "Control", status: "baseline" },
  ];

  return (
    <div className="flex flex-col h-full border border-panel-border rounded-lg bg-card overflow-hidden">
      <div className="border-b border-panel-border px-4 py-3 bg-muted/30 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-foreground">Test Bench</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Input variations, A/B testing</p>
        </div>
        <Button size="sm" variant="outline" className="h-7 text-xs border-primary/50 hover:bg-primary/10">
          <Plus className="h-3 w-3 mr-1" />
          Add Test
        </Button>
      </div>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-3">
          {variations.map((variation) => (
            <div
              key={variation.id}
              className="p-3 bg-editor-bg rounded border border-border hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">{variation.name}</span>
                <Badge
                  variant={variation.status === "baseline" ? "secondary" : "outline"}
                  className="text-xs"
                >
                  {variation.status}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                Test variation with different parameters
              </p>
              <Button size="sm" variant="outline" className="w-full h-7 text-xs">
                <Play className="h-3 w-3 mr-1" />
                Run Test
              </Button>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default TestBench;
