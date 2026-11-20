/**
 * lib.mjs — Ayudas para dibujar esquemas de matemáticas en SVG con aspecto de lápiz.
 *
 * Convención de ejes (la del cuaderno): x hacia abajo a la izquierda, y a la derecha, z hacia arriba.
 * La proyección es ortográfica con una cámara que mira desde (azimut, elevación).
 *
 *   const cam = camara({ az: 25, el: 20, s: 45, cx: 150, cy: 130 });
 *   cam.p([x, y, z])  → [sx, sy] en la imagen
 *
 * Las superficies de revolución calculan su contorno exacto (donde la normal es perpendicular a la vista).
 */

export const LAPIZ = '#4b4e52';
export const ROJO = '#c0322a';
export const AZUL = '#2c3d9c';
export const SUAVE = '#8a8d90';

const f = (n) => (Math.abs(n) < 1e-9 ? 0 : n).toFixed(1);
const deg = Math.PI / 180;
export const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
export const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
export const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
export const mul = (a, k) => [a[0] * k, a[1] * k, a[2] * k];

export function camara({ az = 25, el = 20, s = 40, cx = 150, cy = 130 } = {}) {
  const a = az * deg, e = el * deg;
  const R = [-Math.sin(a), Math.cos(a), 0];
  const U = [-Math.cos(a) * Math.sin(e), -Math.sin(a) * Math.sin(e), Math.cos(e)];
  const V = [Math.cos(a) * Math.cos(e), Math.sin(a) * Math.cos(e), Math.sin(e)]; // hacia quien mira
  return { R, U, V, s, cx, cy, p: (q) => [cx + s * dot(q, R), cy - s * dot(q, U)] };
}

/* ---------------------------- Trazos 2D ---------------------------- */

export function linea(pts, { c = LAPIZ, w = 1.6, dash = false, fill = 'none', op = 1, cerrar = false } = {}) {
  if (pts.length < 2) return '';
  const d = 'M' + pts.map((p) => `${f(p[0])} ${f(p[1])}`).join(' L') + (cerrar ? ' Z' : '');
  return `<path d="${d}" fill="${fill}" stroke="${c}" stroke-width="${w}"${dash ? ` stroke-dasharray="${dash === true ? '4.5 4' : dash}"` : ''}${op < 1 ? ` opacity="${op}"` : ''} stroke-linecap="round" stroke-linejoin="round"/>`;
}

/** Punta de flecha abierta, como se dibuja a mano. */
export function punta(desde, hasta, { c = LAPIZ, w = 1.6, t = 8 } = {}) {
  const ang = Math.atan2(hasta[1] - desde[1], hasta[0] - desde[0]);
  const a1 = ang + Math.PI - 0.45, a2 = ang + Math.PI + 0.45;
  return linea([[hasta[0] + t * Math.cos(a1), hasta[1] + t * Math.sin(a1)], hasta, [hasta[0] + t * Math.cos(a2), hasta[1] + t * Math.sin(a2)]], { c, w });
}

export function flecha(a, b, op = {}) {
  return linea([a, b], op) + punta(a, b, op);
}

export function punto([x, y], { c = LAPIZ, r = 3 } = {}) {
  return `<circle cx="${f(x)}" cy="${f(y)}" r="${r}" fill="${c}"/>`;
}

const escXml = (s) => String(s).replace(/[&<>]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[ch]));

export function texto([x, y], str, { c = LAPIZ, size = 14, anchor = 'start', italic = true, peso = 400 } = {}) {
  return `<text x="${f(x)}" y="${f(y)}" font-size="${size}" fill="${c}" text-anchor="${anchor}" font-weight="${peso}"${italic ? ' font-style="italic"' : ''}>${escXml(str)}</text>`;
}

/** Letra con flechita encima (vector). */
export function vec([x, y], letra, { c = LAPIZ, size = 15 } = {}) {
  const w = size * 0.5;
  const top = y - size * 0.82;
  return texto([x, y], letra, { c, size }) +
    linea([[x - 1, top], [x + w + 2, top]], { c, w: 1.1 }) + punta([x - 1, top], [x + w + 2, top], { c, w: 1.1, t: 3.5 });
}

export function circulo([x, y], r, op = {}) {
  const pts = [];
  for (let i = 0; i <= 72; i++) pts.push([x + r * Math.cos(i * 5 * deg), y + r * Math.sin(i * 5 * deg)]);
  return linea(pts, op);
}

/* ---------------------------- Trazos 3D ---------------------------- */

export const linea3 = (cam, pts, op) => linea(pts.map(cam.p), op);
export const flecha3 = (cam, a, b, op) => flecha(cam.p(a), cam.p(b), op);
export const punto3 = (cam, q, op) => punto(cam.p(q), op);

/** Curva paramétrica en 3D: fn(t) → [x, y, z]. */
export function curva3(cam, fn, t0, t1, op = {}, n = 80) {
  const pts = [];
  for (let i = 0; i <= n; i++) pts.push(fn(t0 + ((t1 - t0) * i) / n));
  return linea3(cam, pts, op);
}

/**
 * Eje desde `de` hasta `a` (números a lo largo del eje) con flecha y nombre.
 * `ocultos`: tramos [t0, t1] que se dibujan punteados (por dentro de una superficie).
 */
