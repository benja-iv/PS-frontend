import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export function Navbar() {
  const { totalItems } = useCart();

  return (
    <header style={{ background: '#1a1a1a', padding: '1rem 2rem', color: '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ margin: 0 }}>🎸 Tienda Instrumental</h2>
        <nav style={{ display: 'flex', gap: '20px' }}>
          <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Catálogo</Link>
          <Link to="/carrito" style={{ color: '#fff', textDecoration: 'none' }}>
            Carrito 🛒 ({totalItems})
          </Link>
          <Link to="/contacto" style={{ color: '#fff', textDecoration: 'none' }}>Contacto</Link>
        </nav>
      </div>
    </header>
  );
}