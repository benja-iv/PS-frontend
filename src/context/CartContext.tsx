import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Producto, CartItem, Cupon } from '../types';

interface CartContextType {
  cart: CartItem[];
  carrito: CartItem[];
  cupon: Cupon | null;
  subtotal: number;
  descuentoMonto: number;
  total: number;
  agregarAlCarrito: (producto: Producto, cantidad?: number) => void;
  eliminarDelCarrito: (productoId: number) => void;
  actualizarCantidad: (productoId: number, cantidad: number) => void;
  aplicarCupon: (cupon: Cupon) => void;
  removerCupon: () => void;
  vaciarCarrito: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('ps_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [cupon, setCupon] = useState<Cupon | null>(() => {
    try {
      const saved = localStorage.getItem('ps_cupon');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ps_cart', JSON.stringify(cart));
    } catch {
      // ignore localStorage errors in test environments
    }
  }, [cart]);

  useEffect(() => {
    try {
      if (cupon) {
        localStorage.setItem('ps_cupon', JSON.stringify(cupon));
      } else {
        localStorage.removeItem('ps_cupon');
      }
    } catch {
      // ignore
    }
  }, [cupon]);

  const subtotal = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const descuentoMonto = cupon ? (subtotal * cupon.descuentoPorcentaje) / 100 : 0;
  const total = Math.max(0, subtotal - descuentoMonto);

  const agregarAlCarrito = (producto: Producto, cantidad = 1) => {
    setCart((prev) => {
      const existe = prev.find((item) => item.id === producto.id);
      if (existe) {
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      }
      const newItem: CartItem = {
        ...producto,
        producto,
        cantidad,
      };
      return [...prev, newItem];
    });
  };

  const eliminarDelCarrito = (productoId: number) => {
    setCart((prev) => prev.filter((item) => item.id !== productoId && item.producto?.id !== productoId));
  };

  const actualizarCantidad = (productoId: number, cantidad: number) => {
    if (cantidad <= 0) {
      eliminarDelCarrito(productoId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === productoId || item.producto?.id === productoId
          ? { ...item, cantidad }
          : item
      )
    );
  };

  const aplicarCupon = (nuevoCupon: Cupon) => setCupon(nuevoCupon);
  const removerCupon = () => setCupon(null);
  const vaciarCarrito = () => {
    setCart([]);
    setCupon(null);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        carrito: cart,
        cupon,
        subtotal,
        descuentoMonto,
        total,
        agregarAlCarrito,
        eliminarDelCarrito,
        actualizarCantidad,
        aplicarCupon,
        removerCupon,
        vaciarCarrito,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart debe usarse dentro de un CartProvider');
  return context;
};