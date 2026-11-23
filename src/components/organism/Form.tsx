import CampoForm from "../molecules/CampoForm";
import { useState } from "react";

function Form() {
    // Estados para guardar los datos del formulario
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [mensaje, setMensaje] = useState("");

    // Valida los datos al enviar el formulario
    const manejarEnvio = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Evita recargar la pagina

        if (nombre.trim() === "") {
            alert("Debe ingresar su nombre");
            return;
        }

        if (correo.trim() === "") {
            alert("Debe ingresar su correo");
            return;
        }

        // Comprueba que el correo tenga un formato válido
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
            alert("Ingrese un correo válido");
            return;
        }

        if (mensaje.trim() === "") {
            alert("Debe ingresar un mensaje");
            return;
        }

        alert("Formulario enviado correctamente");
    };

    return (
        <form onSubmit={manejarEnvio} noValidate className="col-12 col-md-8 col-lg-6 mx-auto">
            <CampoForm
                Etiqueta="Nombre Completo"
                Tipo="text"
                Nombre="nombre"
                Valor={nombre}
                alCambiar={setNombre}
            />

            <CampoForm
                Etiqueta="Correo electronico"
                Tipo="email"
                Nombre="correo"
                Valor={correo}
                alCambiar={setCorreo}
            />

            <CampoForm
                Etiqueta="Mensaje"
                Tipo="text"
                Nombre="mensaje"
                Valor={mensaje}
                alCambiar={setMensaje}
            />

            <button type="submit" className="btn btn-primary">
                Enviar Mensaje
            </button>
        </form>
    );
}

export default Form;