import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [paymentStatus, setPaymentStatus] = useState(null);

  useEffect(() => {
    // Obtener los parámetros de la URL (payment_id, status)
    const queryParams = new URLSearchParams(location.search);
    const paymentId = queryParams.get("payment_id");
    const status = queryParams.get("status");

    // Verificar si los parámetros existen
    if (paymentId && status) {
      // Aquí podrías llamar a tu backend para verificar el estado del pago
      // o simplemente hacer algo según el status que recibas
      setPaymentStatus(status);

      // Opcional: Realizar una validación del pago con MercadoPago usando el payment_id
      // Por ejemplo, llamar a tu API para verificar el estado del pago:
      // fetch(`/api/verify-payment/${paymentId}`)
      //   .then(response => response.json())
      //   .then(data => setPaymentStatus(data.status))
      //   .catch(error => console.error('Error verificando el pago:', error));
    } else {
      setPaymentStatus('Error: no se encontraron parámetros válidos');
    }
  }, [location]);

  return (
    <div>
      <h2>¡Gracias por tu compra!</h2>
      <p>Estado del pago: {paymentStatus}</p>
      <button onClick={() => navigate('/')}>Volver al inicio</button>
    </div>
  );
};

export default SuccessPage;
