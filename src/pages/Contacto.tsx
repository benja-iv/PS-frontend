import { useState, FormEvent } from 'react';

interface FormContacto {
  nombre: string;
  email: string;
  asunto: string;
  mensaje: string;
}

export function Contacto() {
  const [formData, setFormData] = useState<FormContacto>({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: '',
  });

  const [mensajeEnviado, setMensajeEnviado] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!formData.nombre.trim() || !formData.email.trim() || !formData.mensaje.trim()) {
      alert('Por favor completa todos los campos requeridos.');
      return;
    }

    setMensajeEnviado(true);

    setFormData({
      nombre: '',
      email: '',
      asunto: '',
      mensaje: '',
    });
  };

  return (
    <main style={{ maxWidth: '600px', margin: '3rem auto', padding: '0 1rem' }}>
      <h1>Contacto</h1>
      <p>¿Tienes alguna duda o consulta sobre nuestros instrumentos? Escríbenos.</p>

      {mensajeEnviado && (
        <div style={{ padding: '1rem', marginBottom: '1rem', background: '#d4edda', color: '#155724', borderRadius: '4px' }}>
          ¡Gracias por contactarnos! Te responderemos a la brevedad.
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label htmlFor="nombre" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Nombre completo *
          </label>
          <input
            id="nombre"
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            required
          />
        </div>

        <div>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Correo electrónico *
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            required
          />
        </div>

        <div>
          <label htmlFor="asunto" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Asunto
          </label>
          <input
            id="asunto"
            type="text"
            name="asunto"
            value={formData.asunto}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div>
          <label htmlFor="mensaje" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Mensaje *
          </label>
          <textarea
            id="mensaje"
            name="mensaje"
            rows={5}
            value={formData.mensaje}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            required
          />
        </div>

        <button
          type="submit"
          style={{ background: '#007bff', color: '#fff', padding: '0.75rem', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold' }}
        >
          Enviar mensaje
        </button>
      </form>
    </main>
  );
}