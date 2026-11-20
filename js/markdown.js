/**
 * markdown.js — Markdown mínimo y seguro para los apuntes.
 *
 * Soporta:
 *   # / ## / ###  títulos        **negrita**   *cursiva*   `código`   ==resaltado==
 *   - lista       1. lista numerada            > cita
 *   Línea en blanco = nuevo párrafo.
 *
 * Todo el texto se escapa ANTES de aplicar formato, así que nunca se inserta HTML del autor.
 */
import { escapeHtml } from './util.js';

/** Formato dentro de una línea (recibe texto ya escapado). */
function inline(escaped) {
  return escaped
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/==([^=]+)==/g, '<mark>$1</mark>');
}

/** Formato de una sola línea (para ítems de lista, pies de foto…). */
export function renderInline(text) {
  return inline(escapeHtml(text));
}

/** Convierte un bloque de texto markdown en HTML. */
export function renderMarkdown(src) {
  const lines = String(src ?? '').replace(/\r/g, '').split('\n');
  let html = '';
  let list = null;     // 'ul' | 'ol' | null
  let para = [];       // líneas del párrafo actual

  const flushPara = () => {
    if (para.length) { html += `<p>${renderInline(para.join(' '))}</p>`; para = []; }
  };
  const closeList = () => {
    if (list) { html += `</${list}>`; list = null; }
  };
  const openList = (type) => {
    if (list !== type) { closeList(); html += `<${type}>`; list = type; }
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    let m;
    if (!line.trim()) { flushPara(); closeList(); continue; }

    if ((m = line.match(/^(#{1,3})\s+(.*)$/))) {
      flushPara(); closeList();
      const level = m[1].length + 1; // # -> h2 (h1 se reserva para portadas)
      html += `<h${level}>${renderInline(m[2])}</h${level}>`;
    } else if ((m = line.match(/^\s*[-*•]\s+(.*)$/))) {
      flushPara(); openList('ul');
      html += `<li>${renderInline(m[1])}</li>`;
    } else if ((m = line.match(/^\s*\d+[.)]\s+(.*)$/))) {
      flushPara(); openList('ol');
      html += `<li>${renderInline(m[1])}</li>`;
    } else if ((m = line.match(/^>\s?(.*)$/))) {
      flushPara(); closeList();
      html += `<blockquote>${renderInline(m[1])}</blockquote>`;
    } else {
      closeList();
      para.push(line.trim());
    }
  }
  flushPara();
  closeList();
  return html;
}
