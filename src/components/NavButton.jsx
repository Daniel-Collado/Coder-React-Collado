/* eslint-disable no-unused-vars */
import React from 'react'
import { Button, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom' // Cambiamos Link por NavLink
import PropTypes from 'prop-types'

const NavButton = ({ to, children }) => {
  return (
    <Nav.Link as={NavLink} to={to}>
      {({ isActive }) => (
        <Button 
          className={`buttonNavbar ${isActive ? 'active' : ''}`}
        >
          {children}
        </Button>
      )}
    </Nav.Link>
  )
}

NavButton.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default NavButton