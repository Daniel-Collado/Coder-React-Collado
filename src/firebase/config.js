import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBvR-bMiNPxOsG15OSxubyoS2y1KL6CmVU",
  authDomain: "react-coder-app-collado.firebaseapp.com",
  projectId: "react-coder-app-collado",
  storageBucket: "react-coder-app-collado.firebasestorage.app",
  messagingSenderId: "397633982372",
  appId: "1:397633982372:web:0a7926bdb24d3a71bffb31"
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)