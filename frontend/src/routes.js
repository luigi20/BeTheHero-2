import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';

export default function RoutesApp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Logon />} />
                <Route path="/register" exact element={<Register />} />
            </Routes>
        </BrowserRouter>
    );
}