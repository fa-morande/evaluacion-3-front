import React, { useState, useEffect } from 'react';
import productoService from '../../services/api/productos'; // IMPORT CORREGIDO
import AdminTable from '../../components/organisms/AdminTable'; 
import Button from '../../components/atoms/Button';
import '../../styles/components/admin/AdminGlobal.css';

const ProductosAdmin = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precio, setPrecio] = useState("");
    const [stock, setStock] = useState("");
    const [imagenUrl, setImagenUrl] = useState(""); 
    const [categoriaId, setCategoriaId] = useState("");

    useEffect(() => {
        cargarData();
    }, []);

    const cargarData = async () => {
        try {
            // Llamada al servicio
            const response = await productoService.getAllProductos();
            // Data en .data
            setProductos(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = {
                nombre: nombre,
                descripcion: descripcion,
                precio: Number(precio),
                stock: Number(stock),
                imagenUrl: imagenUrl,
                destacado: false,
                activo: true,
                categoria: {
                    id: Number(categoriaId) 
                }
            };

            console.log(" Enviando:", payload);

            // Llamada al servicio
            await productoService.createProducto(payload);

            alert("¡Producto creado correctamente!");
            setShowModal(false);
            
            // Reset
            setNombre(""); setDescripcion(""); setPrecio(""); setStock(""); setImagenUrl(""); setCategoriaId("");
            
            cargarData();

        } catch (error) {
            console.error(error);
            // Manejo de errores de Axios
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                alert("Tu sesión expiró o no tienes permisos. Por favor inicia sesión.");
            } else {
                alert("Error: " + (error.response?.data?.message || error.message));
            }
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("¿Eliminar?")) {
            try {
                // Llamada al servicio
                await productoService.deleteProducto(id);
                setProductos(prev => prev.filter(p => p.id !== id));
            } catch (error) {
                alert("Error al eliminar");
            }
        }
    };

    const columns = [
        { header: 'ID', accessor: 'id' },
        { 
            header: 'Imagen', 
            accessor: 'imagenUrl', 
            render: (row) => row.imagenUrl ? <img src={row.imagenUrl} alt="img" style={{width:40, height:40, objectFit:'cover'}}/> : 'X'
        },
        { header: 'Nombre', accessor: 'nombre' },
        { header: 'Precio', render: (row) => `$${row.precio}` },
        { header: 'Stock', accessor: 'stock' },
        { header: 'Cat', render: (row) => row.categoria?.nombre || row.categoria?.id }
    ];

    return (
        <div className="admin-page">
            <div className="admin-section-header" style={{display:'flex', justifyContent:'space-between'}}>
                <h1>Productos</h1>
                <Button text="+ Nuevo" onClick={() => setShowModal(true)} variant="primary" />
            </div>

            {/* MODAL */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Nuevo Producto</h3>
                        <form onSubmit={handleSubmit} style={{display:'grid', gap:'10px'}}>
                            <input placeholder="Nombre" value={nombre} onChange={e=>setNombre(e.target.value)} required className="input-form"/>
                            <textarea placeholder="Descripción" value={descripcion} onChange={e=>setDescripcion(e.target.value)} required className="input-form"/>
                            
                            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px'}}>
                                <input type="number" placeholder="Precio" value={precio} onChange={e=>setPrecio(e.target.value)} required className="input-form"/>
                                <input type="number" placeholder="Stock" value={stock} onChange={e=>setStock(e.target.value)} required className="input-form"/>
                            </div>

                            <select value={categoriaId} onChange={e=>setCategoriaId(e.target.value)} required className="input-form">
                                <option value="">Categoría...</option>
                                <option value="1">Perros</option>
                                <option value="2">Gatos</option>
                                <option value="3">Accesorios</option>
                            </select>

                            <input 
                                type="text" 
                                placeholder="URL de la imagen (http://...)" 
                                value={imagenUrl} 
                                onChange={e=>setImagenUrl(e.target.value)} 
                                required 
                                className="input-form"
                            />
                            <p style={{fontSize:'0.8rem', color:'#666'}}>
                                Tip: Copia una dirección de imagen de Google o Unsplash.
                            </p>

                            <div style={{display:'flex', gap:'10px', marginTop:'10px'}}>
                                <Button text="Cancelar" onClick={()=>setShowModal(false)} variant="secondary" type="button"/>
                                <Button text="Guardar" type="submit" variant="primary"/>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="admin-table-wrapper">
                {loading ? <p>Cargando...</p> : <AdminTable columns={columns} data={productos} onDelete={handleDelete} />}
            </div>
        </div>
    );
};

export default ProductosAdmin;