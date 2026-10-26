import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export function Carrito() {
  const { cart, eliminarDelCarrito, actualizarCantidad, precioTotal } = useCart();

  if (cart.length === 0) {
    return (
      <main style={{ maxWidth: '800px', margin: '3rem auto', textAlign: 'center' }}>
        <h2>Tu carrito está vacío 🛒</h2>
        <p>Parece que aún no has añadido ningún producto.</p>
        <Link to="/" style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>
          ← Volver al Catálogo
        </Link>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: '900px', margin: '2rem auto', padding: '0 1rem' }}>
      <h1>Carrito de Compras</h1>
      
      <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {cart.map((item) => (
          <div
            key={item.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              border: '1px solid #ddd',
              padding: '1rem',
              borderRadius: '8px',
            }}
          >
            <div>
              <h3 style={{ margin: '0 0 0.5rem 0' }}>{item.nombre}</h3>
              <p style={{ margin: 0, color: '#666' }}>
                Precio unitario: ${item.precio.toLocaleString('es-CL')}
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}>-</button>
              <span>{item.cantidad}</span>
              <button onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}>+</button>
            </div>

            <div style={{ textAlign: 'right' }}>
              <p style={{ fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>
                Subtotal: ${(item.precio * item.cantidad).toLocaleString('es-CL')}
              </p>
              <button
                onClick={() => eliminarDelCarrito(item.id)}
                style={{ background: '#dc3545', color: '#fff', border: 'none', padding: '0.3rem 0.6rem', borderRadius: '4px', cursor: 'pointer' }}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px', textAlign: 'right' }}>
        <h2>Total: ${precioTotal.toLocaleString('es-CL')}</h2>
        <button style={{ background: '#28a745', color: '#fff', border: 'none', padding: '0.75rem 1.5rem', fontSize: '1rem', borderRadius: '4px', cursor: 'pointer' }}>
          Proceder al Pago
        </button>
      </div>
    </main>
  );
}