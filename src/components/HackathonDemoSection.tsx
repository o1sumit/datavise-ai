import { Play, Shield, Zap, Users, Code, Eye, Database, MessageCircle } from "lucide-react";
import { useState } from "react";

const HackathonDemoSection = () => {
  const [activeDemoStep, setActiveDemoStep] = useState(0);

  const demoFlow = [
    {
      title: "Login & Authentication",
      icon: Shield,
      description: "JWT token management with secure session handling",
      features: ["OAuth integration", "Session persistence", "Role-based access"],
      color: "primary"
    },
    {
      title: "Dry Run Mode", 
      icon: Eye,
      description: "Show plan generation without execution",
      features: ["Query validation", "Safety checks", "Execution preview"],
      color: "accent"
    },
    {
      title: "Live Query Execution",
      icon: Zap,
      description: "Demonstrate safety guardrails in action",
      features: ["Real-time execution", "Error handling", "Result streaming"],
      color: "destructive"
    },
    {
      title: "Memory Learning",
      icon: Users,
      description: "Show personalized suggestions",
      features: ["Pattern recognition", "User adaptation", "Smart recommendations"],
      color: "secondary"
    },
    {
      title: "Multi-Database Switching",
      icon: Database,
      description: "MongoDB ↔ PostgreSQL ↔ MySQL",
      features: ["Seamless switching", "Schema detection", "Connection pooling"],
      color: "primary"
    },
    {
      title: "WebSocket Chat",
      icon: MessageCircle,
      description: "Real-time conversation with context",
      features: ["Live updates", "Context preservation", "Multi-session support"],
      color: "accent"
    }
  ];

  const sellingPoints = [
    {
      title: "Military-Grade Security",
      description: "Enterprise-level database protections",
      icon: Shield,
      metrics: ["0 SQL Injection vulnerabilities", "99.99% Threat detection", "<1ms Security validation"]
    },
    {
      title: "AI That Learns",
      description: "Personalization and memory system", 
      icon: Users,
      metrics: ["3 Learning profiles", "Pattern recognition", "Contextual suggestions"]
    },
    {
      title: "Universal Database Support",
      description: "One API for all databases",
      icon: Database,
      metrics: ["MongoDB support", "PostgreSQL native", "MySQL optimization"]
    },
    {
      title: "Production Ready",
      description: "Connection pooling, timeouts, logging",
      icon: Zap,
      metrics: ["Connection pooling", "Query timeouts", "Comprehensive logging"]
    }
  ];

  const uiFeatures = [
    {
      name: "Plan & Trace Viewer",
      description: "Show the AI's thinking process",
      icon: Eye,
      preview: "JSON visualization of query planning"
    },
    {
      name: "Dry Run Toggle", 
      description: "Safe testing without data modification",
      icon: Shield,
      preview: "Toggle between preview and execution modes"
    },
    {
      name: "Multi-Session Chat",
      description: "Persistent conversations",
      icon: MessageCircle,
      preview: "WebSocket-powered real-time chat"
    },
    {
      name: "HTTP Testing Panel",
      description: "Direct API interaction",
      icon: Code,
      preview: "Built-in API testing interface"
    }
  ];

  return (
    <section className="py-32 px-6 relative overflow-hidden bg-gradient-to-b from-primary/5 to-background">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-6 glass-card px-6 py-3 rounded-full">
            <Play className="w-6 h-6 text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">Hackathon Demo</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Live Demo
            <span className="block gradient-text">Experience</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Interactive demonstration showcasing enterprise-grade AI database intelligence 
            with military-level security and production-ready architecture.
          </p>
        </div>

        {/* Demo Flow */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-12">Visual Demo Flow</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {demoFlow.map((step, index) => (
              <div 
                key={index}
                className={`glass-card p-6 rounded-2xl cursor-pointer transition-all duration-500 hover-glow group ${
                  activeDemoStep === index ? 'ring-2 ring-primary/50 shadow-glow scale-105' : ''
                }`}
                onMouseEnter={() => setActiveDemoStep(index)}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 bg-gradient-${step.color} rounded-xl flex items-center justify-center text-2xl font-bold text-primary-foreground group-hover:scale-110 transition-transform`}>
                    {index + 1}
                  </div>
                  <step.icon className="w-6 h-6 text-primary" />
                </div>

                <h4 className="text-lg font-bold mb-2">{step.title}</h4>
                <p className="text-muted-foreground text-sm mb-4">{step.description}</p>

                <div className="space-y-2">
                  {step.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-gradient-primary rounded-full" />
                      <span className="text-xs text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Demo Flow Visualization */}
          <div className="glass-card p-8 rounded-3xl">
            <div className="flex items-center justify-between overflow-x-auto">
              {demoFlow.map((step, index) => (
                <div key={index} className="flex items-center min-w-0">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                    activeDemoStep === index 
                      ? `bg-gradient-${step.color} text-primary-foreground shadow-glow scale-110` 
                      : 'bg-muted/20 text-muted-foreground'
                  }`}>
                    <step.icon className="w-8 h-8" />
                  </div>
                  {index < demoFlow.length - 1 && (
                    <div className="w-12 h-0.5 bg-gradient-primary mx-4 flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Key Selling Points */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-12">Key Selling Points</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sellingPoints.map((point, index) => (
              <div key={index} className="glass-card p-6 rounded-2xl hover-glow group">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <point.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">{point.title}</h4>
                    <p className="text-muted-foreground">{point.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {point.metrics.map((metric, mIndex) => (
                    <div key={mIndex} className="flex items-center gap-3 p-2 bg-muted/5 rounded-lg">
                      <div className="w-2 h-2 bg-gradient-primary rounded-full" />
                      <span className="text-sm font-medium">{metric}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* UI Features Showcase */}
        <div className="glass-card p-8 rounded-3xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Interactive UI Features</h3>
            <p className="text-muted-foreground">
              Production-grade interface designed for developers and enterprise users
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {uiFeatures.map((feature, index) => (
              <div key={index} className="border border-border/50 bg-muted/5 rounded-xl p-6 hover-glow group">
                <div className="flex items-center gap-3 mb-3">
                  <feature.icon className="w-5 h-5 text-primary" />
                  <h4 className="font-bold">{feature.name}</h4>
                </div>
                
                <p className="text-muted-foreground text-sm mb-4">{feature.description}</p>
                
                <div className="code-block p-3 rounded-lg text-xs">
                  {feature.preview}
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12 p-8 bg-gradient-primary rounded-2xl">
            <h4 className="text-2xl font-bold text-primary-foreground mb-4">
              Experience the Future of Database Intelligence
            </h4>
            <p className="text-primary-foreground/80 mb-6">
              Revolutionary AI that thinks, learns, and protects your data with military-grade security
            </p>
            <div className="flex items-center justify-center gap-4">
              <button className="glass-card px-6 py-3 rounded-xl text-primary font-semibold hover-glow transition-all">
                Live Demo
              </button>
              <button className="border border-primary-foreground/20 text-primary-foreground px-6 py-3 rounded-xl hover:bg-primary-foreground/10 transition-all">
                View Documentation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HackathonDemoSection;