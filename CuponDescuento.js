class CuponDescuento {
    constructor(codigo, porcentajeDescuento) {
        this.codigo = codigo;
        this.porcentajeDescuento = porcentajeDescuento;
        this.activo = true;
    }

    calcularTotalConDescuento(totalOriginal) {
        if (this.activo) {
            return totalOriginal - (totalOriginal * (this.porcentajeDescuento / 100));
        }
        return totalOriginal;
    }
}