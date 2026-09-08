class Comprobante {
    constructor(id, idPedido, numeroTransaccion, banco, monto, archivoSoporte) {
        this.id = id;
        this.idPedido = idPedido;
        this.numeroTransaccion = numeroTransaccion;
        this.banco = banco;
        this.monto = monto;
        this.archivoSoporte = archivoSoporte;
        this.estado = "Pendiente";
        this.fechaRegistro = new Date();
    }

    marcarComoValido() {
        this.estado = "Valido";
    }

    marcarComoInvalido() {
        this.estado = "Invalido";
    }
}