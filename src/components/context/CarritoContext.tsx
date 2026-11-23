import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export interface ProductoCarrito {
    id: number;
    titulo: string;
    descripcion: string;
    precio: number;
    imagen: string;
    categoria: string;
    subcategoria?: string;
}

export interface ItemCarrito extends ProductoCarrito {
    cantidad: number;
}

interface CarritoContextType {
    carrito: ItemCarrito[];
    agregarAlCarrito: (producto: ProductoCarrito) => void;
    eliminarDelCarrito: (id: number) => void;
    actualizarCantidad: (id: number, cantidad: number) => void;
    vaciarCarrito: () => void;
    totalItems: number;
    montoTotal: number;
    notificacion: string | null;
}

const CarritoContext = createContext<CarritoContextType | undefined>(undefined);

export function CarritoProvider({ children }: { children: ReactNode }) {
    const [carrito, setCarrito] = useState<ItemCarrito[]>(() => {
        const guardado = localStorage.getItem("carrito_sonido_vivo");
        return guardado ? JSON.parse(guardado) : [];
    });

    const [notificacion, setNotificacion] = useState<string | null>(null);

    useEffect(() => {
        localStorage.setItem("carrito_sonido_vivo", JSON.stringify(carrito));
    }, [carrito]);

    const agregarAlCarrito = (producto: ProductoCarrito) => {
        setCarrito((prev) => {
            const existe = prev.find((item) => item.id === producto.id);
            if (existe) {
                return prev.map((item) =>
                    item.id === producto.id
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                );
            }
            return [...prev, { ...producto, cantidad: 1 }];
        });

        setNotificacion(`¡"${producto.titulo}" agregado al carrito!`);
        setTimeout(() => {
            setNotificacion(null);
        }, 3000);
    };

    const eliminarDelCarrito = (id: number) => {
        setCarrito((prev) => prev.filter((item) => item.id !== id));
    };

    const actualizarCantidad = (id: number, cantidad: number) => {
        if (cantidad <= 0) {
            eliminarDelCarrito(id);
            return;
        }
        setCarrito((prev) =>
            prev.map((item) => (item.id === id ? { ...item, cantidad } : item))
        );
    };

    const vaciarCarrito = () => setCarrito([]);

    const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    const montoTotal = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

    return (
        <CarritoContext.Provider
            value={{
                carrito,
                agregarAlCarrito,
                eliminarDelCarrito,
                actualizarCantidad,
                vaciarCarrito,
                totalItems,
                montoTotal,
                notificacion,
            }}
        >
            {children}

            {/* Notificación flotante cuando se agrega un producto */}
            {notificacion && (
                <div
                    className="position-fixed bottom-0 end-0 m-4 p-3 anime-glass-card shadow-lg"
                    style={{ zIndex: 1055, maxWidth: "360px", borderColor: "#ff6b8b" }}
                    role="alert"
                >
                    <div className="d-flex align-items-center gap-2">
                        <span className="badge bg-success rounded-pill">✓</span>
                        <span className="fw-semibold small">{notificacion}</span>
                    </div>
                </div>
            )}
        </CarritoContext.Provider>
    );
}

export function useCarrito() {
    const context = useContext(CarritoContext);
    if (!context) {
        throw new Error("useCarrito debe usarse dentro de un CarritoProvider");
    }
    return context;
}