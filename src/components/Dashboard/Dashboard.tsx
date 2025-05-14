import React, { useState, useEffect } from "react";
import ModelSelector from "../Playground/ModelSelector";
import PromptEditor, { PromptSettings } from "../Playground/PromptEditor";
import ResponseViewer, { ModelResponse } from "../Playground/ResponseViewer";
import SimpleMetrics from "../Analytics/SimpleMetrics";
import { useAuth } from "../Auth/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Brain, Database, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { v4 } from "@/lib/utils"; // Import v4 correctly from utils

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [selectedModel, setSelectedModel] = useState("gpt-4o");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<ModelResponse | null>(null);
  
  const mockMetrics = {
    totalRequests: 1287,
    averageLatency: 0.82,
    tokensUsed: 458795,
    modelUsage: {
      "GPT-4o": 532,
      "Claude 3": 314,
      "Gemini Pro": 243,
      "Llama 3": 198
    }
  };

  const handlePromptSubmit = async (prompt: string, settings: PromptSettings) => {
    setIsLoading(true);
    
    try {
      // Simulate API call with random response time
      const startTime = Date.now();
      const responseTime = 500 + Math.random() * 2000;
      await new Promise(resolve => setTimeout(resolve, responseTime));
      
      const promptTokens = Math.ceil(prompt.length / 4);
      const completionTokens = Math.ceil(prompt.length / 2);
      
      // Generate mock response based on the prompt
      let responseText = "";
      
      if (prompt.toLowerCase().includes("explain")) {
        responseText = `Here's an explanation of the concept:\n\n${generateMockExplanation()}`;
      } else if (prompt.toLowerCase().includes("compare")) {
        responseText = `Here's a comparison:\n\n${generateMockComparison()}`;
      } else if (prompt.toLowerCase().includes("list") || prompt.toLowerCase().includes("what are")) {
        responseText = `Here's a list of items:\n\n${generateMockList()}`;
      } else {
        responseText = generateMockResponse();
      }
      
      // Create response object
      const newResponse: ModelResponse = {
        id: v4(),
        text: responseText,
        model: selectedModel,
        timestamp: new Date().toISOString(),
        metadata: {
          duration: (Date.now() - startTime) / 1000,
          tokenCount: {
            prompt: promptTokens,
            completion: completionTokens,
            total: promptTokens + completionTokens
          }
        }
      };
      
      setResponse(newResponse);
      toast.success("Response generated successfully!");
      
    } catch (error) {
      console.error("Error generating response:", error);
      toast.error("Failed to generate response");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <header className="border-b bg-card">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Brain className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">LLM Playground</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                {user?.name.charAt(0)}
              </div>
              <div className="ml-2">
                <p className="text-sm font-medium">{user?.name}</p>
                <div className="flex items-center">
                  <Badge variant="outline" className="text-xs">
                    {user?.role}
                  </Badge>
                  {user?.organization && (
                    <span className="text-xs text-muted-foreground ml-1">
                      · {user.organization}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
      </header>
      
      <div className="container px-4 py-6 flex-1 overflow-auto">
        <Tabs defaultValue="playground" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="playground" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Playground
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="playground" className="space-y-6 m-0">
            <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
              <div className="flex flex-col space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Configuration
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ModelSelector 
                      selectedModel={selectedModel} 
                      onSelectModel={setSelectedModel} 
                    />
                  </CardContent>
                </Card>
                
                <Card className="flex-1">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Database className="h-5 w-5" />
                      Resources
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">Saved Prompts</h3>
                        <div className="bg-secondary/50 text-secondary-foreground rounded-md p-2 text-sm">
                          No saved prompts yet
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">Recent Sessions</h3>
                        <div className="bg-secondary/50 text-secondary-foreground rounded-md p-2 text-sm">
                          No recent sessions
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-rows-[1fr_1fr] gap-6 h-[calc(100vh-180px)]">
                <Card className="min-h-64">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Prompt Editor
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 h-[calc(100%-60px)]">
                    <PromptEditor onSubmit={handlePromptSubmit} isLoading={isLoading} />
                  </CardContent>
                </Card>
                
                <ResponseViewer response={response} isLoading={isLoading} />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics" className="m-0">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Analytics Dashboard
                </CardTitle>
                <CardDescription>
                  Overview of your LLM model usage and performance metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SimpleMetrics metrics={mockMetrics} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// Helper functions to generate mock responses
function generateMockExplanation() {
  return "The concept involves integrating multiple large language models (LLMs) to create a more robust and versatile system. By combining models with different strengths, the system can leverage the unique capabilities of each model while mitigating their individual weaknesses.\n\nThis approach, often called model ensembling, allows for more consistent responses and better handling of edge cases that might confuse a single model.";
}

function generateMockComparison() {
  return "| Feature | Model A | Model B |\n|---------|---------|--------|\n| Parameters | 7B | 70B |\n| Training Data | 1T tokens | 8T tokens |\n| Context Length | 4K | 32K |\n| Inference Speed | Faster | Slower |\n| Reasoning | Good | Excellent |\n\nModel A excels in efficiency and speed, making it suitable for applications with latency constraints, while Model B provides superior reasoning and handles complex tasks more effectively at the cost of higher computational requirements.";
}

function generateMockList() {
  return "1. Prompt engineering techniques\n2. Few-shot learning strategies\n3. Chain-of-thought prompting\n4. Output format control\n5. System message optimization\n6. Context window management\n7. Retrieval-augmented generation";
}

function generateMockResponse() {
  return "Based on my analysis, the optimal approach would be to implement a retrieval-augmented generation (RAG) system that combines the strengths of both dense retrieval and sparse retrieval methods. This hybrid approach can significantly improve the quality and relevance of generated responses.\n\nThe system would first use a vector database to find semantically similar content, then apply keyword-based filtering to ensure precision. For your specific use case, I recommend starting with a smaller model fine-tuned on domain-specific data rather than immediately deploying a larger, more general model.";
}

export default Dashboard;
