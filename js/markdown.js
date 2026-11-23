/**
 * markdown.js — Markdown mínimo y seguro para los apuntes.
 *
 * Soporta:
 *   # / ## / ###  títulos        **negrita**   *cursiva*   `código`   ==resaltado==
 *   - lista       1. lista numerada            > cita
 *     - sublista (con dos espacios delante)
 *   Línea en blanco = nuevo párrafo.
 *
 * Matemáticas (con KaTeX si está cargado; si no, se muestra el código TeX tal cual):
 *   $x^2$          fórmula dentro de la línea
 *   $$ ... $$      fórmula centrada (en una línea, o abriendo y cerrando con una línea "$$")
 *
 * Tintas (colores de bolígrafo):
 *   {rojo|texto}  {azul|texto}  {negro|texto}  {lapiz|texto}     dentro de una línea
 *   :::azul  …  :::                                              bloque entero
 *
 * Todo el texto se escapa ANTES de aplicar formato, así que nunca se inserta HTML del autor.
 * KaTeX se usa con trust:false, así que tampoco puede generar enlaces ni HTML arbitrario.
 */
import { escapeHtml } from './util.js?v=1.3.4';

export const TINTAS = ['rojo', 'azul', 'negro', 'lapiz'];

/** Convierte TeX en HTML. Sin KaTeX (p. ej. en los tests de Node) deja el TeX escapado. */
export function renderMath(tex, display = false) {
  const katex = globalThis.katex;
  if (katex?.renderToString) {
    try {
      return katex.renderToString(tex, { displayMode: display, throwOnError: false, trust: false, strict: 'ignore', output: 'htmlAndMathml' });
    } catch { /* cae al modo texto */ }
  }
  return `<span class="math-raw">${escapeHtml(tex)}</span>`;
}

/** Formato dentro de una línea (recibe texto ya escapado). */
function inline(escaped) {
  return escaped
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/==([^=]+)==/g, '<mark>$1</mark>')
    .replace(/\{(rojo|azul|negro|lapiz)\|([^{}]*)\}/g, '<span class="tinta tinta-$1">$2</span>');
}

/** Formato de una sola línea (para ítems de lista, pies de foto…). */
export function renderInline(text) {
  // Las fórmulas se apartan antes de escapar, para que * o _ dentro de ellas no se tomen como formato.
  const maths = [];
  const hold = String(text ?? '').replace(/\$([^$\n]+)\$/g, (_, tex) => `\u0000${maths.push(tex) - 1}\u0000`);
  return inline(escapeHtml(hold)).replace(/\u0000(\d+)\u0000/g, (_, i) => renderMath(maths[i]));
}

/** Convierte un bloque de texto markdown en HTML. */
export function renderMarkdown(src) {
  const lines = String(src ?? '').replace(/\r/g, '').split('\n');
  let html = '';
  let list = null;     // 'ul' | 'ol' | null
  let para = [];       // líneas del párrafo actual
  let math = null;     // líneas de una fórmula $$ … $$ abierta
  let tintas = 0;      // bloques ::: abiertos

  const flushPara = () => {
    if (para.length) { html += `<p>${renderInline(para.join(' '))}</p>`; para = []; }
  };
  const closeList = () => {
    if (list) { html += `</${list}>`; list = null; }
  };
  const openList = (type, start = 1) => {
    if (list !== type) { closeList(); html += start > 1 ? `<${type} start="${start}">` : `<${type}>`; list = type; }
  };
  const block = (tex) => `<div class="math-display">${renderMath(tex.trim(), true)}</div>`;

  for (const raw of lines) {
    const line = raw.trimEnd();
    let m;

    if (math) {                                   // dentro de $$ … $$
      if (line.trim() === '$$') { html += block(math.join('\n')); math = null; }
      else math.push(line);
      continue;
    }
    if (!line.trim()) { flushPara(); closeList(); continue; }

    if (line.trim() === '$$') {
      flushPara(); closeList(); math = [];
    } else if ((m = line.match(/^\s*\$\$(.+)\$\$\s*$/))) {
      flushPara(); closeList();
      html += block(m[1]);
    } else if ((m = line.match(/^:::(rojo|azul|negro|lapiz)\s*$/))) {
      flushPara(); closeList();
      html += `<div class="tinta tinta-${m[1]}">`; tintas++;
    } else if (line.trim() === ':::') {
      flushPara(); closeList();
      if (tintas) { html += '</div>'; tintas--; }
    } else if ((m = line.match(/^(#{1,3})\s+(.*)$/))) {
      flushPara(); closeList();
      const level = m[1].length + 1; // # -> h2 (h1 se reserva para portadas)
      html += `<h${level}>${renderInline(m[2])}</h${level}>`;
    } else if ((m = line.match(/^\s*[-*•]\s+(.*)$/))) {
      flushPara(); openList('ul');
      html += /^\s{2,}/.test(line) ? `<li class="sub">${renderInline(m[1])}</li>` : `<li>${renderInline(m[1])}</li>`;
    } else if ((m = line.match(/^\s*(\d+)[.)]\s+(.*)$/))) {
      flushPara(); openList('ol', Number(m[1]));
      html += `<li>${renderInline(m[2])}</li>`;
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
  if (math) html += block(math.join('\n'));      // $$ sin cerrar
  html += '</div>'.repeat(tintas);               // ::: sin cerrar
  return html;
}
