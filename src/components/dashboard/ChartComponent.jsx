import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ChartComponent = ({ data, xKey, dataKey, title, color }) => {
    return (
        <div className="card" style={{ height: '400px', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ marginBottom: 'var(--spacing-md)' }}>{title}</h3>
            <div style={{ flex: 1, width: '100%', minHeight: 0 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey={xKey} />
                        <YAxis />
                        <Tooltip
                            contentStyle={{ backgroundColor: 'var(--bg-card)', borderRadius: '8px', border: '1px solid var(--border-color)' }}
                            itemStyle={{ color: 'var(--text-main)' }}
                        />
                        <Legend />
                        <Bar dataKey={dataKey} fill={color || 'var(--primary-color)'} radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ChartComponent;
