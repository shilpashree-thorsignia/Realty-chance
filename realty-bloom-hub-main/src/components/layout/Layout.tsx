
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";
import PropertyChatbot from "../chatbot/PropertyChatbot";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  
  // Effect to add animation classes to staggered elements
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add animation class when element enters viewport
            entry.target.classList.add("animate-fade-in");
            
            // For staggered items, add them with a delay
            const staggeredItems = entry.target.querySelectorAll('.stagger-item');
            staggeredItems.forEach((item, index) => {
              setTimeout(() => {
                (item as HTMLElement).style.opacity = '1';
              }, index * 100);
            });
            
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all elements with the .animate-on-scroll class
    document.querySelectorAll(".animate-on-scroll").forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Add a scroll progress indicator
  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollProgress = document.getElementById("scroll-progress");
      if (scrollProgress) {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        scrollProgress.style.width = scrollPercentage + "%";
      }
    };

    window.addEventListener("scroll", updateScrollProgress);
    
    // Create scroll progress element
    const scrollProgress = document.createElement("div");
    scrollProgress.id = "scroll-progress";
    scrollProgress.className = "fixed top-0 left-0 h-1 bg-secondary z-50 transition-all duration-100";
    document.body.appendChild(scrollProgress);
    
    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
      const scrollProgressElement = document.getElementById("scroll-progress");
      if (scrollProgressElement) {
        scrollProgressElement.remove();
      }
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      {!isHomePage && (
        <div className="container py-4">
          <Link 
            to="/" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>
      )}
      <main className="flex-1">{children}</main>
      <Footer />
      <PropertyChatbot />
    </div>
  );
};

export default Layout;
