import React from 'react';
import { Button } from '../atoms/Button';

export interface Product {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
}

export interface ProductCardProps {
  producto: Product;
  onAddToCart: (producto: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ producto, onAddToCart }) => {
  return (
    <div className="product-card">
      <img src={producto.imagen} alt={producto.nombre} />
      <h3>{producto.nombre}</h3>
      <p className="price">${producto.precio.toLocaleString()}</p>
      
      {/* Evidencia de composición y reutilización del átomo */}
      <Button
        label="Agregar al Carrito"
        onClick={() => onAddToCart(producto)}
        variant="primary"
      />
    </div>
  );
};