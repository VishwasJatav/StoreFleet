import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Menu, X, User, Search, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeMenu = () => {
    setIsOpen(false);
    setSearchOpen(false);
    setProfileMenuOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    closeMenu();
    navigate("/");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-sm py-2" : "bg-transparent py-4"}`}>
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl md:text-2xl font-semibold tracking-tighter" onClick={closeMenu}>
          LUXE
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} className="text-sm font-medium relative hover:text-primary transition-colors" onClick={closeMenu}>
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setSearchOpen(!searchOpen)}>
            <Search className="h-5 w-5" />
          </Button>

          {user ? (
            <div className="relative" ref={profileMenuRef}>
              <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setProfileMenuOpen(!profileMenuOpen)}>
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name || "User"} className="h-8 w-8 rounded-full object-cover" />
                ) : (
                  <User className="h-5 w-5" />
                )}
              </Button>

              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <div className="px-4 py-2 border-b border-border">
                    <p className="text-sm font-medium">{user.name || "User"}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                  <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-secondary" onClick={closeMenu}>
                    Profile
                  </Link>
                  <Link to="/orders" className="block px-4 py-2 text-sm hover:bg-secondary" onClick={closeMenu}>
                    My Orders
                  </Link>
                  <button className="block w-full text-left px-4 py-2 text-sm text-destructive hover:bg-secondary" onClick={handleLogout}>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
          )}

          <Link to="/cart">
            <Button variant="ghost" size="icon" className="rounded-full relative">
              <ShoppingCart className="h-5 w-5" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] text-white flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="rounded-full relative">
              <ShoppingCart className="h-5 w-5" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] text-white flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white animate-slide-down">
          <div className="container-custom py-4">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link key={link.name} to={link.path} className="py-2 text-foreground hover:text-primary transition-colors" onClick={closeMenu}>
                  {link.name}
                </Link>
              ))}

              {user ? (
                <>
                  <div className="py-2 border-t border-border">
                    <Link to="/profile" className="block py-2 text-foreground hover:text-primary transition-colors" onClick={closeMenu}>
                      Profile
                    </Link>
                    <Link to="/orders" className="block py-2 text-foreground hover:text-primary transition-colors" onClick={closeMenu}>
                      My Orders
                    </Link>
                    <button className="flex items-center gap-2 py-2 text-destructive hover:text-destructive/80 transition-colors" onClick={handleLogout}>
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                </>
              ) : (
                <Link to="/login" className="btn-primary text-center py-2" onClick={closeMenu}>
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
