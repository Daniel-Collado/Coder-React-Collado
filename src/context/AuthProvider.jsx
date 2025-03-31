import { authContext } from "./authContext"
import { useState, useEffect } from "react"
import { auth } from "../firebase/config"
import { db } from "../firebase/db"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const signup = async (email, password, additionalData = {}) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      ...additionalData,
    })
    return user;
  }

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logout = () => {
    return signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Usuario autenticado:", user.email);
      } else {
        console.log("No hay usuario autenticado");
      }
      setCurrentUser(user);
      setLoading(false);
    })
    return unsubscribe;
  }, []);
  

  const value = {
    currentUser,
    signup,
    login,
    logout,
  }

  return (
    <authContext.Provider value={value}>
      {!loading && children}
    </authContext.Provider>
  )
}

export default AuthProvider