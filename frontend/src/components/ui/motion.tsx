
import React, { useEffect, useRef } from 'react';

interface MotionProps {
  children: React.ReactNode;
  animation: string;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

export const Motion = ({
  children,
  animation,
  delay = 0,
  duration = 500,
  className = '',
  once = true,
}: MotionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('in-view');
            }, delay);
            
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            entry.target.classList.remove('in-view');
          }
        });
      },
      {
        threshold: 0.1,
      }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay, once]);
  
  return (
    <div
      ref={ref}
      className={`animate-on-scroll ${animation} ${className}`}
      style={{ animationDuration: `${duration}ms`, transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export const FadeIn = (props: Omit<MotionProps, 'animation'>) => {
  return <Motion animation="fade-in" {...props} />;
};

export const SlideUp = (props: Omit<MotionProps, 'animation'>) => {
  return <Motion animation="slide-up" {...props} />;
};

export const SlideDown = (props: Omit<MotionProps, 'animation'>) => {
  return <Motion animation="slide-down" {...props} />;
};

export const ScaleIn = (props: Omit<MotionProps, 'animation'>) => {
  return <Motion animation="scale-in" {...props} />;
};
