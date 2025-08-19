import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, Sparkles, Bot, ArrowLeft, Settings, Star, Heart, TrendingUp, Zap } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface BirthDetails {
  name: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
}

interface CosmicChatProps {
  birthDetails: BirthDetails | null;
  backendUrl?: string;
}

export function CosmicChat({ birthDetails, backendUrl }: CosmicChatProps) {
  const navigate = useNavigate();
  
  // Generate a unique session ID for this chat session
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: `Welcome ${birthDetails?.name ? birthDetails.name + ', ' : ''}to your cosmic consultation! I'm your celestial guide, here to illuminate the mysteries of your destiny. What cosmic wisdom do you seek? ✨`,
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const aiResponses = [
    "The stars whisper that you're entering a powerful transformation phase. Trust your intuition during this cosmic shift! 🌟",
    "Your birth chart reveals strong creative energies. This is an excellent time to pursue artistic endeavors or innovative projects! 🎨", 
    "I sense Jupiter's influence bringing opportunities your way. Keep your eyes open for new beginnings this month! 🚀",
    "The moon phases suggest focusing on emotional balance. Consider meditation or moonlit walks to align with lunar energy! 🌙",
    "Your planetary alignments indicate a period of spiritual growth. Trust the universe's timing in all matters! ⭐",
    "Mars energy is strong in your chart today. It's time to take bold action on projects you've been hesitating about! 🔥",
    "Venus graces your path with harmonious relationships. Open your heart to love and meaningful connections! 💖",
    "Mercury retrograde reminds you to slow down and reflect. This is perfect timing for inner contemplation! 🧘‍♀️",
    "The cosmic winds bring messages of abundance. Your manifestations are aligning with divine timing! ✨",
    "Saturn's wisdom teaches patience and perseverance. Your hard work will soon bear celestial fruit! 🪐"
  ];

  const quickSuggestions = [
    { text: "Daily Prediction", icon: Star },
    { text: "Love Life", icon: Heart },
    { text: "Career Path", icon: TrendingUp },
    { text: "Lucky Numbers", icon: Zap }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const typewriterEffect = (text: string, messageId: string) => {
    let index = 0;
    const interval = setInterval(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === messageId 
            ? { ...msg, text: text.substring(0, index + 1) }
            : msg
        )
      );
      index++;
      if (index === text.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 30);
  };

  // AI API call function
  const callAI = async (userInput: string): Promise<string> => {
    console.log('[CosmicChat] callAI called with:', { userInput, backendUrl });
    
    if (!backendUrl) {
      console.log('[CosmicChat] No backend URL provided, using fallback');
      return aiResponses[Math.floor(Math.random() * aiResponses.length)];
    }

    try {
      console.log('[CosmicChat] Making API call to:', backendUrl);
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_input: userInput,
          session: sessionId,
          birth_details: birthDetails,
        }),
      });

      console.log('[CosmicChat] API response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('[CosmicChat] API response data:', data);
      
      // Handle n8n webhook response format
      if (data.output) {
        return data.output;
      } else if (data.response) {
        return data.response;
      } else if (typeof data === 'string') {
        return data;
      } else if (data.message) {
        return data.message;
      }
      
      console.log('[CosmicChat] Unknown response format, using fallback');
      return aiResponses[Math.floor(Math.random() * aiResponses.length)];
    } catch (error) {
      console.error('[CosmicChat] API call failed:', error);
      return aiResponses[Math.floor(Math.random() * aiResponses.length)];
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setShowSuggestions(false);

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue("");
    setIsTyping(true);

    try {
      // Call AI backend
      const aiResponse = await callAI(currentInput);
      
      // Add AI response with typewriter effect
      setTimeout(() => {
        const aiMessageId = (Date.now() + 1).toString();
        const aiMessage: Message = {
          id: aiMessageId,
          text: "",
          isUser: false,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, aiMessage]);
        typewriterEffect(aiResponse, aiMessageId);
      }, 1000);
    } catch (error) {
      console.error('Error getting AI response:', error);
      setIsTyping(false);
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "The cosmic energies are temporarily disrupted. Please try again in a moment! 🌟",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="h-screen w-full flex flex-col cosmic-bg relative overflow-hidden">
      {/* Constellation Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-2 h-2 bg-primary rounded-full shadow-star-twinkle animate-twinkle"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-accent rounded-full shadow-star-twinkle animate-twinkle" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-60 left-1/4 w-1.5 h-1.5 bg-primary-glow rounded-full shadow-star-twinkle animate-twinkle" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-accent rounded-full shadow-star-twinkle animate-twinkle" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-40 right-20 w-2 h-2 bg-primary rounded-full shadow-star-twinkle animate-twinkle" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Header */}
      <div className="glass-card border-b border-border/20 px-6 py-4 flex items-center justify-between backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
            className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full mr-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-celestial-gradient p-0.5 shadow-glow-gold animate-pulse">
              <div className="w-full h-full rounded-full bg-background/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-ping"></div>
          </div>
          <div>
            <h1 className="text-xl font-bold text-glow">Chat with Your Cosmic Guide</h1>
            <p className="text-sm text-muted-foreground">✨ Illuminating your celestial path</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full"
        >
          <Settings className="w-5 h-5" />
        </Button>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto chat-scroll px-6 py-4 space-y-6">
        {messages.map((message, index) => (
          <div
            key={message.id}
            className={`flex gap-4 animate-in slide-in-from-bottom-2 duration-500 ${
              message.isUser ? 'justify-end' : 'justify-start'
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {!message.isUser && (
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-celestial-gradient p-0.5 shadow-glow-purple">
                  <div className="w-full h-full rounded-full bg-background/20 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                    <div className="relative w-6 h-6 rounded-full bg-celestial-gradient"></div>
                  </div>
                </div>
                {/* Floating stars around AI avatar */}
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full animate-twinkle"></div>
                <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-primary rounded-full animate-twinkle" style={{ animationDelay: '1s' }}></div>
              </div>
            )}
            
            <div
              className={`max-w-xs lg:max-w-md xl:max-w-lg px-6 py-4 rounded-2xl relative ${
                message.isUser
                  ? 'bg-gradient-to-br from-blue-900/80 to-blue-800/60 text-white border border-blue-700/30 ml-auto backdrop-blur-sm'
                  : 'glass-card border-border/30 text-foreground shadow-glow-soft'
              }`}
            >
              {!message.isUser && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 animate-pulse"></div>
              )}
              <div className="relative">
                <p className={`text-sm leading-relaxed ${message.isUser ? 'text-white' : 'text-foreground'}`}>
                  {message.text}
                  {isTyping && !message.isUser && index === messages.length - 1 && (
                    <span className="inline-block w-2 h-4 bg-primary ml-1 animate-blink-caret"></span>
                  )}
                </p>
              </div>
              
              {/* Twinkling effect inside AI bubbles */}
              {!message.isUser && (
                <>
                  <div className="absolute top-2 right-3 w-1 h-1 bg-primary rounded-full animate-twinkle"></div>
                  <div className="absolute bottom-3 left-4 w-0.5 h-0.5 bg-accent rounded-full animate-twinkle" style={{ animationDelay: '2s' }}></div>
                </>
              )}
            </div>

            {message.isUser && (
              <div className="w-12 h-12 rounded-full bg-primary/20 border-2 border-primary/30 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-medium text-primary">You</span>
              </div>
            )}
          </div>
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex gap-4 justify-start animate-in slide-in-from-bottom-2 duration-300">
            <div className="w-12 h-12 rounded-full bg-celestial-gradient p-0.5 shadow-glow-purple animate-pulse">
              <div className="w-full h-full rounded-full bg-background/20 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-celestial-gradient animate-spin"></div>
              </div>
            </div>
            <div className="glass-card border-border/30 px-6 py-4 rounded-2xl">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-xs text-muted-foreground ml-2">Consulting the stars...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestions */}
      {showSuggestions && (
        <div className="px-6 py-2">
          <div className="flex gap-2 flex-wrap justify-center">
            {quickSuggestions.map((suggestion, index) => {
              const IconComponent = suggestion.icon;
              return (
                <Button
                  key={suggestion.text}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSuggestionClick(suggestion.text)}
                  className="glass-card border-border/50 hover:border-primary/50 hover:bg-primary/10 text-xs animate-in slide-in-from-bottom-3 duration-500"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <IconComponent className="w-3 h-3 mr-1" />
                  {suggestion.text}
                </Button>
              );
            })}
          </div>
        </div>
      )}

      {/* Input Bar */}
      <div className="glass-card border-t border-border/20 px-6 py-4 backdrop-blur-xl">
        <form onSubmit={handleSubmit} className="flex gap-3 items-end max-w-4xl mx-auto">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="mb-2 text-primary hover:bg-primary/10 rounded-full"
            onClick={() => setShowSuggestions(!showSuggestions)}
          >
            <Sparkles className="w-5 h-5" />
          </Button>
          
          <div className="flex-1 relative">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about your destiny..."
              className="glass-card border-border/50 focus:border-primary focus:shadow-glow-gold rounded-2xl py-6 pl-6 pr-14 text-base placeholder:text-muted-foreground/60 backdrop-blur-sm"
              disabled={isTyping}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-2">
              <div className="w-2 h-2 bg-primary/60 rounded-full animate-twinkle"></div>
              <div className="w-1.5 h-1.5 bg-accent/60 rounded-full animate-twinkle" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
          
          <Button 
            type="submit" 
            size="icon"
            className="btn-cosmic rounded-2xl w-14 h-14 mb-2 shadow-glow-gold hover:shadow-glow-gold hover:scale-105 transition-all duration-300"
            disabled={isTyping || !inputValue.trim()}
          >
            <Send className="w-5 h-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}