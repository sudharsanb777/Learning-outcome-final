import React from 'react';
import { useLocation } from 'react-router-dom';

const PlaceholderPage = () => {
    const location = useLocation();
    const title = location.pathname.split('/').pop().replace(/-/g, ' ').toUpperCase();

    return (
        <div style={{ textAlign: 'center', padding: 'var(--spacing-xl)' }}>
            <h2>{title || 'Page'} Under Construction</h2>
            <p className="text-muted">The content for {location.pathname} is currently being developed.</p>
        </div>
    );
};

export default PlaceholderPage;
