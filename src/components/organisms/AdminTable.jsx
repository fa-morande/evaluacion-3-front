import React from 'react';
import Button from '../atoms/Button';
import '../../styles/components/admin/AdminGlobal.css';

const AdminTable = ({ columns, data, onDelete }) => {
    if (!data || data.length === 0) {
        return <div className="empty-state">No hay datos.</div>;
    }

    return (
        <div className="table-container">
            <table className="admin-table">
                <thead>
                    <tr>
                        {columns.map((col, index) => (
                            <th key={index}>{col.header}</th>
                        ))}
                        {onDelete && <th>Acciones</th>}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => {
                        const uniqueKey = row.id ? `prod-${row.id}` : `row-${rowIndex}`;
                        
                        return (
                            <tr key={uniqueKey}>
                                {columns.map((col, colIndex) => (
                                    <td key={`${uniqueKey}-col-${colIndex}`}>
                                        {col.render ? col.render(row) : row[col.accessor]}
                                    </td>
                                ))}
                                {onDelete && (
                                    <td>
                                        <button 
                                            className="btn-delete-icon" 
                                            onClick={() => onDelete(row.id)}
                                        >
                                            🗑️
                                        </button>
                                    </td>
                                )}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default AdminTable;