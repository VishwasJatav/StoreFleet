
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { FadeIn, SlideUp } from '@/components/ui/motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { products } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

// Sample cart items - in a real app, these would come from a state management system
const initialCartItems = [
  { id: 1, quantity: 1 },
  { id: 5, quantity: 1 },
  { id: 9, quantity: 2 },
];

const Cart = () => {
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [cartProducts, setCartProducts] = useState([]);
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Map cart items to products
  useEffect(() => {
    const items = cartItems.map(item => {
      const product = products.find(p => p.id === item.id);
      // Convert dollar to rupee (approximate conversion rate)
      const priceInRupees = product.price * 75;
      return {
        ...product,
        quantity: item.quantity,
        price: priceInRupees,
        total: priceInRupees * item.quantity
      };
    });
    setCartProducts(items);
  }, [cartItems]);
  
  // Calculate subtotal
  const subtotal = cartProducts.reduce((sum, item) => sum + item.total, 0);
  const shipping = 749; // 9.99 USD converted to rupees
  const total = subtotal + shipping;
  
  // Update quantity
  const updateQuantity = (id, action) => {
    setCartItems(prevItems => 
      prevItems.map(item => {
        if (item.id === id) {
          if (action === 'increase') {
            return { ...item, quantity: item.quantity + 1 };
          } else if (action === 'decrease' && item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          }
        }
        return item;
      })
    );
  };
  
  // Remove item
  const removeItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart.",
    });
  };
  
  // Proceed to checkout
  const handleCheckout = () => {
    toast({
      title: "Checkout",
      description: "Proceeding to checkout...",
    });
    // In a real app, this would navigate to a checkout page
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-20">
        <div className="container-custom">
          <SlideUp className="mb-12">
            <h1 className="text-4xl font-medium mb-4">Your Cart</h1>
            <p className="text-muted-foreground">
              Review your items and proceed to checkout when you're ready.
            </p>
          </SlideUp>
          
          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <FadeIn>
                  <div className="rounded-lg border border-border overflow-hidden">
                    <div className="bg-secondary/30 p-4 hidden md:grid grid-cols-6 gap-4">
                      <div className="col-span-3">
                        <span className="text-sm font-medium">Product</span>
                      </div>
                      <div className="text-center">
                        <span className="text-sm font-medium">Price</span>
                      </div>
                      <div className="text-center">
                        <span className="text-sm font-medium">Quantity</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-medium">Total</span>
                      </div>
                    </div>
                    
                    <div className="divide-y divide-border">
                      {cartProducts.map((item) => (
                        <div key={item.id} className="p-4">
                          <div className="md:grid md:grid-cols-6 md:gap-4 md:items-center">
                            {/* Product */}
                            <div className="md:col-span-3 flex items-center gap-4 mb-4 md:mb-0">
                              <div className="w-20 h-20 bg-secondary/30 rounded-md overflow-hidden flex-shrink-0">
                                <img 
                                  src={item.image} 
                                  alt={item.name} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <Link 
                                  to={`/product/${item.id}`} 
                                  className="font-medium hover:text-primary transition-colors"
                                >
                                  {item.name}
                                </Link>
                                <p className="text-sm text-muted-foreground">
                                  {item.category}
                                </p>
                              </div>
                            </div>
                            
                            {/* Price */}
                            <div className="md:text-center mb-4 md:mb-0">
                              <div className="md:hidden text-sm text-muted-foreground mb-1">
                                Price:
                              </div>
                              <span>₹{item.price.toFixed(2)}</span>
                            </div>
                            
                            {/* Quantity */}
                            <div className="md:text-center mb-4 md:mb-0">
                              <div className="md:hidden text-sm text-muted-foreground mb-1">
                                Quantity:
                              </div>
                              <div className="flex items-center md:justify-center">
                                <button 
                                  className="h-8 w-8 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:bg-secondary transition-colors"
                                  onClick={() => updateQuantity(item.id, 'decrease')}
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus className="h-3 w-3" />
                                </button>
                                <span className="mx-3">{item.quantity}</span>
                                <button 
                                  className="h-8 w-8 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:bg-secondary transition-colors"
                                  onClick={() => updateQuantity(item.id, 'increase')}
                                >
                                  <Plus className="h-3 w-3" />
                                </button>
                              </div>
                            </div>
                            
                            {/* Total */}
                            <div className="md:text-right flex items-center justify-between md:block">
                              <div>
                                <div className="md:hidden text-sm text-muted-foreground mb-1">
                                  Total:
                                </div>
                                <span className="font-medium">₹{item.total.toFixed(2)}</span>
                              </div>
                              
                              <button 
                                className="text-muted-foreground hover:text-destructive transition-colors"
                                onClick={() => removeItem(item.id)}
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-8 flex flex-wrap gap-4">
                    <Link to="/shop">
                      <Button variant="outline" className="gap-2">
                        <ShoppingBag className="h-4 w-4" />
                        Continue Shopping
                      </Button>
                    </Link>
                  </div>
                </FadeIn>
              </div>
              
              {/* Order Summary */}
              <div>
                <FadeIn>
                  <div className="bg-secondary/30 rounded-lg p-6">
                    <h2 className="text-xl font-medium mb-6">Order Summary</h2>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>₹{subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Shipping</span>
                        <span>₹{shipping.toFixed(2)}</span>
                      </div>
                      <div className="border-t border-border pt-4 flex justify-between">
                        <span className="font-medium">Total</span>
                        <span className="font-medium">₹{total.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full gap-2"
                      onClick={handleCheckout}
                    >
                      Proceed to Checkout
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                    
                    <div className="mt-6 text-xs text-muted-foreground text-center">
                      <p>Secure checkout powered by Stripe</p>
                      <p className="mt-2">
                        By proceeding, you agree to our 
                        <Link to="/terms-of-service" className="text-primary hover:underline mx-1">
                          Terms of Service
                        </Link>
                        and 
                        <Link to="/privacy-policy" className="text-primary hover:underline ml-1">
                          Privacy Policy
                        </Link>
                      </p>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          ) : (
            <FadeIn>
              <div className="text-center py-16">
                <div className="mx-auto h-24 w-24 text-muted-foreground mb-6">
                  <ShoppingBag className="h-full w-full" />
                </div>
                <h2 className="text-2xl font-medium mb-4">Your cart is empty</h2>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  Looks like you haven't added any products to your cart yet.
                  Browse our products and find something you'll love.
                </p>
                <Link to="/shop">
                  <Button size="lg">
                    Start Shopping
                  </Button>
                </Link>
              </div>
            </FadeIn>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
