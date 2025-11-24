import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/api/adminService';
import Button from '../../components/atoms/Button';
import Input from '../../components/atoms/Input';
import Text from '../../components/atoms/Text';
import AdminTable from '../../components/organisms/AdminTable';

import '../../styles/components/admin/AdminGlobal.css';

function ProductosAdmin() {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [productoEdit, setProductoEdit] = useState(null);

    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        stock: '',
        categoriaId: '',
        destacado: false,
        activo: true
    });

    useEffect(() => {
        cargarProductos();
    }, []);

    const cargarProductos = async () => {
        try {
            const data = await adminService.productos.getAll();
            setProductos(data);
        } catch (error) {
            console.error('Error cargando productos:', error);
        } finally {
            setLoading(false);
        }
    };

    // --- LÓGICA DE FORMULARIO (Rellena, no vacía) ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Convertimos a números para que la API no falle
        const productoParaEnviar = {
            ...formData,
            precio: Number(formData.precio),
            stock: Number(formData.stock),
            categoriaId: formData.categoriaId ? Number(formData.categoriaId) : null 
        };

        try {
            if (productoEdit) {
                await adminService.productos.update(productoEdit.id, productoParaEnviar);
                alert("Producto actualizado correctamente");
            } else {
                await adminService.productos.create(productoParaEnviar);
                alert("Producto creado correctamente");
            }
            
            await cargarProductos();
            resetForm();
            
        } catch (error) {
            console.error('Error guardando producto:', error);
            alert("Error al guardar: " + (error.response?.data?.message || error.message));
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este producto?')) {
            try {
                await adminService.productos.delete(id);
                await cargarProductos();
            } catch (error) {
                console.error('Error eliminando producto:', error);
            }
        }
    };

    const handleEdit = (producto) => {
        setProductoEdit(producto);
        setFormData({
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            precio: producto.precio,
            stock: producto.stock,
            categoriaId: producto.categoriaId || '',
            destacado: producto.destacado,
            activo: producto.activo
        });
        setShowForm(true);
    };

    const resetForm = () => {
        setFormData({
            nombre: '', descripcion: '', precio: '', stock: '', 
            categoriaId: '', destacado: false, activo: true
        });
        setProductoEdit(null);
        setShowForm(false);
    };

    // --- DEFINICIÓN DE COLUMNAS (Corrección de Pantalla Blanca) ---
    const columns = [
        { 
            header: 'Producto', 
            accessor: 'nombre',
            render: (row) => (
                <div>
                    <strong>{row.nombre}</strong>
                    <div style={{fontSize: '0.8rem', color: '#888'}}>ID: {row.id}</div>
                </div>
            )
        },
        { 
            header: 'Categoría', 
            // CLAVE: Verificamos si es objeto o texto para evitar el error de React
            render: (row) => row.categoria?.nombre || row.categoria || 'Sin Categoría'
        },
        { 
            header: 'Precio', 
            render: (row) => `$${row.precio}`
        },
        { 
            header: 'Stock', 
            render: (row) => (
                <span className={row.stock < 5 ? 'badge badge-danger' : 'badge badge-info'}>
                    {row.stock} un.
                </span>
            )
        },
        { 
            header: 'Estado', 
            render: (row) => (
                <>
                    <span className={`badge ${row.activo ? 'badge-success' : 'badge-danger'}`}>
                        {row.activo ? 'Activo' : 'Inactivo'}
                    </span>
                    {row.destacado && <span className="badge badge-warning" style={{marginLeft:'5px'}}>⭐</span>}
                </>
            )
        }
    ];

    if (loading) return <div>Cargando productos...</div>;

    return (
        <div className="admin-page">
            <div className="admin-section-header">
                <div>
                    <h1>Inventario de Productos</h1>
                    <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Gestiona tu catálogo completo</p>
                </div>
                <Button 
                    text="+ Nuevo Producto" 
                    onClick={() => setShowForm(true)}
                    variant="primary"
                />
            </div>

            {/* --- FORMULARIO MODAL COMPLETO --- */}
            {showForm && (
                <div className="form-modal">
                    <form onSubmit={handleSubmit} className="producto-form">
                        <Text variant="h3">
                            {productoEdit ? 'Editar Producto' : 'Nuevo Producto'}
                        </Text>
                        
                        <Input
                            placeholder="Nombre del producto"
                            value={formData.nombre}
                            onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                            required
                        />
                        
                        <Input
                            placeholder="Descripción"
                            value={formData.descripcion}
                            onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                            required
                        />
                        
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <Input
                                type="number"
                                placeholder="Precio"
                                value={formData.precio}
                                onChange={(e) => setFormData({...formData, precio: e.target.value})}
                                required
                            />
                            <Input
                                type="number"
                                placeholder="Stock"
                                value={formData.stock}
                                onChange={(e) => setFormData({...formData, stock: e.target.value})}
                                required
                            />
                        </div>

                        {/* SELECTOR DE CATEGORÍA CORRECTAMENTE UBICADO */}
                        <select
                            className="input-select"
                            value={formData.categoriaId}
                            onChange={(e) => setFormData({...formData, categoriaId: e.target.value})}
                            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                            required
                        >
                            <option value="">Selecciona una categoría</option>
                            {/* Ajusta estos valores según tus IDs reales de categoría */}
                            <option value="1">Perros</option>
                            <option value="2">Gatos</option>
                            <option value="3">Accesorios</option>
                            <option value="4">Alimentos</option>
                        </select>

                        <div className="form-actions">
                            <Button type="button" text="Cancelar" onClick={resetForm} variant="secondary"/>
                            <Button type="submit" text="Guardar" variant="primary" />
                        </div>
                    </form>
                </div>
            )}

            {/* --- TABLA DE DATOS MODULAR --- */}
            <AdminTable 
                columns={columns} 
                data={productos} 
                onEdit={handleEdit} 
                onDelete={handleDelete} 
            />
        </div>
    );
}

export default ProductosAdmin;