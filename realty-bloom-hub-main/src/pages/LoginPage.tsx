
import React from "react";
import AuthForm from "@/components/auth/AuthForm";
import BackButton from "@/components/ui/back-button";

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="container py-8">
        <BackButton to="/" label="Back to Home" />
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md px-4">
          <AuthForm mode="login" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
