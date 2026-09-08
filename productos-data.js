const PRODUCTOS = [
    {
        id: 1,
        nombre: "Guitarra Acústica Folk - Yamaha",
        precio: 129990,
        imagen: "img/guitarra-acustica.png",
        descripcion: "Guitarra acústica con tapa de abeto, aros y fondo de nato/meranti. Ofrece un tono cálido y equilibrado, ideal tanto para principiantes como para músicos intermedios.",
        especificaciones: [
            "Tapa: Abeto",
            "Mástil: Nato",
            "Diapasón: Palo de rosa",
            "Acabado: Natural brillante"
        ],
        stock: 8,
        stockCritico: 3
    },
    {
        id: 2,
        nombre: "Guitarra Eléctrica Stratocaster - Squier",
        precio: 249990,
        imagen: "img/guitarra-electrica.png",
        descripcion: "Guitarra eléctrica de cuerpo sólido inspirada en el diseño clásico Stratocaster, con tres pastillas single-coil y un sonido versátil para rock, blues y pop.",
        especificaciones: [
            "Cuerpo: Álamo",
            "Mástil: Maple",
            "Pastillas: 3 single-coil",
            "Acabado: Sunburst"
        ],
        stock: 4,
        stockCritico: 3
    },
    {
        id: 3,
        nombre: "Bajo Eléctrico Jazz Bass - Fender",
        precio: 689990,
        imagen: "img/bajo-electrico.png",
        descripcion: "Bajo eléctrico de cuatro cuerdas con dos pastillas single-coil, mástil delgado y sonido profundo y definido, ideal para jazz, funk y rock.",
        especificaciones: [
            "Cuerpo: Aliso",
            "Mástil: Maple, perfil C",
            "Pastillas: 2 single-coil Jazz Bass",
            "Acabado: 3-Color Sunburst"
        ],
        stock: 2,
        stockCritico: 3
    },
    {
        id: 4,
        nombre: "Teclado Sintetizador - Roland",
        precio: 450000,
        imagen: "img/teclado-sintetizador.png",
        descripcion: "Sintetizador de 61 teclas con múltiples voces y ritmos integrados, salida MIDI y USB, pensado para producción, práctica y presentaciones en vivo.",
        especificaciones: [
            "Teclas: 61, sensibles a velocidad",
            "Polifonía: 128 voces",
            "Conectividad: USB / MIDI",
            "Alimentación: Corriente o pilas"
        ],
        stock: 0,
        stockCritico: 2
    }
];

function obtenerProductoPorId(id) {
    return PRODUCTOS.find(p => p.id === Number(id));
}

function formatearCLP(numero) {
    return "$" + Math.round(numero).toLocaleString("es-CL");
}
