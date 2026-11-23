/**
 * book.js — Visor de cuadernos con pase de página realista.
 *
 * Usa StPageFlip (window.St.PageFlip, MIT): la hoja se curva desde la esquina,
 * deja ver el reverso y proyecta sombra sobre la página de abajo. Se puede
 * ARRASTRAR la esquina, hacer clic en la página, usar las flechas o deslizar.
 *
 * Índices de página (los mismos que la URL #/libro/<id>/<n>):
 *   0 = portada · 1..N = páginas de apuntes · N+1 = contraportada
 * En pantallas anchas se ve a doble página; en celular, una página (modo "portrait").
 *
 * Uso:
 *   const v = new BookViewer(contenedor, libro, { startPage, onClose, onPageChange, onAction });
 *   v.next(); v.prev(); v.goToPage(3); v.destroy();
 */
import { renderMarkdown, renderInline } from './markdown.js?v=1.4.0';
import { escapeHtml as esc, contrastText, safeSrc, toast } from './util.js?v=1.4.0';

const PAPELES = ['rayado', 'cuadriculado', 'blanco'];
const PROPORCION = 1.414;                                  // alto / ancho de una hoja A4
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function formatDate(d) {
  try { return new Date(d).toLocaleDateString('es', { day: 'numeric', month: 'long', year: 'numeric' }); }
  catch { return ''; }
}

/** Imagen ampliable. Va dentro de un <button> para que el clic no voltee la hoja. */
function zoomable(src, alt, cls = '') {
  return `<button type="button" class="zoom" data-act="zoom" data-src="${esc(src)}" aria-label="Ampliar imagen">` +
    `<img class="${cls}" src="${esc(src)}" alt="${esc(alt)}" loading="lazy"></button>`;
}

/** HTML interior de una página según su "tipo". Todo texto pasa por esc()/markdown seguro. */
/**
 * Añade hojas de índice después de la portadilla (si la primera página es de tipo "titulo").
 * Cada entrada es el título de una página con su número ya contando las hojas del índice.
 * Devuelve { paginas, indice } donde indice es el número de la primera hoja de índice (0 si no hay).
 */
export const POR_HOJA_INDICE = 13;
export function conIndice(paginas) {
  const inicio = paginas[0]?.tipo === 'titulo' ? 1 : 0;
  const temas = paginas.map((p, i) => ({ p, i })).filter(({ p, i }) => i >= inicio && p?.titulo);
  if (temas.length < 3) return { paginas, indice: 0 };
  const hojas = Math.ceil(temas.length / POR_HOJA_INDICE);
  const indice = [];
  for (let h = 0; h < hojas; h++) {
    indice.push({
      tipo: 'indice',
      titulo: h ? 'Índice (cont.)' : 'Índice',
      entradas: temas.slice(h * POR_HOJA_INDICE, (h + 1) * POR_HOJA_INDICE).map(({ p, i }) => ({ titulo: p.titulo, pagina: i + 1 + hojas })),
    });
  }
  return { paginas: [...paginas.slice(0, inicio), ...indice, ...paginas.slice(inicio)], indice: inicio + 1 };
}

/**
 * Acomodo automático, como en un cuaderno de verdad: el contenido corre de hoja en hoja.
 * Cada tema se parte en bloques (párrafos, fórmulas, listas, dibujos, notas) medidos en orden;
 * un bloque nunca se corta, y un título no se queda solo al pie de la hoja.
 *   bloques[j] = { s: nº de página de origen, top, bottom, encabezado }  (posiciones en el flujo)
 *   cap = alto útil de la hoja; porIndice = entradas de índice por hoja.
 * Las páginas de tipo "titulo" van solas. Devuelve las hojas (listas de nº de bloque),
 * las hojas de índice ya numeradas, el número de la primera hoja de índice y la hoja de cada tema.
 */
