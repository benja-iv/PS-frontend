import { useEffect, useState } from "react";
import CardProducto from "../components/molecules/CardProducto";
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

interface CategoriaAPI {
    id: number;
    nombre: string;
    descripcion?: string;
}

function Productos() {
    const [productos, setProductos] = useState<ProductoAPI[]>([]);
    const [categorias, setCategorias] = useState<string[]>(["Todos"]);
    const [categoriaActiva, setCategoriaActiva] = useState<string>("Todos");
    const [cargando, setCargando] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const cargarCatalogo = async () => {
            try {
                const [resProductos, resCategorias] = await Promise.all([
                    fetch("http://localhost:8082/api/productos"),
                    fetch("http://localhost:8082/api/categorias"),
                ]);

                if (!resProductos.ok || !resCategorias.ok) {
                    throw new Error("No se pudo obtener el catálogo desde el servidor.");
                }

                const dataProductos: ProductoAPI[] = await resProductos.json();
                const dataCategorias: CategoriaAPI[] = await resCategorias.json();

                setProductos(dataProductos);
                setCategorias(["Todos", ...dataCategorias.map((cat) => cat.nombre)]);
            } catch (err) {
                setError("No se pudo conectar con ms-producto (puerto 8082). Verifica que el microservicio esté encendido.");
            } finally {
                setCargando(false);
            }
        };

        cargarCatalogo();
    }, []);

    const productosFiltrados = productos.filter((prod) => {
        return categoriaActiva === "Todos" || prod.categoriaNombre === categoriaActiva;
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

                {/* Estado de carga o error */}
                {cargando ? (
                    <div className="text-center py-5 anime-glass-card mx-auto" style={{ maxWidth: "500px" }}>
                        <h4 className="fw-bold">Cargando instrumentos...</h4>
                        <p className="mb-0">Consultando el catálogo en la base de datos.</p>
                    </div>
                ) : error ? (
                    <div className="alert alert-danger text-center mx-auto" style={{ maxWidth: "600px" }} role="alert">
                        {error}
                    </div>
                ) : productosFiltrados.length > 0 ? (
                    /* Grilla de Productos */
                    <div className="row g-4 justify-content-center">
                        {productosFiltrados.map((prod) => (
                            <div
                                key={prod.id}
                                className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center"
                            >
                                <CardProducto
                                    id={prod.id}
                                    titulo={prod.nombre}
                                    descripcion={prod.descripcion}
                                    precio={prod.precio}
                                    imagen={prod.imagenUrl}
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