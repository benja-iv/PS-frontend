import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";
import { useAuth } from "../context/AuthContext";
import "../../App.css";

function Navbar() {
    const [menuAbierto, setMenuAbierto] = useState(false);
    const { totalItems } = useCarrito();
    const { usuario, cerrarSesion, esAdmin } = useAuth();
    const navigate = useNavigate();

    const cerrarMenu = () => setMenuAbierto(false);

    const handleLogout = () => {
        cerrarSesion();
        cerrarMenu();
        navigate("/");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark anime-navbar sticky-top">
            <div className="container">
                <Link
                    className="navbar-brand fw-bold anime-brand"
                    to="/"
                    onClick={cerrarMenu}
                >
                    SONIDO <span className="anime-highlight">VIVO</span>
                </Link>

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

                <div
                    className={`collapse navbar-collapse ${menuAbierto ? "show" : ""}`}
                    id="navbarSonidoVivo"
                >
                    <ul className="navbar-nav ms-auto align-items-lg-center gap-2 mt-3 mt-lg-0 text-center">
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

                        {usuario ? (
                            <>
                                <li className="nav-item">
                                    <span className="nav-link text-light fw-semibold">
                                        Hola, {usuario.nombre}
                                        {esAdmin && (
                                            <span className="badge bg-warning text-dark ms-2">
                                                ADMIN
                                            </span>
                                        )}
                                    </span>
                                </li>
                                <li className="nav-item">
                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="btn btn-sm anime-filter-btn"
                                    >
                                        Salir
                                    </button>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item">
                                <NavLink
                                    to="/login"
                                    onClick={cerrarMenu}
                                    className={({ isActive }) =>
                                        `nav-link anime-nav-link ${isActive ? "active" : ""}`
                                    }
                                >
                                    Ingresar
                                </NavLink>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;