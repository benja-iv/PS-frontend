class Inventario {
    constructor(idProducto, cantidadDisponible, stockCritico) {
        this.idProducto = idProducto;
        this.cantidadDisponible = cantidadDisponible;
        this.stockCritico = stockCritico;
        this.fechaActualizacion = new Date();
    }

    aumentarStock(cantidad) {
        this.cantidadDisponible += cantidad;
        this.fechaActualizacion = new Date();
    }

    disminuirStock(cantidad) {
        if (this.cantidadDisponible >= cantidad) {
            this.cantidadDisponible -= cantidad;
            this.fechaActualizacion = new Date();
        }
    }

    requiereReposicion() {
        return this.cantidadDisponible <= this.stockCritico;
    }
}