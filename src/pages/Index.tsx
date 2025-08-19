import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeroSection } from "@/components/ui/hero-section";
import { BirthDetailsForm } from "@/components/ui/birth-details-form";
import { CosmicFooter } from "@/components/ui/cosmic-footer";
import { CosmicNavbar } from "@/components/ui/cosmic-navbar";

interface BirthDetails {
  name: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
}

type ActiveSection = "home" | "reading";

const Index = () => {
  const navigate = useNavigate();
  const [birthDetails, setBirthDetails] = useState<BirthDetails | null>(null);
  const [activeSection, setActiveSection] = useState<ActiveSection>("home");

  const handleBeginJourney = () => {
    setActiveSection("reading");
    // Scroll to birth form section
    setTimeout(() => {
      const element = document.getElementById("birth-form-section");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

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
    if (section === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (section === "reading") {
      // When clicking "Get Reading", scroll to form or show only form
      setTimeout(() => {
        const element = document.getElementById("birth-form-section");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          // If we're in reading-only mode, scroll to top
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 100);
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case "home":
        return (
          <>
            <div id="hero-section">
              <HeroSection onBeginJourney={handleBeginJourney} />
            </div>
            <div id="birth-form-section">
              <BirthDetailsForm onSubmit={handleFormSubmit} />
            </div>
          </>
        );
      
      case "reading":
        return (
          <>
            <div className="pt-20"> {/* Add padding to account for fixed navbar */}
              <BirthDetailsForm onSubmit={handleFormSubmit} />
            </div>
          </>
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
