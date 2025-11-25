import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../molecules/navigation/NavBar';

const MainLayout = () => {
    return (
        <div className="main-layout">
            <Navbar />
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;