export function acomodar(paginas, bloques, { cap, porIndice = POR_HOJA_INDICE } = {}) {
  const inicio = paginas[0]?.tipo === 'titulo' ? 1 : 0;
  const hojas = [];
  let cur = null, desde = 0;
  for (let j = 0; j < bloques.length; j++) {
    const b = bloques[j];
    if (b.s < inicio) continue;
    const sola = paginas[b.s]?.tipo === 'titulo';
    let cabe = !!cur && b.bottom - desde <= cap;
    if (cur && (sola || cur.sola)) cabe = cur.sola && sola && cur.s === b.s;   // portadillas: solas en su hoja
    if (cabe && b.encabezado) {                       // el título baja junto con lo que le sigue
      const sig = bloques[j + 1];
      if (sig && sig.s === b.s && sig.bottom - desde > cap) cabe = false;
    }
    if (!cabe) { cur = { bloques: [], sola, s: b.s }; hojas.push(cur); desde = b.top; }
    cur.bloques.push(j); cur.s = b.s;
  }
  const primeraHoja = new Map();
  hojas.forEach((h, k) => h.bloques.forEach((j) => { if (!primeraHoja.has(bloques[j].s)) primeraHoja.set(bloques[j].s, k); }));
  const temas = [...primeraHoja].filter(([sIdx]) => paginas[sIdx]?.titulo && paginas[sIdx].tipo !== 'titulo')
    .map(([sIdx, k]) => ({ titulo: paginas[sIdx].titulo, k }));
  const porHoja = Math.max(5, porIndice | 0);
  const nIndice = temas.length >= 3 ? Math.ceil(temas.length / porHoja) : 0;
  const numero = (k) => inicio + nIndice + k + 1;
  const indice = [];
  for (let h = 0; h < nIndice; h++) {
    indice.push({
      tipo: 'indice', titulo: h ? 'Índice (cont.)' : 'Índice',
      entradas: temas.slice(h * porHoja, (h + 1) * porHoja).map(({ titulo, k }) => ({ titulo, pagina: numero(k) })),
    });
  }
  const hojaDe = new Map([...primeraHoja].map(([sIdx, k]) => [paginas[sIdx], numero(k)]));
  return { hojas: hojas.map((h) => h.bloques), indice, inicio, primeraIndice: nIndice ? inicio + 1 : 0, hojaDe };
}

/** HTML ya armado de una hoja acomodada (no puede venir de un JSON: la clave es un Symbol). */
const HTML_HOJA = Symbol('html');

export function pageInnerHtml(p) {
  if (!p) return '';
  let html = '';
  switch (p.tipo) {
    case 'titulo':
      html = `<div class="pc-titulo"><h1>${esc(p.titulo)}</h1>${p.subtitulo ? `<p class="sub">${renderInline(p.subtitulo)}</p>` : ''}</div>`;
      break;
    case 'texto':
      html = (p.titulo ? `<h2>${esc(p.titulo)}</h2>` : '') + renderMarkdown(p.contenido);
      break;
    case 'lista':
      html = (p.titulo ? `<h2>${esc(p.titulo)}</h2>` : '') +
        `<ul class="checklist">${(p.items || []).map((it) => `<li>${renderInline(it)}</li>`).join('')}</ul>`;
      break;
    case 'imagen': {
      const src = safeSrc(p.src);
      html = (p.titulo ? `<h2>${esc(p.titulo)}</h2>` : '') +
        `<figure class="pc-imagen">${src ? zoomable(src, p.pie || p.titulo || 'Imagen del apunte') : '<div class="img-missing">Imagen no disponible</div>'}` +
        `${p.pie ? `<figcaption>${renderInline(p.pie)}</figcaption>` : ''}</figure>`;
      break;
    }
    case 'firma': { // páginas del cuaderno de visitas
      const src = safeSrc(p.dibujo);
      html = `<div class="pc-firma">` +
        (src ? zoomable(src, `Dibujo de ${p.nombre}`, 'dibujo') : '') +
        (p.texto ? `<p class="mensaje">${esc(p.texto)}</p>` : '') +
        `<p class="autor">${esc(p.nombre)}</p>` +
        (p.fecha ? `<p class="fecha">${esc(formatDate(p.fecha))}</p>` : '') +
        `</div>`;
      break;
    }
    case 'hoja': // hoja del acomodo automático: su HTML lo arma el visor con bloques ya escapados
      return p[HTML_HOJA] || '';
    case 'indice': // hojas generadas por acomodar(): cada tema lleva a su página
      html = `<h2>${esc(p.titulo)}</h2><ol class="indice">` + (p.entradas || []).map((e) =>
        `<li><button type="button" data-act="goto" data-page="${e.pagina | 0}" aria-label="${esc(e.titulo)}, página ${e.pagina | 0}">` +
        `<span class="t">${esc(e.titulo)}</span><span class="puntos" aria-hidden="true"></span><span class="n">${e.pagina | 0}</span></button></li>`).join('') +
        `</ol>`;
      break;
    case 'nueva':
      html = `<div class="pc-nueva"><p>Esta hoja espera tu firma</p>
        <button type="button" class="btn" data-act="firmar">Firmar en esta hoja</button></div>`;
      break;
    default:
      html = '';
  }
  if (Array.isArray(p.dibujos) && p.dibujos.length) html += postits(p.dibujos);
  const notas = Array.isArray(p.nota) ? p.nota : p.nota ? [p.nota] : [];
  notas.forEach((n) => { html += `<aside class="nota">${renderMarkdown(n)}</aside>`; }); // admite listas
  return html;
}

