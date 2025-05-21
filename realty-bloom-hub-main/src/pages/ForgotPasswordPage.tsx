import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, ArrowRight, Check } from "lucide-react";
import BackButton from "@/components/ui/back-button";
import { toast } from "sonner";

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, this would call an API endpoint
      // For now, we'll simulate a successful request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitted(true);
      toast.success("Password reset link sent to your email");
    } catch (error) {
      toast.error("Failed to send reset link. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container py-8">
        <BackButton to="/login" label="Back to Login" />
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md px-4">
          <div className="bg-white rounded-lg shadow-md p-6 w-full">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold">Reset Your Password</h2>
              <p className="text-muted-foreground mt-1">
                {!isSubmitted 
                  ? "Enter your email address to receive a password reset link" 
                  : "Check your email for the reset link"}
              </p>
            </div>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    "Sending Reset Link..."
                  ) : (
                    <>
                      Send Reset Link
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            ) : (
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="bg-primary/10 rounded-full p-3">
                    <Check className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <p>
                  We've sent a password reset link to <strong>{email}</strong>. 
                  Please check your inbox and follow the instructions to reset your password.
                </p>
                <p className="text-sm text-muted-foreground">
                  If you don't see the email, check your spam folder or{" "}
                  <button 
                    type="button" 
                    className="text-primary hover:underline"
                    onClick={() => setIsSubmitted(false)}
                  >
                    try again
                  </button>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // In a real app, this would call an API endpoint
      // For now, we'll just simulate a successful password reset request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitted(true);
      toast.success("Password reset link sent to your email");
    } catch (error) {
      console.error("Password reset error:", error);
      toast.error("Failed to send reset link. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container py-8">
        <Link to="/login" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Login
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md px-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold">
                {isSubmitted ? "Check Your Email" : "Reset Your Password"}
              </h2>
              <p className="text-muted-foreground mt-1">
                {isSubmitted 
                  ? "We've sent you a link to reset your password" 
                  : "Enter your email and we'll send you a link to reset your password"}
              </p>
            </div>

            {isSubmitted ? (
              <div className="text-center">
                <p className="mb-4">
                  Please check your email inbox for <strong>{email}</strong> and follow the instructions to reset your password.
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  Didn't receive an email? Check your spam folder or <button 
                    onClick={() => setIsSubmitted(false)} 
                    className="text-primary hover:underline"
                  >
                    try again
                  </button>
                </p>
                <Link to="/login">
                  <Button variant="outline" className="w-full">
                    Return to Login
                  </Button>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Reset Link
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;