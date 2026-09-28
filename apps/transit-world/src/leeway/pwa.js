export function mountInstallControls() {
  if (document.getElementById('leeway-install')) return;
  const button = document.createElement('button');
  button.id = 'leeway-install';
  button.type = 'button';
  button.textContent = 'Install app';
  button.style.cssText =
    'position:fixed;right:12px;bottom:12px;z-index:9800;background:#07121b;color:#edfaff;border:1px solid #74f5ff;border-radius:8px;padding:10px 14px;font:12px system-ui;cursor:pointer';
  const installed = () =>
    matchMedia('(display-mode: standalone)').matches || navigator.standalone;
  button.hidden = installed();
  let prompt = null;
  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    prompt = event;
    button.hidden = false;
  });
  window.addEventListener('appinstalled', () => {
    button.hidden = true;
    prompt = null;
  });
  button.addEventListener('click', async () => {
    if (prompt) {
      const event = prompt;
      prompt = null;
      await event.prompt();
      const result = await event.userChoice;
      button.hidden = result.outcome === 'accepted';
      return;
    }
    const existing = document.getElementById('leeway-install-help');
    if (existing) {
      existing.remove();
      return;
    }
    const help = document.createElement('section');
    help.id = 'leeway-install-help';
    help.setAttribute('role', 'status');
    help.style.cssText =
      'position:fixed;bottom:64px;right:12px;max-width:290px;padding:18px;background:#07121b;color:#edfaff;z-index:9800;border:1px solid #74f5ff;font:14px/1.5 system-ui';
    help.textContent =
      'Use your browser menu → Install app or Add to Home Screen. On iPhone or iPad, open Safari → Share → Add to Home Screen. Maps, routing and live conditions need an internet connection. Tap Install app again to close.';
    document.body.appendChild(help);
  });
  document.body.appendChild(button);
  if ('serviceWorker' in navigator && import.meta.env.PROD)
    navigator.serviceWorker
      .register(`${import.meta.env.BASE_URL}sw.js`, {
        scope: import.meta.env.BASE_URL,
      })
      .catch((error) => {
        button.title = `Offline screen unavailable: ${error.message}`;
      });
}
