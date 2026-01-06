"use client";

import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/firebase/firebase.config";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);

  // Save user to database
  const saveUserToDb = async (firebaseUser) => {
    try {
      const response = await fetch(
        `https://event-in-ctg-server.vercel.app/users/${firebaseUser.email}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: firebaseUser.displayName || "",
            photoURL: firebaseUser.photoURL || "",
          }),
        }
      );
      const data = await response.json();
      setDbUser(data);
      setRole(data.role || "user");
      return data;
    } catch (error) {
      console.error("Error saving user to DB:", error);
      setRole("user");
      return null;
    }
  };

  // Fetch user from database
  const fetchUserFromDb = async (email) => {
    try {
      const response = await fetch(
        `https://event-in-ctg-server.vercel.app/users/${email}`
      );
      if (response.ok) {
        const data = await response.json();
        setDbUser(data);
        setRole(data.role || "user");
        return data;
      }
      return null;
    } catch (error) {
      console.error("Error fetching user from DB:", error);
      return null;
    }
  };

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleProvider = new GoogleAuthProvider();
  const googleLogin = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const updateUser = (updateData) => {
    return updateProfile(auth.currentUser, updateData);
  };

  const logOut = () => {
    setLoading(true);
    setDbUser(null);
    setRole(null);
    return signOut(auth);
  };

  // Check role helpers
  const isAdmin = role === "admin";
  const isOrganizer = role === "organizer" || role === "admin";
  const isUser = role === "user";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Save or fetch user from database
        await saveUserToDb(currentUser);
      } else {
        setDbUser(null);
        setRole(null);
      }
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    dbUser,
    role,
    isAdmin,
    isOrganizer,
    isUser,
    setUser,
    loading,
    googleLogin,
    createUser,
    signIn,
    updateUser,
    logOut,
    fetchUserFromDb,
    saveUserToDb,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
