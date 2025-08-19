import { useLocation, useNavigate } from "react-router-dom";
import { CosmicChat } from "@/components/ui/cosmic-chat";

// You can set your AI backend URL here or use environment variables
const AI_BACKEND_URL = import.meta.env.VITE_AI_BACKEND_URL || ""; // Add your backend URL here

console.log("🔧 AI_BACKEND_URL:", AI_BACKEND_URL);

const Chat = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get birth details from navigation state or localStorage
  const birthDetails = location.state?.birthDetails || 
    JSON.parse(localStorage.getItem('birthDetails') || 'null');

  // If no birth details, redirect to home with message
  if (!birthDetails) {
    return (
      <div className="min-h-screen cosmic-bg flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="mb-6">
            <div className="text-6xl mb-4">🔮</div>
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Birth Details Required
            </h2>
            <p className="text-gray-300 mb-8">
              Please provide your birth information first to start your cosmic consultation.
            </p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full overflow-hidden">
      <CosmicChat birthDetails={birthDetails} backendUrl={AI_BACKEND_URL} />
    </div>
  );
};

export default Chat;
