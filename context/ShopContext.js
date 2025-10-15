import React, { createContext, useContext, useState, useMemo } from 'react';
import { PRODUCTS } from '../data/mockProducts';

const ShopContext = createContext();
export const useShop = () => useContext(ShopContext);

export function ShopProvider({ children }) {
  // ✅ Always initialize with empty arrays
  const [products, setProducts] = useState(PRODUCTS || []);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState([]);

  const addToCart = (product, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, { id: product.id, qty }];
    });
  };

  const removeFromCart = (id) => setCart((p) => p.filter((i) => i.id !== id));

  const changeQty = (id, qty) =>
    setCart((p) =>
      p.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i))
    );

  const clearCart = () => setCart([]);

  const toggleWishlist = (id) =>
    setWishlist((p) =>
      p.includes(id) ? p.filter((x) => x !== id) : [...p, id]
    );

  const placeOrder = () => {
    const items = cart.map((c) => ({
      ...c,
      product: products.find((p) => p.id === c.id),
    }));
    const total = items.reduce(
      (sum, i) => sum + i.product.price * i.qty,
      0
    );
    const order = {
      id: String(Date.now()),
      items,
      total,
      date: new Date().toISOString(),
    };
    setOrders((p) => [order, ...p]);
    clearCart();
    return order;
  };

  const cartDetailed = useMemo(
    () =>
      cart.map((c) => ({
        ...c,
        product: products.find((p) => p.id === c.id),
      })),
    [cart, products]
  );

  const cartTotal = useMemo(
    () =>
      cartDetailed.reduce(
        (sum, i) => sum + (i.product?.price || 0) * i.qty,
        0
      ),
    [cartDetailed]
  );

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        wishlist,
        orders,
        addToCart,
        removeFromCart,
        changeQty,
        clearCart,
        toggleWishlist,
        placeOrder,
        cartDetailed,
        cartTotal,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}
