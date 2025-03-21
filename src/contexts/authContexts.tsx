import React, { createContext, useState, useEffect } from "react";
import { auth } from "../Firebase.js";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

interface AuthContextProps {
  isLoading: boolean;
  user: any;
  signOut: () => void;
  signIn: (email: string, password: string) => Promise<void>;
  createUser: (
    email: string,
    password: string,
    userName?: string
  ) => Promise<void>;
  updateUser: (
    email?: any,
    password?: any,
    displayName?: any,
    photoUrl?: any
  ) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextProps | null>(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);

  //SIGN IN
  const signIn = async (email: string, password: string): Promise<any> => {
    const result = await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUser(user);
        return { user: userCredential.user, error: [] };
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        return { user: null, error: [errorCode, errorMessage] };
      });

    return result;
  };

  //SIGN OUT
  const signOut = async (): Promise<void> => {
    await auth.signOut();
    setUser(null);
  };

  //CREATE USER
  const createUser = async (email: string, password: string) => {
    const errors = [];

    await createUserWithEmailAndPassword(auth, email, password)
      .catch((error) => {
        console.log(error);
        errors.push(error);
      })
      .then(() => {
        if (errors.length === 0) {
          console.log("User created");
        } else {
          console.log("error creating user");
        }
      });
  };

  //UPDATE USER
  const updateUser = async (
    email?,
    password?,
    displayName?,
    photoUrl?
  ): Promise<boolean> => {
    // We don't update email for dev reasons
    // const newEmail = email ?? user.email;
    const newDisplayName = displayName ?? user.displayName;
    if (!user.photoURL) {
      photoUrl = `https://picsum.photos/id/${Math.floor(
        Math.random() * 500
      )}/200/300`;
    } else {
      photoUrl = user.photoURL;
    }

    const userObj = {
      displayName: newDisplayName,
      photoURL: photoUrl,
    };

    var result = false;

    await updateProfile(auth.currentUser, userObj)
      .then(() => {
        result = true;
        setUser((oldUser) => {
          return { ...oldUser, ...userObj };
        });
      })
      .catch((error) => {
        console.log(error);
        result = false;
      });

    return result;
  };

  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, (user) => {
      console.log("onAuthStateChanged!!");
      if (user) {
        setUser((oldUser) => {
          return { ...oldUser, ...user };
        });
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoading, user, signOut, signIn, createUser, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
