import PromptCard from "./PromptCard";

const ComparisonView = () => {
  return (
    <div className="p-8 h-screen overflow-hidden flex flex-col">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0 overflow-hidden">
        <PromptCard title="Prompt 1" responseTitle="Response" />
        <PromptCard title="Prompt 2" responseTitle="Response" />
        <PromptCard title="Prompt 3" responseTitle="Response" />
      </div>
    </div>
  );
};

export default ComparisonView;
