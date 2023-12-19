import React, { createContext, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

interface AuthContextProps {
    isAuthenticated: boolean;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextProps | null>(null);  

const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [cookies, setCookie, removeCookie] = useCookies(['token']);


    useEffect(() => {
        if(!!cookies.token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
        setLoading(false);
      }, [cookies.token]);

    return <AuthContext.Provider value={{isAuthenticated, isLoading}}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
