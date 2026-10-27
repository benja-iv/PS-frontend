import type { Producto } from '../types';

let productosList: Producto[] = [
  {
    id: 1,
    nombre: 'Bajo Eléctrico Jazz Bass - Fender',
    precio: 689990,
    imagen: '/img/bajo-electrico.png',
    categoria: 'Cuerdas',
    descripcion: 'Tono profundo y definido de alta calidad.',
    stock: 3,
  },
  {
    id: 2,
    nombre: 'Guitarra Acústica Folk - Yamaha',
    precio: 129990,
    imagen: '/img/guitarra-acustica.png',
    categoria: 'Cuerdas',
    descripcion: 'Excelente resonancia y calidad sonora para músicos de todos los niveles.',
    stock: 8,
  },
  {
    id: 3,
    nombre: 'Guitarra Eléctrica Stratocaster - Squier',
    precio: 249990,
    imagen: '/img/guitarra-electrica.png',
    categoria: 'Cuerdas',
    descripcion: 'Sonido clásico y versátil con tres cápsulas single-coil.',
    stock: 5,
  },
];

export const obtenerProductos = (): Producto[] => {
  return productosList;
};

export const obtenerProductoPorId = (id: number): Producto | undefined => {
  return productosList.find((p) => p.id === id);
};

export const crearProducto = (producto: Omit<Producto, 'id'>): Producto => {
  const nuevoProducto: Producto = {
    ...producto,
    id: productosList.length > 0 ? Math.max(...productosList.map((p) => p.id)) + 1 : 1,
  };
  productosList.push(nuevoProducto);
  return nuevoProducto;
};

export const actualizarProducto = (id: number, datos: Partial<Producto>): Producto | undefined => {
  const index = productosList.findIndex((p) => p.id === id);
  if (index !== -1) {
    productosList[index] = { ...productosList[index], ...datos };
    return productosList[index];
  }
  return undefined;
};

export const eliminarProducto = (id: number): boolean => {
  const index = productosList.findIndex((p) => p.id === id);
  if (index !== -1) {
    productosList.splice(index, 1);
    return true;
  }
  return false;
};

export const filtrarProductos = (termino: string): Producto[] => {
  const t = termino.toLowerCase();
  return productosList.filter(
    (p) =>
      p.nombre.toLowerCase().includes(t) ||
      (p.descripcion && p.descripcion.toLowerCase().includes(t)) ||
      p.categoria.toLowerCase().includes(t)
  );
};