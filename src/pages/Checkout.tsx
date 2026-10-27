import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { CuponDescuento } from '../components/CuponDescuento';
import { Envio } from '../components/Envio';
import { Comprobante } from '../components/Comprobante';
import type { DatosEnvio, ComprobanteData } from '../types';

export const Checkout: React.FC = () => {
  const { cart, subtotal, descuentoMonto, total, actualizarCantidad, eliminarDelCarrito, vaciarCarrito } = useCart();
  const [datosEnvio, setDatosEnvio] = useState<DatosEnvio | null>(null);
  const [comprobante, setComprobante] = useState<ComprobanteData | null>(null);

  const handleGuardarEnvio = (datos: DatosEnvio) => {
    setDatosEnvio(datos);
  };

  const handleFinalizarCompra = () => {
    if (!datosEnvio || cart.length === 0) return;

    const nuevoComprobante: ComprobanteData = {
      idOrden: Math.floor(100000 + Math.random() * 900000).toString(),
      fecha: new Date().toLocaleDateString('es-CL'),
      items: [...cart],
      subtotal,
      descuento: descuentoMonto,
      costoEnvio: datosEnvio.costoEnvio,
      total: total + datosEnvio.costoEnvio,
      datosEnvio,
    };

    setComprobante(nuevoComprobante);
    vaciarCarrito();
  };

  if (comprobante) {
    return (
      <div className="container py-4">
        <Comprobante data={comprobante} />
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Resumen de Compra y Checkout</h2>
      {cart.length === 0 ? (
        <div className="alert alert-info">El carrito está vacío.</div>
      ) : (
        <div className="row g-4">
          <div className="col-lg-7">
            <h4>Carrito de Compras</h4>
            <div className="list-group mb-4">
              {cart.map((item) => (
                <div key={item.producto.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-0">{item.producto.nombre}</h6>
                    <small className="text-muted">${item.producto.precio.toLocaleString()} c/u</small>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      className="form-control form-control-sm w-auto"
                      style={{ width: '60px' }}
                      value={item.cantidad}
                      onChange={(e) => actualizarCantidad(item.producto.id, parseInt(e.target.value) || 1)}
                    />
                    <button className="btn btn-sm btn-outline-danger" onClick={() => eliminarDelCarrito(item.producto.id)}>
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <Envio onGuardarEnvio={handleGuardarEnvio} />
          </div>

          <div className="col-lg-5">
            <CuponDescuento />
            <div className="card p-3 shadow-sm">
              <h5 className="mb-3">Resumen de Pago</h5>
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              {descuentoMonto > 0 && (
                <div className="d-flex justify-content-between mb-2 text-success">
                  <span>Descuento:</span>
                  <span>-${descuentoMonto.toLocaleString()}</span>
                </div>
              )}
              {datosEnvio && (
                <div className="d-flex justify-content-between mb-2">
                  <span>Envío ({datosEnvio.metodoEnvio}):</span>
                  <span>${datosEnvio.costoEnvio.toLocaleString()}</span>
                </div>
              )}
              <hr />
              <div className="d-flex justify-content-between fw-bold fs-5 mb-3">
                <span>Total Estimado:</span>
                <span>${(total + (datosEnvio?.costoEnvio || 0)).toLocaleString()}</span>
              </div>
              <button
                className="btn btn-success w-100"
                disabled={!datosEnvio}
                onClick={handleFinalizarCompra}
              >
                Pagar y Generar Comprobante
              </button>
              {!datosEnvio && (
                <small className="text-muted mt-2 d-block text-center">
                  Completa los datos de envío para finalizar.
                </small>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};