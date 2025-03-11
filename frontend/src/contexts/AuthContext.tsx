import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";
import { useGoogleLogin } from "@react-oauth/google";
import { apiRequest } from "../services/api";

declare global {
  interface Window {
    FB: any;
  }
}

interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  signupWithEmail: (name: string, email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithFacebook: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserProfile(token);
    } else {
      setLoading(false);
    }
  }, []);

  // Fetch user profile from the backend
  const fetchUserProfile = async (token: string) => {
    try {
      const userData = await apiRequest("/auth/profile", "GET", null, token);
      setUser(userData);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  // Login user with email and password
  const loginWithEmail = async (email: string, password: string) => {
    try {
      const data = await apiRequest("/auth/login", "POST", { email, password });  // ✅ Correct API
      if (data.token) {
        localStorage.setItem("token", data.token);
        setUser(data.user);
        toast({ title: "Success!", description: "Logged in successfully." });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({ title: "Error", description: "Failed to sign in.", variant: "destructive" });
    }
  };  

  // Signup user with email, name, and password
  const signupWithEmail = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      const data = await apiRequest("/auth/register", "POST", { name, email, password });
      if (data.token) {
        localStorage.setItem("token", data.token);
        setUser(data.user);
        toast({ title: "Account created!", description: "You have successfully signed up." });
      } else {
        throw new Error(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast({ title: "Error", description: error.message || "Failed to create account.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  // Google Login Function
  const loginWithGoogle = async () => {
    try {
      const googleLogin = useGoogleLogin({
        onSuccess: async (response) => {
          const backendResponse = await apiRequest("/auth/google-login", "POST", { token: response.access_token });
          if (backendResponse.token) {
            localStorage.setItem("token", backendResponse.token);
            setUser(backendResponse.user);
            toast({ title: "Success!", description: "Signed in with Google." });
          }
        },
        onError: () => {
          toast({ title: "Error", description: "Google login failed.", variant: "destructive" });
        },
      });

      googleLogin();
    } catch (error) {
      console.error("Google login error:", error);
      toast({ title: "Error", description: "Failed to sign in with Google.", variant: "destructive" });
    }
  };

  // Facebook Login Function
  const loginWithFacebook = async () => {
    try {
      if (!window.FB) {
        console.error("Facebook SDK not loaded yet.");
        toast({ title: "Error", description: "Facebook SDK not loaded.", variant: "destructive" });
        return;
      }
  
      window.FB.login(
        async (response: any) => {
          if (response.authResponse) {
            const { accessToken } = response.authResponse;
  
            // Send accessToken to backend for verification
            const backendResponse = await apiRequest("/auth/facebook-login", "POST", { accessToken });
  
            if (backendResponse.token) {
              localStorage.setItem("token", backendResponse.token);
              setUser(backendResponse.user);
              toast({ title: "Success!", description: "Signed in with Facebook." });
            }
          } else {
            toast({ title: "Error", description: "Facebook login failed.", variant: "destructive" });
          }
        },
        { scope: "email,public_profile" }
      );
    } catch (error) {
      console.error("Facebook login error:", error);
      toast({ title: "Error", description: "Failed to sign in with Facebook.", variant: "destructive" });
    }
  };
  

  // Logout user
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    toast({ title: "Signed out", description: "You have been successfully signed out." });
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, loginWithEmail, signupWithEmail, loginWithGoogle, loginWithFacebook, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
