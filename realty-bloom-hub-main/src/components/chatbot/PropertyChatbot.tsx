
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X, Building, MapPin, Home } from "lucide-react";
import { Link } from "react-router-dom";

interface PropertySuggestion {
  id: string;
  title: string;
  image: string;
  price: number;
  location: string;
}

interface ChatbotMessage {
  id: string;
  text: string;
  sender: "bot" | "user";
  suggestions?: PropertySuggestion[];
}

interface AmenityNearby {
  type: string;
  name: string;
  distance: string;
}

const INITIAL_MESSAGES: ChatbotMessage[] = [{
  id: "1",
  text: "👋 Hello! I'm RealityChatbot, your property assistant. How can I help you find your dream property today? You can ask me about locations, property types, or amenities you're looking for.",
  sender: "bot"
}];

const PREDEFINED_QUESTIONS = [
  "Show me properties in Mumbai",
  "What apartments are available in Bangalore?",
  "I'm looking for a 3BHK in Delhi",
  "Show properties near schools",
  "What are the lease options available?",
];

const PropertyChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatbotMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessageId = `user-${Date.now()}`;
    const userMessage: ChatbotMessage = {
      id: userMessageId,
      text: input,
      sender: "user"
    };
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    // Simulate bot response after a short delay
    setTimeout(() => {
      let botResponse: ChatbotMessage;

      // Check for location keywords
      if (input.toLowerCase().includes("mumbai") || input.toLowerCase().includes("maharashtra")) {
        botResponse = {
          id: `bot-${Date.now()}`,
          text: "Here are some popular properties in Mumbai that might interest you:",
          sender: "bot",
          suggestions: [{
            id: "prop-101",
            title: "Luxury 3BHK in Worli",
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070",
            price: 15000000,
            location: "Worli, Mumbai"
          }, {
            id: "prop-102",
            title: "Sea-facing Apartment in Bandra",
            image: "https://images.unsplash.com/photo-1616137466211-f939a420be84?q=80&w=2532",
            price: 22000000,
            location: "Bandra West, Mumbai"
          }]
        };
      } else if (input.toLowerCase().includes("bangalore") || input.toLowerCase().includes("karnataka")) {
        botResponse = {
          id: `bot-${Date.now()}`,
          text: "Here are some popular properties in Bangalore that might interest you:",
          sender: "bot",
          suggestions: [{
            id: "prop-103",
            title: "Modern Villa in Whitefield",
            image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071",
            price: 18500000,
            location: "Whitefield, Bangalore"
          }, {
            id: "prop-104",
            title: "Premium 4BHK in Indiranagar",
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070",
            price: 19000000,
            location: "Indiranagar, Bangalore"
          }]
        };
      } else if (input.toLowerCase().includes("amenity") || input.toLowerCase().includes("amenities") || input.toLowerCase().includes("nearby")) {
        // Enhanced amenity search responses
        const amenities: AmenityNearby[] = [
          { type: "school", name: "Delhi Public School", distance: "0.5 km" },
          { type: "hospital", name: "Apollo Hospital", distance: "1.2 km" },
          { type: "market", name: "City Market", distance: "0.7 km" },
          { type: "park", name: "Green Park", distance: "0.3 km" }
        ];
        
        botResponse = {
          id: `bot-${Date.now()}`,
          text: "I can help you find properties with amenities nearby. Here are some properties with good amenities in the vicinity:",
          sender: "bot",
          suggestions: [{
            id: "prop-105",
            title: "Family Apartment with Great Amenities",
            image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2070",
            price: 12500000,
            location: "HSR Layout, Bangalore"
          }, {
            id: "prop-106",
            title: "Premium Condo Near Schools & Hospitals",
            image: "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?q=80&w=2070",
            price: 16700000,
            location: "Koramangala, Bangalore"
          }]
        };
        
        // Add follow-up message about specific amenities
        setTimeout(() => {
          const amenitiesMessage: ChatbotMessage = {
            id: `bot-${Date.now() + 100}`,
            text: `The properties I suggested have these amenities nearby: ${amenities.map(a => `${a.name} (${a.type}) - ${a.distance}`).join(", ")}`,
            sender: "bot"
          };
          setMessages(prev => [...prev, amenitiesMessage]);
        }, 1000);
      } else if (input.toLowerCase().includes("lease")) {
        botResponse = {
          id: `bot-${Date.now()}`,
          text: "I can help you find properties for lease. Here are some options:",
          sender: "bot",
          suggestions: [{
            id: "lease-101",
            title: "Commercial Space for Long-term Lease",
            image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2070",
            price: 150000, // Monthly
            location: "Commercial District, Mumbai"
          }, {
            id: "lease-102",
            title: "Office Building for Corporate Lease",
            image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069",
            price: 280000, // Monthly
            location: "Tech Park, Bangalore"
          }]
        };
      } else {
        botResponse = {
          id: `bot-${Date.now()}`,
          text: "I can help you find properties in many cities across India. Let me know which city you're interested in, or what type of property you're looking for!",
          sender: "bot"
        };
      }
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };
  
  // Handle predefined question click
  const handleQuickQuestion = (question: string) => {
    setInput(question);
    // We don't submit automatically, let user press send
  };
  
  const toggleChatbot = () => {
    setIsOpen(prev => !prev);
  };
  
  return <>
      {/* Chatbot Button */}
      <Button className="fixed bottom-6 right-6 rounded-full h-14 w-14 shadow-lg z-50 flex items-center justify-center" onClick={toggleChatbot}>
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>
      
      {/* Chatbot Panel */}
      {isOpen && <div className="fixed bottom-24 right-6 w-80 sm:w-96 h-96 bg-white rounded-lg shadow-xl z-50 flex flex-col">
          <div className="bg-primary text-primary-foreground p-3 rounded-t-lg">
            <h3 className="font-medium">RealtyChance Assistant</h3>
            <p className="text-xs text-primary-foreground/80">Let me help you find your dream property</p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(msg => <div key={msg.id} className={`flex ${msg.sender === "bot" ? "justify-start" : "justify-end"}`}>
                <div className={`max-w-[80%] rounded-lg p-3 ${msg.sender === "bot" ? "bg-muted" : "bg-primary text-primary-foreground"}`}>
                  <p className="text-sm">{msg.text}</p>
                  
                  {/* Property Suggestions */}
                  {msg.suggestions && <div className="mt-2 space-y-2">
                      {msg.suggestions.map(suggestion => <Link key={suggestion.id} to={`/properties/${suggestion.id}`} className="block bg-background rounded-md overflow-hidden hover:shadow-md transition-shadow">
                          <div className="flex">
                            <img src={suggestion.image} alt={suggestion.title} className="w-16 h-16 object-cover" />
                            <div className="p-2">
                              <p className="text-xs font-medium line-clamp-1">{suggestion.title}</p>
                              <p className="text-xs text-muted-foreground">{suggestion.location}</p>
                              <p className="text-xs font-medium">₹{suggestion.price.toLocaleString('en-IN')}</p>
                            </div>
                          </div>
                        </Link>)}
                    </div>}
                </div>
              </div>)}
          </div>
          
          {/* Quick questions */}
          <div className="p-2 border-t border-muted overflow-x-auto">
            <div className="flex gap-2 pb-2 whitespace-nowrap">
              {PREDEFINED_QUESTIONS.map((question, index) => (
                <Button 
                  key={index} 
                  variant="outline" 
                  size="sm" 
                  className="text-xs"
                  onClick={() => handleQuickQuestion(question)}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
          
          <form onSubmit={handleSendMessage} className="border-t p-3 flex gap-2">
            <input 
              type="text" 
              className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm" 
              placeholder="Ask about locations, property types..." 
              value={input} 
              onChange={e => setInput(e.target.value)} 
            />
            <Button type="submit">Send</Button>
          </form>
        </div>}
    </>;
};

export default PropertyChatbot;
