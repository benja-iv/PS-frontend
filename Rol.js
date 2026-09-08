class Rol {
    constructor(idRol, nombreRol, permisos) {
        this.idRol = idRol;
        this.nombreRol = nombreRol;
        this.permisos = permisos;
    }

    verificarPermiso(permisoBuscado) {
        return this.permisos.includes(permisoBuscado);
    }
}