import { useCart, type Producto } from '../context/CartContext';

const PRODUCTOS_INICIALES: Producto[] = [
  { id: 1, nombre: 'Guitarra Eléctrica', precio: 350000, imagen: '/img/guitarra-electrica.jpg' },
  { id: 2, nombre: 'Bajo Eléctrico', precio: 420000, imagen: '/img/bajo-electrico.jpg' },
  { id: 3, nombre: 'Guitarra Acústica', precio: 220000, imagen: '/img/guitarra-acustica.jpg' },
];

export function Catalogo() {
  const { agregarAlCarrito } = useCart();

  return (
    <main style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 1rem' }}>
      <h1>Catálogo de Instrumentos</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', marginTop: '2rem' }}>
        {PRODUCTOS_INICIALES.map((prod) => (
          <div key={prod.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '1rem', textAlign: 'center' }}>
            <h3>{prod.nombre}</h3>
            <p style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>${prod.precio.toLocaleString('es-CL')}</p>
            <button 
              onClick={() => agregarAlCarrito(prod)}
              style={{ background: '#007bff', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}
            >
              Añadir al carrito
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}