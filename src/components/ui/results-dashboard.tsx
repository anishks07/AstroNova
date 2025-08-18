import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Sun, 
  Moon, 
  Star, 
  Heart, 
  Palette,
  Hash,
  Circle,
  Download,
  Zap
} from "lucide-react";

interface ResultsDashboardProps {
  name: string;
}

export function ResultsDashboard({ name }: ResultsDashboardProps) {
  // Mock data - in real app this would come from AI analysis
  const personalityInsight = `${name}, you are a natural-born leader with a magnetic personality. Your cosmic blueprint reveals a strong connection to Jupiter's wisdom and Venus's creativity. You possess an innate ability to inspire others while maintaining deep emotional intelligence. The stars suggest you're entering a period of spiritual growth and material abundance.`;
  
  const zodiacSigns = [
    { type: "Sun", sign: "Leo", icon: Sun, description: "Your core essence" },
    { type: "Moon", sign: "Pisces", icon: Moon, description: "Your emotional nature" },
    { type: "Rising", sign: "Sagittarius", icon: Star, description: "How others see you" }
  ];

  const luckyElements = {
    number: 7,
    color: "#FFD700",
    colorName: "Golden Yellow"
  };

  const energyScore = 87;

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-glow">
            Your Cosmic Profile
          </h2>
          <p className="text-lg text-muted-foreground">
            Welcome to your personalized astrological journey, {name}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Personality Overview */}
          <Card className="glass-card rounded-3xl border-border/30 md:col-span-2 lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Zap className="w-5 h-5" />
                Personality Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/90 leading-relaxed text-lg">
                {personalityInsight}
              </p>
            </CardContent>
          </Card>

          {/* Zodiac Signs */}
          {zodiacSigns.map((zodiac) => (
            <Card key={zodiac.type} className="glass-card rounded-3xl border-border/30 constellation-glow">
              <CardHeader className="text-center">
                <zodiac.icon className="w-12 h-12 mx-auto text-primary mb-2" />
                <CardTitle className="text-xl">{zodiac.type} Sign</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <Badge variant="secondary" className="text-2xl py-2 px-4 mb-2 bg-primary/20 text-primary border-primary/30">
                  {zodiac.sign}
                </Badge>
                <p className="text-sm text-muted-foreground">{zodiac.description}</p>
              </CardContent>
            </Card>
          ))}

          {/* Lucky Number */}
          <Card className="glass-card rounded-3xl border-border/30">
            <CardHeader className="text-center">
              <Hash className="w-12 h-12 mx-auto text-primary mb-2" />
              <CardTitle>Lucky Number</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-6xl font-bold text-primary mb-2">
                {luckyElements.number}
              </div>
              <p className="text-sm text-muted-foreground">
                Your cosmic lucky number
              </p>
            </CardContent>
          </Card>

          {/* Lucky Color */}
          <Card className="glass-card rounded-3xl border-border/30">
            <CardHeader className="text-center">
              <Palette className="w-12 h-12 mx-auto text-primary mb-2" />
              <CardTitle>Lucky Color</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div 
                className="w-16 h-16 rounded-full mx-auto mb-3 border-2 border-primary/30"
                style={{ backgroundColor: luckyElements.color }}
              />
              <p className="font-medium text-foreground">{luckyElements.colorName}</p>
              <p className="text-sm text-muted-foreground">
                Your power color
              </p>
            </CardContent>
          </Card>

          {/* Star Chart */}
          <Card className="glass-card rounded-3xl border-border/30">
            <CardHeader className="text-center">
              <Circle className="w-12 h-12 mx-auto text-primary mb-2" />
              <CardTitle>Star Chart</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="w-24 h-24 mx-auto border-2 border-primary/50 rounded-full relative mb-3 constellation-glow">
                <div className="absolute inset-2 border border-primary/30 rounded-full">
                  <div className="absolute top-1 left-1/2 w-1 h-1 bg-primary rounded-full transform -translate-x-1/2" />
                  <div className="absolute bottom-1 right-2 w-1 h-1 bg-accent rounded-full" />
                  <div className="absolute left-2 top-1/2 w-1 h-1 bg-primary-glow rounded-full transform -translate-y-1/2" />
                  <div className="absolute right-1 top-1/3 w-1 h-1 bg-primary rounded-full" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Your personal constellation
              </p>
            </CardContent>
          </Card>

          {/* Daily Energy Score */}
          <Card className="glass-card rounded-3xl border-border/30">
            <CardHeader className="text-center">
              <Star className="w-12 h-12 mx-auto text-primary mb-2" />
              <CardTitle>Energy Score</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {energyScore}%
              </div>
              <div className="w-full bg-muted rounded-full h-2 mb-2">
                <div 
                  className="bg-celestial-gradient h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${energyScore}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Today's cosmic energy ⚡
              </p>
            </CardContent>
          </Card>

          {/* Compatibility Checker */}
          <Card className="glass-card rounded-3xl border-border/30">
            <CardHeader className="text-center">
              <Heart className="w-12 h-12 mx-auto text-primary mb-2" />
              <CardTitle>Compatibility</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <Button variant="outline" className="w-full glass-card border-primary/30 hover:bg-primary/10">
                Check Compatibility
              </Button>
              <p className="text-sm text-muted-foreground mt-2">
                Find your cosmic match
              </p>
            </CardContent>
          </Card>

          {/* Download PDF */}
          <Card className="glass-card rounded-3xl border-border/30">
            <CardHeader className="text-center">
              <Download className="w-12 h-12 mx-auto text-primary mb-2" />
              <CardTitle>Your Report</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <Button variant="outline" className="w-full glass-card border-primary/30 hover:bg-primary/10">
                Download PDF 📜
              </Button>
              <p className="text-sm text-muted-foreground mt-2">
                Take your insights with you
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}