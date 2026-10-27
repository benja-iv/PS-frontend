import React from 'react';
import type { ComprobanteData } from '../types';

interface ComprobanteProps {
  data: ComprobanteData;
}

export const Comprobante: React.FC<ComprobanteProps> = ({ data }) => {
  return (
    <div className="card p-4 shadow-sm border">
      <div className="d-flex justify-content-between border-bottom pb-3 mb-3">
        <div>
          <h4>Comprobante de Pago</h4>
          <span className="text-muted">Orden #{data.idOrden}</span>
        </div>
        <div className="text-end">
          <small className="text-muted">Fecha: {data.fecha}</small>
        </div>
      </div>

      <div className="mb-3">
        <h6>Datos de Despacho</h6>
        <p className="mb-1"><strong>Destinatario:</strong> {data.datosEnvio.nombreCompleto}</p>
        <p className="mb-1"><strong>Dirección:</strong> {data.datosEnvio.direccion}, {data.datosEnvio.ciudad}</p>
        <p className="mb-0"><strong>CP:</strong> {data.datosEnvio.codigoPostal}</p>
      </div>

      <h6>Resumen de Productos</h6>
      <table className="table border-top">
        <thead>
          <tr>
            <th>Producto</th>
            <th className="text-center">Cant.</th>
            <th className="text-end">Precio</th>
            <th className="text-end">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item) => (
            <tr key={item.producto.id}>
              <td>{item.producto.nombre}</td>
              <td className="text-center">{item.cantidad}</td>
              <td className="text-end">${item.producto.precio.toLocaleString()}</td>
              <td className="text-end">${(item.producto.precio * item.cantidad).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="row justify-content-end">
        <div className="col-md-5">
          <div className="d-flex justify-content-between">
            <span>Subtotal:</span>
            <span>${data.subtotal.toLocaleString()}</span>
          </div>
          {data.descuento > 0 && (
            <div className="d-flex justify-content-between text-success">
              <span>Descuento:</span>
              <span>-${data.descuento.toLocaleString()}</span>
            </div>
          )}
          <div className="d-flex justify-content-between">
            <span>Envío:</span>
            <span>${data.costoEnvio.toLocaleString()}</span>
          </div>
          <hr />
          <div className="d-flex justify-content-between fw-bold h5">
            <span>Total Pagado:</span>
            <span>${data.total.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};