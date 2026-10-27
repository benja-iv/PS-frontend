import React, { useState } from 'react';
import type { DatosEnvio } from '../types';

interface EnvioProps {
  onGuardarEnvio: (datos: DatosEnvio) => void;
}

export const Envio: React.FC<EnvioProps> = ({ onGuardarEnvio }) => {
  const [datos, setDatos] = useState<DatosEnvio>({
    nombreCompleto: '',
    direccion: '',
    ciudad: '',
    codigoPostal: '',
    metodoEnvio: 'estandar',
    costoEnvio: 3500,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let costoEnvio = datos.costoEnvio;

    if (name === 'metodoEnvio') {
      costoEnvio = value === 'express' ? 7000 : 3500;
    }

    setDatos((prev) => ({
      ...prev,
      [name]: value,
      costoEnvio,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGuardarEnvio(datos);
  };

  return (
    <form onSubmit={handleSubmit} className="border p-3 rounded bg-white shadow-sm">
      <h5 className="mb-3">Información de Envío</h5>
      <div className="mb-2">
        <label className="form-label">Nombre Completo</label>
        <input
          type="text"
          name="nombreCompleto"
          className="form-control"
          required
          value={datos.nombreCompleto}
          onChange={handleChange}
        />
      </div>
      <div className="mb-2">
        <label className="form-label">Dirección</label>
        <input
          type="text"
          name="direccion"
          className="form-control"
          required
          value={datos.direccion}
          onChange={handleChange}
        />
      </div>
      <div className="row">
        <div className="col-md-6 mb-2">
          <label className="form-label">Ciudad</label>
          <input
            type="text"
            name="ciudad"
            className="form-control"
            required
            value={datos.ciudad}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6 mb-2">
          <label className="form-label">Código Postal</label>
          <input
            type="text"
            name="codigoPostal"
            className="form-control"
            required
            value={datos.codigoPostal}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label">Tipo de Envío</label>
        <select
          name="metodoEnvio"
          className="form-select"
          value={datos.metodoEnvio}
          onChange={handleChange}
        >
          <option value="estandar">Estándar (3-5 días) - $3.500</option>
          <option value="express">Express (24 horas) - $7.000</option>
        </select>
      </div>
      <button type="submit" className="btn btn-success w-100">
        Confirmar Envío
      </button>
    </form>
  );
};