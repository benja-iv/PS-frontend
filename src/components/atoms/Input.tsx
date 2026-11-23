type Props = {

    Tipo : string;
    Nombre : string;
    Valor : string;
    alCambiar : (Valor : string) => void;

} 

function Input({ Tipo, Nombre, Valor, alCambiar } : Props) {
    return (
        <input
            type = {Tipo}
            name = {Nombre}
            className = "form-control"

            value = {Valor}

            onChange = {(e) => alCambiar(e.target.value)}

        />
    )
} export default Input