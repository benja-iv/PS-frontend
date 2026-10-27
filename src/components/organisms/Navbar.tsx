import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export function Navbar() {
  const { carrito } = useCart();
  const totalArticulos = carrito.reduce((acc, item) => acc + (item.cantidad || 1), 0);

  return (
    <header style={{ background: '#1a1a1a', color: '#fff', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontSize: '1.5rem', fontWeight: 'bold' }}>
        Sonido Vivo
      </Link>
      <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Catálogo</Link>
        <Link to="/contacto" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Contacto</Link>
        <Link to="/carrito" style={{ color: '#fff', textDecoration: 'none', background: '#007bff', padding: '0.5rem 1rem', borderRadius: '4px', fontWeight: 'bold' }}>
          🛒 Carrito ({totalArticulos})
        </Link>
      </nav>
    </header>
  );
}