import { Link } from "react-router-dom";
import "../App.css";

function QuienesSomos() {
    return (
        <div className="anime-catalog-bg min-vh-100 py-5">
            <div className="container">
                
                {/* Encabezado */}
                <div className="col-12 col-md-8 col-lg-6 mx-auto text-center mb-5 anime-catalog-header p-4">
                    <span className="anime-badge mb-2 d-inline-block">
                        SONIDO VIVO • NUESTRA HISTORIA
                    </span>
                    <h1 className="fw-bold anime-title mt-2">Quiénes Somos</h1>
                    <p className="anime-subtitle mb-0">
                        De músicos para músicos: nuestra pasión hecha tienda
                    </p>
                </div>

                {/* Tarjeta Principal */}
                <div className="anime-glass-card p-4 p-md-5 mb-5 mx-auto" style={{ maxWidth: "900px" }}>
                    <div className="row g-4 align-items-center">
                        <div className="col-12">
                            <h3 className="fw-bold mb-3">
                                Más que una tienda, una comunidad musical
                            </h3>
                            <p className="lead">
                                Somos un grupo de amigos amantes de la música que nació con una idea simple: 
                                crear el lugar donde puedas encontrar ese instrumento que tanto buscas, 
                                sin importar si estás dando tus primeros pasos o llevas años sobre el escenario.
                            </p>
                            <p className="mb-0">
                                Sabemos lo especial que es conectar con el sonido indicado —desde el primer acorde 
                                en una guitarra o el pulso de una batería, hasta la calidez de un piano acústico 
                                o una flauta de madera—. Por eso seleccionamos cada pieza de nuestro catálogo 
                                pensando en la calidad, la calibración y la inspiración que entrega al tocarla.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Pilares / Valores */}
                <div className="row g-4 justify-content-center mb-5 mx-auto" style={{ maxWidth: "900px" }}>
                    <div className="col-12 col-md-4">
                        <div className="anime-glass-card p-4 h-100 text-center">
                            <h5 className="fw-bold mb-2">Pasión Real</h5>
                            <p className="small mb-0">
                                Tocamos, probamos y conocemos lo que vendemos. Te asesoramos de igual a igual 
                                para que elijas lo que realmente necesitas.
                            </p>
                        </div>
                    </div>

                    <div className="col-12 col-md-4">
                        <div className="anime-glass-card p-4 h-100 text-center">
                            <h5 className="fw-bold mb-2">Variedad Curada</h5>
                            <p className="small mb-0">
                                Desde instrumentos clásicos de viento y cuerda hasta sintetizadores y 
                                controladores modernos para tu home studio.
                            </p>
                        </div>
                    </div>

                    <div className="col-12 col-md-4">
                        <div className="anime-glass-card p-4 h-100 text-center">
                            <h5 className="fw-bold mb-2">Cercanía</h5>
                            <p className="small mb-0">
                                Queremos acompañarte en todo tu camino musical, resolviendo tus dudas antes 
                                y después de llevar tu instrumento a casa.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Llamado a la acción */}
                <div className="text-center">
                    <Link to="/productos" className="btn anime-cta-btn px-4 py-2 fw-bold me-3">
                        Explorar Catálogo
                    </Link>
                    <Link to="/contacto" className="btn anime-filter-btn px-4 py-2">
                        Escríbenos
                    </Link>
                </div>

            </div>
        </div>
    );
}

export default QuienesSomos;