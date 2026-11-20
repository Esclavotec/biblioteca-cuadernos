/**
 * guestbook.js — Cuaderno de visitas (hojas blancas).
 *
 * Cada firma es una página del cuaderno: dibujo + mensaje + nombre + fecha.
 * El botón "✍️ Firmar" abre una hoja en blanco con lápices de colores, grosores,
 * borrador, deshacer y limpiar. Al guardar, el cuaderno se recarga en la nueva página.
 */
import { BookViewer } from './book.js?v=1.3.1';
import { store, validarFirma, LIMITES } from './store.js?v=1.3.1';
import { toast } from './util.js?v=1.3.1';

const COLORES = ['#1f2937', '#c0392b', '#2563eb', '#16a34a', '#d97706', '#9333ea', '#db2777', '#0d9488'];
const GROSORES = [3, 7, 14, 28];        // en píxeles del lienzo
const LIENZO = { w: 900, h: 1242 };      // misma proporción que una página (1:1.38)
const EXPORT = { w: 600, h: 828 };       // tamaño con el que se guarda el dibujo

export class Guestbook {
  constructor(container, opts = {}) {
    this.container = container;
    this.opts = opts;
    this.viewer = null;
    this.count = 0;
  }

  /** Carga las firmas y abre el cuaderno en la página indicada. */
  async open(startPage = 0) {
    let firmas = [];
    try { firmas = await store.list(); }
    catch (err) { console.error(err); toast('No se pudieron cargar las firmas', 'error'); }
    if (this.destroyed) return;
    this.count = firmas.length;

    const book = {
      titulo: 'Cuaderno de visitas',
      curso: 'Para quien pase por aquí',
      subtitulo: 'Firmas, mensajes y dibujos',
      color: '#f7f7f4',
      papel: 'blanco',
      paginas: [
        { tipo: 'titulo', titulo: 'Cuaderno de visitas', subtitulo: 'Gracias por pasar por mi biblioteca. Deja tu **firma**, un *mensaje* o un dibujo en una hoja en blanco.' },
        ...firmas.map((f) => ({ tipo: 'firma', ...f })),
        { tipo: 'nueva' },
      ],
    };

    this.viewer?.destroy();
    this.viewer = new BookViewer(this.container, book, {
      startPage,
      onClose: this.opts.onClose,
      onPageChange: this.opts.onPageChange,
      onAction: (act) => { if (act === 'firmar') this.openEditor(); },
    });
    this.viewer.el.classList.add('guest');
    this.viewer.extra.innerHTML =
      (store.mode === 'local' ? '<span class="badge" title="Aún no hay Firebase conectado: las firmas solo se guardan en este navegador.">Modo local</span>' : '') +
      '<button type="button" class="btn primary" data-act="firmar"><i class="ph ph-pen-nib" aria-hidden="true"></i><span class="lbl">Firmar</span></button>';
  }

  destroy() {
    this.destroyed = true;
    this.viewer?.destroy();
    this.modal?.remove();
  }

  /* ------------------------- Editor de firma ------------------------- */

  openEditor() {
    if (this.modal) return;
    const m = document.createElement('div');
    m.className = 'modal';
    m.innerHTML = `
      <form class="editor" role="dialog" aria-modal="true" aria-label="Firmar el cuaderno de visitas" novalidate>
        <div class="editor-canvas">
          <canvas width="${LIENZO.w}" height="${LIENZO.h}" aria-label="Hoja en blanco para dibujar"></canvas>
        </div>
        <div class="editor-side">
          <h2>Tu hoja en blanco</h2>
          <div class="tools" role="toolbar" aria-label="Herramientas de dibujo">
            <div class="swatches">${COLORES.map((c, i) => `<button type="button" class="swatch${i ? '' : ' on'}" data-color="${c}" style="--sw:${c}" aria-label="Color ${c}"></button>`).join('')}</div>
            <div class="sizes">${GROSORES.map((s, i) => `<button type="button" class="size${i === 1 ? ' on' : ''}" data-size="${s}" aria-label="Grosor ${s}"><i style="--s:${Math.max(3, s / 2)}px"></i></button>`).join('')}</div>
            <div class="tool-row">
              <button type="button" class="tool" data-tool="eraser" aria-pressed="false"><i class="ph ph-eraser" aria-hidden="true"></i>Borrador</button>
              <button type="button" class="tool" data-tool="undo"><i class="ph ph-arrow-counter-clockwise" aria-hidden="true"></i>Deshacer</button>
              <button type="button" class="tool" data-tool="clear"><i class="ph ph-trash" aria-hidden="true"></i>Limpiar</button>
            </div>
          </div>
          <label>Tu nombre <input name="nombre" maxlength="${LIMITES.nombre}" required autocomplete="name"></label>
          <label>Mensaje <span class="opt">(opcional si dibujas)</span>
            <textarea name="texto" maxlength="${LIMITES.texto}" rows="4" placeholder="Escribe algo bonito…"></textarea></label>
          <p class="err" role="alert"></p>
          <div class="actions">
            <button type="button" class="btn ghost" data-ed="cancel">Cancelar</button>
            <button type="submit" class="btn primary" data-ed="save">Guardar en el cuaderno</button>
          </div>
        </div>
      </form>`;
    document.body.appendChild(m);
    this.modal = m;

    const canvas = m.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    const form = m.querySelector('form');
    const errEl = m.querySelector('.err');
    const state = { color: COLORES[0], size: GROSORES[1], eraser: false, drawing: false, last: null, history: [], hasInk: false };

    const blank = () => { ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, canvas.width, canvas.height); };
    blank();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Coordenadas del puntero en píxeles del lienzo
    const pos = (e) => {
      const r = canvas.getBoundingClientRect();
      return { x: (e.clientX - r.left) * canvas.width / r.width, y: (e.clientY - r.top) * canvas.height / r.height };
    };
    const stroke = (a, b, e) => {
      const pressure = e.pointerType === 'pen' && e.pressure ? 0.4 + e.pressure : 1;
      ctx.strokeStyle = state.eraser ? '#ffffff' : state.color;
      ctx.lineWidth = state.size * (state.eraser ? 2 : 1) * pressure;
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
    };

