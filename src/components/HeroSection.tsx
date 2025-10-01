import { Button } from "@/components/ui/button";
import { Brain, Database, Zap, Shield, ArrowRight } from "lucide-react";
import heroBg from "@/assets/AI-connect.gif";

const HeroSection = () => {
  return (
    <section className="relative flex items-center justify-center overflow-hidden" style={{
      background:'black'
    }}>
      {/* Animated Background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* Particles Effect */}
      <div className="absolute inset-0 particles" />

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-32 right-16 w-32 h-32 bg-accent/20 rounded-full blur-2xl float" />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-secondary/20 rounded-full blur-lg float" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center py-5 cus-pd-100">
        {/* Main Headline */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-3 mb-6 glass-card px-6 py-3 rounded-full">
            <Brain className="w-6 h-6 text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">Revolutionary AI Technology</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 leading-normal">
            The Future of
            <span className="block gradient-text leading-normal">Database Intelligence</span>
          </h1>

          {/* <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Transform natural language into safe, intelligent database operations across
            MongoDB, PostgreSQL, and MySQL with enterprise-grade security and
            <span className="text-primary font-semibold"> 10x faster performance</span>.
          </p> */}
        </div>

        {/* Key Features Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto h-[200px]">
          {/* <div className="glass-card p-6 rounded-xl hover-glow group">
            <Database className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform inline-block" />
            <h3 className="font-semibold text-lg mb-2">Multi-Database Unity</h3>
            <p className="text-muted-foreground text-sm">One API for MongoDB, PostgreSQL & MySQL</p>
          </div>

          <div className="glass-card p-6 rounded-xl hover-glow group">
            <Shield className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform inline-block" />
            <h3 className="font-semibold text-lg mb-2">Enterprise Security</h3>
            <p className="text-muted-foreground text-sm">Zero SQL injection risk with smart guardrails</p>
          </div>

          <div className="glass-card p-6 rounded-xl hover-glow group">
            <Zap className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform inline-block" />
            <h3 className="font-semibold text-lg mb-2">10x Performance</h3>
            <p className="text-muted-foreground text-sm">Persistent schema registry & intelligent caching</p>
          </div> */}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" className="btn-hero px-8 py-4 text-lg text-white">
            Start Building Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>

          <Button size="lg" variant="outline" className="btn-glass px-8 py-4 text-lg text-white">
            <a href="https://youtube.com/playlist?list=PLtYQefvLuYtXnnh18EwA_SohtLdVfhDUL&si=PLmnc7BrOitVtXlm" target="_blank" rel="noopener noreferrer" className="flex items-center">
            Watch Demo
            </a>
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 pt-8 border-t border-white/10">
          <p className="text-muted-foreground mb-6">Trusted by developers worldwide</p>
          <div className="flex justify-center items-center gap-8 opacity-60">
            <div className="text-2xl font-bold">99.9% Uptime</div>
            <div className="text-2xl font-bold">0 Security Breaches</div>
            <div className="text-2xl font-bold">10M+ Queries</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full animate-bounce mt-2" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;