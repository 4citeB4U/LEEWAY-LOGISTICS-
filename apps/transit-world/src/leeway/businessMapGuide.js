/** Business guide lives inside existing Settings, not in a duplicate toolbar. */
export function mountBusinessMapGuide({ root, baseUrl = import.meta.env?.BASE_URL || './' } = {}) {
  if (!root?.ownerDocument) return { destroy() {} };
  const link = root.ownerDocument.createElement('a');
  link.className = 'business-map-guide-link';
  link.href = `${baseUrl}business-map-guide.html`;
  link.target = '_blank'; link.rel = 'noopener';
  link.textContent = 'Map guide: layers, colors and icons · Open / print';
  root.appendChild(link);
  return { destroy() { link.remove(); } };
}
