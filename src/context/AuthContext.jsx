import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Error parseando usuario", e);
                localStorage.removeItem('user');
            }
        }
        setLoading(false);
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    // CORRECCIÓN: Validación insensible a mayúsculas/minúsculas
    const isAdmin = () => {
        if (!user || !user.role) return false;
        return user.role.toUpperCase() === 'ADMIN';
    };

    const value = { user, login, logout, isAdmin, loading };

    return (
        <AuthContext.Provider value={value}>
            {/* CORRECCIÓN VISUAL: Si está cargando, mostramos algo simple en vez de blanco */}
            {loading ? <div>Cargando...</div> : children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);