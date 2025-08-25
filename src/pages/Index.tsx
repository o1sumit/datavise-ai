import NavigationHeader from "@/components/NavigationHeader";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import SecuritySection from "@/components/SecuritySection";
import DatabaseSection from "@/components/DatabaseSection";
import PerformanceSection from "@/components/PerformanceSection";
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
      
      {/* Security Section */}
      <div id="security">
        <SecuritySection />
      </div>
      
      {/* Database Support Section */}
      <div id="databases">
        <DatabaseSection />
      </div>
      
      {/* Performance Section */}
      <div id="performance">
        <PerformanceSection />
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;