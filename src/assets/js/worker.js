console.log("worker");
self.addEventListener("push", (e) => {
  console.log(e);
  const data = e.data.json();
  console.log(data);
  self.registration.showNotification(data.title, {
    body: data.message,
    icon: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.lasprovincias.es%2Fsociedad%2Fgato-parpadea-comunicar-humano-20201010114352-nt.html&psig=AOvVaw3crQ9eXZ0Z8sEMbGMfKtL5&ust=1636295803325000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJC2p4j7g_QCFQAAAAAdAAAAABAD",
  });
});
