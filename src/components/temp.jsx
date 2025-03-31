import React from 'react';
import { useNavigate } from 'react-router-dom';

const FailurePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Hubo un problema con tu pago.</h2>
      <p>Tu pago no pudo ser procesado. Por favor, intenta nuevamente.</p>
      <button onClick={() => navigate('/checkout')}>Volver al checkout</button>
    </div>
  );
};

export default FailurePage;
