import { Brain, Database, Shield, Zap, MessageSquare, Code, BarChart, Users } from "lucide-react";
import { useState } from "react";

const features = [
  {
    icon: Brain,
    title: "Revolutionary AI Architecture",
    subtitle: "Analyze Workflow",
    description: "Advanced AI pipeline with live dry-run previews, multi-database support, and intelligent decision making that understands context and prevents errors before they happen.",
    details: [
      "Live dry-run query previews with safety validation",
      "Multi-database support: MongoDB, PostgreSQL, MySQL",
      "Context-aware query planning and optimization",
      "Real-time schema detection and caching system"
    ]
  },
  {
    icon: Shield,
    title: "Enterprise-Grade Security", 
    subtitle: "Zero Compromise Protection",
    description: "Comprehensive security guardrails that prevent destructive operations, SQL injection attacks, and unauthorized data access with enterprise audit trails.",
    details: [
      "Parameterized queries only - zero SQL injection risk",
      "Blocks dangerous operations (DROP, TRUNCATE, ALTER)",
      "Enforces WHERE clauses on UPDATE/DELETE operations",
      "Smart MongoDB guardrails against $where/$function exploits"
    ]
  },
  {
    icon: Zap,
    title: "Cutting-Edge Performance",
    subtitle: "10x Faster Than Traditional Approaches",
    description: "Persistent Schema Registry and intelligent connection pooling deliver unprecedented performance with TTL-based caching and smart optimization.",
    details: [
      "Persistent Schema Registry - 10x faster processing",
      "Intelligent connection pooling for all database types", 
      "Query timeout protection and result set limits",
      "TTL-based schema caching with on-demand refresh"
    ]
  },
  {
    icon: MessageSquare,
    title: "Smart Query Intelligence",
    subtitle: "Natural Language Understanding",
    description: "Advanced NLP that converts vague business questions into precise database queries with contextual understanding and learning capabilities.",
    details: [
      "Capability Profiling: Auto-detects database capabilities",
      "Schema Keyword Matching: Maps language to actual tables",
      "SQL Insights Engine: Handles vague queries intelligently",
      "Memory & Learning: Remembers patterns and preferences"
    ]
  },
  {
    icon: Code,
    title: "Advanced Chat System",
    subtitle: "Real-time Conversations",
    description: "WebSocket-powered real-time conversations with session management, context memory, and adaptive user experience based on skill level.",
    details: [
      "WebSocket-powered real-time conversations",
      "Session management with context memory",
      "User-specific learning profiles (beginner → advanced)",
      "Conversational continuity across multiple queries"
    ]
  },
  {
    icon: BarChart,
    title: "Developer Experience",
    subtitle: "Built for Productivity",
    description: "Interactive playground, comprehensive API documentation, and multiple response formats designed for maximum developer productivity and ease of integration.",
    details: [
      "Interactive playground with login-first flow",
      "Live plan visualization and query tracing",
      "HTTP API with comprehensive Swagger documentation",
      "Multiple response formats (minimal vs verbose debugging)"
    ]
  }
];

const FeaturesSection = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  
  return (
    <section className="py-16 px-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-black" />
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-6 glass-card px-6 py-3 rounded-full">
            <Zap className="w-6 h-6 text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">Revolutionary Features</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Beyond Traditional
            <span className="block gradient-text">Database Interaction</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience groundbreaking features that redefine how developers interact with databases. 
            Every component designed for security, performance, and intelligence.
          </p>
        </div>

        {/* Interactive Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`glass-card p-8 rounded-2xl cursor-pointer transition-all duration-500 hover-glow group ${
                activeFeature === index ? 'ring-2 ring-primary/50 shadow-glow' : ''
              }`}
              onMouseEnter={() => setActiveFeature(index)}
            >
              {/* Feature Icon */}
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                
                <div className="mb-4">
                  <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-primary font-medium">{feature.subtitle}</p>
                </div>
              </div>

              {/* Feature Description */}
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {feature.description}
              </p>

              {/* Feature Details */}
              <div className={`transition-all duration-500 ${
                activeFeature === index ? 'opacity-100 max-h-96' : 'opacity-70 max-h-32 overflow-hidden'
              }`}>
                <ul className="space-y-3">
                  {feature.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start gap-3 text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hover Effect Indicator */}
              <div className="mt-6 h-1 bg-gradient-primary rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </div>
          ))}
        </div>

        {/* Workflow Visualization */}
        {/* <div className="mt-24 text-center">
          <h3 className="text-3xl font-bold mb-12 gradient-text">Analyze Workflow</h3>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 max-w-4xl mx-auto">
            {[
              { title: "Plan", desc: "AI analyzes query intent", color: "primary" },
              { title: "Execute", desc: "Safe execution with guardrails", color: "accent" }, 
              { title: "Analyze", desc: "Results optimization & learning", color: "secondary" }
            ].map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className={`w-20 h-20 bg-${step.color}/20 rounded-full flex items-center justify-center mb-4 pulse-glow`}>
                  <div className={`w-12 h-12 bg-${step.color} rounded-full flex items-center justify-center`}>
                    <span className="text-white font-bold">{index + 1}</span>
                  </div>
                </div>
                
                <h4 className="font-bold text-lg mb-2">{step.title}</h4>
                <p className="text-muted-foreground text-sm text-center max-w-32">{step.desc}</p>
                
                {index < 2 && (
                  <div className="hidden md:block w-24 h-px bg-gradient-to-r from-primary to-accent ml-24 mt-8" />
                )}
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default FeaturesSection;