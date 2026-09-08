class Venta {
    constructor(idVenta, idPedido, total, tipoVenta) {
        this.idVenta = idVenta;
        this.idPedido = idPedido;
        this.fechaVenta = new Date();
        this.total = total;
        this.tipoVenta = tipoVenta;
    }
}