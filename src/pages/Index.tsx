import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeroSection } from "@/components/ui/hero-section";
import { BirthDetailsForm } from "@/components/ui/birth-details-form";
import { ResultsDashboard } from "@/components/ui/results-dashboard";
import { CosmicFooter } from "@/components/ui/cosmic-footer";
import { CosmicNavbar } from "@/components/ui/cosmic-navbar";

interface BirthDetails {
  name: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
}

type ActiveSection = "home" | "dashboard" | "reading";

const Index = () => {
  const navigate = useNavigate();
  const [birthDetails, setBirthDetails] = useState<BirthDetails | null>(null);
  const [activeSection, setActiveSection] = useState<ActiveSection>("home");

  const handleFormSubmit = (details: BirthDetails) => {
    setBirthDetails(details);
    
    // Save birth details to localStorage for the chat
    localStorage.setItem('birthDetails', JSON.stringify(details));
    
    // Navigate directly to chat after form submission
    navigate('/chat');
  };

  const handleNavClick = (section: string) => {
    if (section === "chat") {
      // Check if we have birth details before navigating to chat
      if (birthDetails || localStorage.getItem('birthDetails')) {
        navigate('/chat');
      } else {
        // If no birth details, show the reading form first
        setActiveSection("reading");
        // Scroll to birth form section
        setTimeout(() => {
          const element = document.getElementById("birth-form-section");
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 100);
      }
      return;
    }
    
    setActiveSection(section as ActiveSection);
    
    // Scroll to appropriate section
    const sectionMap = {
      home: "hero-section",
      dashboard: "dashboard-section",
      reading: "birth-form-section"
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
