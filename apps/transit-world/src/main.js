import { createStandaloneApplication } from './standalone/application.js';
import { describeError } from './standalone/errors.js';
import { mountLeeWayTransitWorld } from './leeway/transitWorldCockpit.js';
import { mountAgentLeeGemma } from './leeway/agentLeeGemma.js';
import { mountEnterpriseShell } from './leeway/enterpriseShell.js';
import { installWorldApiBridge } from './leeway/worldApiBridge.js';
import { mountInstallControls } from './leeway/pwa.js';
import { initAgentLeeVoiceEntry } from './leeway/agentLeeVoiceEntry.js';

installWorldApiBridge();
mountInstallControls();

const application = createStandaloneApplication({
  googleApiKey: import.meta.env.GOOGLE_MAPS_API_KEY,
  cesiumToken: import.meta.env.CESIUM_ION_TOKEN,
  allowQaRegistration: import.meta.env.DEV,
  voice: { initialize: initAgentLeeVoiceEntry },
});

application
  .start()
  .then(async () => {
    const enterpriseShell = mountEnterpriseShell(application);
    mountAgentLeeGemma(application, enterpriseShell);
    void mountLeeWayTransitWorld(application, { edition: 'business' }).catch(
      (error) => {
        console.error('Operations panel unavailable', error);
        enterpriseShell.notify(
          'Operations data unavailable; map remains usable',
        );
      },
    );
  })
  .catch((error) => {
    console.error(
      'LeeWay Logistics Transit World initialization failed:',
      error,
    );
    const loaderStatus = document.querySelector(
      '#loading-screen .loader-status',
    );
    if (loaderStatus) {
      loaderStatus.textContent = `Error: ${describeError(error)}`;
      loaderStatus.style.color = '#ff4444';
    }
  });

export { application };
