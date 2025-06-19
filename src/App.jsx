import React, {useContext} from 'react';
import MiniDrawerLayout from './SideDrawer/MiniDrawerLayout.jsx';
import {LogInPage} from './Auth/LogInPage.jsx'
import {Navigate, Route, Routes} from "react-router-dom";
import {AuthLayout} from "@/Auth/AuthLayout.jsx";
import {RegisterPage} from "@/Auth/RegisterPage.jsx";
import {UserContext} from "./Context/UserContext.jsx";
import MainView from "@/Components/MainView.jsx";

function App() {
    const { isLoggedIn, loading } = useContext(UserContext);

    if (loading) return null;

    return (
        <Routes>
            <Route path="/auth" element={<AuthLayout />}>
                <Route index element={<Navigate to="login" replace />} />
                <Route path="login" element={isLoggedIn() ? <Navigate to="/" /> : <LogInPage />} />
                <Route path="register" element={isLoggedIn() ? <Navigate to="/" /> : <RegisterPage />} />
            </Route>


            <Route path="/" element={!isLoggedIn() ? <Navigate to="/auth/login" /> : <MiniDrawerLayout />} >
                <Route path=":id" element={<MainView/>}/>
            </Route>
        </Routes>
    );
}


export default App;
