document.addEventListener("DOMContentLoaded", () => {
    const parametros = new URLSearchParams(window.location.search);
    const id = Number(parametros.get("id")) || 1; // producto por defecto si no viene id
    const producto = obtenerProductoPorId(id);

    const articulo = document.querySelector("main article");
    if (!producto || !articulo) return;

    articulo.querySelector("img").src = producto.imagen;
    articulo.querySelector("img").alt = producto.nombre;
    articulo.querySelector("h2").textContent = producto.nombre;
    articulo.querySelectorAll("p")[0].innerHTML = `<strong>Precio:</strong> ${formatearCLP(producto.precio)}`;
    articulo.querySelectorAll("p")[1].innerHTML = `<strong>Descripción:</strong> ${producto.descripcion}`;

    const listaEspecs = articulo.querySelector("ul");
    listaEspecs.innerHTML = "";
    producto.especificaciones.forEach((linea) => {
        const li = document.createElement("li");
        li.textContent = linea;
        listaEspecs.appendChild(li);
    });

    const inventario = new Inventario(producto.id, producto.stock, producto.stockCritico);
    const boton = articulo.querySelector("button");
    const aviso = document.createElement("p");
    aviso.id = "aviso-stock";

    if (inventario.cantidadDisponible === 0) {
        aviso.textContent = "Producto sin stock disponible.";
        aviso.className = "badge-agotado";
        boton.disabled = true;
    } else if (inventario.requiereReposicion()) {
        aviso.textContent = `Quedan pocas unidades (${inventario.cantidadDisponible}).`;
        aviso.className = "badge-critico";
    } else {
        aviso.textContent = `${inventario.cantidadDisponible} unidades disponibles.`;
        aviso.className = "badge-stock";
    }
    boton.insertAdjacentElement("beforebegin", aviso);

    boton.addEventListener("click", () => {
        if (inventario.cantidadDisponible === 0) return;

        const carrito = obtenerCarrito();
        const itemExistente = carrito.find((item) => item.idProducto === producto.id);

        if (itemExistente) {
            itemExistente.cantidad += 1;
        } else {
            // DetallePedido(idProducto, cantidad, precioUnitario)
            const detalle = new DetallePedido(producto.id, 1, producto.precio);
            carrito.push(detalle);
        }

        guardarCarrito(carrito);
        aviso.textContent = "Producto agregado al carrito.";
        aviso.className = "mensaje-exito";
    });
});
