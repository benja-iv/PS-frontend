// @vitest-environment jsdom
import { test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import Form from "../components/organism/Form";

test("muestra una alerta cuando el nombre esta vacio", () => {
    // Simulamos la funcion alert del navegador
    const alerta = vi.spyOn(window, "alert").mockImplementation(() => {});

    // Mostramos el formulario
    render(<Form />);

    // Simulamos que el usuario presiona Enviar
    fireEvent.click(
        screen.getByRole("button", { name: /enviar mensaje/i })
    );

    // Comprobamos el mensaje de validacion
    expect(alerta).toHaveBeenCalledWith("Debe ingresar su nombre");

    // Restauramos la funcion alert
    alerta.mockRestore();
});