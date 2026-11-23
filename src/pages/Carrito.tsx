import { useState } from "react";
import { Link } from "react-router-dom";
import { useCarrito } from "../components/context/CarritoContext";
import "../App.css";

function Carrito() {
    const {
        carrito,
        actualizarCantidad,
        eliminarDelCarrito,
        vaciarCarrito,
        totalItems,
        montoTotal,
    } = useCarrito();

    const [compraExitosa, setCompraExitosa] = useState(false);
    const [errorValidacion, setErrorValidacion] = useState<string | null>(null);

    const handleFinalizarCompra = () => {
        if (carrito.length === 0) {
            setErrorValidacion("Tu carrito está vacío. Agrega al menos un instrumento antes de finalizar.");
            return;
        }
        setErrorValidacion(null);
        setCompraExitosa(true);
        vaciarCarrito();
    };

    return (
        <div className="anime-catalog-bg min-vh-100 py-5">
            <div className="container">
                {/* Encabezado */}
                <div className="col-12 col-md-8 col-lg-6 mx-auto text-center mb-5 anime-catalog-header p-4">
                    <span className="anime-badge mb-2 d-inline-block">
                        SONIDO VIVO • CARRITO DE COMPRAS
                    </span>
                    <h1 className="fw-bold anime-title mt-2">Tu Carrito</h1>
                    <p className="anime-subtitle mb-0">
                        Revisa tus instrumentos seleccionados antes de confirmar tu pedido
                    </p>
                </div>

                {/* Alerta de compra confirmada */}
                {compraExitosa && (
                    <div className="alert alert-success text-center mx-auto mb-4" style={{ maxWidth: "600px" }}>
                        <h5 className="fw-bold mb-1">¡Compra realizada con éxito!</h5>
                        <p className="mb-3">Gracias por confiar en Sonido Vivo. Prepararemos tu pedido.</p>
                        <Link to="/productos" className="btn anime-cta-btn px-4">
                            Seguir explorando instrumentos
                        </Link>
                    </div>
                )}

                {/* Alerta de validación */}
                {errorValidacion && (
                    <div className="alert alert-warning text-center mx-auto mb-4" style={{ maxWidth: "600px" }}>
                        {errorValidacion}
                    </div>
                )}

                {/* Validación: Estado cuando el carrito está vacío */}
                {carrito.length === 0 ? (
                    <div
                        className="text-center p-5 anime-glass-card mx-auto"
                        style={{ maxWidth: "540px" }}
                    >
                        <h3 className="fw-bold mb-3">Tu carrito está vacío</h3>
                        <p className="anime-subtitle mb-4">
                            Aún no has agregado ningún instrumento. Explora nuestro catálogo y encuentra tu sonido ideal.
                        </p>
                        <Link to="/productos" className="btn anime-cta-btn px-4 py-2 fw-bold">
                            Ir al Catálogo
                        </Link>
                    </div>
                ) : (
                    /* Vista cuando hay productos en el carrito */
                    <div className="row g-4">
                        {/* Columna Izquierda: Lista de productos */}
                        <div className="col-12 col-lg-8">
                            <div className="anime-glass-card p-4">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h4 className="fw-bold mb-0">
                                        Instrumentos ({totalItems})
                                    </h4>
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-outline-danger rounded-pill px-3"
                                        onClick={vaciarCarrito}
                                    >
                                        Vaciar carrito
                                    </button>
                                </div>

                                <div className="d-flex flex-column gap-3">
                                    {carrito.map((item) => (
                                        <div
                                            key={item.id}
                                            className="p-3 rounded-4 d-flex flex-column flex-sm-row align-items-center gap-3"
                                            style={{
                                                background: "rgba(255, 255, 255, 0.08)",
                                                border: "1px solid rgba(255, 183, 197, 0.25)",
                                            }}
                                        >
                                            <img
                                                src={encodeURI(item.imagen)}
                                                alt={item.titulo}
                                                className="rounded bg-white p-2"
                                                style={{
                                                    width: "85px",
                                                    height: "85px",
                                                    objectFit: "contain",
                                                }}
                                            />

                                            <div className="flex-grow-1 text-center text-sm-start">
                                                <h6 className="fw-bold mb-1">{item.titulo}</h6>
                                                <small className="anime-subtitle d-block mb-1">
                                                    Categoría: {item.categoria}
                                                </small>
                                                <span className="fw-bold anime-price">
                                                    ${item.precio.toLocaleString("es-CL")} c/u
                                                </span>
                                            </div>

                                            {/* Controles de cantidad */}
                                            <div className="d-flex align-items-center gap-2">
                                                <button
                                                    type="button"
                                                    className="btn btn-sm anime-filter-btn px-2 py-1"
                                                    onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                                                >
                                                    −
                                                </button>
                                                <span className="fw-bold px-2">{item.cantidad}</span>
                                                <button
                                                    type="button"
                                                    className="btn btn-sm anime-filter-btn px-2 py-1"
                                                    onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                                                >
                                                    +
                                                </button>
                                            </div>

                                            {/* Subtotal por producto y botón eliminar */}
                                            <div className="text-center text-sm-end ms-sm-2">
                                                <div className="fw-bold mb-1">
                                                    ${(item.precio * item.cantidad).toLocaleString("es-CL")}
                                                </div>
                                                <button
                                                    type="button"
                                                    className="btn btn-sm text-danger p-0 text-decoration-underline"
                                                    onClick={() => eliminarDelCarrito(item.id)}
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Columna Derecha: Resumen de la compra y monto total */}
                        <div className="col-12 col-lg-4">
                            <div className="anime-glass-card p-4">
                                <h4 className="fw-bold mb-3">Resumen de Compra</h4>
                                <hr className="anime-divider" />

                                <ul className="list-unstyled mb-3">
                                    {carrito.map((item) => (
                                        <li
                                            key={item.id}
                                            className="d-flex justify-content-between align-items-start small mb-2"
                                        >
                                            <span className="me-2">
                                                {item.cantidad}x {item.titulo}
                                            </span>
                                            <span className="fw-semibold text-nowrap">
                                                ${(item.precio * item.cantidad).toLocaleString("es-CL")}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <hr className="anime-divider" />

                                <div className="d-flex justify-content-between mb-2">
                                    <span>Total de artículos:</span>
                                    <span className="fw-bold">{totalItems}</span>
                                </div>

                                <div className="d-flex justify-content-between mb-2">
                                    <span>Envío:</span>
                                    <span className="text-success fw-semibold">Gratis</span>
                                </div>

                                <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top border-secondary">
                                    <span className="fs-5 fw-bold">Monto Total:</span>
                                    <span className="fs-4 fw-bold anime-price">
                                        ${montoTotal.toLocaleString("es-CL")}
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    className="btn anime-cta-btn w-100 py-2 fw-bold mt-4"
                                    onClick={handleFinalizarCompra}
                                >
                                    Finalizar Compra
                                </button>

                                <Link
                                    to="/productos"
                                    className="btn anime-filter-btn w-100 py-2 mt-2 text-center"
                                >
                                    Seguir comprando
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Carrito;