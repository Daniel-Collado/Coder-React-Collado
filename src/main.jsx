/* eslint-disable no-unused-vars */
import React from "react"
import { StrictMode } from 'react'
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import "bootstrap/dist/css/bootstrap.min.css"

import AuthProvider from "./context/AuthProvider"

ReactDOM.createRoot(document.getElementById("root")).render(
    <StrictMode>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter> 
      </AuthProvider>
    </StrictMode>
)

