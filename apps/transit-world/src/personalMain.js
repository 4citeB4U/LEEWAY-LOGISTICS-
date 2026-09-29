import { createStandaloneApplication } from './standalone/application.js';
import { describeError } from './standalone/errors.js';
import { mountLeeWayTransitWorld } from './leeway/transitWorldCockpit.js';
import { mountAgentLeeGemma } from './leeway/agentLeeGemma.js';
import { mountEnterpriseShell } from './leeway/enterpriseShell.js';
import { installWorldApiBridge } from './leeway/worldApiBridge.js';
import { mountInstallControls } from './leeway/pwa.js';

document.body.dataset.leewayEdition = 'personal';
installWorldApiBridge();
mountInstallControls({
  worker: 'personal/sw-personal.js',
  scope: 'personal/',
});

const application = createStandaloneApplication({
  googleApiKey: import.meta.env.GOOGLE_MAPS_API_KEY,
  cesiumToken: import.meta.env.CESIUM_ION_TOKEN,
  allowQaRegistration: import.meta.env.DEV,
});

application
  .start()
  .then(async () => {
    const personalShell = mountEnterpriseShell(application, {
      edition: 'personal',
    });
    mountAgentLeeGemma(application, personalShell);
    void mountLeeWayTransitWorld(application, { edition: 'personal' }).catch(
      (error) => {
        console.error('Public travel panel unavailable', error);
        personalShell.notify(
          'Public travel data unavailable; map remains usable',
        );
      },
    );
  })
  .catch((error) => {
    console.error('LeeWay Maps initialization failed:', error);
    const loaderStatus = document.querySelector(
      '#loading-screen .loader-status',
    );
    if (loaderStatus) {
      loaderStatus.textContent = `Error: ${describeError(error)}`;
      loaderStatus.style.color = '#ff4444';
    }
  });

export { application };
