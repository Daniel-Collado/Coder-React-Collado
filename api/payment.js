import mercadopago from "mercadopago";

const accessToken = process.env.MP_ACCESS_TOKEN || "TOKEN_POR_DEFECTO";
console.log("MP_ACCESS_TOKEN en servidor:", process.env.MP_ACCESS_TOKEN);


console.log(
  "Configurando Mercado Pago con token:",
  accessToken !== "TOKEN_POR_DEFECTO" ? "Presente" : "No encontrado"
);

mercadopago.configure({
  access_token: accessToken,
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log("Solicitud recibida:", req.body);
    const { items, user, orderId } = req.body;

    const preference = {
      items: items.map((item) => ({
        title: item.title,
        unit_price: item.price,
        quantity: item.quantity,
        currency_id: "ARS",
      })),
      payer: {
        email: user.email,
        name: user.firstName, // Asegúrate de que 'firstName' se pase correctamente
        surname: user.lastName,
        address: user.address,
        phone: user.phone,
      },
      back_urls: {
        success: "https://coder-react-collado.vercel.app/success",
        failure: "https://coder-react-collado.vercel.app/",
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
