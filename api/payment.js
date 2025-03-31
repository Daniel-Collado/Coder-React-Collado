import mercadopago from "mercadopago";

// Configura el acceso con tu token de MercadoPago
mercadopago.configurations.setAccessToken(process.env.MP_ACCESS_TOKEN);

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
        success: "https://coder-react-collado.vercel.app/success", // URL para el éxito
        failure: "https://coder-react-collado.vercel.app/failure", // URL para fallo
        pending: "https://coder-react-collado.vercel.app/pending", // URL para pendiente
      },
      auto_return: "approved",
      notification_url: "https://coder-react-collado.vercel.app/api/payment", // URL para recibir notificaciones de Webhook
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
    // Aquí agregas la lógica para procesar los Webhooks de MercadoPago
    const { topic, id } = req.query;

    // Verifica si el Webhook es de tipo 'payment'
    if (topic === "payment") {
      try {
        // Obtén la información del pago usando el ID de la notificación
        const payment = await mercadopago.payment.findById(id);

        // Aquí puedes manejar la respuesta, como actualizar el estado del pago en tu base de datos
        if (payment.body.status === "approved") {
          console.log("Pago aprobado", payment.body);
          // Actualizar el estado del pedido en tu base de datos (por ejemplo, marcarlo como pagado)
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
