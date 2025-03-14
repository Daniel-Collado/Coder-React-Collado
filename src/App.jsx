import NavBar from './components/NavBar'
import ItemListContainer from './components/ItemListContainer'
import ItemDetailContainer from './components/ItemDetailContainer'
import CartContainer from './components/CartContainer'
import CheckoutForm from './components/CheckoutForm'
import CartProvider from './context/CartProvider'
import Login from './components/Login'
import { Route, Routes } from "react-router-dom"
import './App.css'

function App() {
 
  return (
      <CartProvider>
        <NavBar />
        <Routes>
            <Route path="/" element={<ItemListContainer />} />
            <Route path="/item/:id" element={<ItemDetailContainer />} />
            <Route path="/category/:categoryId" element={<ItemListContainer />} />
            <Route path="/cart" element={<CartContainer />} />
            <Route path="/checkout" element={<CheckoutForm />} />
            <Route path="login" element={<Login />} />
        </Routes>    
      </CartProvider>
  )
}

export default App
