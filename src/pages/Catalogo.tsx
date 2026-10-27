import { useState, useMemo } from 'react';
import { obtenerProductos, filtrarProductos } from '../services/productoService';
import { useCart } from '../context/CartContext';

export function Catalogo() {
  const [busqueda, setBusqueda] = useState('');
  const [categoria, setCategoria] = useState('');
  const { agregarAlCarrito } = useCart();

  const productos = useMemo(() => {
    return filtrarProductos(busqueda, categoria);
  }, [busqueda, categoria]);

  return (
    <main style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 1rem' }}>
      <h1>Catálogo de Instrumentos</h1>

      <div style={{ display: 'flex', gap: '1rem', margin: '1rem 0', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', flex: 1 }}
        />

        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="">Todas las categorías</option>
          <option value="Cuerdas">Cuerdas</option>
          <option value="Percusión">Percusión</option>
          <option value="Teclados">Teclados</option>
        </select>
      </div>

      {productos.length === 0 ? (
        <p>No se encontraron productos</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', marginTop: '2rem' }}>
          {productos.map((producto) => (
            <div key={producto.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '1rem', textAlign: 'center' }}>
              <h3>{producto.nombre}</h3>
              <p style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>$ {producto.precio.toLocaleString()}</p>
              <button
                onClick={() => agregarAlCarrito(producto)}
                style={{ background: '#007bff', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}
              >
                Añadir al carrito
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}