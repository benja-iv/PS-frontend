import { Link } from "react-router-dom";
import "../App.css";

function Inicio() {
    // Generamos pétalos de sakura para la animación de fondo
    const petalos = Array.from({ length: 18 });

    return (
        <div className="anime-hero-container">
            {/* Sol / Luna estilo anime retro de fondo */}
            <div className="anime-sun"></div>

            {/* Pétalos de Sakura animados */}
            <div className="sakura-container" aria-hidden="true">
                {petalos.map((_, index) => (
                    <span key={index} className={`sakura-petal petal-${(index % 6) + 1}`} />
                ))}
            </div>

            {/* Contenido principal (con clases responsivas de Bootstrap) */}
            <div className="container d-flex justify-content-center align-items-center min-vh-100 position-relative z-1">
                <div className="col-12 col-md-8 col-lg-6 anime-glass-card text-center p-4 p-md-5">
                    
                    <span className="anime-badge mb-3 d-inline-block">
                        ようこそ • BIENVENIDO
                    </span>

                    <h1 className="anime-title display-5 fw-bold mb-3">
                       {" "}
                        <span className="anime-highlight">Un poco de musica hasta la puerta de tu casa</span>
                    </h1>

                    <p className="anime-subtitle lead mb-4">
                        Explora nuestra selección de productos.
                        ¡Encuentra a tu instrumento favorito antes de que se agote!
                    </p>

                    <Link to="/productos" className="btn anime-cta-btn btn-lg px-5 py-3 fw-bold">
                        Ver Catálogo de Productos
                    </Link>

                </div>
            </div>
        </div>
    );
}

export default Inicio;