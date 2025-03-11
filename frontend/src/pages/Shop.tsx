
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { products, categories } from '@/lib/data';
import { FadeIn, SlideUp } from '@/components/ui/motion';
import { Filter, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Shop = () => {
  const location = useLocation();
  const [currentProducts, setCurrentProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('default');

  // Get category from URL query parameter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    
    if (category) {
      setSelectedCategory(category);
      const filtered = products.filter(product => product.category === category);
      setCurrentProducts(filtered);
    } else {
      setSelectedCategory('');
      setCurrentProducts(products);
    }
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, [location.search]);

  // Filter products
  const filterProducts = () => {
    let filtered = products;
    
    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange.min && product.price <= priceRange.max
    );
    
    // Sort products
    if (sortBy === 'price-asc') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      filtered = [...filtered].sort((a, b) => b.rating - a.rating);
    }
    
    setCurrentProducts(filtered);
  };

  // Apply filters when filter parameters change
  useEffect(() => {
    filterProducts();
  }, [selectedCategory, priceRange, sortBy]);

  // Reset filters
  const resetFilters = () => {
    setSelectedCategory('');
    setPriceRange({ min: 0, max: 1000 });
    setSortBy('default');
    setCurrentProducts(products);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-20">
        <div className="container-custom">
          <SlideUp className="mb-12">
            <h1 className="text-4xl font-medium mb-4">Shop</h1>
            <p className="text-muted-foreground">
              Browse our collection of premium products designed to enhance your everyday experience.
            </p>
          </SlideUp>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters - Desktop */}
            <div className="hidden lg:block space-y-8">
              <div>
                <h3 className="text-lg font-medium mb-4">Categories</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      id="all-categories" 
                      name="category" 
                      checked={selectedCategory === ''}
                      onChange={() => setSelectedCategory('')}
                      className="mr-2"
                    />
                    <label htmlFor="all-categories" className="text-sm">All Categories</label>
                  </div>
                  
                  {categories.map(category => (
                    <div key={category.id} className="flex items-center">
                      <input 
                        type="radio" 
                        id={category.id} 
                        name="category" 
                        checked={selectedCategory === category.id}
                        onChange={() => setSelectedCategory(category.id)}
                        className="mr-2"
                      />
                      <label htmlFor={category.id} className="text-sm">{category.name}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Price Range</h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div>
                      <label htmlFor="min-price" className="text-sm text-muted-foreground">Min</label>
                      <input 
                        type="number" 
                        id="min-price" 
                        value={priceRange.min}
                        onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                        className="input-field w-full"
                        min="0"
                      />
                    </div>
                    <div>
                      <label htmlFor="max-price" className="text-sm text-muted-foreground">Max</label>
                      <input 
                        type="number" 
                        id="max-price" 
                        value={priceRange.max}
                        onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                        className="input-field w-full"
                        min="0"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={resetFilters}
              >
                Reset Filters
              </Button>
            </div>
            
            {/* Products Grid */}
            <div className="lg:col-span-3">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <p className="text-sm text-muted-foreground">
                  Showing {currentProducts.length} products
                </p>
                
                <div className="flex items-center gap-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="lg:hidden flex items-center gap-2"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="h-4 w-4" />
                    Filters
                  </Button>
                  
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
                    <select 
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="input-field py-1"
                    >
                      <option value="default">Default Sorting</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                      <option value="rating">Customer Rating</option>
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Mobile Filters */}
              {showFilters && (
                <div className="lg:hidden bg-secondary/50 p-4 rounded-lg mb-6 animate-fade-in">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Filters</h3>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => setShowFilters(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Categories</h4>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input 
                            type="radio" 
                            id="mobile-all-categories" 
                            name="mobile-category" 
                            checked={selectedCategory === ''}
                            onChange={() => setSelectedCategory('')}
                            className="mr-2"
                          />
                          <label htmlFor="mobile-all-categories" className="text-sm">All Categories</label>
                        </div>
                        
                        {categories.map(category => (
                          <div key={`mobile-${category.id}`} className="flex items-center">
                            <input 
                              type="radio" 
                              id={`mobile-${category.id}`} 
                              name="mobile-category" 
                              checked={selectedCategory === category.id}
                              onChange={() => setSelectedCategory(category.id)}
                              className="mr-2"
                            />
                            <label htmlFor={`mobile-${category.id}`} className="text-sm">{category.name}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Price Range</h4>
                      <div className="space-y-4">
                        <div className="flex gap-4">
                          <div>
                            <label htmlFor="mobile-min-price" className="text-xs text-muted-foreground">Min</label>
                            <input 
                              type="number" 
                              id="mobile-min-price" 
                              value={priceRange.min}
                              onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                              className="input-field w-full"
                              min="0"
                            />
                          </div>
                          <div>
                            <label htmlFor="mobile-max-price" className="text-xs text-muted-foreground">Max</label>
                            <input 
                              type="number" 
                              id="mobile-max-price" 
                              value={priceRange.max}
                              onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                              className="input-field w-full"
                              min="0"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        className="flex-1"
                        onClick={() => setShowFilters(false)}
                      >
                        Apply Filters
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        onClick={resetFilters}
                      >
                        Reset
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              
              {currentProducts.length > 0 ? (
                <div className="product-grid">
                  {currentProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      image={product.image}
                      category={product.category}
                      rating={product.rating}
                    />
                  ))}
                </div>
              ) : (
                <FadeIn>
                  <div className="text-center py-12">
                    <h3 className="text-xl font-medium mb-2">No Products Found</h3>
                    <p className="text-muted-foreground mb-6">
                      We couldn't find any products matching your current filters.
                    </p>
                    <Button onClick={resetFilters}>
                      Reset Filters
                    </Button>
                  </div>
                </FadeIn>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Shop;
