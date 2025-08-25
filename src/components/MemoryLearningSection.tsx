import { Brain, User, MessageSquare, TrendingUp, Clock, Target } from "lucide-react";
import { useState } from "react";

const MemoryLearningSection = () => {
  const [activeProfile, setActiveProfile] = useState(0);

  const learningProfiles = [
    {
      level: "Beginner",
      icon: User,
      color: "accent",
      queries: ["Show me all users", "What's in my database?", "List products"],
      patterns: ["Basic CRUD operations", "Simple filtering", "Direct table access"],
      insights: "Prefers simple, direct queries with guided suggestions"
    },
    {
      level: "Intermediate", 
      icon: TrendingUp,
      color: "primary",
      queries: ["Monthly sales by region", "Users who haven't logged in", "Top selling categories"],
      patterns: ["Aggregations", "Date filtering", "JOIN operations"],
      insights: "Uses business logic, needs performance optimization tips"
    },
    {
      level: "Advanced",
      icon: Target,
      color: "destructive", 
      queries: ["Complex analytics with CTEs", "Performance optimization", "Custom aggregation pipelines"],
      patterns: ["Complex subqueries", "Window functions", "Database tuning"],
      insights: "Focuses on optimization, requires detailed execution plans"
    }
  ];

  const memoryFeatures = [
    {
      icon: Brain,
      title: "Pattern Recognition",
      description: "AI learns from your query patterns",
      examples: ["email-search", "date-filter", "user-analytics", "sales-reporting"]
    },
    {
      icon: MessageSquare,
      title: "Session Context", 
      description: "Remembers conversation history",
      examples: ["Database connection state", "Previous queries", "User preferences", "Error patterns"]
    },
    {
      icon: Clock,
      title: "Temporal Learning",
      description: "Tracks usage over time",
      examples: ["Frequent collections", "Success rates", "Query complexity", "Performance trends"]
    }
  ];

  return (
    <section className="py-32 px-6 relative overflow-hidden bg-gradient-to-b from-background to-accent/5">
      {/* Background Effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-6 glass-card px-6 py-3 rounded-full">
            <Brain className="w-6 h-6 text-accent animate-pulse" />
            <span className="text-sm font-medium text-accent">Memory & Learning</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            AI That
            <span className="block gradient-text">Learns & Remembers</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Advanced user personalization with pattern recognition, contextual memory, and 
            adaptive learning that evolves with your database interaction patterns.
          </p>
        </div>

        {/* Learning Profiles */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-12">User Learning Profiles</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {learningProfiles.map((profile, index) => (
              <div 
                key={index}
                className={`glass-card p-6 rounded-2xl cursor-pointer transition-all duration-500 hover-glow group ${
                  activeProfile === index ? 'ring-2 ring-accent/50 shadow-glow scale-105' : ''
                }`}
                onMouseEnter={() => setActiveProfile(index)}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 bg-gradient-${profile.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <profile.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h4 className="text-xl font-bold">{profile.level}</h4>
                </div>

                <div className="space-y-4">
                  <div>
                    <h5 className="font-semibold mb-2 text-sm uppercase tracking-wide text-muted-foreground">Typical Queries</h5>
                    <div className="space-y-2">
                      {profile.queries.map((query, qIndex) => (
                        <div key={qIndex} className="code-block p-2 rounded text-xs">
                          "{query}"
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="font-semibold mb-2 text-sm uppercase tracking-wide text-muted-foreground">Patterns</h5>
                    <div className="flex flex-wrap gap-2">
                      {profile.patterns.map((pattern, pIndex) => (
                        <span key={pIndex} className="text-xs bg-muted/20 px-2 py-1 rounded-full">
                          {pattern}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-border/50 pt-4">
                    <p className="text-sm text-muted-foreground italic">
                      {profile.insights}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Profile Progression */}
          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center justify-center space-x-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-accent rounded-full flex items-center justify-center text-accent-foreground text-sm font-bold">B</div>
                <span className="text-sm">Beginner</span>
              </div>
              <div className="flex-1 h-1 bg-gradient-primary rounded-full opacity-50" />
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">I</div>
                <span className="text-sm">Intermediate</span>
              </div>
              <div className="flex-1 h-1 bg-gradient-primary rounded-full opacity-50" />
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-destructive rounded-full flex items-center justify-center text-destructive-foreground text-sm font-bold">A</div>
                <span className="text-sm">Advanced</span>
              </div>
            </div>
          </div>
        </div>

        {/* Memory Features */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {memoryFeatures.map((feature, index) => (
            <div key={index} className="glass-card p-6 rounded-2xl hover-glow group">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              
              <h4 className="text-xl font-bold mb-2">{feature.title}</h4>
              <p className="text-muted-foreground mb-4">{feature.description}</p>
              
              <div className="space-y-2">
                {feature.examples.map((example, eIndex) => (
                  <div key={eIndex} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-gradient-primary rounded-full" />
                    <span className="text-sm text-muted-foreground">{example}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Session Management */}
        <div className="glass-card p-8 rounded-3xl">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4">WebSocket Session Management</h3>
            <p className="text-muted-foreground">
              Real-time conversation with persistent context and intelligent memory cleanup
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Session Features */}
            <div>
              <h4 className="text-xl font-bold mb-4 flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-primary" />
                Session Features
              </h4>
              
              <div className="space-y-4">
                {[
                  "Persistent conversation context across queries",
                  "Database connection state memory", 
                  "TTL-based message history cleanup",
                  "Cross-session pattern recognition"
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-muted/5 rounded-lg">
                    <div className="w-2 h-2 bg-gradient-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Code Example */}
            <div>
              <h4 className="text-xl font-bold mb-4">Implementation</h4>
              <div className="code-block p-4 rounded-xl font-mono text-sm">
                <div className="text-syntax-comment">// Session Context</div>
                <div className="text-syntax-keyword">interface</div> <div className="text-syntax-type">SessionContext</div> {'{'}
                <div className="ml-4">
                  <div><div className="text-syntax-property">dbUrl</div>: <div className="text-syntax-type">string</div>;</div>
                  <div><div className="text-syntax-property">dbType</div>: <div className="text-syntax-type">DatabaseType</div>;</div>
                  <div><div className="text-syntax-property">userProfile</div>: <div className="text-syntax-type">LearningProfile</div>;</div>
                  <div><div className="text-syntax-property">queryHistory</div>: <div className="text-syntax-type">QueryPattern</div>[];</div>
                  <div><div className="text-syntax-property">preferences</div>: <div className="text-syntax-type">UserPreferences</div>;</div>
                </div>
                {'}'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MemoryLearningSection;