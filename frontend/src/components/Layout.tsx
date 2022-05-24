import React from 'react';
import { Outlet } from "react-router-dom";

function Layout() {
    return (
        <div className='app'>
            <h1>Geo Tracking</h1>
            <Outlet />
        </div>
    );
}

export default Layout;