import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, Sparkles, Bot } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export function CosmicChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Welcome to your cosmic consultation! I'm your AI astrologer. What would you like to know about your destiny? ✨",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const aiResponses = [
    "The stars whisper that you're entering a powerful transformation phase. Trust your intuition during this cosmic shift! 🌟",
    "Your birth chart reveals strong creative energies. This is an excellent time to pursue artistic endeavors or innovative projects! 🎨",
    "I sense Jupiter's influence bringing opportunities your way. Keep your eyes open for new beginnings this month! 🚀",
    "The moon phases suggest focusing on emotional balance. Consider meditation or moonlit walks to align with lunar energy! 🌙",
    "Your planetary alignments indicate a period of spiritual growth. Trust the universe's timing in all matters! ⭐",
    "Mars energy is strong in your chart today. It's time to take bold action on projects you've been hesitating about! 🔥"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <section className="py-20 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-glow">
            Cosmic Consultation
          </h2>
          <p className="text-lg text-muted-foreground">
            Ask me anything about your destiny...
          </p>
        </div>

        <Card className="glass-card rounded-3xl border-border/30">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-primary">
              <Sparkles className="w-5 h-5" />
              AI Astrologer Oracle
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Messages */}
            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!message.isUser && (
                    <div className="w-10 h-10 rounded-full bg-celestial-gradient flex items-center justify-center shadow-glow-purple">
                      <Bot className="w-5 h-5 text-background" />
                    </div>
                  )}
                  
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                      message.isUser
                        ? 'bg-primary text-primary-foreground ml-auto'
                        : 'glass-card border-border/30'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                  
                  {message.isUser && (
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">You</span>
                    </div>
                  )}
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="w-10 h-10 rounded-full bg-celestial-gradient flex items-center justify-center shadow-glow-purple animate-pulse">
                    <Bot className="w-5 h-5 text-background" />
                  </div>
                  <div className="glass-card border-border/30 px-4 py-3 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="What do the stars reveal about my future?"
                className="glass-card border-border/50 focus:border-primary focus:shadow-glow-gold rounded-xl flex-1"
                disabled={isTyping}
              />
              <Button 
                type="submit" 
                size="icon"
                className="btn-cosmic rounded-xl w-12 h-12"
                disabled={isTyping || !inputValue.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Sparkle Background */}
        <div className="absolute top-10 left-10 w-1 h-1 bg-primary rounded-full animate-twinkle" />
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-accent rounded-full animate-pulse" />
        <div className="absolute top-1/2 right-10 w-1 h-1 bg-primary-glow rounded-full animate-twinkle" style={{ animationDelay: '2s' }} />
      </div>
    </section>
  );
}