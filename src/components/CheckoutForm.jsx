import { useState, useEffect, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useAuth } from "../context/authContext";
import { cartContext } from "../context/cartContext";
import { createOrder } from "../firebase/db";
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

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    };

    const id = await createOrder(order);

    clearCart();

    MySwal.fire({
      title: "¡Muchas gracias por tu compra!",
      text: `El ID de tu orden es: ${id}`,
    }).then(() => navigate("/"));
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Form className="w-25 p-4 border rounded shadow-lg bg-light" onSubmit={handleSubmit}>
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

        <Button variant="light" type="submit" className="w-100">
          Finalizar compra
        </Button>
      </Form>
    </div>
  );
}

export default CheckoutForm
