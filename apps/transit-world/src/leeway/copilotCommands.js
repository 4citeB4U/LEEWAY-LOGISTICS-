import { routeBriefing } from './routeBriefing.js';

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
  // Negated and conditional requests belong to conversation.
  // A keyword match must never reverse the user's instruction.
  if (/\b(no|not|never|don t|dont|do not|without|instead|if|unless|except)\b/.test(input)) return null;
  if (/\b(review|summari[sz]e|explain)\b.*\b(route|trip)\b/.test(input))
    return { action: 'route-review' };
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
  const target = {
    'personal-map': [shell, 'setPersonalMode'],
    'business-map': [shell, 'setPersonalMode'],
    'load-planning': [shell, 'openLoadPlanning'],
    weather: [shell, 'openWeather'],
    cctv: [shell, 'openCctv'],
    'my-location': [shell.routePlanner, 'useMyLocation'],
    'optimize-stops': [shell.routePlanner, 'optimize'],
    directions: [shell.routePlanner, 'open'],
    'route-review': [shell.routePlanner, 'getState'],
  }[command.action];
  if (!target || typeof target[0]?.[target[1]] !== 'function')
    return { handled: true, ok: false, message: 'This map control is unavailable in the current application. No action was performed.' };
  if (command.action === 'route-review')
    return { handled: true, message: routeBriefing(shell.routePlanner.getState()) };
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
    const point = await shell.routePlanner.useMyLocation();
    return point
      ? { handled: true, message: 'Your current device location is set as the route origin. Check the address and accuracy shown by the planner before routing.' }
      : { handled: true, ok: false, message: 'The route origin was not set. Check the location permission or GPS message in Directions, then try My Location again.' };
  }
  if (command.action === 'optimize-stops') {
    const result = await shell.routePlanner?.optimize?.();
    return { handled: true, ok: !!result, message: result ? 'Stop optimization finished. Review the route order, road distance, and restriction status in the route planner.' : 'Stop optimization did not complete. Check the address selection, vehicle settings or provider error shown in Directions.' };
  }
  if (command.action === 'directions') {
    shell.routePlanner?.open?.();
    return { handled: true, message: 'Directions are open. Enter and select real street addresses, then get the road route.' };
  }
  return { handled: false };
}
