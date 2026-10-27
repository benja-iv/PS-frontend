import React, { useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Catalogo } from './pages/Catalogo';
import { Checkout } from './pages/Checkout';

const Header: React.FC<{ setVista: (v: 'catalogo' | 'checkout') => void; vista: string }> = ({ setVista, vista }) => {
  const { cart } = useCart();
  const totalItems = cart.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <header className="bg-dark text-white pb-3 pt-3 mb-4 shadow-sm">
      <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
        <div className="d-flex align-items-center gap-3" style={{ cursor: 'pointer' }} onClick={() => setVista('catalogo')}>
          <img src="/img/logo-marca.png" alt="SONIDO VIVO Logo" width="180" className="img-fluid" />
          <h1 className="h3 mb-0 fw-bold tracking-wide">SONIDO VIVO</h1>
        </div>

        <nav>
          <ul className="nav nav-pills gap-2 align-items-center mb-0">
            <li className="nav-item">
              <button
                className={`nav-link ${vista === 'catalogo' ? 'active bg-primary' : 'text-white'}`}
                onClick={() => setVista('catalogo')}
              >
                Catálogo
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link position-relative ${vista === 'checkout' ? 'active bg-primary' : 'text-white'}`}
                onClick={() => setVista('checkout')}
              >
                Carrito
                {totalItems > 0 && (
                  <span className="badge bg-danger ms-2 rounded-pill">{totalItems}</span>
                )}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-dark text-white text-center py-3 mt-5 border-top">
    <div className="container">
      <p className="mb-0">Sonido Vivo 2026. Todos los derechos reservados.</p>
    </div>
  </footer>
);

export const AppContent: React.FC = () => {
  const [vista, setVista] = useState<'catalogo' | 'checkout'>('catalogo');

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Header setVista={setVista} vista={vista} />
      <main className="flex-grow-1">
        {vista === 'catalogo' ? <Catalogo /> : <Checkout />}
      </main>
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
};

export default App;