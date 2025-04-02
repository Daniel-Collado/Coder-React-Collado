import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cartContext } from '../context/cartContext'; // Importa el contexto del carrito
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearCart } = useContext(cartContext); // Obtiene clearCart del contexto
  const [paymentStatus, setPaymentStatus] = useState(null);

  useEffect(() => {
    // Obtener los parámetros de la URL (payment_id, status, external_reference)
    const queryParams = new URLSearchParams(location.search);
    const paymentId = queryParams.get("payment_id");
    const status = queryParams.get("status");
    const externalReference = queryParams.get("external_reference"); // Esto es el orderId

    // Verificar si los parámetros existen
    if (paymentId && status === "approved") {
      // Limpiar el carrito y mostrar confirmación
      clearCart();
      MySwal.fire({
        title: "¡Muchas gracias por tu compra!",
        text: `El ID de tu orden es: ${externalReference || 'No disponible'}`,
      }).then(() => navigate("/"));

      setPaymentStatus(status);
    } else {
      setPaymentStatus('Error: no se encontraron parámetros válidos');
    }
  }, [location, clearCart, navigate]);

  return (
    <div>
      <h2>¡Gracias por tu compra!</h2>
      <p>Estado del pago: {paymentStatus}</p>
      <button onClick={() => navigate('/')}>Volver al inicio</button>
    </div>
  );
};

export default SuccessPage;