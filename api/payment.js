import mercadopago from "mercadopago";

console.log("Configurando Mercado Pago con token:", process.env.MP_ACCESS_TOKEN ? "Presente" : "No encontrado");
mercadopago.configure({
    access_token: process.env.MP_ACCESS_TOKEN || "TOKEN_POR_DEFECTO",
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log("Solicitud recibida:", req.body);
    const { items, user, orderId } = req.body;

    const preference = {
      items: items.map((item) => {
        console.log("Item procesado:", item);
        return {
          title: item.name,
          unit_price: item.price,
          quantity: item.quantity,
          currency_id: "ARS",
        };
      }),
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