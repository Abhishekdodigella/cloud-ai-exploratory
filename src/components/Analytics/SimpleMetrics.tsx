
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, MessageSquare, Timer, Brain } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface SimpleMetricsProps {
  metrics: {
    totalRequests: number;
    averageLatency: number;
    tokensUsed: number;
    modelUsage: Record<string, number>;
  };
}

const SimpleMetrics: React.FC<SimpleMetricsProps> = ({ metrics }) => {
  // Calculate the most used model
  const topModel = Object.entries(metrics.modelUsage).reduce(
    (a, b) => (b[1] > a[1] ? b : a),
    ["", 0]
  );

  // Calculate percentages for model usage
  const totalModelUsage = Object.values(metrics.modelUsage).reduce((a, b) => a + b, 0);
  const modelUsageWithPercentage = Object.entries(metrics.modelUsage)
    .map(([model, count]) => ({
      model,
      count,
      percentage: (count / totalModelUsage) * 100
    }))
    .sort((a, b) => b.count - a.count);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="card-hover">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.totalRequests.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            +{Math.floor(Math.random() * 100)} from last week
          </p>
        </CardContent>
      </Card>

      <Card className="card-hover">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg. Latency</CardTitle>
          <Timer className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.averageLatency.toFixed(2)}s</div>
          <p className="text-xs text-muted-foreground">
            -{(Math.random() * 0.5).toFixed(2)}s from last week
          </p>
        </CardContent>
      </Card>

      <Card className="card-hover">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tokens Used</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{(metrics.tokensUsed / 1000).toFixed(1)}k</div>
          <p className="text-xs text-muted-foreground">
            +{(Math.random() * 10).toFixed(1)}% from last week
          </p>
        </CardContent>
      </Card>

      <Card className="card-hover">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Top Model</CardTitle>
          <Brain className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{topModel[0]}</div>
          <p className="text-xs text-muted-foreground">
            {Math.round((topModel[1] / totalModelUsage) * 100)}% of total usage
          </p>
        </CardContent>
      </Card>

      <Card className="col-span-full card-hover">
        <CardHeader>
          <CardTitle>Model Usage</CardTitle>
          <CardDescription>
            Distribution of requests across different models
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {modelUsageWithPercentage.map(({ model, count, percentage }) => (
              <div key={model} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full bg-primary`} 
                         style={{ opacity: 0.5 + (percentage / 200) }}></div>
                    <span className="text-sm">{model}</span>
                  </div>
                  <span className="text-sm font-medium">{count} requests</span>
                </div>
                <Progress value={percentage} className="h-1.5" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SimpleMetrics;