/**
 * Dibujos pegados como post-its. Están sujetos por el borde de arriba: al tocarlos
 * se levantan (sin despegarse) y dejan ver lo que hay escrito debajo, en "debajo".
 */
const POSTIT_COLORES = ['amarillo', 'rosa', 'celeste', 'verde'];
function postits(dibujos) {
  return `<div class="postits${dibujos.length === 1 ? ' solo' : ''}">` + dibujos.map((d, i) => {
    const src = safeSrc(d?.src);
    if (!src) return '';
    const color = POSTIT_COLORES.includes(d.color) ? d.color : POSTIT_COLORES[i % POSTIT_COLORES.length];
    const pie = d.pie ? renderInline(d.pie) : '';
    const alt = d.alt || String(d.pie || 'Dibujo del apunte').replace(/[$\\{}]/g, '');
    const giro = ((i * 37) % 7 - 3) * 0.5; // -1.5° … 1.5°, estable
    return `<figure class="postit-slot" style="--giro:${giro}deg">` +
      `<div class="postit-debajo"><p>${d.debajo ? renderInline(d.debajo) : '<span class="vacio">(nada escrito debajo)</span>'}</p></div>` +
      `<button type="button" class="postit ${color}" data-act="lift" aria-pressed="false" aria-label="Levantar el post-it para ver lo que hay debajo">` +
      `<img src="${esc(src)}" alt="${esc(alt)}" decoding="sync">` +
      (pie ? `<span class="postit-pie">${pie}</span>` : '') + `</button>` +
      `<button type="button" class="postit-zoom" data-act="zoom" data-src="${esc(src)}" data-alt="${esc(alt)}" aria-label="Ampliar dibujo"><i class="ph ph-magnifying-glass-plus" aria-hidden="true"></i></button>` +
      `</figure>`;
  }).join('') + `</div>`;
}

export class BookViewer {
  constructor(root, book, opts = {}) {
    this.root = root;
    this.book = book;
    this.opts = opts;
    this.fuente = Array.isArray(book.paginas) ? book.paginas : [];
    this.content = this.fuente;
    this.indicePagina = 0;
    this.papel = PAPELES.includes(book.papel) ? book.papel : 'blanco';
    this.destroyed = false;
    this.page = Math.max(0, opts.startPage | 0);

    const color = /^#[0-9a-f]{6}$/i.test(book.color) ? book.color : '#3b3f3d';
    this.el = document.createElement('div');
    this.el.className = book.tintas ? 'viewer tintas' : 'viewer';
    this.el.style.setProperty('--c', color);
    this.el.style.setProperty('--ct', contrastText(color));
    this.el.innerHTML = `
      <header class="viewer-bar">
        <button type="button" class="btn" data-act="close" aria-label="Volver a la biblioteca"><i class="ph ph-arrow-left" aria-hidden="true"></i><span class="lbl">Biblioteca</span></button>
        <div class="viewer-title">${esc(book.titulo)}</div>
        <div class="viewer-extra"></div>
      </header>
      <div class="stage"><div class="book-frame"><div class="flip-host"></div></div></div>
      <footer class="viewer-foot">
        <button type="button" class="nav-btn" data-act="prev" aria-label="Página anterior"><i class="ph ph-caret-left" aria-hidden="true"></i></button>
        <span class="indicator" aria-live="polite"></span>
        <button type="button" class="nav-btn next" data-act="next" aria-label="Página siguiente"><i class="ph ph-caret-right" aria-hidden="true"></i></button>
      </footer>`;
    // .book-frame fija el tamaño y centra la tapa; .flip-host es de StPageFlip (le pone width:100%)
    this.frame = this.el.querySelector('.book-frame');
    this.host = this.el.querySelector('.flip-host');
    this.indicator = this.el.querySelector('.indicator');

    this.onClick = (e) => this.handleClick(e);
    this.onKey = (e) => this.handleKey(e);
    this.el.addEventListener('click', this.onClick);
    document.addEventListener('keydown', this.onKey);
    this.onResize = () => { clearTimeout(this.fitTimer); this.fitTimer = setTimeout(() => this.fitMath(), 150); };
    window.addEventListener('resize', this.onResize);
    root.appendChild(this.el);
    document.fonts?.ready.then(() => this.fitMath());     // las fuentes de KaTeX cambian el ancho
    if (opts.indice) this.preparar().then(() => this.montar());
    else this.montar();
  }

