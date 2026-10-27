export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  categoria: string;
  descripcion?: string;
  stock?: number;
}

export interface CartItem extends Producto {
  producto: Producto;
  cantidad: number;
}

export interface Cupon {
  codigo: string;
  descuentoPorcentaje: number;
  activo: boolean;
}

export interface DatosEnvio {
  nombreCompleto: string;
  direccion: string;
  ciudad: string;
  codigoPostal: string;
  metodoEnvio: 'estandar' | 'express';
  costoEnvio: number;
}

export interface ComprobanteData {
  idOrden: string;
  fecha: string;
  items: CartItem[];
  subtotal: number;
  descuento: number;
  costoEnvio: number;
  total: number;
  datosEnvio: DatosEnvio;
}