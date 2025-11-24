import React, { useEffect, useState } from 'react';
// CORRECCIÓN CRÍTICA: Importamos desde el mismo directorio, igual que en ProductosAdmin
import AdminTable from '../../components/organisms/AdminTable'; 
import { adminService } from '../../services/api/adminService';
import '../../styles/components/admin/AdminGlobal.css';

const UsuariosAdmin = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const columns = [
        { 
            header: 'Usuario', 
            accessor: 'nombre',
            render: (row) => (
                <div>
                    <strong>{row.nombre || row.name || 'Sin Nombre'}</strong>
                    <div style={{fontSize: '0.8rem', color: '#888'}}>
                        ID: {row.id || row._id}
                    </div>
                </div>
            )
        },
        { 
            header: 'Email', 
            accessor: 'email' 
        },
        { 
            header: 'Rol', 
            accessor: 'role',
            render: (row) => {
                const role = row.role || row.rol || 'user';
                // Convertimos a string por seguridad antes de usar toLowerCase
                const roleStr = String(role); 
                const isAdmin = roleStr.toLowerCase().includes('admin');
                
                return (
                    <span className={`badge ${isAdmin ? 'badge-primary' : 'badge-info'}`}>
                        {roleStr.toUpperCase()}
                    </span>
                );
            }
        }
    ];

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        setLoading(true);
        try {
            const data = await adminService.usuarios.getAll();
            
            // Lógica robusta para encontrar el array venga como venga
            let rawUsers = [];
            if (Array.isArray(data)) rawUsers = data;
            else if (data && Array.isArray(data.users)) rawUsers = data.users;
            else if (data && Array.isArray(data.data)) rawUsers = data.data;

            const normalizedData = rawUsers.map(u => ({
                ...u,
                id: u.id || u._id,       
                nombre: u.nombre || u.name 
            }));

            setUsers(normalizedData);
        } catch (err) {
            console.error("Error cargando usuarios:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Eliminar usuario?')) {
            try {
                await adminService.usuarios.delete(id);
                setUsers(prev => prev.filter(u => u.id !== id));
            } catch (err) {
                alert('Error al eliminar');
            }
        }
    };

    if (loading) return <div className="admin-loading">Cargando usuarios...</div>;

    return (
        <div className="admin-page">
            <div className="admin-section-header">
                <div>
                    <h1>Gestión de Usuarios</h1>
                    <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
                        Total registros: {users.length}
                    </p>
                </div>
            </div>
            <AdminTable 
                columns={columns} 
                data={users} 
                onDelete={handleDelete}
            />
        </div>
    );
};

export default UsuariosAdmin;