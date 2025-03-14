import { Card, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

function Item ({ item }) {
    return (
        <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
            <Card className="h-100">
              <Card.Img variant="top" src={item.image} className="card-img-top" />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>${item.price}</Card.Text>
                <Link to={`/item/${item.id}`}>
                  <Button className="btn-outline-custom">Ver más</Button>
                </Link>
              </Card.Body>
            </Card>
        </div>
    )
}

Item.propTypes = {
    item: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    }).isRequired,
  }

export default Item