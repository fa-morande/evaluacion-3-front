import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const adminUser = JSON.parse(localStorage.getItem('adminUser') || 'null');
    
    // Verificar si el usuario está autenticado y es admin
    if (!adminUser || adminUser.role !== 'ADMIN') {
        return <Navigate to="/admin/login" replace />;
    }
    
    return children;
}

export default ProtectedRoute;