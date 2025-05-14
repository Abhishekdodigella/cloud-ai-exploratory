
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Code, Brain } from "lucide-react";

export interface ModelResponse {
  id: string;
  text: string;
  model: string;
  timestamp: string;
  metadata: {
    duration: number;
    tokenCount: {
      prompt: number;
      completion: number;
      total: number;
    };
  };
}

interface ResponseViewerProps {
  response: ModelResponse | null;
  isLoading: boolean;
}

const ResponseViewer: React.FC<ResponseViewerProps> = ({ response, isLoading }) => {
  if (isLoading) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Brain className="h-5 w-5" />
            <span>Model Response</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-32 flex flex-col gap-3">
            <div className="h-4 bg-muted rounded animate-pulse-slow"></div>
            <div className="h-4 bg-muted rounded animate-pulse-slow" style={{ animationDelay: "0.2s" }}></div>
            <div className="h-4 w-3/4 bg-muted rounded animate-pulse-slow" style={{ animationDelay: "0.4s" }}></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!response) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Brain className="h-5 w-5" />
            <span>Model Response</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
            <Brain className="h-10 w-10 mb-2 opacity-20" />
            <p>Run a prompt to see the model's response</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Brain className="h-5 w-5" />
          <span>Model Response</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="response">
          <TabsList className="w-full justify-start rounded-none border-b px-6">
            <TabsTrigger value="response">Response</TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-1">
              <Activity className="h-3 w-3" />
              Stats
            </TabsTrigger>
            <TabsTrigger value="json" className="flex items-center gap-1">
              <Code className="h-3 w-3" />
              JSON
            </TabsTrigger>
          </TabsList>
          <div className="px-6 py-4">
            <TabsContent value="response" className="m-0">
              <div className="whitespace-pre-wrap">{response.text}</div>
            </TabsContent>
            <TabsContent value="stats" className="m-0">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-secondary/50 p-4 rounded-md">
                    <div className="text-sm font-medium text-muted-foreground mb-1">Response Time</div>
                    <div className="text-xl font-semibold">{response.metadata.duration.toFixed(2)}s</div>
                  </div>
                  <div className="bg-secondary/50 p-4 rounded-md">
                    <div className="text-sm font-medium text-muted-foreground mb-1">Total Tokens</div>
                    <div className="text-xl font-semibold">{response.metadata.tokenCount.total}</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Token Usage</div>
                  <div className="bg-secondary/50 p-4 rounded-md">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-muted-foreground">Prompt</span>
                      <span className="text-sm font-medium">{response.metadata.tokenCount.prompt}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div 
                        className="bg-primary h-2.5 rounded-full" 
                        style={{ width: `${(response.metadata.tokenCount.prompt / response.metadata.tokenCount.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="bg-secondary/50 p-4 rounded-md">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-muted-foreground">Completion</span>
                      <span className="text-sm font-medium">{response.metadata.tokenCount.completion}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div 
                        className="bg-accent h-2.5 rounded-full" 
                        style={{ width: `${(response.metadata.tokenCount.completion / response.metadata.tokenCount.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="json" className="m-0">
              <pre className="bg-secondary/50 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(response, null, 2)}
              </pre>
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ResponseViewer;
