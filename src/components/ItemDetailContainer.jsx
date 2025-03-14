
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getProduct } from '../firebase/db' 
import ItemDetail from "./ItemDetail"

function ItemDetailContainer() {
  const [item, setItem] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    getProduct(id)
      .then(res => setItem(res))
      .catch(error => console.error("Error obteniendo el producto:", error))
  }, [id])

  return item ? <ItemDetail item={item} /> : <p>Cargando...</p>
}

export default ItemDetailContainer
