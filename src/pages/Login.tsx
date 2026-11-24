import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/context/AuthContext";
import "../App.css";

function Login() {
    const [modoRegistro, setModoRegistro] = useState(false);
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [mensajeExito, setMensajeExito] = useState("");
    const [cargando, setCargando] = useState(false);

    const { iniciarSesion } = useAuth();
    const navigate = useNavigate();

    const cambiarModo = (esRegistro: boolean) => {
        setModoRegistro(esRegistro);
        setError("");
        setMensajeExito("");
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");
        setMensajeExito("");
        setCargando(true);

        const endpoint = modoRegistro
            ? "http://localhost:8081/api/auth/register"
            : "http://localhost:8081/api/auth/login";

        const body = modoRegistro
            ? { nombre, email, telefono, password }
            : { email, password };

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            const textoRespuesta = await response.text();
            let data: Record<string, unknown> = {};
            try {
                data = textoRespuesta ? JSON.parse(textoRespuesta) : {};
            } catch {
                // La respuesta no vino en formato JSON
            }

            if (!response.ok) {
                const detalleValidacion =
                    data.errors && typeof data.errors === "object"
                        ? Object.entries(data.errors as Record<string, string>)
                              .map(([campo, msg]) => `${campo}: ${msg}`)
                              .join(" | ")
                        : null;

                const mensajeReal =
                    (data.mensaje as string) ||
                    (data.message as string) ||
                    detalleValidacion ||
                    (data.error as string) ||
                    textoRespuesta ||
                    `Error HTTP ${response.status}`;

                setError(`(${response.status}) ${mensajeReal}`);
                return;
            }

            if (data.token) {
                iniciarSesion(data, email);
                navigate("/productos");
            } else if (modoRegistro) {
                setMensajeExito("¡Cuenta creada con éxito! Ahora inicia sesión con tus datos.");
                setModoRegistro(false);
                setPassword("");
            }
        } catch {
            setError("No se pudo conectar con ms-clientes (puerto 8081). Verifica que esté encendido.");
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="anime-catalog-bg min-vh-100 py-5">
            <div className="container">
                {/* Encabezado */}
                <div className="col-12 col-md-8 col-lg-5 mx-auto text-center mb-4 anime-catalog-header p-4">
                    <span className="anime-badge mb-2 d-inline-block">
                        SONIDO VIVO • CUENTA
                    </span>
                    <h1 className="fw-bold anime-title mt-2">
                        {modoRegistro ? "Crear Cuenta" : "Iniciar Sesión"}
                    </h1>
                    <p className="anime-subtitle mb-0">
                        {modoRegistro
                            ? "Regístrate para gestionar tus compras y pedidos"
                            : "Ingresa con tu cuenta de Sonido Vivo"}
                    </p>
                </div>

                {/* Tarjeta del formulario */}
                <div className="col-12 col-md-8 col-lg-5 mx-auto">
                    <div className="anime-filter-panel p-4">
                        <div className="d-flex justify-content-center gap-2 mb-4">
                            <button
                                type="button"
                                onClick={() => cambiarModo(false)}
                                className={`btn anime-filter-btn ${!modoRegistro ? "active" : ""}`}
                            >
                                Iniciar Sesión
                            </button>
                            <button
                                type="button"
                                onClick={() => cambiarModo(true)}
                                className={`btn anime-filter-btn ${modoRegistro ? "active" : ""}`}
                            >
                                Registrarse
                            </button>
                        </div>

                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}

                        {mensajeExito && (
                            <div className="alert alert-success" role="alert">
                                {mensajeExito}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            {modoRegistro && (
                                <div className="mb-3">
                                    <label className="form-label text-light fw-semibold">
                                        Nombre completo
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                        placeholder="Ej: Benjamín Pérez"
                                        required
                                    />
                                </div>
                            )}

                            <div className="mb-3">
                                <label className="form-label text-light fw-semibold">
                                    Correo electrónico
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="correo@ejemplo.com"
                                    required
                                />
                            </div>

                            {modoRegistro && (
                                <div className="mb-3">
                                    <label className="form-label text-light fw-semibold">
                                        Teléfono 
                                    </label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        value={telefono}
                                        onChange={(e) => setTelefono(e.target.value)}
                                        placeholder="912345678"
                                    />
                                </div>
                            )}

                            <div className="mb-4">
                                <label className="form-label text-light fw-semibold">
                                    Contraseña
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={cargando}
                                className="btn anime-cta-btn w-100 py-2 fw-bold"
                            >
                                {cargando
                                    ? "Procesando..."
                                    : modoRegistro
                                    ? "Crear mi cuenta"
                                    : "Ingresar"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;