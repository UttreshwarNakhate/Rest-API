export default function swDev() {
  function determineAppServerKey() {
    const vapidPublicKey =
      "BLS3dOXw9eTeRnNMOI_cUunY_TymhGVFZ8EhxxzN6mTc6uACsjn7_CMgRjtT7PEEmkxV_z6HpTaMQRCj5TCziyo";
    return urlBase64ToUnit8Array(vapidPublicKey);
  }

  function urlBase64ToUnit8Array(base64String) {
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

  // Service worker registry
  let swUrl = `${process.env.PUBLIC_URL}/sw.js`;
  navigator.serviceWorker
    .register(swUrl)
    .then((response) => {
      console.warn("response", response);

      return response.pushManager
        .getSubscription()
        .then(function (subscription) {
          if (subscription === null) {
            // Create a new subscription
            return response.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: determineAppServerKey(),
            });
          } else {
            // We have a subscription, update the UI or save it to your server
            console.log("Subscription exists:", subscription);
            return subscription;
          }
        });
    })
    .catch((error) => {
      console.error(
        "Service worker registration or subscription failed:",
        error
      );
    });
}
