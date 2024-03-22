import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../Firebase.js';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

interface AuthContextProps {
    isLoading: boolean;
    user: any;
    signOut: () => void;
    signIn: (email: string, password: string) => Promise<void>;
    createUser: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | null>(null);  

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null); // <-- new state
    const [isLoading, setLoading] = useState(true);

    //SIGN IN
    const signIn = async (email: string, password: string): Promise<any> => {
      const result = await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUser(user);
        return {user: userCredential.user, error: []};
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        return {user: null, error: [errorCode, errorMessage]};
      }
      );

      return result;
    };

    //SIGN OUT
    const signOut = async (): Promise<void> => {
      await auth.signOut();
      // window.location.href = '/';
      setUser(null);
    };

    //CREATE USER
    const createUser = async (email, password) => {
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user);
          // ...
      })
      .catch((error) => {
        console.log(error);
      })
    };


    useEffect(() => {
        // firebase func
        onAuthStateChanged(auth, (user) => {
            if (user) {
              setUser(user);
            } else {
              console.log('no user');
            }
        });
        setLoading(false);
      }, [user]);

    return <AuthContext.Provider value={{isLoading, user, signOut, signIn, createUser}}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
