import React from 'react'

import { BrowserRouter, Routes, Route } from "react-router-dom";

import LicensePage from './license';
import Main from './main';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LicensePage />} />
                <Route path="/app" element={<Main />} />
            </Routes>
        </BrowserRouter>
    )
}
