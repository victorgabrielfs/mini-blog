import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import {app} from '../firebase/config'

import { useEffect, useState } from "react";

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const [cancelled, setCancelled] = useState(false);

  const auth = getAuth(app);
  
  function checkIfCancelled() { if(cancelled) return }

  const login = async (email, password) => {
    checkIfCancelled()
    try {
      setLoading(true); 
      setError(null);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      let systemErrorMessage;

      if (error.message.includes("user-not-found")) {
        systemErrorMessage = "User not found";
      } else if (error.message.includes("wrong-password")) {
        systemErrorMessage = "Wrong password";
      } else {
        systemErrorMessage = "An error has occurred";
      }

      setError(systemErrorMessage);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    checkIfCancelled()
    signOut(auth);
  };

  const createUser = async (data) => {
    checkIfCancelled()
    setLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await updateProfile(user, { displayName: data.displayName });
      return user;
    } catch (error) {
      console.log(error);
      
      let systemErrorMessage;

      if (error.message.includes("Password")) {
        systemErrorMessage = "The password must be at least 6 characters long";
      } else if (error.message.includes("email-already")) {
        systemErrorMessage = "E-mail already in use";
      } else {
        systemErrorMessage = "An error has occurred";
      }

      setError(systemErrorMessage);

    } finally {  
      setLoading(false);
    }    
  }

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {auth, login, logout, createUser, loading, error};

}