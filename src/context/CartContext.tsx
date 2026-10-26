import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
}

export interface CartItem extends Producto {
  cantidad: number;
}

interface CartContextType {
  cart: CartItem[];
  agregarAlCarrito: (producto: Producto) => void;
  eliminarDelCarrito: (id: number) => void;
  actualizarCantidad: (id: number, cantidad: number) => void;
  totalItems: number;
  precioTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  // 1. Inicializar el estado recuperando los datos de localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // 2. Guardar en localStorage cada vez que 'cart' cambie
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const agregarAlCarrito = (producto: Producto) => {
    setCart((prevCart) => {
      const existe = prevCart.find((item) => item.id === producto.id);
      if (existe) {
        return prevCart.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prevCart, { ...producto, cantidad: 1 }];
    });
  };

  const eliminarDelCarrito = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const actualizarCantidad = (id: number, cantidad: number) => {
    if (cantidad <= 0) {
      eliminarDelCarrito(id);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, cantidad } : item))
    );
  };

  const totalItems = cart.reduce((acc, item) => acc + item.cantidad, 0);
  const precioTotal = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        agregarAlCarrito,
        eliminarDelCarrito,
        actualizarCantidad,
        totalItems,
        precioTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de un CartProvider');
  }
  return context;
}