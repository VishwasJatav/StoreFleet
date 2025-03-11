import { useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext"; // Import Cart Provider
import "./App.css";

// Lazy load pages for better performance
const Index = lazy(() => import("@/pages/Index"));
const About = lazy(() => import("@/pages/About"));
const Shop = lazy(() => import("@/pages/Shop"));
const Product = lazy(() => import("@/pages/Product"));
const Cart = lazy(() => import("@/pages/Cart"));
const Contact = lazy(() => import("@/pages/Contact"));
const Login = lazy(() => import("@/pages/Login"));
const Signup = lazy(() => import("@/pages/Signup"));
const Profile = lazy(() => import("@/pages/Profile"));
const Orders = lazy(() => import("@/pages/Orders"));
const NotFound = lazy(() => import("@/pages/NotFound"));

// ✅ Loading Placeholder (Spinner or Skeleton)
const Loader = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
  </div>
);

function App() {
  // ✅ Preload key images on app load (optional improvement)
  useEffect(() => {
    const preloadImages = (images: string[]) => {
      images.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    };

    preloadImages([
      "/assets/banner.jpg", // Example image to preload
      "/assets/logo.png",
    ]);
  }, []);

  return (
    <AuthProvider>
      <CartProvider> {/* ✅ Wrap the entire app */}
      <Router>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Toaster />
      </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
