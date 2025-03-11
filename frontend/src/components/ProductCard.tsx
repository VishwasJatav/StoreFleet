
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FadeIn } from './ui/motion';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
}

const ProductCard = ({ id, name, price, image, category, rating }: ProductCardProps) => {
  // Convert dollar to rupee (approximate conversion rate)
  const priceInRupees = price * 75;
  
  return (
    <FadeIn className="group">
      <div className="product-card overflow-hidden">
        <div className="relative overflow-hidden">
          {/* Image */}
          <div className="aspect-[4/5] bg-secondary/50 overflow-hidden">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
          
          {/* Quick actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 transform translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
            <Button 
              size="icon" 
              variant="secondary" 
              className="h-8 w-8 rounded-full shadow-md"
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Category tag */}
          <div className="absolute top-3 left-3">
            <span className="category-badge bg-background/80 backdrop-blur-sm text-foreground">
              {category}
            </span>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between mb-1">
            <Link to={`/product/${id}`} className="hover:text-primary transition-colors">
              <h3 className="font-medium text-base line-clamp-1">{name}</h3>
            </Link>
          </div>
          
          {/* Rating */}
          <div className="flex items-center mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-xs ${i < Math.floor(rating) ? 'text-primary' : 'text-muted'}`}>★</span>
              ))}
            </div>
            <span className="text-xs text-muted-foreground ml-1">({rating})</span>
          </div>
          
          <div className="flex items-center justify-between mt-2">
            <span className="font-medium">₹{priceInRupees.toFixed(2)}</span>
            <Button 
              size="sm" 
              className="rounded-full h-8 w-8 p-0"
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </FadeIn>
  );
};

export default ProductCard;
