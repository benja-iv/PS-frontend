// @vitest-environment jsdom
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
import { Contacto } from './Contacto';

expect.extend(matchers);

afterEach(() => {
  cleanup();
});

describe('Página de Contacto (Formulario Controlado)', () => {
  it('debe renderizar los inputs principales del formulario', () => {
    render(<Contacto />);
    expect(screen.getByLabelText(/Nombre completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mensaje/i)).toBeInTheDocument();
  });

  it('debe actualizar el valor del input al escribir', () => {
    render(<Contacto />);
    const nombreInput = screen.getByLabelText(/Nombre completo/i) as HTMLInputElement;
    fireEvent.change(nombreInput, { target: { value: 'Juan Pérez' } });
    expect(nombreInput.value).toBe('Juan Pérez');
  });

  it('debe mostrar el mensaje de confirmación al enviar el formulario correctamente', () => {
    render(<Contacto />);

    fireEvent.change(screen.getByLabelText(/Nombre completo/i), { target: { value: 'Juan Pérez' } });
    fireEvent.change(screen.getByLabelText(/Correo electrónico/i), { target: { value: 'juan@test.com' } });
    fireEvent.change(screen.getByLabelText(/Mensaje/i), { target: { value: 'Hola, quisiera información.' } });

    const botonSubmit = screen.getByRole('button', { name: /Enviar mensaje/i });
    fireEvent.click(botonSubmit);

    expect(screen.getByText(/¡Gracias por contactarnos!/i)).toBeInTheDocument();
  });
});