    canvas.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      canvas.setPointerCapture(e.pointerId);
      state.history.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
      if (state.history.length > 25) state.history.shift();
      state.drawing = true;
      state.last = pos(e);
      stroke(state.last, { x: state.last.x + 0.1, y: state.last.y }, e); // punto
      if (!state.eraser) state.hasInk = true;
    });
    canvas.addEventListener('pointermove', (e) => {
      if (!state.drawing) return;
      const events = e.getCoalescedEvents ? e.getCoalescedEvents() : [e];
      for (const ev of events) { const p = pos(ev); stroke(state.last, p, ev); state.last = p; }
    });
    const end = () => { state.drawing = false; state.last = null; };
    canvas.addEventListener('pointerup', end);
    canvas.addEventListener('pointercancel', end);

    // Herramientas
    m.addEventListener('click', (e) => {
      const sw = e.target.closest('.swatch');
      if (sw) {
        state.color = sw.dataset.color; state.eraser = false;
        m.querySelectorAll('.swatch').forEach((b) => b.classList.toggle('on', b === sw));
        m.querySelector('[data-tool="eraser"]').setAttribute('aria-pressed', 'false');
        return;
      }
      const sz = e.target.closest('.size');
      if (sz) {
        state.size = Number(sz.dataset.size);
        m.querySelectorAll('.size').forEach((b) => b.classList.toggle('on', b === sz));
        return;
      }
      const tool = e.target.closest('[data-tool]')?.dataset.tool;
      if (tool === 'eraser') {
        state.eraser = !state.eraser;
        e.target.closest('[data-tool]').setAttribute('aria-pressed', String(state.eraser));
      } else if (tool === 'undo') {
        const img = state.history.pop();
        if (img) ctx.putImageData(img, 0, 0);
        if (!state.history.length) state.hasInk = false;
      } else if (tool === 'clear') {
        state.history.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
        blank(); state.hasInk = false;
      }
      if (e.target.closest('[data-ed="cancel"]')) close();
      if (e.target === m) close(); // clic fuera del editor
    });

    const close = (force = false) => {
      if (!force && state.hasInk && !confirm('¿Descartar tu dibujo?')) return;
      m.remove();
      this.modal = null;
      document.removeEventListener('keydown', onKey);
    };
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);

    // Guardar
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const datos = {
        nombre: form.nombre.value,
        texto: form.texto.value,
        dibujo: state.hasInk ? exportar(canvas) : '',
      };
      const v = validarFirma(datos);
      if (!v.ok) { errEl.textContent = v.errores.join('. '); return; }
      const btn = m.querySelector('[data-ed="save"]');
      btn.disabled = true; btn.textContent = 'Guardando…';
      try {
        await store.add(v.firma);
        close(true);
        toast('Gracias. Tu firma ya está en el cuaderno', 'ok');
        await this.open(this.count + 2); // intro = pág 1, la nueva firma va al final
      } catch (err) {
        console.error(err);
        errEl.textContent = err.message || 'No se pudo guardar. Inténtalo otra vez.';
        btn.disabled = false; btn.textContent = 'Guardar en el cuaderno';
      }
    });

    setTimeout(() => form.nombre.focus(), 50);
  }
}

/** Reduce el dibujo y lo convierte a JPEG (base64) para que pese poco. */
function exportar(canvas) {
  const out = document.createElement('canvas');
  out.width = EXPORT.w; out.height = EXPORT.h;
  out.getContext('2d').drawImage(canvas, 0, 0, EXPORT.w, EXPORT.h);
  let data = out.toDataURL('image/jpeg', 0.82);
  if (data.length > LIMITES.dibujo) data = out.toDataURL('image/jpeg', 0.55);
  return data;
}
