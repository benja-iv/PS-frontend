import { useState, type FormEvent } from "react";
import "../App.css";

function Contacto() {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [instrumentoInteres, setInstrumentoInteres] = useState("Consulta general");
    const [mensaje, setMensaje] = useState("");
    const [enviado, setEnviado] = useState(false);
    const [enviando, setEnviando] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!nombre.trim() || !email.trim() || !mensaje.trim()) return;

        setEnviando(true);
        setError(null);
        setEnviado(false);

        try {
            const response = await fetch("http://localhost:8083/api/contacto", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nombre: nombre,
                    email: email,
                    telefono: null,
                    asunto: instrumentoInteres,
                    mensaje: mensaje,
                }),
            });

            if (response.ok) {
                setEnviado(true);
                setNombre("");
                setEmail("");
                setInstrumentoInteres("Consulta general");
                setMensaje("");
            } else {
                const errorData = await response.json();
                setError(errorData.message || "No se pudo enviar el mensaje. Revisa los datos.");
            }
        } catch (err) {
            setError("No se pudo conectar con el servidor (puerto 8083). Verifica que ms-contacto esté encendido.");
        } finally {
            setEnviando(false);
        }
    };

    return (
        <div className="anime-catalog-bg min-vh-100 py-5">
            <div className="container">
                
                {/* Encabezado */}
                <div className="col-12 col-md-8 col-lg-6 mx-auto text-center mb-5 anime-catalog-header p-4">
                    <span className="anime-badge mb-2 d-inline-block">
                        SONIDO VIVO • CONTACTO
                    </span>
                    <h1 className="fw-bold anime-title mt-2">Hablemos de Música</h1>
                    <p className="anime-subtitle mb-0">
                        ¿Buscas un instrumento en especial o necesitas asesoría? Escríbenos
                    </p>
                </div>

                <div className="row g-4 justify-content-center mx-auto" style={{ maxWidth: "1000px" }}>
                    
                    {/* Columna Izquierda: Información de la tienda */}
                    <div className="col-12 col-md-5">
                        <div className="anime-glass-card p-4 h-100 d-flex flex-column justify-content-between">
                            <div>
                                <h4 className="fw-bold mb-3">Visítanos o escríbenos</h4>
                                <p className="mb-4">
                                    Estamos disponibles para ayudarte a elegir tu próximo instrumento, 
                                    coordinar pruebas en tienda o consultar stock.
                                </p>

                                <div className="mb-3">
                                    <h6 className="fw-bold text-uppercase mb-1">Dirección</h6>
                                    <p className="mb-0">Av. Inventada Historica 1485, Local 5, Santiago</p>
                                </div>

                                <div className="mb-3">
                                    <h6 className="fw-bold text-uppercase mb-1">Horario de Atención</h6>
                                    <p className="mb-0">Lunes a Viernes: 10:00 – 19:30 hrs</p>
                                    <p className="mb-0">Sábados: 10:30 – 14:30 hrs</p>
                                </div>

                                <div className="mb-3">
                                    <h6 className="fw-bold text-uppercase mb-1">Correo y Teléfono</h6>
                                    <p className="mb-0">contacto@sonidovivo.cl</p>
                                    <p className="mb-0">+56 9 8765 4321</p>
                                </div>
                            </div>

                            <div className="mt-4 pt-3 border-top">
                                <small className="text-muted">
                                    Respondemos todas las consultas en menos de 24 horas hábiles.
                                </small>
                            </div>
                        </div>
                    </div>

                    {/* Columna Derecha: Formulario */}
                    <div className="col-12 col-md-7">
                        <div className="anime-glass-card p-4 p-md-5">
                            <h4 className="fw-bold mb-4">Envíanos un mensaje</h4>

                            {enviado && (
                                <div className="alert alert-success d-flex justify-content-between align-items-center" role="alert">
                                    <span>
                                        ¡Mensaje enviado! Te responderemos muy pronto.
                                    </span>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        aria-label="Cerrar"
                                        onClick={() => setEnviado(false)}
                                    ></button>
                                </div>
                            )}

                            {error && (
                                <div className="alert alert-danger d-flex justify-content-between align-items-center" role="alert">
                                    <span>{error}</span>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        aria-label="Cerrar"
                                        onClick={() => setError(null)}
                                    ></button>
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="nombre" className="form-label fw-bold">
                                        Nombre completo
                                    </label>
                                    <input
                                        type="text"
                                        id="nombre"
                                        className="form-control"
                                        placeholder="Ej: Camila Soto"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label fw-bold">
                                        Correo electrónico
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="form-control"
                                        placeholder="camila@correo.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="categoria" className="form-label fw-bold">
                                        Categoría de interés
                                    </label>
                                    <select
                                        id="categoria"
                                        className="form-select"
                                        value={instrumentoInteres}
                                        onChange={(e) => setInstrumentoInteres(e.target.value)}
                                    >
                                        <option value="Consulta general">Consulta general</option>
                                        <option value="Teclados">Teclados / Sintetizadores</option>
                                        <option value="Guitarras y Bajos">Guitarras y Bajos</option>
                                        <option value="Piano">Pianos Acústicos</option>
                                        <option value="Baterias">Baterías y Percusión</option>
                                        <option value="Flautas y Vientos">Flautas y Vientos Metal</option>
                                    </select>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="mensaje" className="form-label fw-bold">
                                        Tu mensaje
                                    </label>
                                    <textarea
                                        id="mensaje"
                                        rows={4}
                                        minLength={10}
                                        className="form-control"
                                        placeholder="Cuéntanos qué instrumento buscas o en qué podemos ayudarte (mínimo 10 caracteres)..."
                                        value={mensaje}
                                        onChange={(e) => setMensaje(e.target.value)}
                                        required
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="btn anime-cta-btn w-100 py-2 fw-bold"
                                    disabled={enviando}
                                >
                                    {enviando ? "Enviando..." : "Enviar Consulta"}
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Contacto;