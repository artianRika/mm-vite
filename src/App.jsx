import React from 'react';
import MiniDrawerLayout from './SideDrawer/MiniDrawerLayout.jsx';
import {LogInPage} from './Auth/LogInPage.jsx'
import {Routes, Route, Navigate} from "react-router-dom";
import {AuthLayout} from "@/Auth/AuthLayout.jsx";
import {RegisterPage} from "@/Auth/RegisterPage.jsx";

function App() {


    return (
            <Routes>
                <Route path={'/auth'} element={<AuthLayout/>}>
                    <Route index element={<Navigate to="login" replace />} />

                    <Route path={'login'} element={<LogInPage/>} />
                    <Route path={'register'} element={<RegisterPage/>} />
                </Route>

                <Route path={'/'} element={<MiniDrawerLayout />} />

            </Routes>
    );
}

export default App;
