import { describe, it, expect, beforeEach } from 'vitest';
import {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  filtrarProductos
} from './productoService';

describe('Módulo de Datos y Operaciones CRUD', () => {
  it('debe obtener la lista completa de productos', () => {
    const productos = obtenerProductos();
    expect(productos.length).toBeGreaterThan(0);
  });

  it('debe obtener un producto especifico por su ID', () => {
    const producto = obtenerProductoPorId(1);
    expect(producto).toBeDefined();
    expect(producto?.nombre).toContain('Fender');
  });

  it('debe crear un nuevo producto correctamente (CREATE)', () => {
    const nuevo = crearProducto({
      nombre: 'Bajo Eléctrico Ibanez',
      categoria: 'Cuerdas',
      precio: 450000,
      stock: 4,
      imagen: 'bajo.jpg',
      descripcion: 'Bajo activo de 4 cuerdas.'
    });

    expect(nuevo.id).toBeDefined();
    expect(obtenerProductos()).toHaveLength(4);
  });

  it('debe actualizar un producto existente (UPDATE)', () => {
    const actualizado = actualizarProducto(1, { precio: 800000 });
    expect(actualizado?.precio).toBe(800000);
    expect(obtenerProductoPorId(1)?.precio).toBe(800000);
  });

  it('debe eliminar un producto por su ID (DELETE) y filtrar por termino', () => {
    const eliminado = eliminarProducto(2);
    expect(eliminado).toBe(true);

    const resultadosFiltro = filtrarProductos('Fender');
    expect(resultadosFiltro).toHaveLength(1);
  });
});