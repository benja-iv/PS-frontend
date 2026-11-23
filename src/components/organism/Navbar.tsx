import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";
import "../../App.css";

function Navbar() {
    const [menuAbierto, setMenuAbierto] = useState(false);
    const { totalItems } = useCarrito();

    const cerrarMenu = () => setMenuAbierto(false);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark anime-navbar sticky-top">
            <div className="container">
                {/* Marca de la tienda */}
                <Link
                    className="navbar-brand fw-bold anime-brand"
                    to="/"
                    onClick={cerrarMenu}
                >
                    SONIDO <span className="anime-highlight">VIVO</span>
                </Link>

                {/* Botón hamburguesa controlado por React */}
                <button
                    className="navbar-toggler border-0"
                    type="button"
                    onClick={() => setMenuAbierto(!menuAbierto)}
                    aria-controls="navbarSonidoVivo"
                    aria-expanded={menuAbierto}
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Enlaces de navegación */}
                <div
                    className={`collapse navbar-collapse ${menuAbierto ? "show" : ""}`}
                    id="navbarSonidoVivo"
                >
                    <ul className="navbar-nav ms-auto gap-2 mt-3 mt-lg-0 text-center">
                        <li className="nav-item">
                            <NavLink
                                to="/"
                                end
                                onClick={cerrarMenu}
                                className={({ isActive }) =>
                                    `nav-link anime-nav-link ${isActive ? "active" : ""}`
                                }
                            >
                                Inicio
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/productos"
                                onClick={cerrarMenu}
                                className={({ isActive }) =>
                                    `nav-link anime-nav-link ${isActive ? "active" : ""}`
                                }
                            >
                                Productos
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/quienes_somos"
                                onClick={cerrarMenu}
                                className={({ isActive }) =>
                                    `nav-link anime-nav-link ${isActive ? "active" : ""}`
                                }
                            >
                                Quiénes Somos
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/contacto"
                                onClick={cerrarMenu}
                                className={({ isActive }) =>
                                    `nav-link anime-nav-link ${isActive ? "active" : ""}`
                                }
                            >
                                Contacto
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/carrito"
                                onClick={cerrarMenu}
                                className={({ isActive }) =>
                                    `nav-link anime-nav-link ${isActive ? "active" : ""}`
                                }
                            >
                                Carrito
                                {totalItems > 0 && (
                                    <span className="badge bg-light text-dark rounded-pill ms-2">
                                        {totalItems}
                                    </span>
                                )}
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;