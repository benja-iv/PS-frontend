import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCarrito } from "../components/context/CarritoContext";
import "../App.css";

interface ProductoAPI {
    id: number;
    nombre: string;
    marca: string;
    descripcion: string;
    precio: number;
    stock: number;
    imagenUrl: string;
    categoriaNombre: string;
}

function Detalle() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { agregarAlCarrito } = useCarrito();

    const [producto, setProducto] = useState<ProductoAPI | null>(null);
    const [cargando, setCargando] = useState<boolean>(true);
    const [noEncontrado, setNoEncontrado] = useState<boolean>(false);

    useEffect(() => {
        const cargarDetalle = async () => {
            try {
                const res = await fetch(`http://localhost:8082/api/productos/${id}`);
                if (!res.ok) {
                    setNoEncontrado(true);
                    return;
                }
                const data: ProductoAPI = await res.json();
                setProducto(data);
            } catch (err) {
                setNoEncontrado(true);
            } finally {
                setCargando(false);
            }
        };

        cargarDetalle();
    }, [id]);

    if (cargando) {
        return (
            <div className="anime-catalog-bg min-vh-100 d-flex align-items-center justify-content-center py-5">
                <div className="text-center p-5 anime-glass-card" style={{ maxWidth: "500px" }}>
                    <h4 className="fw-bold mb-2">Cargando instrumento...</h4>
                    <p className="mb-0">Consultando detalle en el catálogo.</p>
                </div>
            </div>
        );
    }

    if (noEncontrado || !producto) {
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
                                    src={encodeURI(producto.imagenUrl)}
                                    alt={producto.nombre}
                                    className="img-fluid"
                                    style={{ maxHeight: "400px", objectFit: "contain" }}
                                />
                            </div>
                        </div>

                        {/* Columna Derecha: Información */}
                        <div className="col-12 col-md-6">
                            {/* Badges de Categoría y Marca */}
                            <div className="d-flex flex-wrap gap-2 mb-3">
                                <span className="anime-badge">{producto.categoriaNombre}</span>
                                <span className="badge bg-secondary d-flex align-items-center">
                                    Marca: {producto.marca}
                                </span>
                                <span className={`badge d-flex align-items-center ${producto.stock > 0 ? "bg-success" : "bg-danger"}`}>
                                    {producto.stock > 0 ? `Stock: ${producto.stock}` : "Agotado"}
                                </span>
                            </div>

                            <h1 className="fw-bold anime-title mb-3">{producto.nombre}</h1>

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
                                    disabled={producto.stock <= 0}
                                    onClick={() =>
                                        agregarAlCarrito({
                                            id: producto.id,
                                            titulo: producto.nombre,
                                            descripcion: producto.descripcion,
                                            precio: producto.precio,
                                            imagen: producto.imagenUrl,
                                            categoria: producto.categoriaNombre,
                                        })
                                    }
                                >
                                    {producto.stock > 0 ? "Agregar al carrito" : "Sin stock"}
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