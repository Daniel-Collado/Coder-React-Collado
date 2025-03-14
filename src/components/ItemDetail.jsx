/* eslint-disable react/prop-types */
import { Card, Container, Row, Col } from "react-bootstrap"
import ItemCount from "./ItemCount"

function ItemDetail({ item }) {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-lg p-3 mb-5 bg-white rounded no-hover">
            <Row>
              <Col md={6}>
                <Card.Img 
                  variant="top" 
                  src={item.image} 
                  style={{ height: "100%", objectFit: "contain", padding: "20px" }} 
                />
              </Col>
              <Col md={6}>
                <Card.Body>
                  <Card.Title className="fs-3 fw-bold">{item.title}</Card.Title>
                  <Card.Text className="text-muted">{item.description}</Card.Text>
                  <Card.Text className="fs-4">
                    <strong>Precio: ${item.price}</strong>
                  </Card.Text>
                  <ItemCount item={item} />
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default ItemDetail