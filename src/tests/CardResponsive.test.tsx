// @vitest-environment jsdom
import { test, expect } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// Importa los componentes que deben tener diseño responsivo
import Form from "../components/organism/Form";
import CardProducto from "../components/molecules/CardProducto";
import Contacto from "../pages/Contacto";
import Productos from "../pages/Productos";

// Definimos la lista de componentes a evaluar y cómo encontrar su contenedor responsivo
const componentesAEvaluar = [
    {
        nombre: "Formulario de Contacto",
        componente: (
            <MemoryRouter>
                <Form />
            </MemoryRouter>
        ),
        // Busca la etiqueta form
        obtenerElemento: (contenedor: HTMLElement) => contenedor.querySelector("form"),
    },
    {
        nombre: "Tarjeta de Producto (CardProducto)",
        componente: (
            <MemoryRouter>
                <CardProducto
                    id={1}
                    titulo="Prueba"
                    descripcion="Demo"
                    precio={100}
                    imagen="/Img/pompompurin.jpg"
                />
            </MemoryRouter>
        ),
        // Busca el primer elemento con la clase .card
        obtenerElemento: (contenedor: HTMLElement) => contenedor.querySelector(".card"),
    },
    {
        nombre: "Página de Contacto",
        componente: (
            <MemoryRouter>
                <Contacto />
            </MemoryRouter>
        ),
        // Busca cualquier elemento dentro que defina el layout de columnas
        obtenerElemento: (contenedor: HTMLElement) => 
            contenedor.querySelector("[class*='col-']"),
    },
    {
        nombre: "Página de Productos",
        componente: (
            <MemoryRouter>
                <Productos />
            </MemoryRouter>
        ),
        obtenerElemento: (contenedor: HTMLElement) => 
            contenedor.querySelector("[class*='col-']"),
    },
];

// Evaluamos cada componente de la lista
test.each(componentesAEvaluar)(
    "Verificar que $nombre implemente la cuadrícula responsiva (col-12, col-md-8, col-lg-6)",
    ({ componente, obtenerElemento }) => {
        const { container } = render(componente);
        const elemento = obtenerElemento(container);

        // 1. Debe existir el elemento evaluado
        expect(elemento, "No se encontró el elemento contenedor en el DOM").not.toBeNull();

        // 2. Debe contener las clases responsivas de Bootstrap
        expect(elemento?.classList.contains("col-12"), "Falta la clase para móviles (col-12)").toBe(true);
        expect(elemento?.classList.contains("col-md-8"), "Falta la clase para tablets (col-md-8)").toBe(true);
        expect(elemento?.classList.contains("col-lg-6"), "Falta la clase para escritorio (col-lg-6)").toBe(true);
    }
);