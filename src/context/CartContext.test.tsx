// @vitest-environment jsdom
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
import { CartProvider, useCart } from './CartContext';

expect.extend(matchers);

describe('CartContext (Estado Global)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('debe iniciar con el carrito vacio', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CartProvider>{children}</CartProvider>
    );

    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.carrito).toEqual([]);
  });

  it('debe agregar un producto al carrito', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CartProvider>{children}</CartProvider>
    );

    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.agregarAlCarrito({
        id: 1,
        nombre: 'Guitarra Eléctrica',
        precio: 250000,
        imagen: 'guitarra.jpg',
      });
    });

    expect(result.current.carrito).toHaveLength(1);
    expect(result.current.carrito[0].nombre).toBe('Guitarra Eléctrica');
  });

  it('debe eliminar un producto del carrito', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CartProvider>{children}</CartProvider>
    );

    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.agregarAlCarrito({
        id: 1,
        nombre: 'Guitarra Eléctrica',
        precio: 250000,
        imagen: 'guitarra.jpg',
      });
    });

    act(() => {
      result.current.eliminarDelCarrito(1);
    });

    expect(result.current.carrito).toHaveLength(0);
  });
});