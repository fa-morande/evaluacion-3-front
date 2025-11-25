import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    /*-->Inicializamosel localStorage*/
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

    const isAdmin = () => {
        if (!user) return false;

        const role = user.role || user.usuario?.role;
        
        return role && role.toUpperCase() === "ADMIN";
    };

    return (
        <AuthContext.Provider value={{ user, loginUser, logoutUser, isAdmin }}>
        {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);