import { useState } from "react"
import { useAuth } from "../AuthContext"
import { createTask } from "../firebase/db"
import { useNavigate } from "react-router-dom"

export default function CreateTask() {
  const [title, setTitle] = useState("")
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!currentUser) {
      alert("Debes estar autenticado para crear una tarea")
      return
    }
    try {
      await createTask(title, currentUser.uid)
      navigate("/")
    } catch (error) {
      console.error("Error al crear tarea:", error)
    }
  }

  return (
    <div>
      <h2>Crear Tarea</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título de la tarea"
        />
        <button type="submit">Crear</button>
      </form>
    </div>
  )
}