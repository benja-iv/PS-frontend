export interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
  stock: number;
  imagen: string;
  descripcion: string;
}

let productosBase: Producto[] = [
  {
    id: 1,
    nombre: 'Guitarra Eléctrica Fender Stratocaster',
    categoria: 'Cuerdas',
    precio: 750000,
    stock: 5,
    imagen: 'https://via.placeholder.com/200',
    descripcion: 'Guitarra eléctrica clásica versátil y de gran resonancia.'
  },
  {
    id: 2,
    nombre: 'Batería Acústica Yamaha Stage Custom',
    categoria: 'Percusión',
    precio: 1200000,
    stock: 3,
    imagen: 'https://via.placeholder.com/200',
    descripcion: 'Batería de madera de abedul con sonido potente.'
  },
  {
    id: 3,
    nombre: 'Teclado Roland FP-30X',
    categoria: 'Teclados',
    precio: 680000,
    stock: 8,
    imagen: 'https://via.placeholder.com/200',
    descripcion: 'Teclado digital con tacto de piano real y conectividad Bluetooth.'
  }
];

export const obtenerProductos = (): Producto[] => {
  return [...productosBase];
};

export const obtenerProductoPorId = (id: number): Producto | undefined => {
  return productosBase.find((p) => p.id === id);
};

export const crearProducto = (producto: Omit<Producto, 'id'>): Producto => {
  const nuevoId = productosBase.length > 0 ? Math.max(...productosBase.map((p) => p.id)) + 1 : 1;
  const nuevoProducto: Producto = { id: nuevoId, ...producto };
  productosBase.push(nuevoProducto);
  return nuevoProducto;
};

export const actualizarProducto = (id: number, datosActualizados: Partial<Omit<Producto, 'id'>>): Producto | null => {
  const index = productosBase.findIndex((p) => p.id === id);
  if (index === -1) return null;
  productosBase[index] = { ...productosBase[index], ...datosActualizados };
  return productosBase[index];
};

export const eliminarProducto = (id: number): boolean => {
  const longitudInicial = productosBase.length;
  productosBase = productosBase.filter((p) => p.id !== id);
  return productosBase.length < longitudInicial;
};

export const filtrarProductos = (termino: string, categoria: string = ''): Producto[] => {
  return productosBase.filter((p) => {
    const coincideNombre = p.nombre.toLowerCase().includes(termino.toLowerCase());
    const coincideCategoria = categoria === '' || p.categoria === categoria;
    return coincideNombre && coincideCategoria;
  });
};