import { useState } from "react";
import { HeroSection } from "@/components/ui/hero-section";
import { BirthDetailsForm } from "@/components/ui/birth-details-form";
import { ResultsDashboard } from "@/components/ui/results-dashboard";
import { CosmicChat } from "@/components/ui/cosmic-chat";
import { CosmicFooter } from "@/components/ui/cosmic-footer";

interface BirthDetails {
  name: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
}

const Index = () => {
  const [birthDetails, setBirthDetails] = useState<BirthDetails | null>(null);

  const handleFormSubmit = (details: BirthDetails) => {
    setBirthDetails(details);
  };

  return (
    <div className="min-h-screen cosmic-bg">
      <HeroSection />
      
      {!birthDetails ? (
        <BirthDetailsForm onSubmit={handleFormSubmit} />
      ) : (
        <>
          <ResultsDashboard name={birthDetails.name} />
          <CosmicChat />
        </>
      )}
      
      <CosmicFooter />
    </div>
  );
};

export default Index;
