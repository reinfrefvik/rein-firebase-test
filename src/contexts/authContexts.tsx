import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../Firebase.js';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, updateProfile } from "firebase/auth";

interface AuthContextProps {
    isLoading: boolean;
    user: any;
    signOut: () => void;
    signIn: (email: string, password: string) => Promise<void>;
    createUser: (email: string, password: string, userName?: string) => Promise<void>;
    updateUser: (email?: any, password?: any, displayName?: any, photoUrl?: any) => Promise<void>;
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
      setUser(null);
    };

    //CREATE USER
    const createUser = async (email, password, userName?) => {
      console.log('createUser')
      var finished = false;
      await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          console.log('User created');
          // Signed in 
          const user = userCredential.user;
          setUser(user);
          console.log(user);
          finished = true;
      })
      .catch((error) => {
        console.log(error);
      })
      if (finished) {
        await updateNewUser(userName);
      }
    };
  
    const updateNewUser = async (displayName) => {
      const newPhotoUrl = `https://picsum.photos/id/${Math.floor(Math.random() * 500)}/200/300`;
      await updateProfile(auth.currentUser, {displayName: displayName, photoURL: newPhotoUrl }).then(() => {
        console.log('User updated');
        setUser(auth.currentUser);
      }).catch((error) => {
        console.log(error);
      });
    };

    //UPDATE USER
    const updateUser = async (email?, password?, displayName?, photoUrl?) => {
      console.log('updateUser')
      var newPhotoUrl = '';
      console.log('checking user.photoURL');  
      if (Object.values(user).includes('photoURL')) {
        console.log('user.photoURL is not null');
      }
      const newEmail = email ?? user.email;
      const newDisplayName = displayName ?? user.displayName;
      
      if (photoUrl) {
        newPhotoUrl = `https://picsum.photos/id/${Math.floor(Math.random() * 500)}/200/300`;
      }
      
      console.log('newPhotoUrl', newPhotoUrl);

      await updateProfile(auth.currentUser, {displayName: newDisplayName, photoURL: newPhotoUrl}).then(() => {
        console.log('User updated'+{...user});
      }).catch((error) => {
        console.log(error);
      });
      
    };


    useEffect(() => {
        // firebase func
        setLoading(true);
        onAuthStateChanged(auth, (user) => {
            if (user) {
              setUser(user);
              setLoading(false);
            } else {
              setLoading(false);
            }
        });
      }, [user]);

    return <AuthContext.Provider value={{isLoading, user, signOut, signIn, createUser, updateUser}}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
