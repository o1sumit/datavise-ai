import { Shield, Lock, Eye, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";

const SecuritySection = () => {
  const [activeTab, setActiveTab] = useState(0);

  const securityFeatures = [
    {
      icon: Shield,
      title: "SQL Injection Prevention",
      description: "Parameterized queries only with zero injection risk",
      detail: "Every query is automatically converted to parameterized form, making SQL injection mathematically impossible."
    },
    {
      icon: Lock,
      title: "Operation Guardrails", 
      description: "Blocks dangerous operations automatically",
      detail: "Smart detection prevents DROP, TRUNCATE, ALTER operations and enforces WHERE clauses on UPDATE/DELETE."
    },
    {
      icon: Eye,
      title: "Real-time Monitoring",
      description: "Complete audit trails and query monitoring", 
      detail: "Every operation is logged with user context, timing, and results for complete transparency."
    },
    {
      icon: AlertTriangle,
      title: "MongoDB Protection",
      description: "Guards against $where and $function exploits",
      detail: "Advanced MongoDB-specific protections prevent dangerous operators and enforce secure query patterns."
    }
  ];

  const queryExamples = [
    {
      type: "blocked",
      title: "Blocked: Dangerous Operation",
      query: "DROP TABLE users;",
      reason: "Destructive operation prevented by safety guardrails",
      icon: XCircle,
      color: "destructive"
    },
    {
      type: "blocked", 
      title: "Blocked: Missing WHERE Clause",
      query: "DELETE FROM products;",
      reason: "Mass deletion without WHERE clause blocked",
      icon: XCircle,
      color: "destructive"
    },
    {
      type: "allowed",
      title: "Safe: Parameterized Query",
      query: "SELECT * FROM users WHERE id = $1",
      reason: "Parameterized query with safe operation",
      icon: CheckCircle,
      color: "primary"
    },
    {
      type: "allowed",
      title: "Safe: Controlled Update", 
      query: "UPDATE products SET price = $1 WHERE category = $2",
      reason: "Safe update with proper WHERE clause",
      icon: CheckCircle,
      color: "primary"
    }
  ];

  return (
    <section className="py-16 px-6 relative overflow-hidden bg-gradient-to-b from-background to-muted/20">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-destructive/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-6 glass-card px-6 py-3 rounded-full">
            <Shield className="w-6 h-6 text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">Enterprise Security</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Uncompromising
            <span className="block gradient-text">Security & Safety</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Built with enterprise-grade security from the ground up. Every query is validated, 
            every operation is monitored, and every risk is eliminated before execution.
          </p>
        </div>

        {/* Security Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {securityFeatures.map((feature, index) => (
            <div 
              key={index}
              className={`glass-card p-6 rounded-2xl cursor-pointer transition-all hover-glow group ${
                activeTab === index ? 'ring-2 ring-primary/50 shadow-glow' : ''
              }`}
              onMouseEnter={() => setActiveTab(index)}
            >
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              
              <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm mb-3">{feature.description}</p>
              
              <div className={`transition-all duration-300 ${
                activeTab === index ? 'opacity-100 max-h-24' : 'opacity-0 max-h-0 overflow-hidden'
              }`}>
                <p className="text-xs text-muted-foreground border-t border-border/50 pt-3">
                  {feature.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Query Examples Showcase */}
        <div className="glass-card p-8 rounded-3xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Smart Query Validation</h3>
            <p className="text-muted-foreground">
              See how our security system automatically identifies and handles different types of database operations
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Blocked Queries */}
            <div>
              <h4 className="text-xl font-bold mb-6 flex items-center gap-3">
                <XCircle className="w-6 h-6 text-destructive" />
                Automatically Blocked
              </h4>
              
              <div className="space-y-4">
                {queryExamples.filter(q => q.type === 'blocked').map((query, index) => (
                  <div key={index} className="border border-destructive/30 bg-destructive/5 rounded-xl p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <query.icon className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                      <div>
                        <h5 className="font-semibold text-destructive">{query.title}</h5>
                        <p className="text-sm text-muted-foreground">{query.reason}</p>
                      </div>
                    </div>
                    
                    <div className="code-block p-3 rounded-lg font-mono text-sm">
                      {query.query}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Safe Queries */}
            <div>
              <h4 className="text-xl font-bold mb-6 flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-primary" />
                Safely Executed
              </h4>
              
              <div className="space-y-4">
                {queryExamples.filter(q => q.type === 'allowed').map((query, index) => (
                  <div key={index} className="border border-primary/30 bg-primary/5 rounded-xl p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <query.icon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h5 className="font-semibold text-primary">{query.title}</h5>
                        <p className="text-sm text-muted-foreground">{query.reason}</p>
                      </div>
                    </div>
                    
                    <div className="code-block p-3 rounded-lg font-mono text-sm">
                      {query.query}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Security Stats */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { number: "0", label: "Security Breaches", sublabel: "In production since launch" },
            { number: "99.99%", label: "Threat Detection", sublabel: "Malicious queries blocked" }, 
            { number: "<1ms", label: "Security Validation", sublabel: "Average processing time" }
          ].map((stat, index) => (
            <div key={index} className="glass-card p-8 rounded-2xl hover-glow">
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">{stat.number}</div>
              <div className="font-semibold text-lg mb-1">{stat.label}</div>
              <div className="text-muted-foreground text-sm">{stat.sublabel}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;