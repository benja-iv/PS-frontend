import Navbar from './components/organism/Navbar';
import QuienesSomos from './pages/QuienesSomos';
import { Routes, Route } from 'react-router-dom';
import Productos from './pages/Productos';
import Contacto from './pages/Contacto';
import Inicio from './pages/Inicio';
import Detalle from './pages/Detalle';
import Carrito from './pages/Carrito';
import Login from './pages/Login';
import { CarritoProvider } from './components/context/CarritoContext';
import { AuthProvider } from './components/context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <CarritoProvider>
        <Navbar />

        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/quienes_somos" element={<QuienesSomos />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/detalle/:id" element={<Detalle />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </CarritoProvider>
    </AuthProvider>
  );
}

export default App;