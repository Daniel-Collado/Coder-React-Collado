
import { getFirestore, collection, query, where, getDocs, doc, getDoc, addDoc, onSnapshot } from "firebase/firestore"
import { app } from "./config"

export const db = getFirestore(app)

export const getProducts = async () => {
  const querySnapshot = await getDocs(collection(db, "items"))
  const items = []
  querySnapshot.forEach((doc) => {
    items.push({ ...doc.data(), id: doc.id })
  })
  return items
};

export const getProductsByCategory = async (category) => {
  const q = query(collection(db, "items"), where("category", "==", category))
  const querySnapshot = await getDocs(q)
  const items = []
  querySnapshot.forEach((doc) => {
    items.push({ ...doc.data(), id: doc.id })
  })
  return items
};

export const getProduct = async (id) => {
  const docRef = doc(db, "items", id)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    return { ...docSnap.data(), id: docSnap.id }
  } else {
    console.log("No existe el documento")
  }
}

export const createOrder = async (order) => {
  try {
    const docRef = await addDoc(collection(db, "orders"), order)
    console.log("Orden creada con ID:", docRef.id)
    return docRef.id
  } catch (e) {
    console.error("Error adding document: ", e)
  }
}

export const createTask = async (title, userId) => {
  try {
    const docRef = await addDoc(collection(db, "tasks"), {
      title,
      userId,
      createdAt: new Date(),
    })
    console.log("Tarea creada con ID:", docRef.id)
    return docRef.id
  } catch (e) {
    console.error("Error al crear tarea:", e)
  }
}

export const getUserTasks = (userId, callback) => {
  const q = query(collection(db, "tasks"), where("userId", "==", userId))
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const tasks = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    callback(tasks)
  });
  return unsubscribe
}