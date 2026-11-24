import { createContext, useContext, useState, type ReactNode } from "react";

export interface UsuarioSesion {
    token: string;
    email: string;
    nombre: string;
    rol: string;
}

interface AuthContextType {
    usuario: UsuarioSesion | null;
    iniciarSesion: (data: Record<string, unknown>, emailFallback: string) => void;
    cerrarSesion: () => void;
    esAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function extraerDatosToken(token: string): { sub?: string; rol?: string; nombre?: string } {
    try {
        const payloadBase64 = token.split(".")[1];
        const jsonPayload = atob(payloadBase64.replace(/-/g, "+").replace(/_/g, "/"));
        return JSON.parse(jsonPayload);
    } catch {
        return {};
    }
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [usuario, setUsuario] = useState<UsuarioSesion | null>(() => {
        const guardado = localStorage.getItem("auth_sonido_vivo");
        return guardado ? JSON.parse(guardado) : null;
    });

    const iniciarSesion = (data: Record<string, unknown>, emailFallback: string) => {
        const token = String(data.token || "");
        const claims = token ? extraerDatosToken(token) : {};

        const sesion: UsuarioSesion = {
            token,
            email: String(data.email || claims.sub || emailFallback),
            nombre: String(data.nombre || claims.nombre || emailFallback.split("@")[0]),
            rol: String(data.rol || claims.rol || "CLIENTE"),
        };

        setUsuario(sesion);
        localStorage.setItem("auth_sonido_vivo", JSON.stringify(sesion));
    };

    const cerrarSesion = () => {
        setUsuario(null);
        localStorage.removeItem("auth_sonido_vivo");
    };

    const esAdmin = usuario?.rol?.includes("ADMIN") ?? false;

    return (
        <AuthContext.Provider value={{ usuario, iniciarSesion, cerrarSesion, esAdmin }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe usarse dentro de un AuthProvider");
    }
    return context;
}