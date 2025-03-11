import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { getProductById, getRelatedProducts } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { FadeIn, SlideUp } from "@/components/ui/motion";
import { Minus, Plus, ShoppingCart, ChevronLeft, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";

const Product = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);

    if (id) {
      const fetchedProduct = getProductById(id);
      setProduct(fetchedProduct);

      if (fetchedProduct) {
        const related = getRelatedProducts(id, fetchedProduct.category);
        setRelatedProducts(related);
      }
    }
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container-custom flex-grow pt-28 pb-20 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-medium mb-4">Product Not Found</h2>
            <p className="text-muted-foreground mb-6">
              We couldn't find the product you're looking for.
            </p>
            <Link to="/shop">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Convert dollar to rupee (approximate conversion rate)
  const priceInRupees = product.price * 75;

  const handleIncrementQuantity = () => setQuantity((prev) => prev + 1);
  const handleDecrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    toast({
      title: "Added to cart",
      description: `${product.name} x ${quantity} has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-28 pb-20">
        <div className="container-custom">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link to="/shop" className="hover:text-primary transition-colors">
              Shop
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{product.name}</span>
          </div>

          {/* Product Detail */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <FadeIn>
              <div className="rounded-lg overflow-hidden bg-secondary/30">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover aspect-square"
                />
              </div>
            </FadeIn>

            {/* Product Info */}
            <SlideUp>
              <div className="flex flex-col h-full">
                <div>
                  <Link
                    to={`/shop?category=${product.category}`}
                    className="inline-block category-badge bg-primary/10 text-primary mb-4"
                  >
                    {product.category}
                  </Link>

                  <h1 className="text-3xl md:text-4xl font-medium mb-2">
                    {product.name}
                  </h1>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`${
                            i < Math.floor(product.rating)
                              ? "text-primary"
                              : "text-muted"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-muted-foreground">
                      ({product.rating})
                    </span>
                  </div>

                  <p className="text-2xl font-medium mb-6">
                    ₹{priceInRupees.toFixed(2)}
                  </p>

                  <p className="text-muted-foreground mb-8">
                    {product.description}
                  </p>

                  <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
                    <div className="flex items-center border border-border rounded-md overflow-hidden w-full sm:w-auto">
                      <button
                        className="px-4 py-2 hover:bg-secondary transition-colors"
                        onClick={handleDecrementQuantity}
                        disabled={quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-4 py-2 border-x border-border min-w-[50px] text-center">
                        {quantity}
                      </span>
                      <button
                        className="px-4 py-2 hover:bg-secondary transition-colors"
                        onClick={handleIncrementQuantity}
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    <Button className="w-full sm:w-auto sm:flex-1 gap-2" onClick={handleAddToCart}>
                      <ShoppingCart className="h-4 w-4" />
                      Add to Cart
                    </Button>

                    <Button variant="outline" size="icon">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </SlideUp>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-20">
              <h2 className="text-2xl font-medium mb-8">You May Also Like</h2>
              <div className="product-grid">
                {relatedProducts.map((product) => (
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
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Product;
