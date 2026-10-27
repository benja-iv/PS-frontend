document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-contacto");
    const mensajes = document.getElementById("mensajes-contacto");

    if (!form) return;

    form.addEventListener("submit", (evento) => {
        evento.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const correo = document.getElementById("email").value.trim();
        const mensaje = document.getElementById("mensaje").value.trim();

        const errores = validarFormularioContacto(nombre, correo, mensaje);

        mensajes.innerHTML = "";

        if (errores.length > 0) {
            mensajes.className = "mensaje-error";
            const ul = document.createElement("ul");
            errores.forEach((texto) => {
                const li = document.createElement("li");
                li.textContent = texto;
                ul.appendChild(li);
            });
            mensajes.appendChild(ul);
            return;
        }

        mensajes.className = "mensaje-exito";
        mensajes.textContent = `Gracias, ${nombre}. Recibimos tu mensaje y te responderemos a ${correo}.`;
        form.reset();
    });
});
