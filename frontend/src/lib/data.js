
export const products = [
  // Electronics
  {
    id: 1,
    name: "Sleek Wireless Headphones",
    price: 129.99,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
    description: "Experience immersive sound with our premium wireless headphones featuring active noise cancellation and 30-hour battery life.",
    featured: true,
    rating: 4.8,
    inStock: true,
  },
  {
    id: 2,
    name: "Ultra-Thin Smartphone",
    price: 899.99,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGhvbmV8ZW58MHx8MHx8fDA%3D",
    description: "Our flagship smartphone combines cutting-edge technology with elegant design, featuring a stunning OLED display and professional-grade camera system.",
    featured: true,
    rating: 4.9,
    inStock: true,
  },
  {
    id: 3,
    name: "Smart Watch Series 5",
    price: 349.99,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHdhdGNofGVufDB8fDB8fHww",
    description: "Stay connected and track your fitness with our advanced smartwatch featuring health monitoring and seamless smartphone integration.",
    featured: false,
    rating: 4.7,
    inStock: true,
  },
  {
    id: 4,
    name: "Premium Laptop",
    price: 1299.99,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wfGVufDB8fDB8fHww",
    description: "Powerful performance meets sleek design in our premium laptop, perfect for professionals and creatives alike.",
    featured: true,
    rating: 4.8,
    inStock: true,
  },

  // Fashion
  {
    id: 5,
    name: "Minimalist Watch",
    price: 189.99,
    category: "fashion",
    image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2F0Y2h8ZW58MHx8MHx8fDA%3D",
    description: "Timeless elegance meets modern simplicity in our minimalist watch, crafted with premium materials for everyday sophistication.",
    featured: true,
    rating: 4.6,
    inStock: true,
  },
  {
    id: 6,
    name: "Classic Denim Jacket",
    price: 79.99,
    category: "fashion",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGphY2tldHxlbnwwfHwwfHx8MA%3D%3D",
    description: "Our versatile denim jacket combines timeless style with modern comfort, perfect for elevating any casual outfit.",
    featured: false,
    rating: 4.5,
    inStock: true,
  },
  {
    id: 7,
    name: "Premium Leather Bag",
    price: 249.99,
    category: "fashion",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YmFnfGVufDB8fDB8fHww",
    description: "Crafted from the finest leather, our premium bag combines functionality with sophisticated style for the modern professional.",
    featured: true,
    rating: 4.9,
    inStock: true,
  },
  {
    id: 8,
    name: "Designer Sunglasses",
    price: 159.99,
    category: "fashion",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3VuZ2xhc3Nlc3xlbnwwfHwwfHx8MA%3D%3D",
    description: "Make a statement with our designer sunglasses, featuring UV protection and a distinctive frame that complements any face shape.",
    featured: false,
    rating: 4.7,
    inStock: true,
  },

  // Home & Living
  {
    id: 9,
    name: "Minimalist Table Lamp",
    price: 69.99,
    category: "home",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFtcHxlbnwwfHwwfHx8MA%3D%3D",
    description: "Add elegant ambient lighting to your space with our minimalist table lamp, featuring adjustable brightness and a sleek design.",
    featured: true,
    rating: 4.5,
    inStock: true,
  },
  {
    id: 10,
    name: "Modern Coffee Maker",
    price: 149.99,
    category: "home",
    image: "https://images.unsplash.com/photo-1621849400072-f554417f7051?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29mZmVlJTIwbWFrZXJ8ZW58MHx8MHx8fDA%3D",
    description: "Elevate your morning routine with our modern coffee maker, combining precise brewing technology with sophisticated design aesthetics.",
    featured: false,
    rating: 4.8,
    inStock: true,
  },
  {
    id: 11,
    name: "Ceramic Dinner Set",
    price: 89.99,
    category: "home",
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2VyYW1pYyUyMHBsYXRlfGVufDB8fDB8fHww",
    description: "Our elegant ceramic dinner set features handcrafted pieces with a minimalist design, perfect for everyday dining and special occasions.",
    featured: true,
    rating: 4.6,
    inStock: true,
  },
  {
    id: 12,
    name: "Scandinavian Side Table",
    price: 129.99,
    category: "home",
    image: "https://images.unsplash.com/photo-1532372320572-cda25653a694?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2lkZSUyMHRhYmxlfGVufDB8fDB8fHww",
    description: "Add functional elegance to any room with our Scandinavian-inspired side table, featuring clean lines and natural materials.",
    featured: false,
    rating: 4.7,
    inStock: true,
  },

  // Accessories
  {
    id: 13,
    name: "Wireless Earbuds",
    price: 99.99,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZWFyYnVkc3xlbnwwfHwwfHx8MA%3D%3D",
    description: "Experience premium sound and comfort with our wireless earbuds, featuring noise isolation and intuitive touch controls.",
    featured: true,
    rating: 4.8,
    inStock: true,
  },
  {
    id: 14,
    name: "Leather Wallet",
    price: 59.99,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2FsbGV0fGVufDB8fDB8fHww",
    description: "Crafted from genuine leather, our slim wallet combines classic style with modern functionality for organized essentials.",
    featured: false,
    rating: 4.6,
    inStock: true,
  },
  {
    id: 15,
    name: "Portable Power Bank",
    price: 49.99,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG93ZXIlMjBiYW5rfGVufDB8fDB8fHww",
    description: "Keep your devices charged on the go with our sleek, high-capacity power bank featuring fast charging technology.",
    featured: true,
    rating: 4.7,
    inStock: true,
  },
  {
    id: 16,
    name: "Premium Notebook",
    price: 24.99,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bm90ZWJvb2t8ZW58MHx8MHx8fDA%3D",
    description: "Elevate your note-taking with our premium notebook, featuring high-quality paper and sophisticated binding for daily inspiration.",
    featured: false,
    rating: 4.5,
    inStock: true,
  },
];

export const categories = [
  {
    id: "electronics",
    name: "Electronics",
    description: "Cutting-edge gadgets and devices",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWxlY3Ryb25pY3N8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: "fashion",
    name: "Fashion",
    description: "Timeless style for every occasion",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: "home",
    name: "Home & Living",
    description: "Elevate your living space",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG9tZSUyMGRlY29yfGVufDB8fDB8fHww",
  },
  {
    id: "accessories",
    name: "Accessories",
    description: "Perfect finishing touches",
    image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWNjZXNzb3JpZXN8ZW58MHx8MHx8fDA%3D",
  },
];

// Get featured products
export const getFeaturedProducts = () => {
  return products.filter(product => product.featured);
};

// Get products by category
export const getProductsByCategory = (category) => {
  return products.filter(product => product.category === category);
};

// Get product by ID
export const getProductById = (id) => {
  return products.find(product => product.id === Number(id));
};

// Get related products
export const getRelatedProducts = (id, category) => {
  return products
    .filter(product => product.category === category && product.id !== Number(id))
    .slice(0, 4);
};
