import { Link } from "react-router-dom";

interface BotonProps {
    id: number;
    texto?: string;
}

function Boton({ id, texto = "Ver detalle" }: BotonProps) {
    return (
        <Link to={`/detalle/${id}`} className="btn anime-cta-btn w-100">
            {texto}
        </Link>
    );
}

export default Boton;