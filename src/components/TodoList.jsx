import { useState, useEffect } from "react"
import { useAuth } from "../AuthContext"
import { getUserTasks } from "../firebase/db"

export default function ToDoList() {
  const [tasks, setTasks] = useState([])
  const { currentUser } = useAuth()

  useEffect(() => {
    if (currentUser) {
      const unsubscribe = getUserTasks(currentUser.uid, (tasksData) => {
        setTasks(tasksData)
      })
      return unsubscribe
    }
  }, [currentUser])

  return (
    <div>
      <h2>Mis Tareas</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  )
}