export function eje(cam, cual, de, a, { nombre = cual, ocultos = [], c = LAPIZ, w = 1.4 } = {}) {
  const u = { x: [1, 0, 0], y: [0, 1, 0], z: [0, 0, 1] }[cual];
  const P = (t) => mul(u, t);
  let out = '';
  const cortes = [de, ...ocultos.flat().filter((t) => t > de && t < a), a].sort((m, n) => m - n);
  for (let i = 0; i < cortes.length - 1; i++) {
    const mid = (cortes[i] + cortes[i + 1]) / 2;
    const oculto = ocultos.some(([o0, o1]) => mid > o0 && mid < o1);
    out += linea3(cam, [P(cortes[i]), P(cortes[i + 1])], { c, w, dash: oculto });
  }
  const fin = cam.p(P(a)), antes = cam.p(P(a - 0.1));
  out += punta(antes, fin, { c, w });
  if (nombre) {
    const dx = fin[0] - antes[0], dy = fin[1] - antes[1], L = Math.hypot(dx, dy) || 1;
    out += texto([fin[0] + (dx / L) * 10 - 4, fin[1] + (dy / L) * 10 + 5], nombre, { c, size: 13 });
  }
  return out;
}

export function ejes(cam, { x = [0, 2], y = [0, 2], z = [0, 2], ocultos = {}, nombres = {} } = {}) {
  return ['x', 'y', 'z'].map((k) => {
    const r = { x, y, z }[k];
    return r ? eje(cam, k, r[0], r[1], { ocultos: ocultos[k] || [], nombre: nombres[k] ?? k }) : '';
  }).join('');
}

/* ----------------------- Superficies de revolución ----------------------- */

const MARCOS = {
  z: { a: [0, 0, 1], e1: [1, 0, 0], e2: [0, 1, 0] },
  x: { a: [1, 0, 0], e1: [0, 1, 0], e2: [0, 0, 1] },
  y: { a: [0, 1, 0], e1: [0, 0, 1], e2: [1, 0, 0] },
};

/**
 * Superficie de revolución alrededor de un eje: radio r(t) a la altura t.
 *   contorno(t0, t1)  → las dos curvas de contorno (sólidas)
 *   aro(t, modo)      → un círculo de la superficie; modo 'completo' (borde abierto, se ve entero)
 *                       o 'frente' (la mitad de atrás va punteada)
 */
export function revolucion(cam, { eje: cual = 'z', centro = [0, 0, 0], r }) {
  const { a, e1, e2 } = MARCOS[cual];
  const V = cam.V;
  const dr = (t) => (r(t + 1e-4) - r(t - 1e-4)) / 2e-4;
  const P = (t, th) => add(add(centro, mul(a, t)), add(mul(e1, r(t) * Math.cos(th)), mul(e2, r(t) * Math.sin(th))));
  const A = dot(e1, V), B = dot(e2, V);

  function contorno(t0, t1, op = {}, n = 120) {
    const ramas = [[], []];
    const trozos = [];
    for (let i = 0; i <= n; i++) {
      const t = t0 + ((t1 - t0) * i) / n;
      const C = dr(t) * dot(a, V);
      const M = Math.hypot(A, B);
      if (M < 1e-9 || Math.abs(C) > M) {
        ramas.forEach((rm, k) => { if (rm.length > 1) trozos.push(rm); ramas[k] = []; });
        continue;
      }
      const phi = Math.atan2(B, A), del = Math.acos(C / M);
      ramas[0].push(P(t, phi + del));
      ramas[1].push(P(t, phi - del));
    }
    ramas.forEach((rm) => { if (rm.length > 1) trozos.push(rm); });
    return trozos.map((tr) => linea3(cam, tr, op)).join('');
  }

  function aro(t, modo = 'frente', op = {}) {
    const n = 96, pts = [];
    for (let i = 0; i <= n; i++) {
      const th = (i / n) * 2 * Math.PI;
      const radial = add(mul(e1, Math.cos(th)), mul(e2, Math.sin(th)));
      const normal = sub(radial, mul(a, dr(t)));
      pts.push({ q: P(t, th), frente: modo === 'completo' || dot(normal, V) >= 0 });
    }
    // Agrupa en tramos seguidos de frente / atrás
    let out = '', cur = [pts[0]];
    for (let i = 1; i < pts.length; i++) {
      if (pts[i].frente === cur[0].frente) cur.push(pts[i]);
      else { cur.push(pts[i]); out += linea3(cam, cur.map((x) => x.q), { ...op, dash: !cur[0].frente || op.dash }); cur = [pts[i]]; }
    }
    out += linea3(cam, cur.map((x) => x.q), { ...op, dash: !cur[0].frente || op.dash });
    return out;
  }

  return { contorno, aro, P };
}

/** Esfera: contorno circular exacto + ecuador (atrás punteado). */
export function esfera(cam, centro, radio, { ecuador = true, op = {} } = {}) {
  const c = cam.p(centro);
  let out = circulo(c, radio * cam.s, op);
  if (ecuador) out += revolucion(cam, { centro, r: (t) => Math.sqrt(Math.max(0, radio * radio - t * t)) }).aro(0, 'frente', op);
  return out;
}

/* ---------------------------- Documento ---------------------------- */

/** Envuelve el dibujo en un SVG con un filtro que imita el grano del lápiz. */
export function svg(w, h, cuerpo, titulo = '') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" font-family="Georgia, 'Times New Roman', serif">
${titulo ? `<title>${escXml(titulo)}</title>\n` : ''}<defs><filter id="lapiz" x="-3%" y="-3%" width="106%" height="106%"><feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="2" seed="7" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="1.7" xChannelSelector="R" yChannelSelector="G"/></filter></defs>
<g filter="url(#lapiz)">
${cuerpo}
</g>
</svg>
`;
}
