
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import FeaturedProducts from '@/components/FeaturedProducts';
import Categories from '@/components/Categories';
import { FadeIn, SlideUp } from '@/components/ui/motion';

const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        
        <Categories />
        
        <FeaturedProducts />
        
        {/* Newsletter Section */}
        <section className="py-20 bg-primary/5">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <SlideUp>
                <h2 className="text-3xl md:text-4xl font-medium mb-4">
                  Subscribe to Our Newsletter
                </h2>
                <p className="text-muted-foreground mb-8">
                  Stay updated on new arrivals, exclusive offers, and design inspiration
                  delivered directly to your inbox.
                </p>
              </SlideUp>
              
              <FadeIn>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="email" 
                    placeholder="Enter your email address" 
                    className="input-field sm:flex-1" 
                  />
                  <button className="btn-primary px-5 py-2">
                    Subscribe
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  By subscribing, you agree to our Privacy Policy and consent to receive updates.
                </p>
              </FadeIn>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-20">
          <div className="container-custom">
            <SlideUp className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-medium mb-4">
                What Our Customers Say
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover why our customers love shopping with us and how our products have enhanced their lives.
              </p>
            </SlideUp>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Alex Morgan",
                  quote: "The attention to detail and quality of products exceeded my expectations. Will definitely shop here again!",
                  role: "Designer"
                },
                {
                  name: "Sarah Johnson",
                  quote: "I'm impressed by both the quality and customer service. My new watch gets compliments everywhere I go.",
                  role: "Entrepreneur"
                },
                {
                  name: "Michael Chen",
                  quote: "The minimalist aesthetic and premium quality make these products stand out. Couldn't be happier with my purchase.",
                  role: "Architect"
                }
              ].map((testimonial, index) => (
                <SlideUp key={index} delay={index * 100} className="slide-up-animation">
                  <div className="bg-secondary/30 p-6 rounded-lg">
                    <div className="flex items-center gap-1 text-primary mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star}>★</span>
                      ))}
                    </div>
                    <p className="mb-4">"{testimonial.quote}"</p>
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </SlideUp>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
