import mercadopago from "mercadopago";

const accessToken = process.env.MP_ACCESS_TOKEN || "TOKEN_POR_DEFECTO";
console.log("MP_ACCESS_TOKEN en servidor:", process.env.MP_ACCESS_TOKEN);

mercadopago.configure({
  access_token: accessToken,
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log("Solicitud recibida:", req.body);

    // Verificar si es una notificación webhook
    if (req.body.topic && req.body.resource) {
      // Manejar notificación de Mercado Pago
      const { topic, resource } = req.body;
      console.log(`Notificación recibida - Topic: ${topic}, Resource: ${resource}`);
      
      // Opcional: Procesar la notificación (por ejemplo, actualizar el estado en Firebase)
      // Ejemplo: Obtener detalles de la orden
      if (topic === "merchant_order") {
        try {
          const response = await fetch(resource, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          const orderData = await response.json();
          console.log("Datos de la orden:", orderData);
          // Aquí podrías actualizar tu base de datos con el estado del pago
        } catch (error) {
          console.error("Error procesando notificación:", error);
        }
      }
      
      return res.status(200).json({ message: "Notificación recibida" });
    }

    // Si no es webhook, procesar creación de preferencia
    const { items, user, orderId } = req.body;
    if (!items || !user || !orderId) {
      return res.status(400).json({ error: "Faltan datos requeridos" });
    }

    const preference = {
      items: items.map((item) => ({
        title: item.title,
        unit_price: item.price,
        quantity: item.quantity,
        currency_id: "ARS",
      })),
      payer: {
        email: user.email,
        name: user.firstName,
        surname: user.lastName,
        address: user.address,
        phone: user.phone,
      },
      back_urls: {
        success: "https://tienda-jardin-olmos.vercel.app/success",
        failure: "https://tienda-jardin-olmos.vercel.app/failure",
        pending: "https://tienda-jardin-olmos.vercel.app/pending",
      },
      auto_return: "approved",
      notification_url: "https://tienda-jardin-olmos.vercel.app/api/payment",
      external_reference: orderId,
    };

    try {
      console.log("Creando preferencia con:", preference);
      const response = await mercadopago.preferences.create(preference);
      console.log("Preferencia creada:", response.body);
      res.status(200).json({ id: response.body.id, init_point: response.body.init_point });
    } catch (error) {
      console.error("Error creando preferencia de pago:", error);
      res.status(500).json({ error: "Error al procesar el pago", details: error.message });
    }
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
}