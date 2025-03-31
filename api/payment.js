import mercadopago from "mercadopago";

// Configura el acceso con tu token de Mercado Pago
mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN || "TU_TOKEN_POR_DEFECTO", // Asegúrate de que el token esté en .env
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Si es una solicitud de pago
    const { items, user, orderId } = req.body;

    const preference = {
      items: items.map((item) => ({
        title: item.name,
        unit_price: item.price,
        quantity: item.quantity,
        currency_id: "ARS", // Puedes cambiar la moneda
      })),
      payer: {
        email: user.email,
      },
      back_urls: {
        success: "https://coder-react-collado.vercel.app/success",
        failure: "https://coder-react-collado.vercel.app/failure",
        pending: "https://coder-react-collado.vercel.app/pending",
      },
      auto_return: "approved",
      notification_url: "https://coder-react-collado.vercel.app/api/payment",
      external_reference: orderId,
    };

    try {
      const response = await mercadopago.preferences.create(preference);
      res.status(200).json({ id: response.body.id, init_point: response.body.init_point });
    } catch (error) {
      console.error("Error creando preferencia de pago:", error);
      res.status(500).json({ error: "Error al procesar el pago" });
    }
  } else if (req.method === "GET") {
    // Procesar Webhooks de Mercado Pago
    const { topic, id } = req.query;

    if (topic === "payment") {
      try {
        const payment = await mercadopago.payment.findById(id);

        if (payment.body.status === "approved") {
          console.log("Pago aprobado", payment.body);
          // Aquí puedes actualizar Firebase con el estado del pedido
        }

        res.status(200).json({ message: "Notificación recibida correctamente" });
      } catch (error) {
        console.error("Error al procesar el Webhook:", error);
        res.status(500).json({ message: "Error al procesar la notificación del pago" });
      }
    } else {
      res.status(400).json({ message: "Tipo de notificación no soportado" });
    }
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
}