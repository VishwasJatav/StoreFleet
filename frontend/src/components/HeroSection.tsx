
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FadeIn, SlideUp } from './ui/motion';

const HeroSection = () => {
  return (
    <section className="relative pt-28 pb-20 md:py-32 lg:py-40 overflow-hidden">
      <div className="hero-gradient absolute inset-0 z-0"></div>
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-6 items-center">
          <div className="lg:pr-12">
            <SlideUp delay={100} className="slide-up-animation">
              <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-6">
                Premium Quality Products
              </span>
            </SlideUp>
            
            <SlideUp delay={300} className="slide-up-animation">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6">
                Discover Exceptional <span className="text-primary">Design</span> for Everyday Life
              </h1>
            </SlideUp>
            
            <SlideUp delay={500} className="slide-up-animation">
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                Curated collection of premium products that blend contemporary design with 
                timeless quality, enhancing your lifestyle with every purchase.
              </p>
            </SlideUp>
            
            <SlideUp delay={700} className="slide-up-animation flex flex-wrap gap-4">
              <Link to="/shop">
                <Button size="lg" className="min-w-[150px]">
                  Shop Now
                </Button>
              </Link>
              
              <Link to="/about">
                <Button size="lg" variant="outline" className="min-w-[150px]">
                  Learn More
                </Button>
              </Link>
            </SlideUp>
          </div>
          
          <FadeIn className="relative">
            <div className="aspect-square relative">
              <img
                src="https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Elegant watch"
                className="rounded-2xl object-cover w-full h-full shadow-lg"
              />
              
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl max-w-[200px]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Premium Watch</span>
                  <span className="text-primary font-semibold">$189.99</span>
                </div>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-primary">★</span>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