  /** Arma las hojas del libro: con acomodo automático (cuadernos) o una página por hoja. */
  async preparar() {
    this.modoPortrait = this.host.clientWidth < 480;     // StPageFlip usa una sola hoja si no caben dos de 240 px
    try {
      const m = await this.medir(this.modoPortrait);
      if (this.destroyed) return;
      const r = acomodar(this.fuente, m.bloques, m);
      const hojas = r.hojas.map((js) => ({ tipo: 'hoja', [HTML_HOJA]: this.htmlHoja(js, m.bloques), secciones: [...new Set(js.map((j) => m.bloques[j].s))] }));
      this.content = [...this.fuente.slice(0, r.inicio), ...r.indice, ...hojas];
      this.indicePagina = r.primeraIndice; this.hojaDe = r.hojaDe;
    } catch {
      ({ paginas: this.content, indice: this.indicePagina } = conIndice(this.fuente));
      this.hojaDe = null;
    }
    this.extra.innerHTML =
      (this.indicePagina ? `<button type="button" class="btn" data-act="indice" aria-label="Ir al índice"><i class="ph ph-list-bullets" aria-hidden="true"></i><span class="lbl">Índice</span></button>` : '') +
      `<button type="button" class="btn" data-act="pdf" aria-label="Descargar en PDF"><i class="ph ph-file-pdf" aria-hidden="true"></i><span class="lbl">PDF</span></button>`;
  }

