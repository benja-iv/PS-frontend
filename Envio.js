class Envio {
    constructor(idPedido, empresaTransporte, direccionDestino) {
        this.idPedido = idPedido;
        this.empresaTransporte = empresaTransporte;
        this.direccionDestino = direccionDestino;
        this.numeroSeguimiento = "";
        this.estado = "Preparacion";
    }

    actualizarEstadoEnvio(nuevoEstado, numeroSeguimiento) {
        this.estado = nuevoEstado;
        if (numeroSeguimiento) {
            this.numeroSeguimiento = numeroSeguimiento;
        }
    }
}