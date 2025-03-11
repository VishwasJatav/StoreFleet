
import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';
import { getFeaturedProducts } from '@/lib/data';
import { SlideUp } from './ui/motion';

const FeaturedProducts = () => {
  const featuredProducts = getFeaturedProducts();

  return (
    <section className="py-20">
      <div className="container-custom">
        <SlideUp className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-medium mb-4">Featured Products</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our curated selection of exceptional products, each chosen for their quality, 
            design excellence, and ability to enhance your everyday experience.
          </p>
        </SlideUp>

        <div className="product-grid">
          {featuredProducts.map((product) => (
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

        <div className="flex justify-center mt-12">
          <Link to="/shop">
            <Button className="min-w-[150px]">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
