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
  const createUser = async (email, password, userName?) => {
    console.log("createUser");
    var finished = false;
    const errors = [];
    const newPhotoUrl = `https://picsum.photos/id/${Math.floor(
      Math.random() * 500
    )}/200/300`;

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        finished = true;
      })
      .catch((error) => {
        console.log(error);
        errors.push(error);
      });

    if (finished) {
      await updateProfile(auth.currentUser, {
        displayName: userName,
        photoURL: newPhotoUrl,
      }).catch((error) => {
        console.log(error);
        errors.push(error);
      });
    }
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
      })
      .catch((error) => {
        console.log(error);
        result = false;
      });

    return result;
  };

  useEffect(() => {
    // how do I make this trigger every time I make a change to the user?
    // currently it will set the user every time the user in firebase changes
    // I need it to run every time I make a change to the user
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

  return (
    <AuthContext.Provider
      value={{ isLoading, user, signOut, signIn, createUser, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
