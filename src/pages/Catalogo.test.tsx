// @vitest-environment jsdom
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
import { Catalogo } from './Catalogo';
import { CartProvider } from '../context/CartContext';
import { MemoryRouter } from 'react-router-dom';

expect.extend(matchers);

afterEach(() => {
  cleanup();
});

describe('Página de Catálogo (Filtros y Búsqueda)', () => {
  it('debe renderizar el buscador de productos', () => {
    render(
      <MemoryRouter>
        <CartProvider>
          <Catalogo />
        </CartProvider>
      </MemoryRouter>
    );
    expect(screen.getByPlaceholderText(/Buscar producto/i)).toBeInTheDocument();
  });

  it('debe filtrar productos al escribir en el campo de busqueda', () => {
    render(
      <MemoryRouter>
        <CartProvider>
          <Catalogo />
        </CartProvider>
      </MemoryRouter>
    );

    const inputBusqueda = screen.getByPlaceholderText(/Buscar producto/i);
    fireEvent.change(inputBusqueda, { target: { value: 'Fender' } });

    expect(screen.getByText(/Fender/i)).toBeInTheDocument();
  });

  it('debe filtrar productos por seleccion de categoria', () => {
    render(
      <MemoryRouter>
        <CartProvider>
          <Catalogo />
        </CartProvider>
      </MemoryRouter>
    );

    const selectCategoria = screen.getByRole('combobox');
    fireEvent.change(selectCategoria, { target: { value: 'Cuerdas' } });

    expect(screen.getByText(/Fender/i)).toBeInTheDocument();
  });

  it('debe mostrar un mensaje cuando no hay resultados en la busqueda', () => {
    render(
      <MemoryRouter>
        <CartProvider>
          <Catalogo />
        </CartProvider>
      </MemoryRouter>
    );

    const inputBusqueda = screen.getByPlaceholderText(/Buscar producto/i);
    fireEvent.change(inputBusqueda, { target: { value: 'ProductoInexistente123' } });

    expect(screen.getByText(/No se encontraron productos/i)).toBeInTheDocument();
  });
});