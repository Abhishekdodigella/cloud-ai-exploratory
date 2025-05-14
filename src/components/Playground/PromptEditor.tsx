
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Wand, RefreshCcw, Play, Code, MessageSquare } from "lucide-react";

interface PromptEditorProps {
  onSubmit: (prompt: string, settings: PromptSettings) => void;
  isLoading: boolean;
}

export interface PromptSettings {
  temperature: number;
  maxTokens: number;
  topP: number;
  systemPrompt: string;
}

const PromptEditor: React.FC<PromptEditorProps> = ({ onSubmit, isLoading }) => {
  const [prompt, setPrompt] = useState("");
  const [settings, setSettings] = useState<PromptSettings>({
    temperature: 0.7,
    maxTokens: 1000,
    topP: 1.0,
    systemPrompt: "You are a helpful AI assistant that provides accurate and concise information."
  });
  const [activeTab, setActiveTab] = useState("prompt");

  const handleChangeSettings = (key: keyof PromptSettings, value: number | string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    onSubmit(prompt, settings);
  };

  const generatePromptVariations = () => {
    // In a real app, this would call an API to generate variations
    const variations = [
      "Can you explain this concept as if I'm a beginner?",
      "Analyze the following scenario with technical depth.",
      "Compare and contrast these approaches."
    ];
    
    setPrompt(prev => {
      if (!prev.trim()) return variations[0];
      // In a real implementation, we'd use the existing prompt to generate relevant variations
      return prev + "\n\nVariation idea: " + variations[Math.floor(Math.random() * variations.length)];
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full">
      <Card className="flex-1 border-none shadow-none">
        <Tabs defaultValue="prompt" value={activeTab} onValueChange={setActiveTab} className="h-full">
          <div className="flex justify-between items-center mb-2">
            <TabsList>
              <TabsTrigger value="prompt" className="flex items-center gap-1">
                <MessageSquare className="w-4 h-4" />
                Prompt
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-1">
                <Code className="w-4 h-4" />
                Advanced
              </TabsTrigger>
            </TabsList>
            <div className="flex space-x-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={generatePromptVariations}
                className="text-xs flex items-center gap-1"
              >
                <Wand className="h-3 w-3" />
                Generate Variations
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setPrompt("")}
                className="text-xs"
              >
                <RefreshCcw className="h-3 w-3" />
                Clear
              </Button>
            </div>
          </div>

          <CardContent className="p-0 h-[calc(100%-40px)]">
            <TabsContent value="prompt" className="m-0 h-full">
              <Textarea
                placeholder="Enter your prompt here..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="resize-none h-full border-none shadow-none focus-visible:ring-0 p-4"
              />
            </TabsContent>

            <TabsContent value="settings" className="space-y-6 py-4 m-0">
              <div className="space-y-2">
                <Label htmlFor="systemPrompt">System Prompt</Label>
                <Textarea 
                  id="systemPrompt"
                  value={settings.systemPrompt}
                  onChange={(e) => handleChangeSettings("systemPrompt", e.target.value)}
                  placeholder="Instructions for the AI model..."
                  className="min-h-24"
                />
              </div>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="temperature">Temperature: {settings.temperature}</Label>
                  </div>
                  <Slider 
                    id="temperature"
                    min={0} 
                    max={2} 
                    step={0.1} 
                    value={[settings.temperature]}
                    onValueChange={(values) => handleChangeSettings("temperature", values[0])}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>More deterministic</span>
                    <span>More creative</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="maxTokens">Max Tokens: {settings.maxTokens}</Label>
                  <Input
                    id="maxTokens"
                    type="number"
                    min={1}
                    max={4000}
                    value={settings.maxTokens}
                    onChange={(e) => handleChangeSettings("maxTokens", parseInt(e.target.value) || 1000)}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="topP">Top-P: {settings.topP}</Label>
                  </div>
                  <Slider 
                    id="topP"
                    min={0} 
                    max={1} 
                    step={0.05} 
                    value={[settings.topP]}
                    onValueChange={(values) => handleChangeSettings("topP", values[0])}
                  />
                </div>
              </div>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>

      <div className="mt-4">
        <Button 
          type="submit" 
          className="w-full flex items-center gap-2" 
          disabled={!prompt.trim() || isLoading}
        >
          <Play className="w-4 h-4" />
          {isLoading ? "Running..." : "Run Prompt"}
        </Button>
      </div>
    </form>
  );
};

export default PromptEditor;
