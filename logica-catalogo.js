document.addEventListener("DOMContentLoaded", () => {
    const articulos = document.querySelectorAll("main article");

    articulos.forEach((articulo, indice) => {
        const producto = PRODUCTOS[indice];
        if (!producto) return;

        const inventario = new Inventario(producto.id, producto.stock, producto.stockCritico);

        const enlace = articulo.querySelector("a");
        if (enlace) {
            enlace.href = `detalle-producto.html?id=${producto.id}`;
        }

        const badge = document.createElement("p");
        if (inventario.cantidadDisponible === 0) {
            badge.textContent = "Sin stock";
            badge.className = "badge-agotado";
        } else if (inventario.requiereReposicion()) {
            badge.textContent = `Stock crítico (${inventario.cantidadDisponible} unidades)`;
            badge.className = "badge-critico";
        } else {
            badge.textContent = `En stock (${inventario.cantidadDisponible} unidades)`;
            badge.className = "badge-stock";
        }

        if (enlace) {
            articulo.insertBefore(badge, enlace);
        } else {
            articulo.appendChild(badge);
        }
    });
});
