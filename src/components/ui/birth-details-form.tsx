import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Calendar, Clock, MapPin } from "lucide-react";

interface BirthDetails {
  name: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
}

interface BirthDetailsFormProps {
  onSubmit: (details: BirthDetails) => void;
}

export function BirthDetailsForm({ onSubmit }: BirthDetailsFormProps) {
  const [details, setDetails] = useState<BirthDetails>({
    name: "",
    dateOfBirth: "",
    timeOfBirth: "",
    placeOfBirth: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(details);
  };

  const handleInputChange = (field: keyof BirthDetails, value: string) => {
    setDetails(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section className="py-20 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-glow">
            Tell Us About Your Birth
          </h2>
          <p className="text-lg text-muted-foreground">
            The stars were aligned uniquely for you. Let's discover your cosmic blueprint.
          </p>
        </div>

        <Card className="glass-card rounded-3xl border-border/30 max-w-2xl mx-auto">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl text-primary">Birth Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={details.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="glass-card border-border/50 focus:border-primary focus:shadow-glow-gold rounded-xl h-12"
                  required
                />
              </div>

              {/* Date of Birth */}
              <div className="space-y-2">
                <Label htmlFor="dob" className="text-sm font-medium flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  Date of Birth
                </Label>
                <Input
                  id="dob"
                  type="date"
                  value={details.dateOfBirth}
                  onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                  className="glass-card border-border/50 focus:border-primary focus:shadow-glow-gold rounded-xl h-12"
                  required
                />
              </div>

              {/* Time of Birth */}
              <div className="space-y-2">
                <Label htmlFor="tob" className="text-sm font-medium flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  Time of Birth
                </Label>
                <Input
                  id="tob"
                  type="time"
                  value={details.timeOfBirth}
                  onChange={(e) => handleInputChange("timeOfBirth", e.target.value)}
                  className="glass-card border-border/50 focus:border-primary focus:shadow-glow-gold rounded-xl h-12"
                  required
                />
              </div>

              {/* Place of Birth */}
              <div className="space-y-2">
                <Label htmlFor="pob" className="text-sm font-medium flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  Place of Birth
                </Label>
                <Input
                  id="pob"
                  type="text"
                  placeholder="City, Country"
                  value={details.placeOfBirth}
                  onChange={(e) => handleInputChange("placeOfBirth", e.target.value)}
                  className="glass-card border-border/50 focus:border-primary focus:shadow-glow-gold rounded-xl h-12"
                  required
                />
              </div>

              <Button 
                type="submit"
                className="w-full btn-cosmic ripple text-lg py-6 rounded-xl font-semibold mt-8"
                disabled={!details.name || !details.dateOfBirth || !details.timeOfBirth || !details.placeOfBirth}
              >
                Generate My Horoscope ✨
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}