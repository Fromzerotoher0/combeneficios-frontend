var imported = document.createElement("script");
imported.src = "https://sdk.mercadopago.com/js/v2";
document.head.appendChild(imported);
// Agrega credenciales de SDK

function pago(id) {
  const mp = new MercadoPago("TEST-feadb05c-9782-4fb8-947b-54949c3f1fe7", {
    locale: "es-CO",
  });

  console.log("mercadopago");

  // Inicializa el checkout
  mp.checkout({
    preference: {
      id: "759574360-3aa0fdf5-9bd2-41f3-88c8-72739baa0f24",
    },
    render: {
      container: ".pago", // Indica el nombre de la clase donde se mostrará el botón de pago
      label: "Pagar", // Cambia el texto del botón de pago (opcional)
    },
  });
}
