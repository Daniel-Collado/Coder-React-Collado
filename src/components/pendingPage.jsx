import React from 'react';
import { useNavigate } from 'react-router-dom';

const PendingPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Tu pago está pendiente</h2>
      <p>Estamos esperando que se complete el pago. Te notificaremos cuando esté listo.</p>
      <button onClick={() => navigate('/')}>Volver al inicio</button>
    </div>
  );
};

export default PendingPage;
