class DetallePedido {
    constructor(idProducto, cantidad, precioUnitario) {
        this.idProducto = idProducto;
        this.cantidad = cantidad;
        this.precioUnitario = precioUnitario;
    }

    obtenerSubtotal() {
        return this.cantidad * this.precioUnitario;
    }
}