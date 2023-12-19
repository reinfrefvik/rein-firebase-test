import React, {useContext} from 'react';
import { AuthContext } from './contexts/authContexts';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/homePage';

const Routers = () => {
    const {isLoading, user} = useContext(AuthContext);
    console.log(user);

    if(isLoading) {
        return <div>Loading...</div>
    }

    if(!user) {
        return (
            <Routes>
                <Route path="/login" element={<HomePage/>} />
                <Route path="*" element={<Navigate replace to="/login" />} />
            </Routes>
        )
    }

    return (
        <Routes>
            <Route path="/home" element={<HomePage/>} />
            <Route path="*" element={<Navigate replace to="/home" />} />
        </Routes> 
    )
}

export default Routers;