import { Brain, Github, Twitter, Linkedin, Mail, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const footerSections = [
    {
      title: "Product", 
      links: [
        { label: "Features", href: "#features" },
        { label: "Security", href: "#security" },
        { label: "Performance", href: "#performance" },
        { label: "Pricing", href: "#pricing" }
      ]
    },
    {
      title: "Developers",
      links: [
        { label: "API Documentation", href: "#docs" },
        { label: "GitHub Repository", href: "#github" },
        { label: "Code Examples", href: "#examples" },
        { label: "SDKs", href: "#sdks" }
      ]
    },
    {
      title: "Resources", 
      links: [
        { label: "Blog", href: "#blog" },
        { label: "Case Studies", href: "#cases" },
        { label: "Tutorials", href: "#tutorials" },
        { label: "Community", href: "#community" }
      ]
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "#about" },
        { label: "Careers", href: "#careers" },
        { label: "Privacy Policy", href: "#privacy" },
        { label: "Terms of Service", href: "#terms" }
      ]
    }
  ];

  return (
    <footer className="relative py-20 px-6 bg-gradient-to-t from-muted/30 to-background border-t border-border/50">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                <Brain className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-bold text-xl gradient-text">AI Database Agent</h3>
                <p className="text-xs text-muted-foreground">Revolutionary Intelligence</p>
              </div>
            </div>
            
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
              Transforming database interactions with AI-powered natural language processing, 
              enterprise-grade security, and 10x performance improvements.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="btn-glass p-2">
                <Github className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="btn-glass p-2">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="btn-glass p-2">
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="btn-glass p-2">
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Footer Links */}
          <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-4 gap-8">
            {footerSections.map((section, index) => (
              <div key={index}>
                <h4 className="font-semibold text-lg mb-4">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a 
                        href={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors text-sm"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="glass-card p-8 rounded-2xl mb-12 text-center">
          <h3 className="text-2xl font-bold mb-4">Stay Updated with AI Database Innovation</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Get the latest updates on new features, performance improvements, and AI advancements 
            delivered directly to your inbox.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input 
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-xl bg-muted/50 border border-border/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
            <Button className="btn-hero px-8 whitespace-nowrap">
              Subscribe
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-8 text-sm text-muted-foreground">
              <span>© 2024 AI Database Agent. All rights reserved.</span>
              <div className="hidden md:flex items-center gap-6">
                <a href="#privacy" className="hover:text-primary transition-colors">Privacy</a>
                <a href="#terms" className="hover:text-primary transition-colors">Terms</a>
                <a href="#security" className="hover:text-primary transition-colors">Security</a>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Built with ❤️ for developers worldwide</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span>All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;