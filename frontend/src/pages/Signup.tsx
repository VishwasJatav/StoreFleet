import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthForm from '@/components/auth/AuthForm';
import { useAuth } from '@/contexts/AuthContext';
import { SlideUp } from '@/components/ui/motion';

const Signup = () => {
  const { user, signupWithEmail, loginWithGoogle, loginWithFacebook } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, [user, navigate]);

  const handleSignup = async ({ name, email, password }: { name: string; email: string; password: string }) => {
    await signupWithEmail(name, email, password);
    navigate('/');
  };

  const handleGoogleSignup = async () => {
    await loginWithGoogle();
    navigate('/');
  };

  const handleFacebookSignup = async () => {
    await loginWithFacebook();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-20">
        <div className="container-custom">
          <SlideUp className="mb-12 text-center">
            <h1 className="text-4xl font-medium mb-4">Create Account</h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Join our community to enjoy a seamless shopping experience, exclusive offers, and more.
            </p>
          </SlideUp>
          
          <AuthForm
            type="signup"
            onSubmit={handleSignup}
            onGoogleAuth={handleGoogleSignup}
            onFacebookAuth={handleFacebookSignup}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Signup;
