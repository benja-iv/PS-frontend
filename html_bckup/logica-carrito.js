const cuponesDisponibles = [
    new CuponDescuento("VIVO10", 10),
    new CuponDescuento("VIVO20", 20)
];

let cuponAplicado = null;

document.addEventListener("DOMContentLoaded", () => {
    dibujarCarrito();
    prepararSeccionCupon();
    prepararBotonPago();
});

function dibujarCarrito() {
    const carrito = obtenerCarrito();
    const tbody = document.querySelector("table tbody");
    const totalEl = document.querySelector("main h3");

    tbody.innerHTML = "";

    if (carrito.length === 0) {
        const fila = document.createElement("tr");
        fila.innerHTML = `<td colspan="4">Tu carrito está vacío. <a href="catalogo.html">Ir al catálogo</a></td>`;
        tbody.appendChild(fila);
        totalEl.textContent = "Total: $0";
        return;
    }

    let totalOriginal = 0;

    carrito.forEach((item, indice) => {
        const producto = obtenerProductoPorId(item.idProducto);
        // DetallePedido(idProducto, cantidad, precioUnitario)
        const detalle = new DetallePedido(item.idProducto, item.cantidad, item.precioUnitario);
        const subtotal = detalle.obtenerSubtotal();
        totalOriginal += subtotal;

        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${producto ? producto.nombre : "Producto #" + item.idProducto}</td>
            <td>${formatearCLP(item.precioUnitario)}</td>
            <td>
                <button type="button" class="btn-restar" data-indice="${indice}">-</button>
                ${item.cantidad}
                <button type="button" class="btn-sumar" data-indice="${indice}">+</button>
            </td>
            <td>${formatearCLP(subtotal)}
                <button type="button" class="btn-quitar" data-indice="${indice}">Quitar</button>
            </td>
        `;
        tbody.appendChild(fila);
    });

    tbody.querySelectorAll(".btn-sumar").forEach((btn) => {
        btn.addEventListener("click", () => cambiarCantidad(Number(btn.dataset.indice), 1));
    });
    tbody.querySelectorAll(".btn-restar").forEach((btn) => {
        btn.addEventListener("click", () => cambiarCantidad(Number(btn.dataset.indice), -1));
    });
    tbody.querySelectorAll(".btn-quitar").forEach((btn) => {
        btn.addEventListener("click", () => quitarItem(Number(btn.dataset.indice)));
    });

    actualizarTotal(totalOriginal);
}

function cambiarCantidad(indice, delta) {
    const carrito = obtenerCarrito();
    if (!carrito[indice]) return;
    carrito[indice].cantidad += delta;
    if (carrito[indice].cantidad <= 0) {
        carrito.splice(indice, 1);
    }
    guardarCarrito(carrito);
    dibujarCarrito();
}

function quitarItem(indice) {
    const carrito = obtenerCarrito();
    carrito.splice(indice, 1);
    guardarCarrito(carrito);
    dibujarCarrito();
}

function actualizarTotal(totalOriginal) {
    const totalEl = document.querySelector("main h3");
    let totalFinal = totalOriginal;

    if (cuponAplicado) {
        totalFinal = cuponAplicado.calcularTotalConDescuento(totalOriginal);
        totalEl.textContent = `Total: ${formatearCLP(totalFinal)} (cupón ${cuponAplicado.codigo} aplicado)`;
    } else {
        totalEl.textContent = `Total: ${formatearCLP(totalFinal)}`;
    }

    totalEl.dataset.totalFinal = totalFinal;
}

function prepararSeccionCupon() {
    const contenedorTotal = document.querySelector("main h3").parentElement;

    const cuponDiv = document.createElement("div");
    cuponDiv.innerHTML = `
        <label for="input-cupon">Cupón de descuento:</label>
        <input type="text" id="input-cupon" placeholder="Ej: VIVO10">
        <button type="button" id="btn-aplicar-cupon">Aplicar cupón</button>
        <p id="mensaje-cupon"></p>
    `;
    contenedorTotal.insertBefore(cuponDiv, contenedorTotal.querySelector("h3").nextSibling);

    document.getElementById("btn-aplicar-cupon").addEventListener("click", () => {
        const codigo = document.getElementById("input-cupon").value.trim().toUpperCase();
        const mensaje = document.getElementById("mensaje-cupon");
        const cupon = cuponesDisponibles.find((c) => c.codigo === codigo && c.activo);

        if (!cupon) {
            cuponAplicado = null;
            mensaje.textContent = "Cupón no válido.";
            mensaje.className = "mensaje-error";
        } else {
            cuponAplicado = cupon;
            mensaje.textContent = `Cupón ${cupon.codigo} aplicado: ${cupon.porcentajeDescuento}% de descuento.`;
            mensaje.className = "mensaje-exito";
        }
        dibujarCarrito();
    });
}

function prepararBotonPago() {
    const botonPago = Array.from(document.querySelectorAll("button")).find(
        (b) => b.textContent.trim() === "Proceder al Pago"
    );
    if (!botonPago) return;

    botonPago.addEventListener("click", () => {
        const carrito = obtenerCarrito();
        if (carrito.length === 0) {
            alert("Tu carrito está vacío.");
            return;
        }

        const totalEl = document.querySelector("main h3");
        const total = Number(totalEl.dataset.totalFinal);
        const idPedido = Math.floor(Math.random() * 100000);

        // Venta(idVenta, idPedido, total, tipoVenta)
        const venta = new Venta(Math.floor(Math.random() * 100000), idPedido, total, "Online");

        // Envio(idPedido, empresaTransporte, direccionDestino)
        const envio = new Envio(idPedido, "Chilexpress", "Retiro / despacho a coordinar");
        const numeroSeguimiento = "CX" + Math.floor(Math.random() * 1000000);
        envio.actualizarEstadoEnvio("En preparación", numeroSeguimiento);

        // Comprobante(id, idPedido, numeroTransaccion, banco, monto, archivoSoporte)
        const comprobante = new Comprobante(
            Math.floor(Math.random() * 100000),
            idPedido,
            "TX" + Math.floor(Math.random() * 1000000),
            "Banco Simulado",
            total,
            "comprobante-simulado.pdf"
        );
        comprobante.marcarComoValido();

        mostrarConfirmacion(venta, envio, comprobante);

        vaciarCarrito();
        cuponAplicado = null;
        dibujarCarrito();
    });
}

function mostrarConfirmacion(venta, envio, comprobante) {
    const anterior = document.getElementById("confirmacion-pago");
    if (anterior) anterior.remove();

    const seccion = document.createElement("section");
    seccion.id = "confirmacion-pago";
    seccion.innerHTML = `
        <h3>¡Compra confirmada!</h3>
        <p>N° de pedido: ${venta.idPedido}</p>
        <p>Total pagado: ${formatearCLP(venta.total)}</p>
        <p>Estado del pago: ${comprobante.estado}</p>
        <p>Envío con ${envio.empresaTransporte}, estado: ${envio.estado}</p>
        <p>N° de seguimiento: ${envio.numeroSeguimiento}</p>
    `;
    document.querySelector("main").appendChild(seccion);
}
