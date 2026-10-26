import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Catalogo } from './pages/Catalogo';
import { Carrito } from './pages/Carrito';

export function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Catalogo />} />
          <Route path="/carrito" element={<Carrito />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;