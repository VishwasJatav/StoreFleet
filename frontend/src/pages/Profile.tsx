
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { FadeIn, SlideUp } from '@/components/ui/motion';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { User, Mail, MapPin, Phone, Save, Camera } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });
  
  const [loading, setLoading] = useState(false);
  
  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      // Populate form with user data
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        country: 'India',
      });
    }
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, [user, navigate]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call to update profile
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setLoading(false);
    toast({
      title: 'Profile Updated',
      description: 'Your profile has been successfully updated.',
    });
  };
  
  if (!user) {
    return null;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-20">
        <div className="container-custom">
          <SlideUp className="mb-12">
            <h1 className="text-4xl font-medium mb-4">My Profile</h1>
            <p className="text-muted-foreground">
              Manage your account information and address details.
            </p>
          </SlideUp>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Sidebar */}
            <FadeIn className="lg:col-span-1">
              <div className="bg-secondary/30 rounded-lg p-6">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="relative mb-4">
                    {user.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.name || 'User'} 
                        className="w-24 h-24 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-10 w-10 text-primary" />
                      </div>
                    )}
                    <button className="absolute bottom-0 right-0 bg-primary text-white p-1 rounded-full">
                      <Camera className="h-4 w-4" />
                    </button>
                  </div>
                  <h2 className="text-xl font-medium">{user.name || 'User'}</h2>
                  <p className="text-muted-foreground text-sm">{user.email}</p>
                </div>
                
                <nav className="space-y-1">
                  <a href="/profile" className="flex items-center gap-2 px-4 py-2 rounded-md bg-primary/10 text-primary">
                    <User className="h-4 w-4" />
                    Profile Information
                  </a>
                  <a href="/orders" className="flex items-center gap-2 px-4 py-2 rounded-md text-muted-foreground hover:bg-secondary transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="16" height="20" x="4" y="2" rx="2" />
                      <path d="M16 2v4" />
                      <path d="M8 2v4" />
                      <path d="M4 10h16" />
                      <path d="m9 16 2 2 4-4" />
                    </svg>
                    My Orders
                  </a>
                  <a href="/wishlist" className="flex items-center gap-2 px-4 py-2 rounded-md text-muted-foreground hover:bg-secondary transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                    Wishlist
                  </a>
                  <a href="/settings" className="flex items-center gap-2 px-4 py-2 rounded-md text-muted-foreground hover:bg-secondary transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    Account Settings
                  </a>
                </nav>
              </div>
            </FadeIn>
            
            {/* Profile Form */}
            <FadeIn className="lg:col-span-2">
              <div className="bg-white border border-border rounded-lg p-6">
                <h2 className="text-xl font-medium mb-6">Profile Information</h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Full Name
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="input-field pl-10 w-full"
                            placeholder="Enter your full name"
                          />
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email Address
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="input-field pl-10 w-full"
                            placeholder="Enter your email"
                            readOnly
                          />
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Email cannot be changed</p>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="input-field pl-10 w-full"
                          placeholder="Enter your phone number"
                        />
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Address Information</h3>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="address" className="block text-sm font-medium mb-2">
                            Street Address
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              id="address"
                              name="address"
                              value={formData.address}
                              onChange={handleChange}
                              className="input-field pl-10 w-full"
                              placeholder="Enter your street address"
                            />
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="city" className="block text-sm font-medium mb-2">
                              City
                            </label>
                            <input
                              type="text"
                              id="city"
                              name="city"
                              value={formData.city}
                              onChange={handleChange}
                              className="input-field w-full"
                              placeholder="Enter your city"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="state" className="block text-sm font-medium mb-2">
                              State
                            </label>
                            <input
                              type="text"
                              id="state"
                              name="state"
                              value={formData.state}
                              onChange={handleChange}
                              className="input-field w-full"
                              placeholder="Enter your state"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="zip" className="block text-sm font-medium mb-2">
                              ZIP Code
                            </label>
                            <input
                              type="text"
                              id="zip"
                              name="zip"
                              value={formData.zip}
                              onChange={handleChange}
                              className="input-field w-full"
                              placeholder="Enter your ZIP code"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="country" className="block text-sm font-medium mb-2">
                              Country
                            </label>
                            <select
                              id="country"
                              name="country"
                              value={formData.country}
                              onChange={handleChange}
                              className="input-field w-full"
                            >
                              <option value="India">India</option>
                              <option value="United States">United States</option>
                              <option value="United Kingdom">United Kingdom</option>
                              <option value="Canada">Canada</option>
                              <option value="Australia">Australia</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end pt-4">
                      <Button type="submit" className="gap-2" disabled={loading}>
                        <Save className="h-4 w-4" />
                        {loading ? 'Saving...' : 'Save Changes'}
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </FadeIn>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
