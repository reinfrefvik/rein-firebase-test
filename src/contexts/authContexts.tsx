import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../Firebase.js';
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

interface AuthContextProps {
    isLoading: boolean;
    user: any;
    signOut: () => void;
    signIn: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | null>(null);  

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null); // <-- new state
    const [isLoading, setLoading] = useState(true);

    //SIGN IN
    const signIn = async (email: string, password: string): Promise<void> => {
      await signInWithEmailAndPassword(auth, email, password);
    };

    //SIGN OUT
    const signOut = async (): Promise<void> => {
      await auth.signOut();
      window.location.href = '/';
    };


    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // getting user from firebase, not state
              const uid = user.uid;
              console.log('userID: ' + uid);
              setUser(user);
            } else {
              console.log('no user');
            }
        });
        setLoading(false);
      }, [user]);

    return <AuthContext.Provider value={{isLoading, user, signOut, signIn}}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
