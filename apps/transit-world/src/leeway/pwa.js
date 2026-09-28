/** Leave installation to browser-native UI; preserve scoped offline support. */
export function mountInstallControls() {
  if ('serviceWorker' in navigator && import.meta.env.PROD) {
    navigator.serviceWorker
      .register(`${import.meta.env.BASE_URL}sw.js`, {
        scope: import.meta.env.BASE_URL,
      })
      .catch((error) =>
        console.warn('LeeWay offline support unavailable:', error.message),
      );
  }
}
