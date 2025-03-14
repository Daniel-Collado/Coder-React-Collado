/* eslint-disable react/prop-types */
import ListGroup from 'react-bootstrap/ListGroup'
import CloseButton from 'react-bootstrap/CloseButton'
import Image from 'react-bootstrap/Image'
import { Button, Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function CartList({ cart, removeFromCart }) {
    console.log("Productos en el carrito:", cart)
    console.log("Función removeFromCart:", removeFromCart)


    // Pesos argentinos
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS'
        }).format(amount)
    };

    // Total general
    const totalGeneral = cart.reduce((total, item) => total + item.price * item.quantity, 0)

    return (
        <Container className="w-50" style={{ marginTop: '80px' }}>
            <ListGroup>
                {cart.map((item) => (
                    <ListGroup.Item key={item.id}>
                        <Row className="w-100 align-items-center">
                            <Col xs={2} className="d-flex align-items-center">
                                <Image src={item.image} alt={item.title} thumbnail width={50} />
                            </Col>
                            <Col xs={8} className="d-flex flex-column justify-content-center">
                                <span>{item.title}</span>
                                <small>{formatCurrency(item.price)} x {item.quantity} = {formatCurrency(item.price * item.quantity)}</small>
                            </Col>
                            <Col xs={2} className="d-flex justify-content-end">
                                <CloseButton onClick={() => removeFromCart(item.id)} />
                            </Col>
                        </Row>
                    </ListGroup.Item>
                ))}
            </ListGroup>
            {cart.length > 0 && (
                <Row className="mt-3">
                    <Col className="text-end">
                        <h5>Total: {formatCurrency(totalGeneral)}</h5>
                    </Col>
                </Row>
            )}
            <Link to="/checkout">
                <Button className="btn-outline-custom">Ir al Checkout</Button>
            </Link>
        </Container>
    )
}

export default CartList
