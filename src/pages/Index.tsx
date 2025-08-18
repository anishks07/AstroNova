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
      dashboard: birthDetails ? "dashboard-section" : "birth-form-section",
      reading: "birth-form-section",
      chat: birthDetails ? "chat-section" : "birth-form-section"
    };
    
    const targetSection = sectionMap[section as keyof typeof sectionMap];
    const element = document.getElementById(targetSection);
    
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Determine active section based on content state
  const getActiveSection = () => {
    if (!birthDetails) {
      return activeSection === "chat" || activeSection === "dashboard" ? "reading" : activeSection;
    }
    return activeSection;
  };

  return (
    <div className="min-h-screen cosmic-bg">
      <CosmicNavbar 
        activeItem={getActiveSection()} 
        onItemClick={handleNavClick}
      />
      
      <div id="hero-section">
        <HeroSection />
      </div>
      
      {!birthDetails ? (
        <div id="birth-form-section">
          <BirthDetailsForm onSubmit={handleFormSubmit} />
        </div>
      ) : (
        <>
          <div id="dashboard-section">
            <ResultsDashboard name={birthDetails.name} />
          </div>
          {(activeSection === "chat") && (
            <div id="chat-section">
              <CosmicChat />
            </div>
          )}
        </>
      )}
      
      <CosmicFooter />
    </div>
  );
};

export default Index;
