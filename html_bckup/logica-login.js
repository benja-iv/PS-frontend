const usuariosDemo = [
    {
        usuario: "admin@gmail.com",
        password: "1234",
        rol: new Rol(1, "Administrador", ["gestionar_inventario", "gestionar_ventas", "gestionar_usuarios"])
    },
    {
        usuario: "cliente@gmail.com",
        password: "1234",
        rol: new Rol(2, "Cliente", ["comprar", "ver_pedidos"])
    }
];

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-login");
    const mensajes = document.getElementById("mensajes-login");

    if (!form) return;

    form.addEventListener("submit", (evento) => {
        evento.preventDefault();

        const usuario = document.getElementById("usuario").value.trim();
        const password = document.getElementById("password").value;

        const errores = validarFormularioLogin(usuario, password);

        if (errores.length > 0) {
            mostrarMensajes(errores, "error");
            return;
        }

        const encontrado = usuariosDemo.find(
            (u) => u.usuario === usuario && u.password === password
        );

        if (!encontrado) {
            mostrarMensajes(["Correo o contraseña incorrectos."], "error");
            return;
        }

        const puedeComprar = encontrado.rol.verificarPermiso("comprar") ||
            encontrado.rol.verificarPermiso("gestionar_ventas");

        localStorage.setItem("usuarioActivo", JSON.stringify({
            usuario: encontrado.usuario,
            rol: encontrado.rol.nombreRol
        }));

        mostrarMensajes(
            [`Bienvenido/a, ${encontrado.usuario} (${encontrado.rol.nombreRol}).`],
            "exito"
        );

        setTimeout(() => {
            window.location.href = puedeComprar ? "catalogo.html" : "index.html";
        }, 1200);
    });

    function mostrarMensajes(lista, tipo) {
        mensajes.innerHTML = "";
        mensajes.className = tipo === "error" ? "mensaje-error" : "mensaje-exito";
        const ul = document.createElement("ul");
        lista.forEach((texto) => {
            const li = document.createElement("li");
            li.textContent = texto;
            ul.appendChild(li);
        });
        mensajes.appendChild(ul);
    }
});
