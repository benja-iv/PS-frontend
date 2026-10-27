import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export function Carrito() {
  const { carrito, eliminarDelCarrito, limpiarCarrito } = useCart();

  const total = carrito.reduce((sum, item) => sum + item.precio * (item.cantidad || 1), 0);

  return (
    <main style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' }}>
      <h1>Carrito de Compras - Sonido Vivo</h1>

      {carrito.length === 0 ? (
        <div style={{ textAlign: 'center', margin: '3rem 0' }}>
          <p style={{ fontSize: '1.2rem', color: '#666' }}>Tu carrito está vacío.</p>
          <Link to="/" style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1rem' }}>
            ← Volver al catálogo de instrumentos
          </Link>
        </div>
      ) : (
        <div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', margin: '2rem 0' }}>
            {carrito.map((item) => (
              <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #ddd', padding: '1rem', borderRadius: '8px' }}>
                <img src={item.imagen} alt={item.nombre} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
                <div style={{ flex: 1, marginLeft: '1rem' }}>
                  <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>{item.nombre}</h3>
                  <p style={{ margin: 0, color: '#666' }}>
                    $ {item.precio.toLocaleString()} x {item.cantidad || 1}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontWeight: 'bold', margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>
                    $ {(item.precio * (item.cantidad || 1)).toLocaleString()}
                  </p>
                  <button
                    onClick={() => eliminarDelCarrito(item.id)}
                    style={{ background: '#dc3545', color: '#fff', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '2px solid #eee', paddingTop: '1rem' }}>
            <button
              onClick={limpiarCarrito}
              style={{ background: '#6c757d', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Vaciar Carrito
            </button>
            <h2>Total: $ {total.toLocaleString()}</h2>
          </div>
        </div>
      )}
    </main>
  );
}