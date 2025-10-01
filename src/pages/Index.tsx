import NavigationHeader from "@/components/NavigationHeader";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import AIArchitectureSection from "@/components/AIArchitectureSection";
import SecuritySection from "@/components/SecuritySection";
import DatabaseSection from "@/components/DatabaseSection";
import MemoryLearningSection from "@/components/MemoryLearningSection";
import PerformanceSection from "@/components/PerformanceSection";
import HackathonDemoSection from "@/components/HackathonDemoSection";
import VideoSection from "@/components/VideoSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navigation */}
      <NavigationHeader />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Features Section */}
      <div id="features">
        <FeaturesSection />
      </div>
      
      {/* AI Architecture Section */}
      <div id="architecture">
        <AIArchitectureSection />
      </div>
      
      {/* Security Section */}
      <div id="security">
        <SecuritySection />
      </div>
      
      {/* Database Support Section */}
      <div id="databases">
        <DatabaseSection />
      </div>
      
      {/* Memory & Learning Section */}
      <div id="memory">
        <MemoryLearningSection />
      </div>
      
      {/* Performance Section */}
      <div id="performance">
        <PerformanceSection />
      </div>
      
      {/* Hackathon Demo Section */}
      <div id="demo">
        <HackathonDemoSection />
      </div>
      
      {/* Video Showcase Section */}
      <div id="videos">
        <VideoSection />
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;