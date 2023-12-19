import React, {useContext} from 'react';
import { AuthContext } from './contexts/authContexts.tsx';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './components/login.js';

const Routers = () => {
    const {isAuthenticated, isLoading} = useContext(AuthContext);
    console.log(isAuthenticated);

    if(isLoading) {
        return <div>Loading...</div>
    }

    if(!isAuthenticated) {
        return (
            <Routes>
                <Route path="/login" element={<Login/>} />
                <Route path="*" element={<Navigate replace to="/login" />} />
            </Routes>
        )
    }

    return (
        <Routes>
            <Route path="/home" element={<Login/>} />
            <Route path="*" element={<Navigate replace to="/home" />} />
        </Routes> 
    )
}

export default Routers;