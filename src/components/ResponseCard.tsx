import { ScrollArea } from "@/components/ui/scroll-area";

interface ResponseCardProps {
  title: string;
  content?: string;
}

const ResponseCard = ({ title, content }: ResponseCardProps) => {
  return (
    <div className="bg-prompt-card border border-border rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <ScrollArea className="h-[200px]">
        <div className="text-sm text-muted-foreground whitespace-pre-wrap">
          {content || "Response will appear here..."}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ResponseCard;
