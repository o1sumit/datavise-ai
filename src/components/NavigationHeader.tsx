import { Button } from "@/components/ui/button";
import { Brain, Github, ExternalLink, Menu, X } from "lucide-react";
import { useState } from "react";

const NavigationHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Features", href: "#features" },
    { label: "Security", href: "#security" },
    { label: "Performance", href: "#performance" },
    { label: "Databases", href: "#databases" },

  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass backdrop-blur-xl border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-xl gradient-text">Agentic AI</h1>
              
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* <Button variant="ghost" size="sm" className="btn-glass">
              <Github className="w-4 h-4 mr-2" />
            </Button> */}

            <Button size="sm" className="btn-hero text-white">
               Try Now
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden btn-glass"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-6 pb-6 border-t border-border/50">
            <nav className="flex flex-col gap-4 mt-6">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex flex-col gap-3 mt-6 pt-6 border-t border-border/50">
              <Button variant="ghost" size="sm" className="btn-glass justify-start">
                <Github className="w-4 h-4 mr-2" />
                GitHub Repository
              </Button>

              <Button size="sm" className="btn-hero justify-start">
                Get Started Now
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavigationHeader;