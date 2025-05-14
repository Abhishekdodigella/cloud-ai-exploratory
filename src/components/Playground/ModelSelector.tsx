
import React from "react";
import { Check, Cloud, Server } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

export interface ModelOption {
  value: string;
  label: string;
  provider: "openai" | "anthropic" | "google" | "meta" | "azure" | "aws" | "custom";
  description?: string;
  tags?: string[];
}

const modelOptions: ModelOption[] = [
  {
    value: "gpt-4o",
    label: "GPT-4o",
    provider: "openai",
    description: "OpenAI's most capable model for text and vision tasks",
    tags: ["multimodal", "premium"]
  },
  {
    value: "claude-3-opus",
    label: "Claude 3 Opus",
    provider: "anthropic",
    description: "Anthropic's most powerful model for complex tasks",
    tags: ["premium"]
  },
  {
    value: "gemini-pro",
    label: "Gemini Pro",
    provider: "google",
    description: "Google's advanced model for generating text, code, and more",
    tags: ["multimodal"]
  },
  {
    value: "llama-3-70b",
    label: "Llama 3 70B",
    provider: "meta",
    description: "Meta's open weights large language model",
    tags: ["open"]
  },
  {
    value: "gpt-4-azure",
    label: "GPT-4 (Azure)",
    provider: "azure",
    description: "Azure's deployment of OpenAI's GPT-4",
    tags: ["enterprise"]
  },
  {
    value: "titan-express",
    label: "Amazon Titan Express",
    provider: "aws",
    description: "AWS's foundation model for text understanding and generation",
    tags: ["enterprise"]
  },
  {
    value: "custom-model",
    label: "Custom Model",
    provider: "custom",
    description: "Your own fine-tuned or self-hosted model",
    tags: ["custom"]
  }
];

interface ModelSelectorProps {
  selectedModel: string;
  onSelectModel: (model: string) => void;
}

const providerIcons: Record<string, React.ReactNode> = {
  openai: <div className="w-4 h-4 rounded-full bg-green-500"></div>,
  anthropic: <div className="w-4 h-4 rounded-full bg-violet-500"></div>,
  google: <div className="w-4 h-4 rounded-full bg-blue-500"></div>,
  meta: <div className="w-4 h-4 rounded-full bg-indigo-500"></div>,
  azure: <div className="w-4 h-4 rounded-full bg-blue-600"></div>,
  aws: <div className="w-4 h-4 rounded-full bg-orange-500"></div>,
  custom: <div className="w-4 h-4 rounded-full bg-gray-500"></div>
};

const ModelSelector: React.FC<ModelSelectorProps> = ({ selectedModel, onSelectModel }) => {
  const [open, setOpen] = React.useState(false);
  
  const selectedModelData = modelOptions.find((model) => model.value === selectedModel);

  return (
    <div className="flex flex-col space-y-1 w-full">
      <label className="text-sm font-medium">Model</label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between h-10 border-input input-focus"
          >
            <div className="flex items-center gap-2 truncate">
              {selectedModelData && (
                <>
                  {providerIcons[selectedModelData.provider]}
                  <span>{selectedModelData.label}</span>
                </>
              )}
              {!selectedModelData && <span>Select a model</span>}
            </div>
            <Cloud className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command className="w-full">
            <CommandInput placeholder="Search models..." className="h-9" />
            <CommandEmpty>No model found.</CommandEmpty>
            <CommandGroup>
              {modelOptions.map((model) => (
                <CommandItem
                  key={model.value}
                  value={model.value}
                  onSelect={() => {
                    onSelectModel(model.value);
                    setOpen(false);
                  }}
                  className="py-2"
                >
                  <div className="flex items-center gap-2">
                    {providerIcons[model.provider]}
                    <div className="flex flex-col">
                      <div className="font-medium">{model.label}</div>
                      <div className="text-xs text-muted-foreground">{model.description}</div>
                    </div>
                  </div>
                  
                  <div className="ml-auto flex items-center gap-1">
                    {model.tags?.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <Check
                    className={cn(
                      "ml-2 h-4 w-4",
                      selectedModel === model.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ModelSelector;
