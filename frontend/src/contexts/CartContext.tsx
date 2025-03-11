import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define the cart item structure
interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
}

// Define context type
interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
}

// Create the CartContext
const CartContext = createContext<CartContextType | undefined>(undefined);

// Hook to use the Cart Context
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within a CartProvider");
    return context;
};

// Cart Provider Component
export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>(() => {
        // Load cart from localStorage if available
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        // Save cart to localStorage when it updates
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // Function to add items to cart
    const addToCart = (item: CartItem) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
            if (existingItem) {
                return prevCart.map((cartItem) =>
                    cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
                );
            }
            return [...prevCart, { ...item, quantity: 1 }];
        });
    };

    // Function to remove an item from cart
    const removeFromCart = (id: string) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    // Function to clear cart
    const clearCart = () => setCart([]);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
