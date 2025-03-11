
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/ui/motion';
import { useToast } from '@/hooks/use-toast';
import SocialAuthButton from './SocialAuthButton';

interface FormData {
  email: string;
  password: string;
  confirmPassword?: string;
}

interface AuthFormProps {
  type: 'login' | 'signup';
  onSubmit: (data: FormData) => void;
  onGoogleAuth: () => void;
  onFacebookAuth: () => void;
}

const AuthForm = ({ type, onSubmit, onGoogleAuth, onFacebookAuth }: AuthFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    ...(type === 'signup' && { confirmPassword: '' }),
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    // Confirm password validation (for signup)
    if (type === 'signup' && formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user types
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setLoading(true);
      await onSubmit(formData);
      // Clear form on successful submission
      setFormData({
        email: '',
        password: '',
        ...(type === 'signup' && { confirmPassword: '' }),
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'An unexpected error occurred',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <FadeIn>
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white shadow-md rounded-lg p-8">
          <h2 className="text-3xl font-medium mb-6 text-center">
            {type === 'login' ? 'Sign In' : 'Create Account'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`input-field w-full ${errors.email ? 'border-destructive' : ''}`}
                placeholder="Enter your email"
                required
              />
              {errors.email && (
                <p className="text-destructive text-xs mt-1">{errors.email}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`input-field w-full ${errors.password ? 'border-destructive' : ''}`}
                placeholder="Enter your password"
                required
              />
              {errors.password && (
                <p className="text-destructive text-xs mt-1">{errors.password}</p>
              )}
            </div>
            
            {type === 'signup' && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`input-field w-full ${errors.confirmPassword ? 'border-destructive' : ''}`}
                  placeholder="Confirm your password"
                  required
                />
                {errors.confirmPassword && (
                  <p className="text-destructive text-xs mt-1">{errors.confirmPassword}</p>
                )}
              </div>
            )}
            
            {type === 'login' && (
              <div className="flex justify-end">
                <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
            )}
            
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Please wait...' : type === 'login' ? 'Sign In' : 'Sign Up'}
            </Button>
          </form>
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">or continue with</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <SocialAuthButton
              provider="google"
              onClick={onGoogleAuth}
            />
            <SocialAuthButton
              provider="facebook"
              onClick={onFacebookAuth}
            />
          </div>
          
          <div className="mt-6 text-center text-sm">
            {type === 'login' ? (
              <p className="text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/signup" className="text-primary hover:underline">
                  Sign up
                </Link>
              </p>
            ) : (
              <p className="text-muted-foreground">
                Already have an account?{' '}
                <Link to="/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </FadeIn>
  );
};

export default AuthForm;
