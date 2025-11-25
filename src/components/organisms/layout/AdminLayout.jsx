import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import AdminSidebar from '../../admin/AdminSidebar'; 
import AdminNavbar from '../../admin/AdminNavbar';   
import { useAuth } from '../../../context/AuthContext';

const AdminLayout = () => {
    const { user, isAdmin } = useAuth();

    if (!user || !isAdmin()) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
            <AdminSidebar />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <AdminNavbar />
                <main style={{ padding: '20px', background: '#f1f5f9', flex: 1, overflowY: 'auto' }}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;