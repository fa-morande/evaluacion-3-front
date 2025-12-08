import React, { useEffect, useState } from 'react';
import usuarioService from '../../services/api/usuarios'; // IMPORT CORREGIDO
import AdminTable from '../../components/organisms/AdminTable'; 
import Button from '../../components/atoms/Button'; 
import '../../styles/components/admin/AdminGlobal.css';

const UsuariosAdmin = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        setLoading(true);
        try {
            // Llamada al servicio corregido
            const response = await usuarioService.getUsuarios();
            
            // Axios response.data
            const data = response.data;
            const lista = Array.isArray(data) ? data : (data.usuarios || []);
            
            setUsers(lista);
        } catch (err) {
            console.error("Error cargando usuarios:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
            try {
                await usuarioService.deleteUsuario(id);
                // Actualizamos la tabla visualmente
                setUsers(prev => prev.filter(u => u.id !== id));
                alert("Usuario eliminado correctamente");
            } catch (err) {
                console.error(err);
                alert('Error al eliminar usuario');
            }
        }
    };

    // --- DEFINICIÓN DE COLUMNAS (Sin cambios) ---
    const columns = [
        { 
            header: 'ID', 
            accessor: 'id',
            render: (row) => <span style={{fontFamily:'monospace', fontSize:'0.8rem'}}>#{row.id}</span>
        },
        { 
            header: 'Usuario', 
            accessor: 'nombre',
            render: (row) => (
                <div>
                    <strong>{row.nombre} {row.apellido}</strong>
                </div>
            )
        },
        { 
            header: 'Email', 
            accessor: 'email',
            render: (row) => row.email || row.correo 
        },
        { 
            header: 'Rol', 
            accessor: 'role',
            render: (row) => {
                const role = (row.role || 'USER').toUpperCase();
                
                let style = { background: '#e0f2fe', color: '#075985' }; // Default (User)
                
                if (role === 'ADMIN') {
                    style = { background: '#dcfce7', color: '#166534' }; // Verde (Admin)
                }

                return (
                    <span style={{
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                        ...style
                    }}>
                        {role}
                    </span>
                );
            }
        }
    ];

    return (
        <div className="admin-page">
            <div className="admin-section-header" style={{display:'flex', justifyContent:'space-between'}}>
                <h1>Gestión de Usuarios</h1>
                <Button text="Recargar" onClick={loadUsers} variant="secondary" size="small"/>
            </div>

            <div className="admin-table-wrapper">
                {loading ? <p style={{padding:'2rem'}}>Cargando usuarios...</p> : (
                    <AdminTable 
                        columns={columns} 
                        data={users} 
                        onDelete={handleDelete}
                    />
                )}
            </div>
        </div>
    );
};

export default UsuariosAdmin;