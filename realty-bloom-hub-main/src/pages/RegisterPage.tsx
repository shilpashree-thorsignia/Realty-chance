
import React from "react";
import AuthForm from "@/components/auth/AuthForm";
import BackButton from "@/components/ui/back-button";
import PropertyChatbot from "@/components/chatbot/PropertyChatbot";

const RegisterPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="container py-8">
        <BackButton to="/" label="Back to Home" />
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md px-4">
          <AuthForm mode="register" />
        </div>
      </div>
      
      {/* Add PropertyChatbot to help users during registration */}
      <PropertyChatbot />
    </div>
  );
};

export default RegisterPage;
