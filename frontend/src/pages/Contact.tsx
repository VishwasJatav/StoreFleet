
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { FadeIn, SlideUp } from '@/components/ui/motion';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "Thank you for your message. We'll get back to you soon!",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-28 pb-20">
          <div className="container-custom">
            <SlideUp className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-medium mb-6">Contact Us</h1>
              <p className="text-xl text-muted-foreground">
                Have questions or need assistance? We're here to help.
                Reach out to our team for prompt and friendly support.
              </p>
            </SlideUp>
          </div>
        </section>
        
        {/* Contact Information */}
        <section className="py-12 bg-secondary/30">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <MapPin className="h-8 w-8 text-primary" />,
                  title: "Address",
                  details: ["123 Design Street", "Creative City, 10001", "United States"]
                },
                {
                  icon: <Phone className="h-8 w-8 text-primary" />,
                  title: "Phone",
                  details: ["+1 (555) 123-4567", "+1 (555) 987-6543"]
                },
                {
                  icon: <Mail className="h-8 w-8 text-primary" />,
                  title: "Email",
                  details: ["hello@luxeshop.com", "support@luxeshop.com"]
                },
                {
                  icon: <Clock className="h-8 w-8 text-primary" />,
                  title: "Working Hours",
                  details: ["Monday - Friday: 9am - 7pm", "Saturday - Sunday: 10am - 5pm"]
                }
              ].map((item, index) => (
                <FadeIn key={index} delay={index * 100}>
                  <div className="text-center p-6 h-full">
                    <div className="flex justify-center mb-4">
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-medium mb-3">{item.title}</h3>
                    <div className="text-muted-foreground">
                      {item.details.map((detail, i) => (
                        <p key={i}>{detail}</p>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
        
        {/* Contact Form */}
        <section className="py-20">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <SlideUp>
                <div className="rounded-lg overflow-hidden h-full">
                  <img 
                    src="https://images.unsplash.com/photo-1577563908411-5077b6dc7624?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="Contact us" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </SlideUp>
              
              <FadeIn>
                <div className="lg:pl-6">
                  <h2 className="text-3xl font-medium mb-6">Get in Touch</h2>
                  <p className="text-muted-foreground mb-8">
                    We'd love to hear from you. Complete the form below, and one of our 
                    team members will contact you shortly.
                  </p>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Your Name
                        </label>
                        <input 
                          type="text" 
                          id="name" 
                          className="input-field w-full" 
                          placeholder="Enter your name" 
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email Address
                        </label>
                        <input 
                          type="email" 
                          id="email" 
                          className="input-field w-full" 
                          placeholder="Enter your email" 
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2">
                        Subject
                      </label>
                      <input 
                        type="text" 
                        id="subject" 
                        className="input-field w-full" 
                        placeholder="Enter subject" 
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Message
                      </label>
                      <textarea 
                        id="message" 
                        rows={5} 
                        className="input-field w-full resize-none" 
                        placeholder="Enter your message" 
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="w-full sm:w-auto">
                      Send Message
                    </Button>
                  </form>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
        
        {/* Map Section */}
        <section className="py-12 bg-secondary/30">
          <div className="container-custom">
            <div className="rounded-lg overflow-hidden h-[400px]">
              {/* This would be a Google Map iframe in a real application */}
              <div className="w-full h-full bg-secondary/50 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-xl font-medium mb-2">Visit Our Store</h3>
                  <p className="text-muted-foreground">
                    123 Design Street, Creative City, 10001, United States
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
