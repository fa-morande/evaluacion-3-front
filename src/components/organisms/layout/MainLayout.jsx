import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../../molecules/navigation/NavBar';
import Footer from './Footer';

// Recibimos 'carrito' para pasárselo al NavBar
const MainLayout = ({ carrito }) => {
    return (
        <div className="main-layout">
            <NavBar carrito={carrito} />
            
            <main style={{ minHeight: '80vh' }}>
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};

export default MainLayout;