  /**
   * Mide cada tema en una hoja de prueba fuera de pantalla. Todo en la hoja escala con su ancho
   * (unidades cqi y em), así que basta medir con un ancho de referencia y vale para cualquier pantalla.
   */
  async medir(portrait) {
    const ANCHO = 500, ALTO = Math.round(ANCHO * PROPORCION);
    const m = document.createElement('div');
    m.className = `book-frame medidor${portrait ? ' portrait' : ''}`;
    m.setAttribute('aria-hidden', 'true');
    const temas = this.fuente.map((p) => `<section class="tema">${pageInnerHtml(p)}</section>`).join('');
    const prueba = `<section class="tema">${pageInnerHtml({ tipo: 'indice', titulo: 'Índice', entradas: [{ titulo: 'a', pagina: 1 }, { titulo: 'b', pagina: 2 }] })}</section>`;
    m.innerHTML = `<div class="page page-paper --right" style="position:relative;width:${ANCHO}px;height:${ALTO}px"><div class="paper-face ${this.papel}"><div class="page-content caja"></div></div></div>` +
      `<div class="page page-paper --right libre" style="position:relative;width:${ANCHO}px"><div class="paper-face ${this.papel}"><div class="page-content">${temas}${prueba}</div></div></div>`;
    this.el.appendChild(m);
    try {
      await Promise.all([document.fonts?.ready, ...[...m.querySelectorAll('img')].map((im) => (im.complete ? null : new Promise((ok) => { im.onload = im.onerror = ok; })))]);
      this.fitMath(m);
      const caja = m.querySelector('.caja'), cs = getComputedStyle(caja);
      const cap = (caja.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom)) * 0.98;
      const secs = [...m.querySelectorAll('.libre .tema')];
      const prueba = secs.pop();                                         // la de prueba del índice
      const base = m.querySelector('.libre .page-content').getBoundingClientRect().top;
      const bloques = [];
      secs.forEach((sec, sIdx) => {
        for (const hijo of sec.children) {
          // Los bloques de tinta (:::azul, :::lapiz) se parten por dentro para poder seguir en otra hoja
          const partes = hijo.matches('div.tinta') && hijo.children.length > 1 ? [...hijo.children] : [hijo];
          const grupo = partes.length > 1 ? bloques.length : -1;
          for (const el of partes) {
            const r = el.getBoundingClientRect();
            bloques.push({ s: sIdx, top: r.top - base, bottom: r.bottom - base, encabezado: /^H[23]$/.test(el.tagName),
              html: el.outerHTML, grupo, clase: grupo >= 0 ? hijo.className : '' });
          }
        }
      });
      const lis = [...prueba.querySelectorAll('li')].map((e) => e.getBoundingClientRect());
      const porIndice = lis.length === 2 ? Math.floor((cap - (lis[0].top - prueba.getBoundingClientRect().top)) / (lis[1].top - lis[0].top)) : POR_HOJA_INDICE;
      if (!(cap > 0) || !bloques.length) throw new Error('sin medidas');
      return { bloques, cap, porIndice };
    } finally { m.remove(); }
  }

  /** Junta los bloques de una hoja: cada tema en su <section>, y los trozos de una misma tinta en un solo div. */
  htmlHoja(js, bloques) {
    let html = '', abierta = -1, grupo = -1;
    js.forEach((j, n) => {
      const b = bloques[j];
      if (b.s !== abierta) {
        if (grupo >= 0) { html += '</div>'; grupo = -1; }
        if (abierta >= 0) html += '</section>';
        const sigue = n === 0 && j > 0 && bloques[j - 1].s === b.s;     // el tema empezó en la hoja anterior
        html += `<section class="tema${sigue ? ' cont' : ''}">`;
        abierta = b.s;
      }
      if (b.grupo !== grupo) {
        if (grupo >= 0) html += '</div>';
        if (b.grupo >= 0) html += `<div class="${b.clase}">`;
        grupo = b.grupo;
      }
      html += b.html;
    });
    if (grupo >= 0) html += '</div>';
    if (abierta >= 0) html += '</section>';
    return html;
  }

  /** Construye las hojas y monta el pase de página. */
  montar(hojaInicial) {
    if (this.destroyed) return;
    const len = this.content.length;
    this.page = Math.max(0, Math.min(len + 1, hojaInicial ?? this.page));
    this.pages = this.buildPages();
    if (window.St?.PageFlip) this.mountFlip();
    else this.mountFallback();
  }

  /** Si la pantalla pasa de una hoja a dos (o al revés), el renglón cambia: se vuelve a acomodar. */
  async reacomodar() {
    if (this.reacomodando || !this.opts.indice) return;
    this.reacomodando = true;
    const actual = this.content[this.toIndex(this.page) - 1];
    const tema = actual?.tipo === 'hoja' ? this.fuente[actual.secciones[0]] : null;
    try { this.flip?.destroy(); } catch { /* ya desmontado */ }
    this.flip = null;
    this.host = document.createElement('div');
    this.host.className = 'flip-host';
    this.frame.replaceChildren(this.host);
    await this.preparar();
    this.reacomodando = false;
    this.montar(tema && this.hojaDe?.get(tema) ? this.hojaDe.get(tema) : this.page);
  }

  /** Contenedor de la barra superior donde se pueden añadir botones extra. */
  get extra() { return this.el.querySelector('.viewer-extra'); }
  get last() { return this.pages.length - 1; }

  /* ---------- Páginas ---------- */

  buildPages() {
    const pages = [this.makeCover(false)];
    this.content.forEach((p, i) => pages.push(this.makePaper(p, i + 1)));
    // Con portada suelta, el total debe ser par para que la contraportada quede sola al final
    if (this.content.length % 2) pages.push(this.makePaper(null, null));
    pages.push(this.makeCover(true));
    return pages;
  }

  makeCover(isBack) {
    const el = document.createElement('div');
    el.className = 'page page-cover';
    el.dataset.density = 'hard';
    const light = contrastText(this.book.color) !== '#fdf8ee';
    el.innerHTML = isBack
      ? `<div class="cover-face${light ? ' light' : ''}"></div>`
      : `<div class="cover-face${light ? ' light' : ''}"><div class="cover-label">
          ${this.book.curso ? `<small>${esc(this.book.curso)}</small>` : ''}
          <strong>${esc(this.book.titulo)}</strong>
          ${this.book.subtitulo ? `<em>${esc(this.book.subtitulo)}</em>` : ''}
        </div></div>`;
    return el;
  }

  makePaper(p, num) {
    const el = document.createElement('div');
    el.className = 'page page-paper';
    el.innerHTML = `<div class="paper-face ${this.papel}"><div class="page-content">${pageInnerHtml(p)}</div>` +
      `${num ? `<span class="page-num">${num}</span>` : ''}</div>`;
    return el;
  }

  /** Índice de la librería → número de página "de la URL" (0, 1..N, N+1). */
  toPage(index) {
    const len = this.content.length;
    if (index <= 0) return 0;
    if (index >= this.last) return len + 1;
    return Math.min(index, len);
  }
  /** Número de página de la URL → índice de la librería. */
  toIndex(page) {
    const len = this.content.length;
    if (page <= 0) return 0;
    if (page > len) return this.last;
    return page;
  }

  /* ---------- StPageFlip ---------- */

  mountFlip() {
    this.flip = new window.St.PageFlip(this.host, {
      width: 500, height: Math.round(500 * PROPORCION), // hoja A4 (1 : √2)
      size: 'stretch',
      minWidth: 240, maxWidth: 900, minHeight: 330, maxHeight: 1250,
      showCover: true,                   // portada y contraportada sueltas, tapa dura
      usePortrait: true,                 // una sola página cuando no cabe la doble
      autoSize: true,
      drawShadow: true,
      maxShadowOpacity: 0.42,
      flippingTime: reducedMotion() ? 1 : 950,
      mobileScrollSupport: true,         // deja hacer scroll dentro de páginas largas
      swipeDistance: 30,
      clickEventForward: true,           // los <a>/<button> de la página reciben su clic
      showPageCorners: true,             // la esquina se levanta al acercar el mouse
      disableFlipByClick: false,
      startPage: this.toIndex(this.page),
    });
    this.flip.loadFromHTML(this.pages);
    requestAnimationFrame(() => this.fitMath());
    this.flip.on('flip', (e) => this.sync(e.data));
    this.flip.on('changeOrientation', (e) => {
      if (this.opts.indice && (e.data === 'portrait') !== this.modoPortrait) return this.reacomodar();
      this.sync(this.flip.getCurrentPageIndex());
    });
    this.flip.on('init', () => this.sync(this.flip.getCurrentPageIndex()));
    // Al empezar a pasar la hoja se bajan los post-its levantados (en 3D se verían encima de la hoja que gira).
    // Las fórmulas se ajustan cuando la hoja ya quedó quieta, nunca a mitad de la animación.
    this.flip.on('changeState', (e) => (e.data === 'read' ? this.fitMath() : this.dropPostits()));
    this.sync(this.toIndex(this.page));
  }

  /** Actualiza indicador, botones, URL y el centrado de la tapa cerrada. */
  sync(index) {
    if (this.destroyed) return;
    const len = this.content.length;
    const portrait = this.flip ? this.flip.getOrientation() === 'portrait' : true;
    this.frame.classList.toggle('portrait', portrait);
    this.frame.classList.toggle('closed-front', index <= 0);
    this.frame.classList.toggle('closed-back', index >= this.last);

    let text;
    if (index <= 0) text = 'Portada';
    else if (index >= this.last) text = 'Contraportada';
    else if (portrait) text = index <= len ? `Página ${index} de ${len}` : '';
    else {
      const left = index % 2 ? index : index - 1;       // pliegos: [1,2] [3,4] …
      const nums = [left, left + 1].filter((n) => n >= 1 && n <= len);
      text = nums.length === 2 ? `Páginas ${nums[0]} y ${nums[1]} de ${len}` : nums.length ? `Página ${nums[0]} de ${len}` : '';
    }
    this.indicator.textContent = text;
    this.page = portrait || index <= 0 || index >= this.last ? this.toPage(index) : this.toPage(index % 2 ? index : index - 1);
    if (!this.flip || reducedMotion()) requestAnimationFrame(() => this.fitMath()); // sin animación no hay 'read'
    this.el.querySelector('[data-act="prev"]').disabled = index <= 0;
    this.el.querySelector('[data-act="next"]').disabled = index >= this.last;
    this.opts.onPageChange?.(this.page);
  }

  /** Baja todos los post-its levantados. */
  dropPostits() {
    for (const slot of this.el.querySelectorAll('.postit-slot.lifted')) {
      slot.classList.remove('lifted');
      slot.querySelector('.postit')?.setAttribute('aria-pressed', 'false');
    }
  }

  /**
   * Fórmulas que no caben:
   *  - una fórmula dentro del texto que se partiría en dos renglones pasa entera a su propia línea, centrada;
   *  - una fórmula centrada más ancha que la hoja se achica lo justo (como mucho hasta el 60 %).
   */
  fitMath(root = this.el) {
    if (this.destroyed) return;
    const anchoReal = (box) => {
      const partes = [...box.querySelectorAll('.katex-html > .base, .math-raw')].map((e) => e.getBoundingClientRect());
      return partes.length ? Math.max(...partes.map((r) => r.right)) - Math.min(...partes.map((r) => r.left)) : 0;
    };
    const enLinea = [...root.querySelectorAll('.page-content .katex')].filter((k) => !k.closest('.math-display, .postit-debajo, .postit'));
    enLinea.forEach((k) => { k.classList.remove('math-linea'); k.style.fontSize = ''; });
    for (const k of enLinea) {
      // En un solo renglón los trozos van de izquierda a derecha; si uno vuelve atrás, la fórmula se partió
      const trozos = [...k.querySelectorAll('.katex-html > .base')].map((e) => e.getBoundingClientRect()).filter((r) => r.width);
      if (!trozos.some((r, i) => i && r.left < trozos[i - 1].left - 1)) continue; // cabe (o la hoja está oculta)
      k.classList.add('math-linea');
    }
    // Si aun sola en su línea no cabe a lo ancho del párrafo, se achica lo justo
    for (const k of enLinea) {
      const bloque = k.closest('p, li, .nota');
      if (!bloque || !k.getClientRects().length) continue;
      const cs = getComputedStyle(bloque);
      const caja = bloque.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      const ancho = anchoReal(k);
      // Se escala desde el tamaño actual (las notas ya usan fórmulas más chicas)
      if (caja > 0 && ancho > caja) k.style.fontSize = `${(parseFloat(getComputedStyle(k).fontSize) * Math.max(0.6, (caja / ancho) * 0.97)).toFixed(2)}px`;
    }
    for (const m of root.querySelectorAll('.math-display')) {
      if (!m.clientWidth) continue;                       // hoja oculta: se ajusta cuando se vea
      m.style.fontSize = '';
      // Ancho real: KaTeX deja que su contenido se salga de la caja sin cambiar scrollWidth
      const ancho = anchoReal(m);
      if (!ancho) continue;
      const ratio = m.clientWidth / ancho;
      if (ratio < 1) m.style.fontSize = `${Math.max(0.6, ratio * 0.97).toFixed(3)}em`;
    }
  }

  /* ---------- Modo de reserva (si no cargó la librería) ---------- */

  mountFallback() {
    this.host.className = 'fallback-book';
    this.host.append(...this.pages);
    this.fbIndex = this.toIndex(this.page);
    this.showFallback();
  }
  showFallback() {
    this.pages.forEach((p, i) => { p.classList.toggle('current', i === this.fbIndex); p.classList.add('--right'); });
    this.sync(this.fbIndex);
  }

  /* ---------- Navegación ---------- */

  next() {
    if (!this.flip) { this.fbIndex = Math.min(this.last, this.fbIndex + 1); return this.showFallback(); }
    if (reducedMotion()) return this.flip.turnToPage(Math.min(this.last, this.flip.getCurrentPageIndex() + (this.flip.getOrientation() === 'portrait' ? 1 : 2)));
    this.flip.flipNext('bottom');
  }
  prev() {
    if (!this.flip) { this.fbIndex = Math.max(0, this.fbIndex - 1); return this.showFallback(); }
    if (reducedMotion()) return this.flip.turnToPage(Math.max(0, this.flip.getCurrentPageIndex() - (this.flip.getOrientation() === 'portrait' ? 1 : 2)));
    this.flip.flipPrev('bottom');
  }
  goToPage(p) {
    const i = this.toIndex(p);
    if (!this.flip) { this.fbIndex = i; return this.showFallback(); }
    reducedMotion() ? this.flip.turnToPage(i) : this.flip.flip(i, 'bottom');
  }

  /* ---------- Eventos ---------- */

  handleClick(e) {
    const actEl = e.target.closest('[data-act]');
    if (!actEl) return;
    const act = actEl.dataset.act;
    if (act === 'close') return this.close();
    if (act === 'prev') return this.prev();
    if (act === 'next') return this.next();
    if (act === 'goto') return this.goToPage(Number(actEl.dataset.page) || 0);
    if (act === 'indice') return this.goToPage(this.indicePagina);
    if (act === 'pdf') return this.imprimir();
    if (act === 'zoom') return this.zoom(actEl.dataset.src, actEl.dataset.alt || actEl.querySelector('img')?.alt || '', actEl.classList.contains('postit-zoom'));
    if (act === 'lift') {
      const up = actEl.getAttribute('aria-pressed') !== 'true';
      actEl.setAttribute('aria-pressed', String(up));
      actEl.closest('.postit-slot')?.classList.toggle('lifted', up);
      return;
    }
    return this.opts.onAction?.(act, e);
  }

  handleKey(e) {
    if (document.querySelector('.modal')) return;            // hay un editor abierto
    if (e.target.closest?.('input, textarea')) return;
    const box = this.el.querySelector('.lightbox');
    if (e.key === 'Escape') { e.preventDefault(); return box ? box.remove() : this.close(); }
    if (box) return;
    if (e.key === 'ArrowRight' || e.key === 'PageDown') { e.preventDefault(); this.next(); }
    if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); this.prev(); }
    if (e.key === 'Home') this.goToPage(0);
    if (e.key === 'End') this.goToPage(this.content.length + 1);
  }

  /**
   * PDF: arma el cuaderno entero en hojas de papel (A4) y abre el diálogo de impresión,
   * donde se elige «Guardar como PDF». Así fórmulas y dibujos quedan como vectores.
   * En el PDF los post-its llevan debajo lo que se lee al levantarlos.
   */
  async imprimir() {
    this.el.querySelector('.print-book')?.remove();
    const b = this.book;
    const pb = document.createElement('div');
    pb.className = 'print-book';
    pb.setAttribute('aria-hidden', 'true');
    // PDF compacto: portada e índice en hojas propias; los temas van seguidos, cada uno con su
    // número de página del cuaderno («p. N»), que es el que usa el índice.
    const seccion = (cls, inner, num) => `<section class="print-page ${cls}">${num ? `<span class="print-num">p. ${num}</span>` : ''}<div class="page-content">${inner}</div></section>`;
    const indices = this.content.filter((p) => p.tipo === 'indice');
    let html = this.content[0]?.tipo === 'titulo' ? seccion('portada', pageInnerHtml(this.content[0])) :
      seccion('portada', pageInnerHtml({ tipo: 'titulo', titulo: b.titulo, subtitulo: [b.curso, b.subtitulo].filter(Boolean).join(' · ') }));
    if (indices.length) {
      html += seccion('print-indice', pageInnerHtml({ tipo: 'indice', titulo: 'Índice', entradas: indices.flatMap((p) => p.entradas || []) }) +
        `<p class="print-aviso">Los números son las páginas del cuaderno: cada tema lleva su «p.» arriba a la derecha.</p>`);
    }
    if (this.hojaDe) {
      this.fuente.forEach((t, i) => { if (!(i === 0 && t.tipo === 'titulo')) html += seccion('flujo', pageInnerHtml(t), this.hojaDe.get(t)); });
    } else {
      this.content.forEach((p, i) => {
        if (p.tipo === 'indice' || (i === 0 && p.tipo === 'titulo')) return;
        html += seccion('flujo', pageInnerHtml(p), i + 1);
      });
    }
    pb.innerHTML = html;
    this.el.appendChild(pb);
    try { toast('Preparando el PDF…'); } catch { /* sin toasts */ }
    // Espera fuentes y dibujos para que el PDF salga completo, y ajusta las fórmulas al ancho del papel
    await Promise.all([document.fonts?.ready, ...[...pb.querySelectorAll('img')].map((im) => im.decode?.().catch(() => {}))]);
    this.fitMath(pb);
    if (this.tituloAntes === undefined) this.tituloAntes = document.title;
    document.title = b.titulo;                          // nombre sugerido del archivo
    window.print();
  }

  /** Muestra una imagen a pantalla completa. */
  zoom(src, alt, dibujo = false) {
    const box = document.createElement('div');
    box.className = dibujo ? 'lightbox dibujo' : 'lightbox';
    box.innerHTML = `<img src="${esc(src)}" alt="${esc(alt)}"><button type="button" class="btn"><i class="ph ph-x" aria-hidden="true"></i>Cerrar</button>`;
    box.addEventListener('click', () => box.remove());
    this.el.appendChild(box);
  }

  close() {
    const cb = this.opts.onClose;
    this.destroy();
    cb?.();
  }

  destroy() {
    if (this.destroyed) return;
    this.destroyed = true;
    document.removeEventListener('keydown', this.onKey);
    window.removeEventListener('resize', this.onResize);
    if (this.tituloAntes !== undefined) document.title = this.tituloAntes;
    clearTimeout(this.fitTimer);
    try { this.flip?.destroy(); } catch { /* ya desmontado */ }
    this.el.remove();
  }
}
