import React, {useContext} from 'react';
import { AuthContext } from './contexts/authContexts';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/homePage';
import LoginPage from './pages/loginPage/loginPage';
import RegistrationForm from './pages/registrationForm/registrationForm';
import ProfilePage from './pages/profilePage/profilePage';

const Routers = () => {
    const {isLoading, user} = useContext(AuthContext);
    console.log(user+" user");
    console.log({...user})
    console.log(isLoading+" loading");

    if(isLoading) {
        return <div>Loading...</div>
    } else {
        if(!user) {
            return (
                <Routes>
                    <Route path="/login" element={<LoginPage/>} />
                    <Route path="/register" element={<RegistrationForm/>} />
                    <Route path="*" element={<Navigate replace to="/login" />} />
                </Routes>
            )
        }
    
        return (
            <Routes>
                <Route path="/home" element={<HomePage/>} />
                <Route path="/profile" element={<ProfilePage/>} />
                <Route path="*" element={<Navigate replace to="/home" />} />
            </Routes> 
        )
    }

}

export default Routers;