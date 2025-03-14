import { useState, useContext } from 'react'
import { cartContext } from '../context/cartContext'
import PropTypes from "prop-types"


function ItemCount({ item }) {
  const [count, setCount] = useState(1)
  const { addToCart } = useContext(cartContext)

  const handleAdd = () => setCount(count + 1)
  

  const handleRestar = () => count > 1 && setCount(count - 1)

  const handleAddToCart = () => {
    console.log("Producto enviado al carrito:", item)
    addToCart({ ...item, quantity: count })
  }

  return (
    <>
      <p>{count}</p>
      <button className="btn-outline-custom" onClick={handleAdd}>+</button>
      <button className="btn-outline-custom" onClick={handleRestar}>-</button>
      <button className="btn-outline-custom" onClick={handleAddToCart}>Agregar al carrito</button>
    </>
  )

}

ItemCount.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
}

export default ItemCount