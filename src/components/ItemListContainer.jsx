import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import ItemList from "./ItemList"
import { getProducts, getProductsByCategory } from '../firebase/db'

const ItemListContainer = () => {
  const { categoryId } = useParams()
  const [productos, setProductos] = useState([])

 
  useEffect(() => {
    if(categoryId){
      getProductsByCategory(categoryId).then(res => setProductos(res)) 
    } else {
    getProducts().then(res => setProductos(res))
    }
  }, [categoryId])

  return (
    <div>
      <ItemList items={productos} />
    </div>
  )
}

export default ItemListContainer