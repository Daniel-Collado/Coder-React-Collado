import { cartContext } from "./cartContext"
import { useState, useEffect } from "react"
import { useAuth } from "./authContext"

function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const { currentUser } = useAuth()


  useEffect(() => {
    if (currentUser) {
      console.log("Usuario autenticado:", currentUser.uid)
    } else {
      console.log("No hay usuario autenticado, usando carrito local")
    }
  }, [currentUser])

  const addToCart = (product) => {
    console.log("Producto recibido en addToCart:", product)
    const existingProduct = cart.find((item) => item.id === product.id)
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        )
      )
    } else {
      setCart([...cart, { ...product, quantity: product.quantity }])
    }
  }

  const removeFromCart = (productId) => {
    setCart(cart.filter((product) => product.id !== productId))
  }

  const getQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalGeneral = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <cartContext.Provider
      value={{ addToCart, removeFromCart, getQuantity, cart, getTotalGeneral, clearCart }}
    >
      {children}
    </cartContext.Provider>
  )
}

export default CartProvider