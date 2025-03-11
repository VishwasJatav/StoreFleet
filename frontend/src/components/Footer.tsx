
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-secondary pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold tracking-tight">LUXE</h3>
            <p className="text-muted-foreground text-sm">
              Discover curated products that blend quality with modern design. 
              Our collection features timeless pieces that enhance your lifestyle.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="h-8 w-8 rounded-full bg-background flex items-center justify-center transition-colors hover:bg-primary hover:text-white"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a 
                href="#" 
                className="h-8 w-8 rounded-full bg-background flex items-center justify-center transition-colors hover:bg-primary hover:text-white"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a 
                href="#" 
                className="h-8 w-8 rounded-full bg-background flex items-center justify-center transition-colors hover:bg-primary hover:text-white"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="text-base font-medium">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/shop" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="text-base font-medium">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/shop?category=electronics" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Electronics
                </Link>
              </li>
              <li>
                <Link 
                  to="/shop?category=fashion" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Fashion
                </Link>
              </li>
              <li>
                <Link 
                  to="/shop?category=home" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Home & Living
                </Link>
              </li>
              <li>
                <Link 
                  to="/shop?category=accessories" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-base font-medium">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-primary flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  123 Design Street, Creative City, 10001
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-primary flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  +1 (555) 123-4567
                </span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-primary flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  hello@luxeshop.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 mt-12 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {year} LUXE. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <Link 
                to="/privacy-policy" 
                className="text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms-of-service" 
                className="text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
