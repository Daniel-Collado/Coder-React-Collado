import { BsCart } from "react-icons/bs"
import { Badge } from "react-bootstrap"
import { Button } from "react-bootstrap"
import { useCart } from "../context/cartContext"
import { useNavigate } from "react-router-dom"


function CartWidget() {
  const { getQuantity } = useCart()
  const navigate = useNavigate()

  const cantidad = getQuantity()

  const handleClick = () => {
    navigate('/cart')
  } 

  return (
    <>
      <Button variant="light" onClick={handleClick}>
        <div className="contenedorCarrito position-relative">
          <BsCart size={30} />
          {cantidad > 0 && (
            <Badge
              pill
              bg="danger"
              className="position-absolute top-0 start-100 translate-middle">
              {cantidad}
            </Badge>
          )}
        </div>
      </Button>
    </>
  );
}

export default CartWidget
