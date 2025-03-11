
import React from 'react';
import { Button } from '@/components/ui/button';

interface SocialAuthButtonProps {
  provider: 'google' | 'facebook';
  onClick: () => void;
  className?: string;
}

const SocialAuthButton = ({ provider, onClick, className }: SocialAuthButtonProps) => {
  return (
    <Button
      variant="outline"
      className={`w-full flex items-center justify-center gap-2 ${className}`}
      onClick={onClick}
    >
      {provider === 'google' ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"></path>
          <path d="M12 8V16"></path>
          <path d="M8 12H16"></path>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        </svg>
      )}
      Continue with {provider === 'google' ? 'Google' : 'Facebook'}
    </Button>
  );
};

export default SocialAuthButton;
