import Boton from '../atoms/Boton';

interface CardProps {
    id: number;
    titulo: string;
    descripcion: string;
    precio: number;
    imagen: string;
}

function CardProducto({ id, titulo, descripcion, precio, imagen }: CardProps) {
    return (
        <div data-testid='tarjeta-producto' className='card anime-product-card w-100 h-100'>
            <div className='anime-img-wrapper'>
                <img 
                    src={encodeURI(imagen)} 
                    className='card-img-top' 
                    alt={titulo} 
                    style={{ height: '190px', objectFit: 'contain' }}
                />
            </div>

            <div className='card-body d-flex flex-column'>
                <h5 className='card-title fw-bold anime-card-title'>{titulo}</h5>
                <p className='card-text anime-card-desc'>{descripcion}</p>
                <p className='card-text fw-bold fs-5 anime-price mt-auto'>
                    ${precio.toLocaleString("es-CL")}
                </p>
                
                <div className='mt-2'>
                    <Boton id={id} />
                </div>
            </div>
        </div>
    );
}

export default CardProducto;