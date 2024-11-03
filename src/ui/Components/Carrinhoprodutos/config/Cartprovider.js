import React, { useState, useEffect, createContext } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
  );
  
  const addToCart = (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem.nome === item.nome);

    if (existingItem) {
      const updatedCartItems = cartItems.map((cartItem) =>
        cartItem.nome === item.nome ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      );
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem.nome === item.nome);

    if (existingItem.quantity === 1) {
      setCartItems(cartItems.filter((cartItem) => cartItem.nome !== item.nome));
    } else {
      const updatedCartItems = cartItems.map((cartItem) =>
        cartItem.nome === item.nome ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
      );
      setCartItems(updatedCartItems);
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    var valor_total=cartItems.reduce((total, item) => total + item.preco * item.quantity, 0);
    localStorage.setItem('total', valor_total);
    return valor_total;
  };

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const realizouPagamento = localStorage.getItem('realizouPagamento');
    if (realizouPagamento === 'true') {
      clearCart();
      localStorage.removeItem('realizouPagamento');
      localStorage.removeItem('total');
    }
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, getCartTotal }}>
      {children}
    </CartContext.Provider>
  );
};
