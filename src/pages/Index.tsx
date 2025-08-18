import { useState } from "react";
import { HeroSection } from "@/components/ui/hero-section";
import { BirthDetailsForm } from "@/components/ui/birth-details-form";
import { ResultsDashboard } from "@/components/ui/results-dashboard";
import { CosmicChat } from "@/components/ui/cosmic-chat";
import { CosmicFooter } from "@/components/ui/cosmic-footer";
import { CosmicNavbar } from "@/components/ui/cosmic-navbar";

interface BirthDetails {
  name: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
}

type ActiveSection = "home" | "dashboard" | "reading" | "chat";

const Index = () => {
  const [birthDetails, setBirthDetails] = useState<BirthDetails | null>(null);
  const [activeSection, setActiveSection] = useState<ActiveSection>("home");

  const handleFormSubmit = (details: BirthDetails) => {
    setBirthDetails(details);
    setActiveSection("dashboard");
  };

  const handleNavClick = (section: string) => {
    setActiveSection(section as ActiveSection);
    
    // Scroll to appropriate section
    const sectionMap = {
      home: "hero-section",
      dashboard: "dashboard-section",
      reading: "birth-form-section",
      chat: "chat-section"
    };
    
    const targetSection = sectionMap[section as keyof typeof sectionMap];
    const element = document.getElementById(targetSection);
    
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case "home":
        return (
          <>
            <div id="hero-section">
              <HeroSection />
            </div>
            <div id="birth-form-section">
              <BirthDetailsForm onSubmit={handleFormSubmit} />
            </div>
          </>
        );
      
      case "reading":
        return (
          <div id="birth-form-section">
            <BirthDetailsForm onSubmit={handleFormSubmit} />
          </div>
        );
      
      case "dashboard":
        return (
          <div id="dashboard-section">
            {/* If user hasn't provided birth details, show a sample/guest dashboard */}
            <ResultsDashboard name={birthDetails?.name} />
          </div>
        );
      
      case "chat":
        return birthDetails ? (
          <div id="chat-section">
            <CosmicChat />
          </div>
        ) : (
          <div id="birth-form-section">
            <div className="text-center py-20">
              <h2 className="text-3xl font-bold mb-4 text-primary">Please provide your birth details first</h2>
              <p className="text-muted-foreground mb-8">We need your birth information to start your cosmic consultation.</p>
            </div>
            <BirthDetailsForm onSubmit={handleFormSubmit} />
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen cosmic-bg">
      <CosmicNavbar 
        activeItem={activeSection} 
        onItemClick={handleNavClick}
      />
      
      {renderContent()}
      
      <CosmicFooter />
    </div>
  );
};

export default Index;
