import { Button } from "@/components/ui/button";
import cosmicBg from "@/assets/cosmic-bg.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center cosmic-bg overflow-hidden pt-20">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{ backgroundImage: `url(${cosmicBg})` }}
      />
      
      {/* Shooting Star */}
      <div className="shooting-star" style={{ top: '20%', left: '10%', animationDelay: '2s' }} />
      <div className="shooting-star" style={{ top: '60%', left: '80%', animationDelay: '5s' }} />
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div className="mb-8">
          <img 
            src="/astronova.png" 
            alt="AstroNova Logo" 
            className="w-20 h-20 mx-auto mb-6 constellation-glow"
          />
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-glow">
            AstroNova
          </h1>
          <p className="text-xl md:text-2xl text-primary-glow mb-2 font-medium">
            Your Personalized Cosmic Guide
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Discover the secrets of the cosmos with AI-powered astrological insights. 
            Unlock your destiny through the wisdom of the stars.
          </p>
        </div>
        
        <Button 
          size="lg" 
          className="btn-cosmic ripple text-lg px-8 py-6 rounded-2xl font-semibold shadow-glow-gold"
        >
          Begin My Journey ✨
        </Button>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-pulse" />
      <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-accent rounded-full animate-twinkle" />
      <div className="absolute top-1/2 left-1/6 w-1.5 h-1.5 bg-primary-glow rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
    </section>
  );
}