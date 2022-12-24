import { createContext, useState, useEffect } from 'react';

const addCartItem = (cartItems, productToadd) => {
    //find if cartItems contain productToADD
    //If found, increment quantity
    //return new Array with modified/new cart
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToadd.id
    );
    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToadd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
    }
    return [...cartItems, { ...productToadd, quantity: 1 }];
};

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0,
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    };

    useEffect(() => {
        const newCartCount = cartItems.reduce(
            (total, item) => total + item.quantity,
            0
        );
        setCartCount(newCartCount);
    }, [cartItems]);

    const value = {
        isCartOpen,
        setIsCartOpen,
        cartItems,
        addItemToCart,
        cartCount,
    };
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};
