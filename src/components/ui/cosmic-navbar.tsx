import { useState } from "react";
import { Home, Sparkles, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  href?: string;
}

interface CosmicNavbarProps {
  activeItem?: string;
  onItemClick?: (item: string) => void;
}

const navItems: NavItem[] = [
  {
    id: "home",
    label: "Home",
    icon: Home,
  },
  {
    id: "reading",
    label: "Get Reading",
    icon: Sparkles,
  },
  {
    id: "chat",
    label: "Chat",
    icon: MessageCircle,
  },
];

export function CosmicNavbar({ activeItem = "home", onItemClick }: CosmicNavbarProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleItemClick = (itemId: string) => {
    onItemClick?.(itemId);
  };

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="relative">
        {/* Main navbar container with true glass effect */}
        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-full px-6 py-2 shadow-lg">
          <div className="flex items-center space-x-2">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;
              const isHovered = hoveredItem === item.id;
              const shouldExpand = isActive || isHovered;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={cn(
                    "relative flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300",
                    "hover:bg-white/10",
                    isActive && "bg-white/15"
                  )}
                >
                  {/* Icon */}
                  <Icon 
                    className={cn(
                      "w-5 h-5 transition-all duration-300 relative z-10",
                      isActive ? "text-white" : "text-white/70",
                      isHovered && "text-white scale-105"
                    )} 
                  />
                  
                  {/* Label - shows on hover or when active for ALL items including home */}
                  <span
                    className={cn(
                      "text-sm font-medium transition-all duration-300 whitespace-nowrap overflow-hidden relative z-10",
                      shouldExpand
                        ? "max-w-[100px] opacity-100 ml-1" 
                        : "max-w-0 opacity-0 ml-0",
                      isActive ? "text-white" : "text-white/90"
                    )}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
