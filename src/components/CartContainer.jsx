import { useCart } from '../context/cartContext'
import CartList from './CartList'


function CartContainer () {
    const { cart, removeFromCart } = useCart()
    console.log("Estado del carrito en CartContainer:", cart)

    return (
        <div className='d-flex justify-content-center'>    
            {cart.length === 0 ? <h2>No hay productos en el carrito</h2> : <CartList cart={cart} removeFromCart={removeFromCart}/>} 
        </div>
    )
}

export default CartContainer