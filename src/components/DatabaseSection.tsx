import { Database, Zap, Globe, Activity } from "lucide-react";
import { useState, useEffect } from "react";

const DatabaseSection = () => {
  const [activeConnection, setActiveConnection] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState<"connecting" | "connected" | "error">("connecting");

  const databases = [
    {
      name: "MongoDB",
      icon: "🍃",
      color: "bg-green-500",
      description: "NoSQL document database with flexible schema",
      features: ["Document-based queries", "Aggregation pipelines", "GridFS support", "Replica sets"]
    },
    {
      name: "PostgreSQL", 
      icon: "🐘",
      color: "bg-blue-500",
      description: "Advanced open-source relational database",
      features: ["ACID compliance", "JSON/JSONB support", "Full-text search", "Extensions"]
    },
    {
      name: "MySQL",
      icon: "🐬", 
      color: "bg-orange-500",
      description: "World's most popular relational database",
      features: ["High performance", "Replication", "Partitioning", "Enterprise features"]
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setConnectionStatus("connecting");
      setTimeout(() => setConnectionStatus("connected"), 1000);
    }, 5000);
    
    // Initial connection
    setTimeout(() => setConnectionStatus("connected"), 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 px-6 relative overflow-hidden bg-gradient-to-b from-muted/20 to-background">
      {/* Background Effects */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-6 glass-card px-6 py-3 rounded-full">
            <Database className="w-6 h-6 text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">Universal Compatibility</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            One API for
            <span className="block gradient-text">All Your Databases</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            First-of-its-kind unified API that speaks fluently to MongoDB, PostgreSQL, and MySQL. 
            No more context switching or learning multiple query languages.
          </p>
        </div>

        {/* Database Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {databases.map((db, index) => (
            <div 
              key={index}
              className={`glass-card p-8 rounded-2xl cursor-pointer transition-all hover-glow group ${
                activeConnection === index ? 'ring-2 ring-primary/50 shadow-glow' : ''
              }`}
              onClick={() => setActiveConnection(index)}
            >
              {/* Database Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="text-4xl">{db.icon}</div>
                <div>
                  <h3 className="text-2xl font-bold">{db.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className={`w-2 h-2 rounded-full ${connectionStatus === 'connected' ? 'bg-green-400 animate-pulse' : connectionStatus === 'connecting' ? 'bg-yellow-400 animate-pulse' : 'bg-red-400'}`} />
                    <span className="text-sm text-muted-foreground capitalize">{connectionStatus}</span>
                  </div>
                </div>
              </div>

              {/* Database Description */}
              <p className="text-muted-foreground mb-6">{db.description}</p>

              {/* Features List */}
              <ul className="space-y-3">
                {db.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3 text-sm">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Connection Status Indicator */}
              <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Connection Pool</span>
                  <Activity className="w-4 h-4 text-primary animate-pulse" />
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 bg-muted rounded-full h-2">
                    <div className="bg-gradient-primary h-2 rounded-full" style={{ width: `${70 + (index * 10)}%` }} />
                  </div>
                  <span className="text-xs text-muted-foreground">{70 + (index * 10)}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Unified API Demonstration */}
        <div className="glass-card p-8 rounded-3xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Unified API in Action</h3>
            <p className="text-muted-foreground">
              Same natural language query, automatically optimized for each database type
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Natural Language Input */}
            <div>
              <h4 className="text-xl font-bold mb-6 flex items-center gap-3">
                <Globe className="w-6 h-6 text-primary" />
                Natural Language Input
              </h4>
              
              <div className="code-block p-6 rounded-xl mb-6">
                <div className="text-sm text-muted-foreground mb-2">User Query:</div>
                <div className="text-lg font-medium text-primary">
                  "Show me the top 5 selling products this month with their revenue"
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-primary animate-pulse" />
                  <span className="text-sm">Analyzing query intent...</span>
                </div>
                <div className="flex items-center gap-3">
                  <Database className="w-5 h-5 text-primary animate-pulse" style={{ animationDelay: "0.5s" }} />
                  <span className="text-sm">Detecting database schema...</span>
                </div>
                <div className="flex items-center gap-3">
                  <Activity className="w-5 h-5 text-primary animate-pulse" style={{ animationDelay: "1s" }} />
                  <span className="text-sm">Optimizing for target database...</span>
                </div>
              </div>
            </div>

            {/* Database-Specific Outputs */}
            <div>
              <h4 className="text-xl font-bold mb-6">Automatically Generated Queries</h4>
              
              <div className="space-y-4">
                <div className="border border-green-500/30 bg-green-500/5 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">🍃</span>
                    <span className="font-semibold">MongoDB</span>
                  </div>
                  <div className="code-block p-3 rounded-lg font-mono text-sm">
                    {`db.products.aggregate([
  { $match: { createdAt: { $gte: startOfMonth } } },
  { $group: { _id: "$name", revenue: { $sum: "$price" } } },
  { $sort: { revenue: -1 } },
  { $limit: 5 }
])`}
                  </div>
                </div>

                <div className="border border-blue-500/30 bg-blue-500/5 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">🐘</span>
                    <span className="font-semibold">PostgreSQL</span>
                  </div>
                  <div className="code-block p-3 rounded-lg font-mono text-sm">
                    {`SELECT name, SUM(price) as revenue
FROM products 
WHERE created_at >= date_trunc('month', CURRENT_DATE)
GROUP BY name
ORDER BY revenue DESC
LIMIT 5;`}
                  </div>
                </div>

                <div className="border border-orange-500/30 bg-orange-500/5 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">🐬</span>
                    <span className="font-semibold">MySQL</span>
                  </div>
                  <div className="code-block p-3 rounded-lg font-mono text-sm">
                    {`SELECT name, SUM(price) as revenue
FROM products 
WHERE created_at >= DATE_FORMAT(NOW(), '%Y-%m-01')
GROUP BY name
ORDER BY revenue DESC
LIMIT 5;`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Connection Stats */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          {[
            { number: "3", label: "Database Types", sublabel: "Fully supported" },
            { number: "99.9%", label: "Uptime", sublabel: "Connection reliability" },
            { number: "<50ms", label: "Query Translation", sublabel: "Average processing time" },
            { number: "Auto", label: "Schema Detection", sublabel: "Zero configuration" }
          ].map((stat, index) => (
            <div key={index} className="glass-card p-6 rounded-2xl hover-glow">
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">{stat.number}</div>
              <div className="font-semibold mb-1">{stat.label}</div>
              <div className="text-muted-foreground text-sm">{stat.sublabel}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DatabaseSection;