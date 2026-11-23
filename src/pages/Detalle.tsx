import { useParams, useNavigate } from "react-router-dom";
import { listaProductos } from "../ListaProductos/Productos";
import { useCarrito } from "../components/context/CarritoContext";
import "../App.css";

function Detalle() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { agregarAlCarrito } = useCarrito();

    const producto = listaProductos.find((item) => item.id === Number(id));

    if (!producto) {
        return (
            <div className="anime-catalog-bg min-vh-100 d-flex align-items-center justify-content-center py-5">
                <div className="text-center p-5 anime-glass-card" style={{ maxWidth: "500px" }}>
                    <h2 className="fw-bold mb-3">Instrumento no encontrado</h2>
                    <p className="mb-4">El producto que buscas no existe o fue retirado del catálogo.</p>
                    <button
                        className="btn anime-cta-btn px-4 py-2"
                        onClick={() => navigate("/productos")}
                    >
                        Volver al catálogo
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="anime-catalog-bg min-vh-100 py-5">
            <div className="container">
                
                {/* Botón para regresar */}
                <div className="mb-4">
                    <button
                        className="btn anime-filter-btn"
                        onClick={() => navigate(-1)}
                    >
                        ← Volver
                    </button>
                </div>

                {/* Tarjeta principal de detalle */}
                <div className="anime-glass-card p-4 p-md-5">
                    <div className="row g-4 align-items-center">
                        
                        {/* Columna Izquierda: Imagen */}
                        <div className="col-12 col-md-6 text-center">
                            <div className="bg-white rounded-4 p-3 d-inline-block w-100">
                                <img
                                    src={encodeURI(producto.imagen)}
                                    alt={producto.titulo}
                                    className="img-fluid"
                                    style={{ maxHeight: "400px", objectFit: "contain" }}
                                />
                            </div>
                        </div>

                        {/* Columna Derecha: Información */}
                        <div className="col-12 col-md-6">
                            {/* Badges de Categoría y Clasificación */}
                            <div className="d-flex flex-wrap gap-2 mb-3">
                                <span className="anime-badge">{producto.categoria}</span>
                                <span className="badge bg-secondary d-flex align-items-center">
                                    {producto.subcategoria}
                                </span>
                            </div>

                            <h1 className="fw-bold anime-title mb-3">{producto.titulo}</h1>

                            <h2 className="fw-bold anime-price mb-4">
                                ${producto.precio.toLocaleString("es-CL")}
                            </h2>

                            <p className="lead mb-4">{producto.descripcion}</p>

                            <hr className="anime-divider my-4" />

                            {/* Acciones */}
                            <div className="d-flex flex-wrap gap-3">
                                <button
                                    type="button"
                                    className="btn anime-cta-btn px-4 py-2 fw-bold"
                                    onClick={() => agregarAlCarrito(producto)}
                                >
                                    Agregar al carrito
                                </button>
                                <button
                                    type="button"
                                    className="btn anime-filter-btn px-4 py-2"
                                    onClick={() => navigate("/carrito")}
                                >
                                    Ir al carrito
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}

export default Detalle;