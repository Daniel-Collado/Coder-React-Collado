import { useState } from "react"
import { useAuth } from "../context/authContext"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const { signup, login } = useAuth()
  const navigate = useNavigate()
  const [activeButton, setActiveButton] = useState(null)

  const handleSignup = async (e) => {
    e.preventDefault()
    setActiveButton('signup')
    try {
      const additionalData = { firstName, lastName }
      const user = await signup(email, password, additionalData) // eslint-disable-line no-unused-vars
      Swal.fire({
        icon: "success",
        title: `Hola ${firstName}`,
        text: "¡Registro exitoso!",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/")
    } catch (error) {
      console.error("Error en registro:", error)
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo registrar. Verifica tus datos.",
      })
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setActiveButton('login')
    try {
      const user = await login(email, password);
      const firstName = user?.displayName?.split(" ")[0] || "Usuario";
      Swal.fire({
        icon: "success",
        title: `Hola ${firstName}`,
        text: "¡Inicio de sesión exitoso!",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/")
    } catch (error) {
      console.error("Error en login:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo iniciar sesión. Verifica tus datos.",
      })
    }
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <Card className="no-hover">
            <Card.Body className="p-4">
              <h2 className="text-center mb-4">Ingresar</h2>
              <Form>
                <Form.Group className="mb-3" controlId="formFirstName">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Ingresa tu nombre"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formLastName">
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Ingresa tu apellido"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ingresa tu email"
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Ingresa tu contraseña"
                  />
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button 
                    type="button" 
                    onClick={handleSignup}
                    className={`buttonNavbar ${activeButton === 'signup' ? 'active' : ''} mb-2`}
                  >
                    Registrarse
                  </Button>
                  <Button 
                    type="button" 
                    onClick={handleLogin}
                    className={`buttonNavbar ${activeButton === 'login' ? 'active' : ''}`}
                  >
                    Iniciar Sesión
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}