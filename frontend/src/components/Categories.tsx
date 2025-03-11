
import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '@/lib/data';
import { SlideUp } from './ui/motion';

const Categories = () => {
  return (
    <section className="py-20 bg-secondary/50">
      <div className="container-custom">
        <SlideUp className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-medium mb-4">Shop by Category</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our carefully curated categories, each offering a distinct selection of premium products
            designed to enhance your lifestyle.
          </p>
        </SlideUp>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <SlideUp key={category.id} delay={index * 100} className="slide-up-animation">
              <Link 
                to={`/shop?category=${category.id}`} 
                className="block group"
              >
                <div className="relative overflow-hidden rounded-lg">
                  <div className="aspect-[4/5] w-full">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-6 flex flex-col justify-end">
                    <h3 className="text-white text-xl font-medium mb-2">{category.name}</h3>
                    <p className="text-white/80 text-sm">{category.description}</p>
                  </div>
                </div>
              </Link>
            </SlideUp>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
