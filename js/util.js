/**
 * util.js — Funciones pequeñas compartidas.
 * Las funciones puras (escapeHtml, contrastText, safeSrc, hashString) también se usan en los tests de Node.
 */

/** Escapa texto para insertarlo dentro de HTML sin riesgo (evita inyección de etiquetas). */
export function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

/** Devuelve un color de texto (claro u oscuro) legible sobre el color de fondo dado (#rrggbb). */
export function contrastText(hex) {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex || '');
  if (!m) return '#fdf8ee';
  const n = parseInt(m[1], 16);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6 ? '#2b2a33' : '#fdf8ee';
}

/**
 * Acepta solo orígenes de imagen seguros:
 *  - rutas relativas del propio sitio (books/mi-curso/img/foto.jpg)
 *  - URLs http(s)
 *  - data:image/... (dibujos del cuaderno de visitas)
 * Cualquier otra cosa (p. ej. "javascript:") devuelve ''.
 */
export function safeSrc(src) {
  const s = String(src ?? '').trim();
  if (/^https?:\/\//i.test(s)) return s;
  if (/^data:image\/(png|jpeg|webp|gif);base64,[A-Za-z0-9+/=]+$/i.test(s)) return s;
  if (/^[\w\-./ ]+$/.test(s) && !s.includes('..')) return s;
  return '';
}

/** Hash numérico simple y estable (para dar a cada lomo un ancho/alto propio). */
export function hashString(str) {
  let h = 2166136261;
  for (const ch of String(str)) h = Math.imul(h ^ ch.codePointAt(0), 16777619);
  return h >>> 0;
}

/** Muestra un mensaje corto abajo de la pantalla (solo navegador). */
export function toast(message, kind = 'info') {
  const host = document.getElementById('toasts');
  if (!host) return;
  const el = document.createElement('div');
  el.className = `toast ${kind}`;
  el.textContent = message;
  host.appendChild(el);
  setTimeout(() => el.classList.add('out'), 3200);
  setTimeout(() => el.remove(), 3700);
}
