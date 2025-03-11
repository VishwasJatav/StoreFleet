
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { FadeIn, SlideUp } from '@/components/ui/motion';
import { useAuth } from '@/contexts/AuthContext';
import { ChevronRight, PackageCheck, Package, ShoppingBag, ExternalLink, User } from 'lucide-react';

// Mock orders data
const mockOrders = [
  {
    id: 'ORD-2023-1001',
    date: '2023-11-25',
    total: 6999.95,
    status: 'Delivered',
    items: [
      { id: 1, name: 'Premium Watch', price: 2999.95, quantity: 1, image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=2180&auto=format&fit=crop' },
      { id: 5, name: 'Leather Wallet', price: 999.95, quantity: 2, image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1887&auto=format&fit=crop' },
      { id: 9, name: 'Silver Necklace', price: 2000.05, quantity: 1, image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1887&auto=format&fit=crop' },
    ],
    address: {
      street: '123 Main Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      zip: '400001',
      country: 'India'
    },
    payment: {
      method: 'Credit Card',
      last4: '1234'
    },
    tracking: 'IND123456789'
  },
  {
    id: 'ORD-2023-0879',
    date: '2023-10-14',
    total: 5249.90,
    status: 'Processing',
    items: [
      { id: 3, name: 'Designer Sunglasses', price: 1499.95, quantity: 1, image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1980&auto=format&fit=crop' },
      { id: 7, name: 'Cashmere Scarf', price: 3749.95, quantity: 1, image: 'https://images.unsplash.com/photo-1584714268709-c3dd9c92b378?q=80&w=1887&auto=format&fit=crop' },
    ],
    address: {
      street: '123 Main Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      zip: '400001',
      country: 'India'
    },
    payment: {
      method: 'UPI',
      last4: '5678'
    }
  },
  {
    id: 'ORD-2023-0756',
    date: '2023-09-02',
    total: 2999.95,
    status: 'Delivered',
    items: [
      { id: 2, name: 'Leather Jacket', price: 2999.95, quantity: 1, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1935&auto=format&fit=crop' }
    ],
    address: {
      street: '123 Main Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      zip: '400001',
      country: 'India'
    },
    payment: {
      method: 'Credit Card',
      last4: '9012'
    },
    tracking: 'IND987654321'
  }
];

const Orders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      // Simulate fetching orders
      setTimeout(() => {
        setOrders(mockOrders);
        setLoading(false);
      }, 1000);
    }
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, [user, navigate]);
  
  const handleOrderSelect = (order) => {
    setSelectedOrder(order);
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Processing':
        return 'bg-blue-100 text-blue-800';
      case 'Shipped':
        return 'bg-indigo-100 text-indigo-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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
            <h1 className="text-4xl font-medium mb-4">My Orders</h1>
            <p className="text-muted-foreground">
              View and track your order history.
            </p>
          </SlideUp>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Sidebar */}
            <FadeIn className="lg:col-span-1">
              <div className="bg-secondary/30 rounded-lg p-6">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="mb-4">
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
                  </div>
                  <h2 className="text-xl font-medium">{user.name || 'User'}</h2>
                  <p className="text-muted-foreground text-sm">{user.email}</p>
                </div>
                
                <nav className="space-y-1">
                  <a href="/profile" className="flex items-center gap-2 px-4 py-2 rounded-md text-muted-foreground hover:bg-secondary transition-colors">
                    <User className="h-4 w-4" />
                    Profile Information
                  </a>
                  <a href="/orders" className="flex items-center gap-2 px-4 py-2 rounded-md bg-primary/10 text-primary">
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
            
            {/* Orders Content */}
            <FadeIn className="lg:col-span-2">
              {loading ? (
                <div className="bg-white border border-border rounded-lg p-6 flex items-center justify-center min-h-[400px]">
                  <div className="animate-pulse flex flex-col items-center">
                    <div className="h-12 w-12 rounded-full bg-secondary/50 mb-4"></div>
                    <div className="h-4 w-32 bg-secondary/50 rounded mb-2"></div>
                    <div className="h-3 w-24 bg-secondary/50 rounded"></div>
                  </div>
                </div>
              ) : orders.length > 0 ? (
                <div className="bg-white border border-border rounded-lg overflow-hidden">
                  {selectedOrder ? (
                    <div>
                      <div className="p-6 border-b border-border">
                        <div className="flex items-center justify-between mb-4">
                          <button
                            onClick={() => setSelectedOrder(null)}
                            className="text-sm font-medium text-primary flex items-center gap-1"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="m15 18-6-6 6-6" />
                            </svg>
                            Back to orders
                          </button>
                          <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(selectedOrder.status)}`}>
                            {selectedOrder.status}
                          </span>
                        </div>
                        
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <h2 className="text-xl font-medium">{selectedOrder.id}</h2>
                            <p className="text-muted-foreground text-sm">
                              Placed on {new Date(selectedOrder.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </p>
                          </div>
                          {selectedOrder.tracking && (
                            <a 
                              href={`#tracking-${selectedOrder.tracking}`}
                              className="text-primary text-sm font-medium flex items-center gap-1"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Track Order
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          )}
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <div className="mb-8">
                          <h3 className="text-lg font-medium mb-4">Order Items</h3>
                          <div className="space-y-4">
                            {selectedOrder.items.map((item) => (
                              <div key={item.id} className="flex items-center gap-4">
                                <div className="h-16 w-16 rounded-md overflow-hidden bg-secondary/30 flex-shrink-0">
                                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-grow">
                                  <h4 className="font-medium">{item.name}</h4>
                                  <div className="flex items-center justify-between mt-1">
                                    <p className="text-sm text-muted-foreground">
                                      Qty: {item.quantity}
                                    </p>
                                    <p className="font-medium">₹{item.price.toFixed(2)}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="text-lg font-medium mb-3">Shipping Address</h3>
                            <div className="bg-secondary/10 p-4 rounded-md">
                              <p className="text-sm">{selectedOrder.address.street}</p>
                              <p className="text-sm">{selectedOrder.address.city}, {selectedOrder.address.state} {selectedOrder.address.zip}</p>
                              <p className="text-sm">{selectedOrder.address.country}</p>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-lg font-medium mb-3">Payment Information</h3>
                            <div className="bg-secondary/10 p-4 rounded-md">
                              <p className="text-sm">
                                <span className="font-medium">Method:</span> {selectedOrder.payment.method}
                              </p>
                              {selectedOrder.payment.last4 && (
                                <p className="text-sm">
                                  <span className="font-medium">
                                    {selectedOrder.payment.method === 'Credit Card' || selectedOrder.payment.method === 'Debit Card' 
                                      ? 'Card ending in:' 
                                      : 'Last 4 digits:'}
                                  </span> 
                                  {selectedOrder.payment.last4}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-8 pt-6 border-t border-border">
                          <div className="flex flex-col items-end">
                            <div className="w-full max-w-xs">
                              <div className="flex justify-between mb-2">
                                <span className="text-muted-foreground">Subtotal:</span>
                                <span>₹{selectedOrder.total.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between mb-2">
                                <span className="text-muted-foreground">Shipping:</span>
                                <span>₹0.00</span>
                              </div>
                              <div className="flex justify-between mb-2">
                                <span className="text-muted-foreground">Tax:</span>
                                <span>Included</span>
                              </div>
                              <div className="flex justify-between font-medium text-lg pt-2 border-t border-border">
                                <span>Total:</span>
                                <span>₹{selectedOrder.total.toFixed(2)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="p-6 border-b border-border">
                        <h2 className="text-xl font-medium">Order History</h2>
                        <p className="text-muted-foreground">View and manage your orders</p>
                      </div>
                      
                      <div className="divide-y divide-border">
                        {orders.map((order) => (
                          <div 
                            key={order.id} 
                            className="p-6 hover:bg-secondary/10 transition-colors cursor-pointer"
                            onClick={() => handleOrderSelect(order)}
                          >
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <h3 className="font-medium flex items-center">
                                  {order.id}
                                  <span className={`ml-2 text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(order.status)}`}>
                                    {order.status}
                                  </span>
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">₹{order.total.toFixed(2)}</p>
                                <p className="text-sm text-muted-foreground">
                                  {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2 overflow-auto pb-2 mb-3">
                              {order.items.map((item) => (
                                <div key={item.id} className="h-16 w-16 flex-shrink-0 rounded-md overflow-hidden bg-secondary/30">
                                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                              ))}
                            </div>
                            
                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                {order.status === 'Delivered' ? (
                                  <PackageCheck className="h-5 w-5 text-green-600 mr-2" />
                                ) : (
                                  <Package className="h-5 w-5 text-blue-600 mr-2" />
                                )}
                                <span className="text-sm">
                                  {order.status === 'Delivered' 
                                    ? 'Delivered on ' + new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })
                                    : 'Expected delivery in 3-5 days'}
                                </span>
                              </div>
                              
                              <ChevronRight className="h-5 w-5 text-muted-foreground" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="bg-white border border-border rounded-lg p-6 min-h-[400px] flex flex-col items-center justify-center text-center">
                  <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
                  <h2 className="text-xl font-medium mb-2">No orders yet</h2>
                  <p className="text-muted-foreground mb-6 max-w-md">
                    You haven't placed any orders yet. Start shopping and your order history will appear here.
                  </p>
                  <Link to="/shop">
                    <Button>Start Shopping</Button>
                  </Link>
                </div>
              )}
            </FadeIn>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Orders;
