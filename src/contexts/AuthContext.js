import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, store } from "../utils/firebase";
import firebase from "firebase/app";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const googleProvider = new firebase.auth.GoogleAuthProvider();

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function loginWithGoogle() {
    return auth.signInWithPopup(googleProvider);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function getToken() {
    if (currentUser) {
      return currentUser.getIdToken(false);
    }
    return "";
  }

  function registerUser(uid, email, name) {
    return store.collection("users").doc(uid).set({
      email: email,
      name: name,
      createdOn: firebase.firestore.Timestamp.now(),
      updatedOn: firebase.firestore.Timestamp.now(),
    });
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoggedIn(true);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    loginWithGoogle,
    logout,
    resetPassword,
    getToken,
    registerUser,
  };
  return (
    <AuthContext.Provider value={value}>
      {loggedIn && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
