const subscripcion = async () => {
  const public_key =
    "BCB48D5qobdbl6JLzb0n2JuJmtllHCaM-F-Fa9Q9JW23OuukbHyHB6GKFEDVhmWIy9piJsGUh7-GjbXQGLRo2_o";
  //service worker
  const register = await navigator.serviceWorker.register("/worker.js");
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(public_key),
  });

  function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  await fetch("https://localhost:7000/api/subscription", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: { "Content-Type": "application/json" },
  });
};

const message = async (message) => {
  await fetch("https://localhost:7000/api/new-message", {
    method: "POST",
    body: JSON.stringify({ message: message }),
    headers: { "Content-Type": "application/json" },
  });
};

subscripcion();
