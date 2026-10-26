import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/organisms/Navbar';
import { Catalogo } from './pages/Catalogo';
import { Carrito } from './pages/Carrito';
import { Contacto } from './pages/Contacto';

export function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Catalogo />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;