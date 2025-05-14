
import React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/Auth/LoginForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, Cloud, Database, MessageSquare, Activity, Code } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-card">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">LLM Playground</h1>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate("/dashboard")}>
            Dashboard
          </Button>
        </div>
      </header>

      <main className="flex-1">
        <section className="container px-4 py-12 md:py-24 lg:py-32 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 space-y-6">
            <Badge className="mb-4">Research & Development</Badge>
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
              Advanced <span className="gradient-text">LLM Playground</span> for AI Researchers
            </h1>
            <p className="text-lg text-muted-foreground">
              Experiment with multiple language models, fine-tune for specific use cases, and leverage 
              advanced prompt engineering techniques in one powerful platform.
            </p>
            <div className="flex flex-wrap gap-4 py-4">
              <div className="flex items-center gap-2">
                <Cloud className="h-5 w-5 text-primary" />
                <span>Cloud providers</span>
              </div>
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                <span>Model fine-tuning</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                <span>Advanced prompting</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                <span>Performance analytics</span>
              </div>
              <div className="flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                <span>API integration</span>
              </div>
            </div>
          </div>
          
          <div className="flex-1 max-w-md w-full">
            <LoginForm />
          </div>
        </section>
        
        <section className="container px-4 py-12 grid md:grid-cols-3 gap-6">
          <div className="bg-card border rounded-lg p-6 card-hover">
            <Cloud className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">Multi-Model Access</h3>
            <p className="text-muted-foreground">
              Connect to multiple LLMs from different cloud providers including OpenAI, Anthropic, Google, and more.
            </p>
          </div>
          
          <div className="bg-card border rounded-lg p-6 card-hover">
            <Database className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">Research & Fine-Tuning</h3>
            <p className="text-muted-foreground">
              Train and fine-tune models on your datasets for improved performance on specific tasks and domains.
            </p>
          </div>
          
          <div className="bg-card border rounded-lg p-6 card-hover">
            <Activity className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">Analytics & Insights</h3>
            <p className="text-muted-foreground">
              Track performance metrics, analyze response patterns, and optimize your models with detailed analytics.
            </p>
          </div>
        </section>
      </main>
      
      <footer className="border-t bg-card">
        <div className="container px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            <span className="font-semibold">LLM Playground</span>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; 2025 LLM Playground. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
