// src/data/productos.ts

export type CategoriaInstrumento =
    | "Teclados"
    | "Flautas"
    | "Piano"
    | "Baterias"
    | "Guitarras"
    | "Bajos"
    | "Vientos Metal";

export type SubcategoriaInstrumento =
    | "Electrófono (electrónico / sintetizador)"
    | "Aerófono (de viento)"
    | "Aerófono (de viento metal)"
    | "Cordófono (de cuerda percutida)"
    | "Cordófono (de cuerda pulsada)"
    | "Membranófonos (parche tensado)"
    | "Idiófonos (cuerpo del instrumento)";

export interface ProductoItem {
    id: number;
    titulo: string;
    descripcion: string;
    precio: number;
    imagen: string;
    categoria: CategoriaInstrumento;
    subcategoria: SubcategoriaInstrumento;
}

export const listaProductos: ProductoItem[] = [
    // TECLADOS
    {
        id: 1,
        titulo: "Arturia Keylab 61 MK3 Ultra - Controlador MIDI",
        descripcion: "Controlador MIDI profesional de 61 teclas semicontrapesadas con integración DAW, pads sensibles y pantalla a color.",
        precio: 549990,
        imagen: "/Img/Sonido_Vivo/Arturia Keylab 61 MK3 Ultra - Controlador MIDI.jpg",
        categoria: "Teclados",
        subcategoria: "Electrófono (electrónico / sintetizador)",
    },
    {
        id: 2,
        titulo: "Studiologic Numa X Piano GT - Stage Piano",
        descripcion: "Piano de escenario con teclado de madera Fatar TP/400 Wood, motor de sonido avanzado y mezclador digital integrado.",
        precio: 1890000,
        imagen: "/Img/Sonido_Vivo/Studiologic Numa X Piano GT - Stage Piano.jpg",
        categoria: "Teclados",
        subcategoria: "Electrófono (electrónico / sintetizador)",
    },

    // FLAUTAS
    {
        id: 3,
        titulo: "Flauta Dulce Alto Moeck Tuju 231 Maple",
        descripcion: "Flauta dulce contralto fabricada en madera de arce (maple), digitación barroca y tono cálido ideal para ensambles.",
        precio: 165990,
        imagen: "/Img/Sonido_Vivo/Flauta Dulce Alto Moeck Tuju 231 Maple.jpg",
        categoria: "Flautas",
        subcategoria: "Aerófono (de viento)",
    },
    {
        id: 4,
        titulo: "Flauta Dulce Alto Mollenhauer Solist",
        descripcion: "Instrumento de estudio avanzado en madera seleccionada con excelente proyección sonora y respuesta en registros agudos.",
        precio: 229990,
        imagen: "/Img/Sonido_Vivo/Flauta Dulce Alto Mollenhauer Solist.jpg",
        categoria: "Flautas",
        subcategoria: "Aerófono (de viento)",
    },
    {
        id: 5,
        titulo: "Flauta Dulce Soprano Mollenhauer",
        descripcion: "Flauta dulce soprano de afinación precisa, cuerpo ergonómico y timbre claro para estudiantes y músicos.",
        precio: 89990,
        imagen: "/Img/Sonido_Vivo/Flauta Dulce Soprano Mollenhauer.jpg",
        categoria: "Flautas",
        subcategoria: "Aerófono (de viento)",
    },

    // PIANO
    {
        id: 6,
        titulo: "Kawai CX5 – Piano Vertical Acústico",
        descripcion: "Piano vertical acústico compacto con maquinaria de alta precisión, excelente estabilidad de afinación y sonido equilibrado.",
        precio: 3490000,
        imagen: "/Img/Sonido_Vivo/Kawai CX5 – Piano Vertical Acústico.jpg",
        categoria: "Piano",
        subcategoria: "Cordófono (de cuerda percutida)",
    },
    {
        id: 7,
        titulo: "Yamaha C7X PE - Piano Acústico de Cola",
        descripcion: "Piano de gran cola de concierto con acabado negro pulido, resonancia profunda y respuesta dinámica excepcional.",
        precio: 24990000,
        imagen: "/Img/Sonido_Vivo/Yamaha C7X PE - Piano Acustico de Cola.jpg",
        categoria: "Piano",
        subcategoria: "Cordófono (de cuerda percutida)",
    },

    // BATERÍAS
    {
        id: 8,
        titulo: "Batería acústica Mapex Serie Venus VE5295FTVM - Crimson Red Sparkle",
        descripcion: "Set completo de 5 piezas con cascos de álamo, bordes SONIClear y acabado rojo brillante con platillos incluidos.",
        precio: 699990,
        imagen: "/Img/Sonido_Vivo/Batería acústica Mapex Serie Venus VE5295FTVM - Crimson Red Sparkle.jpg",
        categoria: "Baterias",
        subcategoria: "Membranófonos (parche tensado)",
    },
    {
        id: 9,
        titulo: "Batería acústica TAMA Stagestar ST52H5 5 piezas - Sea Blue Mist",
        descripcion: "Batería completa de 5 cuerpos con herrajes de doble perfil, soporte de tom Omnisphere y platillos de bronce.",
        precio: 749990,
        imagen: "/Img/Sonido_Vivo/Batería acústica TAMA Stagestar ST52H5 5 piezas - Sea Blue Mist.jpg",
        categoria: "Baterias",
        subcategoria: "Membranófonos (parche tensado)",
    },
    {
        id: 10,
        titulo: "Set de batería acústica PowerDrums CPJ-5 FKR - Red",
        descripcion: "Batería acústica de 5 piezas ideal para iniciación y ensayo, incluye atriles, pedal de bombo, sillín y platillos.",
        precio: 429990,
        imagen: "/Img/Sonido_Vivo/Set de batería acústica PowerDrums CPJ-5 FKR - Red.jpg",
        categoria: "Baterias",
        subcategoria: "Membranófonos (parche tensado)",
    },

    // BAJOS (Nuevos)
    {
        id: 11,
        titulo: "Bajo Eléctrico Jazz Bass Fender",
        descripcion: "Bajo eléctrico Fender Jazz Standard MIM, fabricado en México, recién calibrado y en excelente estado.",
        precio: 750000,
        imagen: "/Img/Sonido_Vivo/Bajo_Electrico_Jazz_Bass_Fender.jpg",
        categoria: "Bajos",
        subcategoria: "Cordófono (de cuerda pulsada)",
    },
    {
        id: 12,
        titulo: "Bajo Eléctrico Ibanez GSR-320",
        descripcion: "Bajo ligero y cómodo de serie GIO con mástil delgado de arce y cápsulas dinámicas versátiles para cualquier estilo.",
        precio: 289990,
        imagen: "/Img/Sonido_Vivo/Bajo Electrico Ibanez GSR-320.jpg",
        categoria: "Bajos",
        subcategoria: "Cordófono (de cuerda pulsada)",
    },
    {
        id: 13,
        titulo: "Bajo Eléctrico Peavey Forum",
        descripcion: "Bajo eléctrico de fabricación sólida con electrónica activa/pasiva y gran pegada en frecuencias graves.",
        precio: 399990,
        imagen: "/Img/Sonido_Vivo/Bajo Electrico Peavey Forum.jpg",
        categoria: "Bajos",
        subcategoria: "Cordófono (de cuerda pulsada)",
    },
    {
        id: 14,
        titulo: "Bajo Eléctrico Sterling by Music Man StingRay 5 Black",
        descripcion: "Bajo de 5 cuerdas con cápsula humbucker cerámica de alta salida y preamplificador activo de 2 bandas.",
        precio: 549990,
        imagen: "/Img/Sonido_Vivo/Bajo Electrico Sterling by Music Man StingRay 5 Black.jpg",
        categoria: "Bajos",
        subcategoria: "Cordófono (de cuerda pulsada)",
    },
    {
        id: 15,
        titulo: "Bajo Eléctrico Sterling by Music Man StingRay 5 Mint Green (MG)",
        descripcion: "Edición en acabado Mint Green de 5 cuerdas con diapasón de arce y el clásico sonido punchy de StingRay.",
        precio: 559990,
        imagen: "/Img/Sonido_Vivo/Bajo Electrico Sterling by Music Man StingRay 5 Mint Green (MG).jpg",
        categoria: "Bajos",
        subcategoria: "Cordófono (de cuerda pulsada)",
    },

    // GUITARRAS (Nuevas)
    {
        id: 16,
        titulo: "Guitarra Eléctrica Stratocaster - Squier",
        descripcion: "Guitarra eléctrica clásica con cuerpo contorneado, tres cápsulas single-coil y puente trémolo sincronizado.",
        precio: 249990,
        imagen: "/Img/Sonido_Vivo/Guitarra Eléctrica Stratocaster - Squier.jpg",
        categoria: "Guitarras",
        subcategoria: "Cordófono (de cuerda pulsada)",
    },
    {
        id: 17,
        titulo: "Guitarra Eléctrica Epiphone Les Paul Standard",
        descripcion: "Cuerpo de caoba con tapa de arce, equipada con humbuckers ProBucker para un tono cálido y sustain prolongado.",
        precio: 649990,
        imagen: "/Img/Sonido_Vivo/Guitarra Electrico Epiphone Les Paul Standard.jpg",
        categoria: "Guitarras",
        subcategoria: "Cordófono (de cuerda pulsada)",
    },
    {
        id: 18,
        titulo: "Guitarra Eléctrica Squier Stratocaster SSS Affinity",
        descripcion: "Modelo Affinity ligero con mástil perfil en C y configuración SSS ideal para tonos limpios y rock clásico.",
        precio: 299990,
        imagen: "/Img/Sonido_Vivo/Guitarra Electrico Squier Stratocaster SSS Affinity.jpg",
        categoria: "Guitarras",
        subcategoria: "Cordófono (de cuerda pulsada)",
    },
    {
        id: 19,
        titulo: "Guitarra Eléctrica Squier Telecaster Classic Vibe 50s",
        descripcion: "Homenaje a los modelos de los años 50 con cápsulas Alnico diseñadas por Fender y puente estilo vintage.",
        precio: 489990,
        imagen: "/Img/Sonido_Vivo/Guitarra Electrico Squier Telecaster Classic Vibe 50s.jpg",
        categoria: "Guitarras",
        subcategoria: "Cordófono (de cuerda pulsada)",
    },

    // VIENTOS METAL (Nuevo)
    {
        id: 20,
        titulo: "Trombón Tenor King Cleveland",
        descripcion: "Trombón tenor de vara suave con campana de latón lacado, proyección brillante y estuche rígido incluido.",
        precio: 459990,
        imagen: "/Img/Sonido_Vivo/Trombon Tenor King Cleveland.jpg",
        categoria: "Vientos Metal",
        subcategoria: "Aerófono (de viento metal)",
    },
];

export const categorias = [
    "Todos",
    "Teclados",
    "Flautas",
    "Piano",
    "Baterias",
    "Guitarras",
    "Bajos",
    "Vientos Metal",
] as const;

export const subcategorias = [
    "Todos",
    "Electrófono (electrónico / sintetizador)",
    "Aerófono (de viento)",
    "Aerófono (de viento metal)",
    "Cordófono (de cuerda percutida)",
    "Cordófono (de cuerda pulsada)",
    "Membranófonos (parche tensado)",
    "Idiófonos (cuerpo del instrumento)",
] as const;