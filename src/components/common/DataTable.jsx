import React from 'react';

const DataTable = ({ columns, data, actions }) => {
    return (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ backgroundColor: 'var(--bg-body)', borderBottom: '1px solid var(--border-color)' }}>
                            {columns.map((col) => (
                                <th key={col.key} style={{ padding: 'var(--spacing-md)', fontWeight: 600, color: 'var(--text-muted)' }}>
                                    {col.header}
                                </th>
                            ))}
                            {actions && <th style={{ padding: 'var(--spacing-md)' }}>Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            data.map((row, index) => (
                                <tr key={index} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                    {columns.map((col) => (
                                        <td key={col.key} style={{ padding: 'var(--spacing-md)', color: 'var(--text-main)' }}>
                                            {col.render ? col.render(row[col.key], row) : row[col.key]}
                                        </td>
                                    ))}
                                    {actions && (
                                        <td style={{ padding: 'var(--spacing-md)' }}>
                                            {actions(row)}
                                        </td>
                                    )}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length + (actions ? 1 : 0)} style={{ padding: 'var(--spacing-lg)', textAlign: 'center', color: 'var(--text-muted)' }}>
                                    No data available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DataTable;
