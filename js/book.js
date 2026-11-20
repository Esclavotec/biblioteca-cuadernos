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
import { renderMarkdown, renderInline } from './markdown.js?v=1.3.3';
import { escapeHtml as esc, contrastText, safeSrc } from './util.js?v=1.3.3';

const PAPELES = ['rayado', 'cuadriculado', 'blanco'];
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
    this.content = Array.isArray(book.paginas) ? book.paginas : [];
    this.papel = PAPELES.includes(book.papel) ? book.papel : 'blanco';
    this.destroyed = false;
    const len = this.content.length;
    this.page = Math.max(0, Math.min(len + 1, opts.startPage | 0));

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

    this.pages = this.buildPages();
    document.fonts?.ready.then(() => this.fitMath());     // las fuentes de KaTeX cambian el ancho
    if (window.St?.PageFlip) this.mountFlip();
    else this.mountFallback();
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
      width: 500, height: 690,           // proporción de la hoja (1 : 1.38)
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
    this.flip.on('changeOrientation', () => this.sync(this.flip.getCurrentPageIndex()));
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
  fitMath() {
    if (this.destroyed) return;
    const anchoReal = (box) => {
      const partes = [...box.querySelectorAll('.katex-html > .base, .math-raw')].map((e) => e.getBoundingClientRect());
      return partes.length ? Math.max(...partes.map((r) => r.right)) - Math.min(...partes.map((r) => r.left)) : 0;
    };
    const enLinea = [...this.el.querySelectorAll('.page-content .katex')].filter((k) => !k.closest('.math-display, .postit-debajo, .postit'));
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
    for (const m of this.el.querySelectorAll('.math-display')) {
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
    clearTimeout(this.fitTimer);
    try { this.flip?.destroy(); } catch { /* ya desmontado */ }
    this.el.remove();
  }
}
