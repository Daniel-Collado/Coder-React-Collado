import mercadopago from "mercadopago";

// Configura el acceso con tu token de MercadoPago
mercadopago.configurations.setAccessToken(process.env.MP_ACCESS_TOKEN);

export default async function handler(req, res) {
  if (req.method === "POST") {
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
        success: "https://tuapp.com/success", // URL para el éxito
        failure: "https://tuapp.com/failure", // URL para fallo
        pending: "https://tuapp.com/pending", // URL para pendiente
      },
      auto_return: "approved",
      notification_url: "https://tuapp.com/webhook", // URL para recibir notificaciones
      external_reference: orderId,
    };

    try {
      const response = await mercadopago.preferences.create(preference);
      res.status(200).json({ id: response.body.id, init_point: response.body.init_point });
    } catch (error) {
      console.error("Error creando preferencia de pago:", error);
      res.status(500).json({ error: "Error al procesar el pago" });
    }
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
}
