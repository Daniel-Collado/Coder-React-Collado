/* eslint-disable no-unused-vars */
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar, Nav, Container, Button } from 'react-bootstrap'
import CartWidget from './CartWidget'
import NavButton from './NavButton'
import { Link, NavLink } from 'react-router-dom'
import { useState, useEffect } from "react"
import { useContext } from 'react'
import { cartContext } from '../context/cartContext'
import { useAuth } from '../context/authContext'
import { db } from "../firebase/db"
import { doc, getDoc } from "firebase/firestore"

export default function NavBar() {
    const { getQuantity } = useContext(cartContext)
    const { currentUser, logout } = useAuth()
    const [userName, setUserName] = useState("Usuario")
  
    useEffect(() => {
      const fetchUserName = async () => {
        if (currentUser) {
          const userRef = doc(db, "users", currentUser.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            const { firstName } = userSnap.data();
            setUserName(firstName || "Usuario");
          }
        }
      };
      fetchUserName();
    }, [currentUser]);
  
  

  const handleLogout = async () => {
    try {
      await logout()
      console.log("Sesión cerrada")
    } catch (error) {
      console.error("Error al cerrar sesión:", error)
    }
  }

  return (
    <>
      <Navbar className="mi-navbar" expand="md" sticky="top">
        <Container fluid>
          <Navbar.Toggle aria-controls="navbarSupportedContent" />
          <Navbar.Collapse id="navbarSupportedContent">
            <Navbar.Brand as={Link} to="/">Tienda ALLroy</Navbar.Brand>
            <Nav className="me-auto mb-2 mb-lg-0">
              <NavButton to="/category/Suculentas">Suculentas</NavButton>
              <NavButton to="/category/Cactus">Cactus</NavButton>
              <NavButton to="/category/Interior">Plantas de Interior</NavButton>
              <NavButton to="/category/Exterior">Plantas de Exterior</NavButton>
            </Nav>
          </Navbar.Collapse>
          <Nav className="ms-auto">
            {currentUser ? (
              <>
                <Nav.Link as={Link} to="/profile" className="me-2">
                  Hola, {userName}
                </Nav.Link>
                <Button variant="outline-danger" onClick={handleLogout} className="me-2">
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <Nav.Link as={NavLink} to="/login" className="me-2">
                {({ isActive }) => (
                    <Button 
                      className={`buttonNavbar ${isActive ? 'active' : ''}`}
                    >Iniciar Sesión
                    </Button>
                )}
              </Nav.Link>
            )}
            <CartWidget cantidad={getQuantity()} />
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

