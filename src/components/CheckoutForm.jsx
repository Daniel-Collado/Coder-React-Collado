import { useState, useEffect, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useAuth } from "../context/authContext";
import { cartContext } from "../context/cartContext";
import { createOrder } from "../firebase/db"; // Función para crear la orden en Firebase
import { db } from "../firebase/db";
import { doc, getDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function CheckoutForm() {
  const { cart, getTotalGeneral, clearCart } = useContext(cartContext);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: currentUser?.email || "",
  });
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const { firstName, lastName } = userSnap.data();
          setUserData((prev) => ({
            ...prev,
            firstName: firstName || "",
            lastName: lastName || "",
          }));
        }
      }
    };
    fetchUserData();
  }, [currentUser]);

  async function handlePayment() {
    // Paso 1: Crear la orden en Firebase
    const order = {
      items: cart,
      user: {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        address,
        phone,
      },
      time: serverTimestamp(),
      total: getTotalGeneral(),
      status: "pendiente",
    };
    console.log("Email del usuario que paga:", userData.email);

    const orderId = await createOrder(order);
  
    // Paso 2: Crear la preferencia de pago con MercadoPago
    const paymentOrder = {
      items: cart,
      user: userData,
      orderId,
    };
  
    try {
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentOrder),
      });
      console.log("Estado de la respuesta:", response.status, response.statusText);
  
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log("Respuesta de la API:", data);
  
      // Redirige al usuario a la página de pago de MercadoPago
      window.location.href = data.init_point;
  
      // Limpiar el carrito y mostrar confirmación
      clearCart();
      MySwal.fire({
        title: "¡Muchas gracias por tu compra!",
        text: `El ID de tu orden es: ${orderId}`,
      }).then(() => navigate("/"));
    } catch (error) {
      console.error("Error al crear el pago:", error);
      MySwal.fire({
        title: "Error",
        text: "Hubo un problema al procesar tu pago, por favor intenta nuevamente.",
        icon: "error",
      });
    }
  }
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Form className="w-25 p-4 border rounded shadow-lg bg-light">
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Dirección de correo</Form.Label>
          <Form.Control type="email" value={userData.email} disabled />
        </Form.Group>

        <Form.Group className="mb-3" controlId="firstName">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" value={userData.firstName} disabled />
        </Form.Group>

        <Form.Group className="mb-3" controlId="lastName">
          <Form.Label>Apellido</Form.Label>
          <Form.Control type="text" value={userData.lastName} disabled />
        </Form.Group>

        <Form.Group className="mb-3" controlId="address">
          <Form.Label>Dirección</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese su dirección"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="phone">
          <Form.Label>Teléfono</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese su número de teléfono"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="light" type="button" className="w-100" onClick={handlePayment}>
          Pagar con MercadoPago
        </Button>
      </Form>
    </div>
  );
};

export default CheckoutForm;
