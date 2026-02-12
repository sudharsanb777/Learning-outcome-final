import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = ({ role }) => {
    return (
        <div className="layout-container" style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>
            <Sidebar role={role} />
            <div className="content-wrapper" style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
                <Navbar role={role} />
                <main className="content-area" style={{ flex: 1, padding: 'var(--spacing-lg)', overflowY: 'auto', backgroundColor: 'var(--bg-body)' }}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
