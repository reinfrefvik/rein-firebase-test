import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
} from "react";
import { auth } from "@/Firebase.js";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
  User,
} from "firebase/auth";

const getRandomAvatar = () =>
  `https://picsum.photos/id/${Math.floor(Math.random() * 500)}/200/300`;

interface AuthProviderProps {
  children: ReactNode;
}
interface UpdateUserProps {
  displayName?: string;
  photoURL?: string;
}
interface AuthContextProps {
  isLoading: boolean;
  user: User | null | Partial<User>;
  signOut: () => void;
  signIn: (email: string, password: string) => Promise<boolean>;
  createUser: (
    email: string,
    password: string,
    userName?: string
  ) => Promise<void>;
  updateUser: (params: UpdateUserProps) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextProps | null>(null);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState(true);
  console.log("user", user);

  //SIGN IN
  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      return true;
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    }
  };

  //SIGN OUT
  const signOut = async (): Promise<void> => {
    await auth.signOut();
    setUser(null);
  };

  //CREATE USER
  const createUser = async (email: string, password: string) => {
    const userName = email.split("@")[0];
    const photoURL = getRandomAvatar();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userName) {
        await updateProfile(userCredential.user, {
          displayName: userName,
          photoURL: photoURL,
        });
      }
      setUser({ ...userCredential.user, displayName: userName, photoURL });
    } catch (error: any) {
      console.error("Error creating user:", error.code, error.message);
      throw error;
    }
  };

  //UPDATE USER
  const updateUser = async ({
    displayName,
  }: UpdateUserProps): Promise<boolean> => {
    if (!auth.currentUser) return false;

    const newDisplayName = displayName ?? auth.currentUser.displayName;
    const newPhotoURL = auth.currentUser.photoURL ?? getRandomAvatar();

    try {
      await updateProfile(auth.currentUser, {
        displayName: newDisplayName,
        photoURL: newPhotoURL,
      });
      setUser((oldUser) =>
        oldUser
          ? { ...oldUser, displayName: newDisplayName, photoURL: newPhotoURL }
          : null
      );
      return true;
    } catch (error) {
      console.error("Error updating profile:", error);
      return false;
    }
  };

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("onAuthStateChanged!!");
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup
  }, []);

  const value = useMemo(
    () => ({
      isLoading,
      user,
      signOut,
      signIn,
      createUser,
      updateUser,
    }),
    [isLoading, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
