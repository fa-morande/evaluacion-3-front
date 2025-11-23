import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/api/adminService';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import Text from '../atoms/Text';
import '../../styles/components/admin/ProductosAdmin.css';

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        if (productoEdit) {
            await adminService.productos.update(productoEdit.id, formData);
        } else {
            await adminService.productos.create(formData);
        }
        await cargarProductos();
        resetForm();
        } catch (error) {
        console.error('Error guardando producto:', error);
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
        categoriaId: producto.categoriaId,
        destacado: producto.destacado,
        activo: producto.activo
        });
        setShowForm(true);
    };

    const resetForm = () => {
        setFormData({
        nombre: '',
        descripcion: '',
        precio: '',
        stock: '',
        categoriaId: '',
        destacado: false,
        activo: true
        });
        setProductoEdit(null);
        setShowForm(false);
    };

    const toggleDestacado = async (id, destacado) => {
        try {
        await adminService.productos.marcarDestacado(id, !destacado);
        await cargarProductos();
        } catch (error) {
        console.error('Error actualizando destacado:', error);
        }
    };

    if (loading) return <div>Cargando productos...</div>;

    return (
        <div className="productos-admin">
        <div className="admin-header">
            <Text variant="h1">Gestión de Productos</Text>
            <Button 
            text="Nuevo Producto" 
            onClick={() => setShowForm(true)}
            variant="primary"
            />
        </div>

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

                <div className="form-actions">
                <Button type="submit" text="Guardar" variant="primary" />
                <Button type="button" text="Cancelar" onClick={resetForm} />
                </div>
            </form>
            </div>
        )}

        <div className="productos-grid">
            {productos.map(producto => (
            <div key={producto.id} className="producto-card">
                <div className="producto-info">
                <Text variant="h4">{producto.nombre}</Text>
                <Text variant="p">{producto.descripcion}</Text>
                <Text variant="p"><strong>Precio:</strong> ${producto.precio}</Text>
                <Text variant="p"><strong>Stock:</strong> {producto.stock}</Text>
                <Text variant="p" className={producto.destacado ? 'destacado' : ''}>
                    {producto.destacado ? '⭐ Destacado' : 'Normal'}
                </Text>
                </div>
                
                <div className="producto-actions">
                <Button 
                    text="Editar" 
                    onClick={() => handleEdit(producto)}
                    size="small"
                />
                <Button 
                    text={producto.destacado ? "Quitar Dest." : "Destacar"}
                    onClick={() => toggleDestacado(producto.id, producto.destacado)}
                    variant={producto.destacado ? "secondary" : "primary"}
                    size="small"
                />
                <Button 
                    text="Eliminar" 
                    onClick={() => handleDelete(producto.id)}
                    variant="secondary"
                    size="small"
                />
                </div>
            </div>
            ))}
        </div>
        </div>
    );
}

export default ProductosAdmin;