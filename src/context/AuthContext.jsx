import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Inicializamos leyendo el localStorage
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user"); // Usamos 'user' consistente con tu login
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const loginUser = (data) => {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
    };

    const logoutUser = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    // --- CORRECCIÓN AQUÍ ---
    // Convertimos esto en FUNCIÓN para que AdminLayout no se rompa al llamarla isAdmin()
    const isAdmin = () => {
        if (!user) return false;

        // Buscamos el rol en user.role (login directo) o user.usuario.role (login anidado)
        const role = user.role || user.usuario?.role;
        
        // Validamos normalizando a mayúsculas
        return role && role.toUpperCase() === "ADMIN";
    };

    return (
        <AuthContext.Provider value={{ user, loginUser, logoutUser, isAdmin }}>
        {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);