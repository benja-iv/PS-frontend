import Input from "../atoms/Input"

type Props = {

    Etiqueta : string;
    Tipo     : string;
    Nombre   : string;
    Valor    : string;
    alCambiar: (Valor : string) => void;

}

function CampoForm({ Etiqueta, Tipo, Nombre, Valor, alCambiar} : Props) {
    return (
        <div className = "mb-3">
            <label className = "form-label">
                {Etiqueta}
            </label>

            <Input Tipo = {Tipo} Nombre = {Nombre} Valor = {Valor} alCambiar = {alCambiar} />

        </div>
    )
} export default CampoForm