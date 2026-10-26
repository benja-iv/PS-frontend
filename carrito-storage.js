function obtenerCarrito() {
    const guardado = localStorage.getItem("carritoSonidoVivo");
    return guardado ? JSON.parse(guardado) : [];
}

function guardarCarrito(carrito) {
    localStorage.setItem("carritoSonidoVivo", JSON.stringify(carrito));
}

function vaciarCarrito() {
    localStorage.removeItem("carritoSonidoVivo");
}
