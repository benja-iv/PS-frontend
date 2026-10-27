import React, { useEffect, useState } from 'react';
import type { Producto } from '../types';
import { obtenerProductos } from '../services/productoService';
import { useCart } from '../context/CartContext';

export const Catalogo: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [filtroCategoria, setFiltroCategoria] = useState<string>('todos');
  const [busqueda, setBusqueda] = useState<string>('');
  const { agregarAlCarrito } = useCart();

  useEffect(() => {
    const data = obtenerProductos();
    setProductos(data);
  }, []);

  const productosFiltrados = productos.filter((p) => {
    const coincideCategoria =
      filtroCategoria === 'todos' ||
      p.categoria.toLowerCase() === filtroCategoria.toLowerCase();
    const coincideBusqueda =
      p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      (p.descripcion && p.descripcion.toLowerCase().includes(busqueda.toLowerCase()));
    return coincideCategoria && coincideBusqueda;
  });

  return (
    <div className="container py-4">
      <div className="row mb-4 align-items-center g-3">
        <div className="col-md-6">
          <h2 className="mb-0">Catálogo de Instrumentos</h2>
        </div>
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar producto..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-select w-auto"
            value={filtroCategoria}
            onChange={(e) => setFiltroCategoria(e.target.value)}
          >
            <option value="todos">Todas las categorías</option>
            <option value="Cuerdas">Cuerdas</option>
            <option value="bajo">Bajos</option>
            <option value="guitarra_acustica">Guitarras Acústicas</option>
            <option value="guitarra_electrica">Guitarras Eléctricas</option>
          </select>
        </div>
      </div>

      {productosFiltrados.length === 0 ? (
        <div className="alert alert-warning text-center my-4" role="alert">
          No se encontraron productos que coincidan con la búsqueda.
        </div>
      ) : (
        <div className="row g-4">
          {productosFiltrados.map((p) => (
            <div key={p.id} className="col-md-4">
              <div className="card h-100 shadow-sm">
                <img
                  src={p.imagen}
                  className="card-img-top"
                  alt={p.nombre}
                  style={{ height: '220px', objectFit: 'contain' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{p.nombre}</h5>
                  <p className="card-text text-muted flex-grow-1">{p.descripcion}</p>
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <span className="fw-bold fs-5">${p.precio.toLocaleString()}</span>
                    <button className="btn btn-primary" onClick={() => agregarAlCarrito(p)}>
                      Agregar al Carrito
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};