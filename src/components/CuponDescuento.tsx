import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import type { Cupon } from '../types';

const CUPONES_VALIDOS: Record<string, number> = {
  DESCUENTO10: 10,
  PROMO20: 20,
  GUITAR15: 15,
};

export const CuponDescuento: React.FC = () => {
  const [codigoInput, setCodigoInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { cupon, aplicarCupon, removerCupon } = useCart();

  const handleAplicar = (e: React.FormEvent) => {
    e.preventDefault();
    const codigoClean = codigoInput.trim().toUpperCase();

    if (CUPONES_VALIDOS[codigoClean]) {
      const nuevoCupon: Cupon = {
        codigo: codigoClean,
        descuentoPorcentaje: CUPONES_VALIDOS[codigoClean],
        activo: true,
      };
      aplicarCupon(nuevoCupon);
      setError(null);
      setCodigoInput('');
    } else {
      setError('El código ingresado no es válido.');
    }
  };

  return (
    <div className="border p-3 rounded bg-light mb-3">
      <h6 className="fw-bold mb-2">Cupón de Descuento</h6>
      {cupon ? (
        <div className="d-flex justify-content-between align-items-center bg-white p-2 border rounded">
          <span>
            Cupón <strong>{cupon.codigo}</strong> ({cupon.descuentoPorcentaje}% OFF)
          </span>
          <button className="btn btn-sm btn-outline-danger" onClick={removerCupon}>
            Remover
          </button>
        </div>
      ) : (
        <form onSubmit={handleAplicar} className="d-flex gap-2">
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Ej: DESCUENTO10"
            value={codigoInput}
            onChange={(e) => setCodigoInput(e.target.value)}
          />
          <button type="submit" className="btn btn-sm btn-primary">
            Aplicar
          </button>
        </form>
      )}
      {error && <small className="text-danger mt-1 d-block">{error}</small>}
    </div>
  );
};