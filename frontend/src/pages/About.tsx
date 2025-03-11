
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FadeIn, SlideUp } from '@/components/ui/motion';

const About = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-28 pb-20">
          <div className="container-custom">
            <SlideUp className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-medium mb-6">About Us</h1>
              <p className="text-xl text-muted-foreground">
                Crafting exceptional shopping experiences through thoughtful curation and 
                commitment to quality.
              </p>
            </SlideUp>
          </div>
        </section>
        
        {/* Our Story */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <FadeIn>
                <div className="rounded-2xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="Our team at work" 
                    className="w-full h-full object-cover aspect-[16/9]"
                  />
                </div>
              </FadeIn>
              
              <div>
                <SlideUp>
                  <h2 className="text-3xl font-medium mb-6">Our Story</h2>
                  <p className="text-muted-foreground mb-4">
                    Founded in 2018, LUXE began with a simple mission: to create a shopping destination 
                    where quality, design, and customer experience are paramount. Our journey started 
                    with a small collection of carefully selected products that embodied our vision 
                    of everyday luxury.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    Over the years, we've grown our collection while maintaining our commitment to 
                    offering products that blend form and function seamlessly. Each item in our store 
                    is chosen not only for its aesthetic appeal but also for its durability and 
                    relevance to contemporary lifestyles.
                  </p>
                  <p className="text-muted-foreground">
                    Today, LUXE stands as a testament to our belief that beautiful, well-crafted 
                    products should be accessible to everyone who appreciates thoughtful design.
                  </p>
                </SlideUp>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Values */}
        <section className="py-16 bg-secondary/50">
          <div className="container-custom">
            <SlideUp className="text-center mb-16">
              <h2 className="text-3xl font-medium mb-4">Our Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The principles that guide our decisions and shape our approach to business.
              </p>
            </SlideUp>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Quality First",
                  description: "We believe in products that stand the test of time, both in design and durability. Each item we offer meets our stringent quality standards."
                },
                {
                  title: "Thoughtful Curation",
                  description: "Our catalog is carefully curated to present products that align with our aesthetic vision and functional requirements, ensuring a cohesive collection."
                },
                {
                  title: "Customer Experience",
                  description: "From browsing to unboxing, we strive to create a seamless, enjoyable shopping experience that respects your time and exceeds expectations."
                }
              ].map((value, index) => (
                <SlideUp key={index} delay={index * 100} className="slide-up-animation">
                  <div className="bg-white p-8 rounded-lg shadow-sm h-full">
                    <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6">
                      <span className="text-xl font-medium">{index + 1}</span>
                    </div>
                    <h3 className="text-xl font-medium mb-4">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                </SlideUp>
              ))}
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-16">
          <div className="container-custom">
            <SlideUp className="text-center mb-16">
              <h2 className="text-3xl font-medium mb-4">Meet Our Team</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The passionate individuals behind LUXE who work tirelessly to create exceptional 
                shopping experiences.
              </p>
            </SlideUp>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: "Emma Thompson",
                  role: "Founder & CEO",
                  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZSUyMHBvcnRyYWl0fGVufDB8fDB8fHww"
                },
                {
                  name: "David Chen",
                  role: "Creative Director",
                  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZSUyMHBvcnRyYWl0fGVufDB8fDB8fHww"
                },
                {
                  name: "Sophia Kim",
                  role: "Product Curator",
                  image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2ZpbGUlMjBwb3J0cmFpdHxlbnwwfHwwfHx8MA%3D%3D"
                },
                {
                  name: "Marcus Johnson",
                  role: "Customer Experience",
                  image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHByb2ZpbGUlMjBwb3J0cmFpdHxlbnwwfHwwfHx8MA%3D%3D"
                }
              ].map((member, index) => (
                <SlideUp key={index} delay={index * 100} className="slide-up-animation">
                  <div className="text-center">
                    <div className="mb-4 rounded-full overflow-hidden mx-auto w-48 h-48">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-medium">{member.name}</h3>
                    <p className="text-muted-foreground">{member.role}</p>
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

export default About;
