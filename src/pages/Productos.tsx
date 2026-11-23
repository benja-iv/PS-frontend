import { useState } from "react";
import CardProducto from "../components/molecules/CardProducto";
import { listaProductos, categorias } from "../ListaProductos/Productos";
import "../App.css";

function Productos() {
    const [categoriaActiva, setCategoriaActiva] = useState<string>("Todos");

    const productosFiltrados = listaProductos.filter((prod) => {
        return categoriaActiva === "Todos" || prod.categoria === categoriaActiva;
    });

    return (
        <div className="anime-catalog-bg min-vh-100 py-5">
            <div className="container">
                
                {/* Encabezado */}
                <div className="col-12 col-md-8 col-lg-6 mx-auto text-center mb-5 anime-catalog-header p-4">
                    <span className="anime-badge mb-2 d-inline-block">
                        SONIDO VIVO • CATÁLOGO OFICIAL
                    </span>
                    <h1 className="fw-bold anime-title mt-2">Nuestros Instrumentos</h1>
                    <p className="anime-subtitle mb-0">
                        Explora nuestro catálogo y filtra por tipo de instrumento
                    </p>
                </div>

                {/* Panel de Filtros (Solo Categorías) */}
                <div className="anime-filter-panel p-4 mb-5 mx-auto">
                    <div className="text-center">
                        <h6 className="text-uppercase fw-bold mb-3 anime-filter-label">
                            Categorías
                        </h6>
                        <div className="d-flex flex-wrap justify-content-center gap-2">
                            {categorias.map((cat) => (
                                <button
                                    key={cat}
                                    type="button"
                                    onClick={() => setCategoriaActiva(cat)}
                                    className={`btn anime-filter-btn ${
                                        categoriaActiva === cat ? "active" : ""
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Grilla de Productos */}
                {productosFiltrados.length > 0 ? (
                    <div className="row g-4 justify-content-center">
                        {productosFiltrados.map((prod) => (
                            <div
                                key={prod.id}
                                className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center"
                            >
                                <CardProducto
                                    id={prod.id}
                                    titulo={prod.titulo}
                                    descripcion={prod.descripcion}
                                    precio={prod.precio}
                                    imagen={prod.imagen}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-5 anime-glass-card mx-auto" style={{ maxWidth: "500px" }}>
                        <h4 className="fw-bold">No hay instrumentos en esta categoría</h4>
                        <p className="mb-3">Prueba seleccionando otra opción del catálogo.</p>
                        <button
                            className="btn anime-cta-btn px-4 py-2"
                            onClick={() => setCategoriaActiva("Todos")}
                        >
                            Ver todos los instrumentos
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
}

export default Productos;