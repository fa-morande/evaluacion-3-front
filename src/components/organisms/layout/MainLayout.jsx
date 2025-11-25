// src/components/organisms/layout/MainLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../molecules/navigation/NavBar'; // <--- Aquí se importa el Navbar que acabamos de hacer

const MainLayout = () => {
    return (
        <div className="main-layout">
            <Navbar />
            <main>
                <Outlet />
            </main>
            {/* Footer aquí si tienes */}
        </div>
    );
};

export default MainLayout;