/**
 * app.js — Mesa de estudio + rutas.
 *
 * Rutas (en el # de la URL, así funciona en GitHub Pages sin servidor):
 *   #/                     → mesa con los cuadernos
 *   #/libro/<id>[/<pág>]   → abre books/<id>.json en esa página
 *   #/visitas[/<pág>]      → cuaderno de visitas
 */
import { BookViewer } from './book.js?v=1.3.5';
import { Guestbook } from './guestbook.js?v=1.3.5';
import { escapeHtml as esc, contrastText, hashString, toast } from './util.js?v=1.3.5';

const $ = (sel) => document.querySelector(sel);
const ID_RE = /^[a-z0-9][a-z0-9-]*$/;

let libros = [];
let abierto = null; // BookViewer o Guestbook actual

/* ------------------------------- Mesa ------------------------------- */

async function cargarIndice() {
  const r = await fetch('books/index.json', { cache: 'no-cache' });
  if (!r.ok) throw new Error(`books/index.json: ${r.status}`);
  const data = await r.json();
  libros = Array.isArray(data.libros) ? data.libros : [];
}

/** Pequeño giro y desplazamiento estables por id, para que parezcan dejados sobre la mesa. */
function pose(id) {
  const h = hashString(id);
  const r = ((h % 61) - 30) / 10;          // -3.0° … 3.0°
  const y = ((h >>> 7) % 22);              // 0 … 21 px
  return { r: `${r}deg`, y: `${y}px` };
}

/** Animación corta de "levantar el cuaderno" y luego navegar. */
function abrirCon(a, href) {
  a.addEventListener('click', (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey) return; // nueva pestaña: comportamiento normal
    e.preventDefault();
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { location.hash = href; return; }
    a.classList.add('opening');
    setTimeout(() => { location.hash = href; a.classList.remove('opening'); }, 260);
  });
}

/** Un cuaderno visto desde arriba: tapa de color con etiqueta. */
function cuaderno({ id, titulo, curso, color }, i) {
  const c = /^#[0-9a-f]{6}$/i.test(color) ? color : '#3b3f3d';
  const { r, y } = pose(id);
  const a = document.createElement('a');
  a.className = 'notebook';
  a.href = `#/libro/${id}`;
  a.style.cssText = `--c:${c};--t:${contrastText(c)};--r:${r};--y:${y};--i:${i}`;
  a.setAttribute('aria-label', curso ? `${titulo}, ${curso}` : titulo);
  a.innerHTML = `<span class="nb-label">${curso ? `<small>${esc(curso)}</small>` : ''}<strong>${esc(titulo)}</strong></span>`;
  abrirCon(a, a.getAttribute('href'));
  return a;
}

/** El cuaderno de visitas: libreta blanca con un bolígrafo al lado. */
function cuadernoVisitas(i) {
  const slot = document.createElement('div');
  slot.className = 'guest-slot';
  const a = document.createElement('a');
  a.className = 'notebook guest';
  a.href = '#/visitas';
  const { r, y } = pose('visitas');
  a.style.cssText = `--r:${r};--y:${y};--i:${i}`;
  a.setAttribute('aria-label', 'Cuaderno de visitas: firma, escribe o dibuja');
  a.innerHTML = `<span class="nb-label"><strong>Cuaderno de visitas</strong><small>Firma, escribe o dibuja en una hoja en blanco</small></span>
    <span class="nb-hand" aria-hidden="true">Deja tu firma</span>`;
  abrirCon(a, '#/visitas');
  const pen = document.createElement('span');
  pen.className = 'pen';
  pen.setAttribute('aria-hidden', 'true');
  slot.append(a, pen);
  return slot;
}

function pintarMesa(filtro = '') {
  const desk = $('#desk');
  const q = filtro.trim().toLowerCase();
  const visibles = libros.filter((l) => !q || `${l.titulo} ${l.curso || ''}`.toLowerCase().includes(q));

  desk.replaceChildren();
  visibles.forEach((l, i) => desk.appendChild(cuaderno(l, i)));
  if (!q) {
    desk.appendChild(cuadernoVisitas(visibles.length));
    const nota = document.createElement('p');
    nota.className = 'sticky';
    nota.textContent = 'Toca un cuaderno para abrirlo y arrastra la esquina para pasar la hoja';
    desk.appendChild(nota);
  }
  if (!visibles.length) {
    const p = document.createElement('p');
    p.className = 'desk-empty';
    p.textContent = q ? `Ningún cuaderno coincide con “${filtro}”.` : 'Todavía no hay cuadernos. Agrega uno en books/index.json.';
    desk.prepend(p);
  }
  $('#count').textContent = `${libros.length} ${libros.length === 1 ? 'cuaderno' : 'cuadernos'}`;
}

/* ------------------------------- Rutas ------------------------------- */

function cerrarAbierto() {
  abierto?.destroy();
  abierto = null;
  document.body.classList.remove('reading');
}

const volver = () => { location.hash = '#/'; };

async function abrirLibro(id, pagina) {
  if (!ID_RE.test(id)) { toast('Ese cuaderno no existe', 'error'); return volver(); }
  try {
    const r = await fetch(`books/${id}.json`, { cache: 'no-cache' });
    if (!r.ok) throw new Error(r.status);
    const libro = await r.json();
    document.body.classList.add('reading');
    abierto = new BookViewer($('#viewer-root'), libro, {
      startPage: pagina,
      indice: true,                 // hojas de índice + botones Índice y PDF
      onClose: volver,
      onPageChange: (p) => history.replaceState(null, '', `#/libro/${id}${p ? `/${p}` : ''}`),
    });
    document.title = `${libro.titulo} · Mi biblioteca`;
  } catch (err) {
    console.error(err);
    toast('No se pudo abrir el cuaderno', 'error');
    volver();
  }
}

async function abrirVisitas(pagina) {
  document.body.classList.add('reading');
  const gb = new Guestbook($('#viewer-root'), {
    onClose: volver,
    onPageChange: (p) => history.replaceState(null, '', `#/visitas${p ? `/${p}` : ''}`),
  });
  abierto = gb;
  document.title = 'Cuaderno de visitas · Mi biblioteca';
  await gb.open(pagina);
}

async function enrutar() {
  cerrarAbierto();
  document.title = 'Mi biblioteca';
  const [vista, a, b] = location.hash.replace(/^#\/?/, '').split('/');
  if (vista === 'libro' && a) return abrirLibro(a, Number(b) || 0);
  if (vista === 'visitas') return abrirVisitas(Number(a) || 0);
}

/* ------------------------------- Inicio ------------------------------- */

async function iniciar() {
  try {
    await cargarIndice();
  } catch (err) {
    console.error(err);
    toast('No se pudo cargar la lista de cuadernos', 'error');
  }
  pintarMesa();
  $('#search').addEventListener('input', (e) => pintarMesa(e.target.value));
  window.addEventListener('hashchange', enrutar);
  enrutar();
}

iniciar();
