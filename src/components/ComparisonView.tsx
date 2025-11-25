import PromptCard from "./PromptCard";

const ComparisonView = () => {
  return (
    <div className="p-8 h-full flex flex-col">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        <PromptCard title="Prompt 1" responseTitle="Response 1" />
        <PromptCard title="Prompt 2" responseTitle="Response 2" />
        <PromptCard title="Prompt 3" responseTitle="Response 3" />
      </div>
    </div>
  );
};

export default ComparisonView;
