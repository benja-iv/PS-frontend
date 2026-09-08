function validarCorreo(correo) {
    if (correo.length > 100) return false;
    const regexCorreo = /^[a-zA-Z0-9._%+-]+@(hotmail\.com|gmail\.com)$/;
    return regexCorreo.test(correo);
}

function validarRun(run) {
    if (run.length < 7 || run.length > 9 || !/^[0-9]+[0-9kK]$/.test(run)) {
        return false;
    }

    const cuerpo = run.slice(0, -1);
    const dv = run.slice(-1).toUpperCase();

    let suma = 0;
    let multiplo = 2;
    for (let i = 1; i <= cuerpo.length; i++) {
        let index = multiplo * run.charAt(cuerpo.length - i);
        suma = suma + index;
        if (multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }
    }
    const dvEsperado = 11 - (suma % 11);
    const dvCalculado = (dvEsperado === 11) ? "0" : ((dvEsperado === 10) ? "K" : dvEsperado.toString());

    return dv === dvCalculado;
}

function validarFormularioLogin(correo, password) {
    let errores = [];

    if (!correo) {
        errores.push("El correo es requerido.");
    } else if (!validarCorreo(correo)) {
        errores.push("El correo debe tener maximo 100 caracteres y ser @hotmail.com o @gmail.com.");
    }

    if (!password) {
        errores.push("La contrasenna es requerida.");
    } else if (password.length < 4 || password.length > 10) {
        errores.push("La contrasenna debe tener entre 4 y 10 caracteres.");
    }

    return errores;
}

function validarFormularioContacto(nombre, correo, comentario) {
    let errores = [];

    if (!nombre) {
        errores.push("El nombre es requerido.");
    } else if (nombre.length > 100) {
        errores.push("El nombre no puede superar los 100 caracteres.");
    }

    if (correo && !validarCorreo(correo)) {
        errores.push("El correo debe tener maximo 100 caracteres y ser @hotmail.com o @gmail.com.");
    }

    if (!comentario) {
        errores.push("El comentario es requerido.");
    } else if (comentario.length > 500) {
        errores.push("El comentario no puede superar los 500 caracteres.");
    }

    return errores;
}

function validarFormularioUsuario(run, nombre, apellidos, correo, direccion, categoria) {
    let errores = [];

    if (!run) {
        errores.push("El RUN es requerido.");
    } else if (!validarRun(run)) {
        errores.push("El RUN ingresado no es valido. Debe ser sin puntos ni guion (Ej: 19011022K) y tener entre 7 y 9 caracteres.");
    }

    if (!nombre) {
        errores.push("El nombre es requerido.");
    } else if (nombre.length > 50) {
        errores.push("El nombre no puede superar los 50 caracteres.");
    }

    if (!apellidos) {
        errores.push("Los apellidos son requeridos.");
    } else if (apellidos.length > 100) {
        errores.push("Los apellidos no pueden superar los 100 caracteres.");
    }

    if (!correo) {
        errores.push("El correo es requerido.");
    } else if (!validarCorreo(correo)) {
        errores.push("El correo debe tener maximo 100 caracteres y ser @hotmail.com o @gmail.com.");
    }

    if (!direccion) {
        errores.push("La direccion es requerida.");
    } else if (direccion.length > 300) {
        errores.push("La direccion no puede superar los 300 caracteres.");
    }

    return errores;
}

function validarFormularioProducto(codigo, nombre, descripcion, precio, stock, stockCritico, categoria) {
    let errores = [];

    if (!codigo) {
        errores.push("El codigo del producto es requerido.");
    } else if (codigo.length < 3) {
        errores.push("El codigo debe tener al menos 3 caracteres.");
    }

    if (!nombre) {
        errores.push("El nombre del producto es requerido.");
    } else if (nombre.length > 100) {
        errores.push("El nombre no puede superar los 100 caracteres.");
    }

    if (descripcion && descripcion.length > 500) {
        errores.push("La descripcion no puede superar los 500 caracteres.");
    }

    if (precio === "" || precio === null || isNaN(precio)) {
        errores.push("El precio es requerido y debe ser numerico.");
    } else if (parseFloat(precio) < 0) {
        errores.push("El precio no puede ser negativo (Minimo 0).");
    }

    if (stock === "" || stock === null || isNaN(stock)) {
        errores.push("El stock es requerido.");
    } else if (!Number.isInteger(Number(stock)) || parseInt(stock) < 0) {
        errores.push("El stock debe ser un numero entero mayor o igual a 0.");
    }

    if (stockCritico !== "" && stockCritico !== null) {
        if (isNaN(stockCritico) || !Number.isInteger(Number(stockCritico)) || parseInt(stockCritico) < 0) {
            errores.push("El stock critico debe ser un numero entero mayor o igual a 0.");
        }
    }

    if (!categoria || categoria.trim() === "") {
        errores.push("Debe seleccionar una categoria.");
    }

    return errores;
}