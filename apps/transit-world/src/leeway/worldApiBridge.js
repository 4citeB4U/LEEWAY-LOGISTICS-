const DEFAULT_LOCAL_WORLD_API = 'http://127.0.0.1:4176';

function configuredBase() {
  const explicit = String(
    import.meta.env?.VITE_LEEWAY_WORLD_API_URL || '',
  ).trim();
  if (explicit) return explicit.replace(/\/$/, '');

  const hostname = String(
    globalThis.location?.hostname || globalThis.window?.location?.hostname || '',
  );
  if (hostname.endsWith('github.io')) {
    return DEFAULT_LOCAL_WORLD_API;
  }

  return '';
}

export function worldApiBase() {
  return configuredBase();
}

export function resolveWorldApiUrl(input) {
  const base = configuredBase();
  if (!base) return input;

  const raw =
    input instanceof Request
      ? input.url
      : input instanceof URL
        ? input.href
        : String(input || '');

  if (!raw) return input;

  if (raw.startsWith('/api/')) {
    return `${base}${raw}`;
  }

  try {
    const url = new URL(raw, globalThis.location?.href || 'http://localhost/');
    if (
      globalThis.location?.origin &&
      url.origin === globalThis.location.origin &&
      url.pathname.startsWith('/api/')
    ) {
      return `${base}${url.pathname}${url.search}${url.hash}`;
    }
  } catch {}

  return input;
}

export function installWorldApiBridge({
  fetchImpl = globalThis.fetch?.bind(globalThis),
} = {}) {
  if (typeof fetchImpl !== 'function') {
    return { installed: false, base: configuredBase() };
  }

  const base = configuredBase();
  if (!base) {
    return { installed: false, base: '' };
  }

  if (globalThis.__leewayWorldApiBridge?.installed) {
    return globalThis.__leewayWorldApiBridge;
  }

  const originalFetch = fetchImpl;
  const bridgedFetch = (input, init) => {
    const resolved = resolveWorldApiUrl(input);

    if (input instanceof Request && typeof resolved === 'string') {
      return originalFetch(new Request(resolved, input), init);
    }

    return originalFetch(resolved, init);
  };

  globalThis.fetch = bridgedFetch;

  const state = {
    installed: true,
    base,
    originalFetch,
    async probe() {
      try {
        const response = await originalFetch(`${base}/api/cctv/sources`, {
          cache: 'no-store',
        });
        return {
          ok: response.ok,
          status: response.status,
          base,
        };
      } catch (error) {
        return {
          ok: false,
          status: null,
          base,
          error: String(error?.message || error),
        };
      }
    },
    restore() {
      if (globalThis.fetch === bridgedFetch) {
        globalThis.fetch = originalFetch;
      }
      state.installed = false;
    },
  };

  globalThis.__leewayWorldApiBridge = state;
  return state;
}
