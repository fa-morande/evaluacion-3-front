import React from 'react';
import Button from '../atoms/Button';
import '../../styles/components/admin/AdminGlobal.css'; // Usamos los estilos globales

const AdminTable = ({ columns, data, onEdit, onDelete }) => {
    
    // Si no hay datos, mostramos un mensaje amigable
    if (!data || data.length === 0) {
        return <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>No hay datos para mostrar.</div>;
    }

    return (
        <div className="table-container">
            <table className="admin-table">
                <thead>
                    <tr>
                        {columns.map((col, index) => (
                            <th key={index}>{col.header}</th>
                        ))}
                        {(onEdit || onDelete) && <th>Acciones</th>}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={row.id || rowIndex}>
                            {columns.map((col, colIndex) => (
                                <td key={`${rowIndex}-${colIndex}`}>
                                    {/* MAGIA AQUÍ: 
                                        Si definimos una función 'render', la usamos (para cosas complejas).
                                        Si no, usamos el 'accessor' para sacar el texto simple.
                                    */}
                                    {col.render 
                                        ? col.render(row) 
                                        : row[col.accessor]
                                    }
                                </td>
                            ))}
                            
                            {(onEdit || onDelete) && (
                                <td>
                                    <div className="table-actions">
                                        {onEdit && (
                                            <Button 
                                                text="Editar" 
                                                onClick={() => onEdit(row)} 
                                                size="small" 
                                                variant="secondary"
                                            />
                                        )}
                                        {onDelete && (
                                            <Button 
                                                text="Borrar" 
                                                onClick={() => onDelete(row.id)} 
                                                size="small" 
                                                variant="secondary"
                                                style={{ color: 'red', borderColor: 'red' }} 
                                            />
                                        )}
                                    </div>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminTable;