import { Zap, TrendingUp, Clock, Server, Gauge } from "lucide-react";
import { useEffect, useState } from "react";

const PerformanceSection = () => {
  const [animatedNumbers, setAnimatedNumbers] = useState({
    schemaSpeed: 0,
    queryTime: 0,
    throughput: 0,
    cacheHit: 0
  });

  useEffect(() => {
    const targets = {
      schemaSpeed: 10,
      queryTime: 23,
      throughput: 50000,
      cacheHit: 95
    };

    const animateNumber = (key: keyof typeof targets, target: number, duration: number) => {
      const start = Date.now();
      const startValue = 0;
      
      const animate = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(startValue + (target - startValue) * easeOut);
        
        setAnimatedNumbers(prev => ({ ...prev, [key]: currentValue }));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      animate();
    };

    const timer = setTimeout(() => {
      animateNumber('schemaSpeed', targets.schemaSpeed, 2000);
      setTimeout(() => animateNumber('queryTime', targets.queryTime, 1500), 500);
      setTimeout(() => animateNumber('throughput', targets.throughput, 2500), 1000);
      setTimeout(() => animateNumber('cacheHit', targets.cacheHit, 2000), 1500);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const performanceFeatures = [
    {
      icon: Server,
      title: "Persistent Schema Registry",
      description: "Revolutionary approach to schema management",
      stats: "10x faster than traditional methods",
      details: [
        "In-memory schema caching with TTL",
        "Intelligent cache invalidation",
        "Cross-database schema normalization",
        "Real-time schema change detection"
      ]
    },
    {
      icon: Zap,
      title: "Connection Pooling",
      description: "Smart connection management across all databases",
      stats: "99.9% connection reuse rate",
      details: [
        "Adaptive pool sizing based on load",
        "Database-specific optimization",
        "Connection health monitoring",
        "Automatic failover handling"
      ]
    },
    {
      icon: Clock,
      title: "Query Optimization",
      description: "AI-powered query planning and execution",
      stats: "<50ms average response time",
      details: [
        "Query plan caching and reuse",
        "Index usage optimization",
        "Parallel query execution",
        "Result set streaming"
      ]
    },
    {
      icon: Gauge,
      title: "Performance Monitoring", 
      description: "Real-time performance metrics and alerting",
      stats: "Sub-millisecond monitoring",
      details: [
        "Query performance tracking",
        "Resource usage monitoring",
        "Bottleneck identification",
        "Predictive scaling alerts"
      ]
    }
  ];

  return (
    <section className="py-32 px-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-6 glass-card px-6 py-3 rounded-full">
            <TrendingUp className="w-6 h-6 text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">Peak Performance</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">10x Faster</span>
            <span className="block">Than Traditional Approaches</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Revolutionary performance optimizations that redefine what's possible in database interaction. 
            Every millisecond optimized, every resource maximized.
          </p>
        </div>

        {/* Performance Metrics Dashboard */}
        <div className="glass-card p-8 rounded-3xl mb-20">
          <h3 className="text-3xl font-bold text-center mb-12">Real-Time Performance Metrics</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group hover-glow p-6 rounded-2xl border border-primary/20">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Server className="w-8 h-8 text-primary-foreground" />
              </div>
              <div className="text-4xl font-bold gradient-text mb-2">{animatedNumbers.schemaSpeed}x</div>
              <div className="font-semibold mb-1">Schema Processing</div>
              <div className="text-muted-foreground text-sm">Faster than traditional</div>
            </div>

            <div className="text-center group hover-glow p-6 rounded-2xl border border-accent/20">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Clock className="w-8 h-8 text-accent" />
              </div>
              <div className="text-4xl font-bold gradient-text mb-2">{animatedNumbers.queryTime}ms</div>
              <div className="font-semibold mb-1">Query Response</div>
              <div className="text-muted-foreground text-sm">Average processing time</div>
            </div>

            <div className="text-center group hover-glow p-6 rounded-2xl border border-secondary/20">
              <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-8 h-8 text-secondary" />
              </div>
              <div className="text-4xl font-bold gradient-text mb-2">{animatedNumbers.throughput.toLocaleString()}</div>
              <div className="font-semibold mb-1">Queries/Second</div>
              <div className="text-muted-foreground text-sm">Peak throughput</div>
            </div>

            <div className="text-center group hover-glow p-6 rounded-2xl border border-primary/20">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Gauge className="w-8 h-8 text-primary" />
              </div>
              <div className="text-4xl font-bold gradient-text mb-2">{animatedNumbers.cacheHit}%</div>
              <div className="font-semibold mb-1">Cache Hit Rate</div>
              <div className="text-muted-foreground text-sm">Schema registry efficiency</div>
            </div>
          </div>

          {/* Performance Graph Simulation */}
          <div className="mt-12 p-6 bg-muted/20 rounded-2xl">
            <h4 className="text-lg font-semibold mb-6 text-center">Performance Comparison</h4>
            <div className="space-y-4">
              {[
                { label: "Traditional Database Tools", value: 15, color: "bg-destructive/60" },
                { label: "Our AI Database Agent", value: 95, color: "bg-gradient-primary" }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <span className="text-sm w-40 text-right">{item.label}</span>
                  <div className="flex-1 bg-muted rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full ${item.color} transition-all duration-2000 ease-out`}
                      style={{ 
                        width: `${item.value}%`,
                        animationDelay: `${index * 0.5}s`
                      }}
                    />
                  </div>
                  <span className="text-sm w-12">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {performanceFeatures.map((feature, index) => (
            <div key={index} className="glass-card p-8 rounded-2xl hover-glow group">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground mb-2">{feature.description}</p>
                  <span className="text-primary font-semibold text-sm">{feature.stats}</span>
                </div>
              </div>

              <ul className="space-y-3">
                {feature.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="flex items-start gap-3 text-sm">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Performance Benefits */}
        <div className="mt-20 text-center">
          <h3 className="text-3xl font-bold mb-12">Why Performance Matters</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Reduced Latency",
                description: "Sub-50ms response times mean real-time user experiences and faster application performance.",
                impact: "50ms avg response"
              },
              {
                title: "Cost Efficiency", 
                description: "10x performance improvement translates to 90% reduction in infrastructure costs.",
                impact: "90% cost savings"
              },
              {
                title: "Scalability",
                description: "Handle 50,000+ concurrent queries with linear performance scaling as you grow.",
                impact: "50K+ concurrent users"
              }
            ].map((benefit, index) => (
              <div key={index} className="glass-card p-6 rounded-2xl text-center hover-glow">
                <div className="text-2xl font-bold gradient-text mb-3">{benefit.impact}</div>
                <h4 className="font-bold text-lg mb-3">{benefit.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerformanceSection;