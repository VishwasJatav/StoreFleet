import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthForm from "@/components/auth/AuthForm";
import { useAuth } from "@/contexts/AuthContext";
import { SlideUp } from "@/components/ui/motion";

const Login = () => {
  const { user, loginWithEmail, loginWithGoogle, loginWithFacebook } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  
  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, [user, navigate]);

  const handleLogin = async ({ email, password }: { email: string; password: string }) => {
    setError(null); // Clear previous errors
    try {
      await loginWithEmail(email, password);
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Failed to log in. Please try again.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Failed to log in with Google.");
    }
  };

  const handleFacebookLogin = async () => {
    try {
      await loginWithFacebook();
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Failed to log in with Facebook.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-20">
        <div className="container-custom">
          <SlideUp className="mb-12 text-center">
            <h1 className="text-4xl font-medium mb-4">Welcome Back</h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Sign in to your account to view your orders, manage your profile, and continue shopping.
            </p>
          </SlideUp>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          
          <AuthForm
            type="login"
            onSubmit={handleLogin}
            onGoogleAuth={handleGoogleLogin}
            onFacebookAuth={handleFacebookLogin}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
