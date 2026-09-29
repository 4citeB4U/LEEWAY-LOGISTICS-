function words(value) {
  return String(value || '').toLowerCase().replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
}

/**
 * Deterministic operational commands. This intentionally handles only actions
 * with an unambiguous local map effect; it does not imitate model reasoning.
 */
export function classifyCopilotCommand(value) {
  const input = words(value);
  if (!input) return null;
  if (/\b(personal|public|civilian)\b.*\b(map|mode|view)\b/.test(input))
    return { action: 'personal-map' };
  if (/\b(business|dispatch|logistics)\b.*\b(map|mode|view)\b/.test(input))
    return { action: 'business-map' };
  if (/\b(load|loads|triangle|triangulate|triangulation)\b/.test(input) && /\b(open|plan|show|build|map|compare|dispatch)\b/.test(input))
    return { action: 'load-planning' };
  if (/\b(weather|radar|rain|storm|lightning|clouds?)\b/.test(input) && /\b(show|open|turn|check|see|look)\b/.test(input))
    return { action: 'weather' };
  if (/\b(cctv|camera|cameras)\b/.test(input) && /\b(show|open|turn|check|see|look)\b/.test(input))
    return { action: 'cctv' };
  if (/\b(my|current) location\b/.test(input) && /\b(use|set|find|locate|start|origin|route)\b/.test(input))
    return { action: 'my-location' };
  if (/\b(optimize|best order|reorder)\b/.test(input) && /\b(stop|stops|route|route)\b/.test(input))
    return { action: 'optimize-stops' };
  if (/\b(open|show|start|plan|get)\b.*\b(route|directions|direction)\b/.test(input))
    return { action: 'directions' };
  return null;
}

export async function executeCopilotCommand(value, shell) {
  const command = classifyCopilotCommand(value);
  if (!command || !shell) return { handled: false };
  if (command.action === 'personal-map') {
    shell.setPersonalMode?.(true);
    return { handled: true, message: 'Personal Map is open. Directions, weather, roadside places, safety reports, and Agent Lee remain available.' };
  }
  if (command.action === 'business-map') {
    shell.setPersonalMode?.(false);
    return { handled: true, message: 'Business Map is open. Dispatch, loads, fleet, CRM, and operations are available.' };
  }
  if (command.action === 'load-planning') {
    shell.openLoadPlanning?.();
    return { handled: true, message: 'Dispatch load comparison and the closed-loop trip triangle are open. This prepares a plan only; it does not book freight.' };
  }
  if (command.action === 'weather') {
    await shell.openWeather?.();
    return { handled: true, message: 'Weather layers are opening. Check their source status before treating a layer as current.' };
  }
  if (command.action === 'cctv') {
    await shell.openCctv?.();
    return { handled: true, message: 'CCTV coverage is opening. Each camera keeps its own source and freshness status.' };
  }
  if (command.action === 'my-location') {
    shell.routePlanner?.open?.();
    await shell.routePlanner?.useMyLocation?.();
    return { handled: true, message: 'I asked the route planner to use your current location as a route stop. Check the address shown by the planner before routing.' };
  }
  if (command.action === 'optimize-stops') {
    const result = await shell.routePlanner?.optimize?.();
    return { handled: true, message: result ? 'Stop optimization finished. Review the route order, road distance, and restriction status in the route planner.' : 'Stop optimization needs a completed route plan or more route stops.' };
  }
  if (command.action === 'directions') {
    shell.routePlanner?.open?.();
    return { handled: true, message: 'Directions are open. Enter and select real street addresses, then get the road route.' };
  }
  return { handled: false };
}
