/**
 * Dibujos del cuaderno "Cálculo y Análisis III" (books/cya-3-rosales/img/*.svg).
 * Regenerar:  node tools/dibujos/cya-3-rosales.mjs
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  LAPIZ, ROJO, AZUL, SUAVE, camara, linea, flecha, punta, punto, texto, vec, circulo,
  linea3, flecha3, punto3, curva3, eje, ejes, revolucion, esfera, svg, add, mul,
} from './lib.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.join(root, 'books/cya-3-rosales/img');
mkdirSync(OUT, { recursive: true });
const D = {};

/* ---------------- Espacio vectorial ---------------- */

D['r2'] = svg(260, 210, (() => {
  const O = [90, 150];
  return flecha([20, 150], [240, 150]) + flecha([90, 200], [90, 18]) + linea([[20, 150], [90, 150]]) +
    texto([244, 156], 'x', { size: 13 }) + texto([96, 22], 'y', { size: 13 }) +
    linea([[190, 62], [190, 150]], { c: ROJO, dash: true }) + linea([[190, 62], [90, 62]], { c: ROJO, dash: true }) +
    flecha(O, [190, 62], { c: LAPIZ, w: 1.8 }) + punto([190, 62]) + punto([190, 150], { r: 2.5 }) + punto([90, 62], { r: 2.5 }) +
    vec([196, 52], 'x') + texto([184, 170], 'x₁', { size: 13 }) + texto([64, 67], 'x₂', { size: 13 }) +
    texto([18, 30], 'ℝ²', { size: 20, italic: false });
})(), 'R2: el punto x = (x1, x2)');

D['r3'] = svg(280, 230, (() => {
  const cam = camara({ s: 48, cx: 120, cy: 150 });
  const Q = [1.6, 2.2, 1.9];
  return ejes(cam, { x: [0, 2.8], y: [0, 3.2], z: [0, 2.6] }) +
    linea3(cam, [Q, [Q[0], Q[1], 0]], { c: ROJO, dash: true }) +
    linea3(cam, [[Q[0], Q[1], 0], [Q[0], 0, 0]], { c: ROJO, dash: true }) +
    linea3(cam, [[Q[0], Q[1], 0], [0, Q[1], 0]], { c: ROJO, dash: true }) +
    flecha3(cam, [0, 0, 0], Q, { w: 1.8 }) + punto3(cam, Q) +
    texto(add(cam.p(Q), [6, -6]), '(x₁, x₂, x₃)', { size: 13 }) +
    texto([18, 30], 'ℝ³', { size: 20, italic: false });
})(), 'R3: el punto (x1, x2, x3)');

/* ---------------- Cauchy-Schwarz: la parábola no toca el eje ---------------- */

D['parabola-cs'] = svg(280, 210, (() => {
  const par = [];
  for (let i = -60; i <= 60; i++) { const u = i / 40; par.push([170 + u * 58, 120 - u * u * 42]); } // abre hacia arriba, vértice sobre el eje
  return flecha([20, 170], [262, 170]) + flecha([60, 200], [60, 15]) +
    texto([254, 162], 'λ', { size: 14 }) +
    linea(par, { w: 1.8 }) + punto([170, 120], { r: 2.5 }) +
    linea([[170, 120], [170, 170]], { dash: true, c: SUAVE }) +
    texto([70, 30], 'p(λ) = aλ² + bλ + c', { size: 13 }) +
    texto([70, 50], 'siempre > 0', { size: 13, c: ROJO }) +
    texto([70, 198], 'no corta el eje λ  →  Δ < 0', { size: 12 });
})(), 'Parábola siempre positiva: discriminante negativo');

/* ---------------- Espacios ---------------- */

D['espacios'] = svg(300, 190, (() => {
  const caja = (x, y, w, h) => linea([[x, y], [x + w, y], [x + w, y + h], [x, y + h]], { cerrar: true, w: 1.6 });
  return caja(12, 12, 276, 166) + caja(74, 46, 200, 120) + caja(136, 84, 124, 70) +
    texto([22, 34], 'Métrico', { size: 15 }) + texto([84, 68], 'Normado', { size: 15 }) +
    texto([150, 124], 'Hilbert', { size: 15 }) +
    texto([22, 54], 'd(x, y)', { size: 11, c: SUAVE }) + texto([84, 86], '‖x‖', { size: 11, c: SUAVE }) +
    texto([150, 142], '⟨x, y⟩ + completo', { size: 11, c: SUAVE });
})(), 'Espacios métricos, normados y de Hilbert');

/* ---------------- Ley del paralelogramo ---------------- */

D['paralelogramo'] = svg(320, 220, (() => {
  const O = [36, 196], X = [116, 70], Y = [222, 150], S = [302, 24];
  return flecha([20, 196], [312, 196], { w: 1.2, c: SUAVE }) + flecha([36, 210], [36, 12], { w: 1.2, c: SUAVE }) +
    flecha(O, X, { w: 1.8 }) + flecha(O, Y, { w: 1.8 }) +
    linea([X, S], { dash: true }) + linea([Y, S], { dash: true }) +
    flecha(O, S, { c: AZUL, w: 1.8 }) + flecha(Y, X, { c: ROJO, w: 1.8 }) +
    vec([82, 92], 'x') + vec([150, 192], 'y') +
    texto([196, 70], 'x + y', { c: AZUL, size: 13 }) + texto([150, 104], 'x − y', { c: ROJO, size: 13 });
})(), 'Paralelogramo: diagonales x + y y x - y');

/* ---------------- Ángulo entre vectores ---------------- */

D['angulo'] = svg(280, 200, (() => {
  const O = [50, 170], X = [140, 40], Y = [255, 110];
  const a1 = Math.atan2(X[1] - O[1], X[0] - O[0]), a2 = Math.atan2(Y[1] - O[1], Y[0] - O[0]);
  const arco = [];
  for (let i = 0; i <= 30; i++) { const a = a1 + ((a2 - a1) * i) / 30; arco.push([O[0] + 46 * Math.cos(a), O[1] + 46 * Math.sin(a)]); }
  return flecha([20, 170], [270, 170], { w: 1.2, c: SUAVE }) + flecha([50, 194], [50, 12], { w: 1.2, c: SUAVE }) +
    flecha(O, X, { w: 1.8 }) + flecha(O, Y, { w: 1.8 }) + linea(arco, { c: ROJO }) +
    texto([96, 140], 'θ', { size: 17, c: ROJO }) + vec([146, 40], 'x') + vec([258, 104], 'y') +
    texto([120, 196], 'cos θ = ⟨x, y⟩ / (‖x‖ ‖y‖)', { size: 12, anchor: 'middle' });
})(), 'Ángulo theta entre x e y');

/* ---------------- Rectas en R³ ---------------- */

D['recta-r3'] = svg(300, 230, (() => {
  const cam = camara({ s: 46, cx: 140, cy: 160 });
  const A = [1.0, 0.3, 1.7], v = [-0.5, 1.0, 0.18];
  const B = add(A, mul(v, 1.4));
  return ejes(cam, { x: [0, 2.6], y: [0, 3.2], z: [0, 2.6] }) +
    linea3(cam, [add(A, mul(v, -1.6)), add(A, mul(v, 2.4))], { c: LAPIZ, w: 1.6 }) +
    punta(cam.p(add(A, mul(v, 2.2))), cam.p(add(A, mul(v, 2.4)))) +
    flecha3(cam, A, add(A, mul(v, 0.8)), { c: AZUL, w: 2.2 }) +
    punto3(cam, A) + punto3(cam, B) +
    texto(add(cam.p(A), [-18, -10]), 'A', { size: 14 }) + texto(add(cam.p(B), [4, -9]), 'B', { size: 14 }) +
    vec(add(cam.p(add(A, mul(v, 0.55))), [-4, 22]), 'v', { c: AZUL }) +
    texto(add(cam.p(add(A, mul(v, 2.4))), [6, -4]), 'L', { size: 15 }) +
    texto([150, 24], 'A(x₀, y₀, z₀)   B(x, y, z)', { size: 12 });
})(), 'Recta L que pasa por A con dirección v');

/* ---------------- Esferas ---------------- */

D['esfera-unitaria'] = svg(260, 230, (() => {
  const cam = camara({ s: 62, cx: 125, cy: 120 });
  return esfera(cam, [0, 0, 0], 1) +
    ejes(cam, { x: [0, 2.1], y: [0, 1.9], z: [0, 1.6], ocultos: { x: [[0, 1]], y: [[0, 1]], z: [[0, 1]] } }) +
    punto3(cam, [1, 0, 0], { r: 2.5 }) + punto3(cam, [0, 1, 0], { r: 2.5 }) + punto3(cam, [0, 0, 1], { r: 2.5 }) +
    texto([10, 222], 'x² + y² + z² = 1', { size: 13 });
})(), 'Esfera de centro el origen y radio 1');

D['esfera-z1'] = svg(260, 250, (() => {
  const cam = camara({ s: 55, cx: 120, cy: 180 });
  return ejes(cam, { x: [0, 2.0], y: [0, 2.2], z: [0, 2.5] }, ) +
    esfera(cam, [0, 0, 1], 1) +
    linea3(cam, [[0, 0, 0], [0, 0, 2]], { dash: true }) +
    punto3(cam, [0, 0, 1]) + punto3(cam, [0, 0, 0], { r: 2.5 }) +
    texto(add(cam.p([0, 0, 1]), [6, 4]), '(0, 0, 1)', { size: 12 }) +
    texto([96, 242], 'x² + y² + (z − 1)² = 1', { size: 13 });
})(), 'Esfera de centro (0, 0, 1) y radio 1, apoyada en el origen');

/* ---------------- Proyección estereográfica ---------------- */

D['estereografica'] = svg(340, 240, (() => {
  const cam = camara({ s: 46, cx: 150, cy: 132, el: 22 });
  const L = 2.5;
  const plano = [[L, -L, 0], [L, L, 0], [-L, L, 0], [-L, -L, 0]];
  const ps = Math.PI / 3, ang = 75 * Math.PI / 180;
  const Pt = [Math.sin(ps) * Math.cos(ang), Math.sin(ps) * Math.sin(ang), Math.cos(ps)];
  const k = 1 / (1 - Pt[2]);
  const Pp = [Pt[0] * k, Pt[1] * k, 0];
  const c = cam.p([0, 0, 0]), r = cam.s;
  const arriba = [], abajo = [];
  for (let i = 0; i <= 36; i++) { const a = Math.PI * i / 36; arriba.push([c[0] + r * Math.cos(a + Math.PI), c[1] + r * Math.sin(a + Math.PI)]); abajo.push([c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)]); }
  const N = [0, 0, 1];
  return linea3(cam, plano, { cerrar: true, w: 1.4 }) + texto(add(cam.p([L, -L, 0]), [10, -4]), 'z = 0', { size: 12 }) +
    linea(arriba, { w: 1.7 }) + linea(abajo, { w: 1.4, dash: true }) +
    revolucion(cam, { r: (t) => Math.sqrt(Math.max(0, 1 - t * t)) }).aro(0, 'frente', { w: 1.4 }) +
    eje(cam, 'z', -1.9, 2.1, { ocultos: [[-1.9, 0]] }) +
    linea3(cam, [N, Pp], { c: ROJO, w: 1.7 }) +
    punto3(cam, N) + punto3(cam, Pt, { c: ROJO }) + punto3(cam, Pp, { c: ROJO }) +
    texto(add(cam.p(N), [-22, -4]), 'N', { size: 14 }) +
    texto(add(cam.p(Pt), [6, -6]), 'P', { size: 14, c: ROJO }) +
    texto(add(cam.p(Pp), [6, 16]), 'π', { size: 13, c: ROJO }).replace('>π<', '>π<tspan font-size="9" dy="3">N</tspan><tspan dy="-3">(P)</tspan><') +
    texto([10, 230], 'S² ∖ {N} → ℝ²', { size: 13 });
})(), 'Proyección estereográfica desde el polo norte');

/* ---------------- Cilindros ---------------- */

D['cilindros'] = svg(380, 320, (() => {
  let out = '';
  // a) Vertical sobre la parábola x = 1 − y²
  {
    const cam = camara({ s: 34, cx: 70, cy: 120 });
    const base = (t) => [1 - t * t, t, 0], h = 1.6;
    out += ejes(cam, { x: [0, 2.0], y: [0, 2.0], z: [0, 2.4] });
    out += curva3(cam, base, -1.2, 1.2) + curva3(cam, (t) => add(base(t), [0, 0, h]), -1.2, 1.2);
    for (let t = -1.2; t <= 1.21; t += 0.4) out += linea3(cam, [base(t), add(base(t), [0, 0, h])], { w: 1.2 });
    out += texto([100, 40], 'x = 1 − y²', { size: 12 });
  }
  // b) Vertical sobre la curva y = x²
  {
    const cam = camara({ s: 34, cx: 230, cy: 120 });
    const base = (t) => [t, t * t, 0], h = 1.4;
    out += ejes(cam, { x: [0, 2.0], y: [0, 2.6], z: [0, 2.3] });
    out += curva3(cam, base, -1.2, 1.2) + curva3(cam, (t) => add(base(t), [0, 0, h]), -1.2, 1.2);
    for (let t = -1.2; t <= 1.21; t += 0.3) out += linea3(cam, [base(t), add(base(t), [0, 0, h])], { w: 1.2 });
    out += texto([270, 40], 'y = x²', { size: 12 });
  }
  // c) Parabólico z = y², generatrices paralelas al eje x
  {
    const cam = camara({ s: 30, cx: 80, cy: 270 });
    const dir = (t, s) => [s, t, t * t];
    out += ejes(cam, { x: [0, 2.4], y: [-1.6, 2.0], z: [0, 2.2] });
    out += curva3(cam, (t) => dir(t, 0), -1.3, 1.3) + curva3(cam, (t) => dir(t, 1.8), -1.3, 1.3);
    for (let t = -1.3; t <= 1.31; t += 0.325) out += linea3(cam, [dir(t, 0), dir(t, 1.8)], { w: 1.2 });
    out += texto([110, 196], 'z = y²', { size: 12 });
  }
  // d) Circular x² + z² = 1 a lo largo del eje y
  {
    const cam = camara({ s: 30, cx: 230, cy: 262 });
    const sup = revolucion(cam, { eje: 'y', r: () => 1 });
    out += ejes(cam, { x: [0, 1.9], y: [0, 4.4], z: [0, 1.9] }, ) +
      sup.contorno(0, 3.2) + sup.aro(0, 'frente') + sup.aro(3.2, 'completo');
    out += texto([270, 196], 'x² + z² = 1', { size: 12 });
  }
  return out;
})(), 'Cuatro cilindros: verticales sobre curvas planas, parabólico y circular');

D['cilindro-general'] = svg(300, 230, (() => {
  const cam = camara({ s: 44, cx: 90, cy: 160 });
  const base = (t) => [0.3 + 0.5 * Math.sin(2.2 * t), t, 0.15 * Math.sin(3 * t)];
  const h = 1.9;
  let out = ejes(cam, { x: [0, 2.2], y: [0, 3.6], z: [0, 2.8] });
  out += curva3(cam, base, 0.4, 3.0, { c: AZUL, w: 2 }) + curva3(cam, (t) => add(base(t), [0, 0, h]), 0.4, 3.0, { c: AZUL, w: 1.2 });
  for (let t = 0.4; t <= 3.01; t += 0.325) {
    out += linea3(cam, [base(t), add(base(t), [0, 0, h])], { c: AZUL, w: 1.2 });
    out += punto3(cam, base(t), { c: AZUL, r: 2.4 });
  }
  out += texto(add(cam.p(base(3.0)), [6, 14]), 'directriz', { c: AZUL, size: 13 });
  out += texto(add(cam.p(add(base(1.7), [0, 0, h])), [8, -10]), 'generatrices', { c: AZUL, size: 13 });
  return out;
})(), 'Cilindro general: directriz y generatrices');

/* ---------------- Superficies cuádricas ---------------- */

const camSup = (cx = 130, cy = 120, s = 50) => camara({ s, cx, cy, el: 18 });

D['cono'] = svg(260, 250, (() => {
  const cam = camSup(130, 125, 62);
  const sup = revolucion(cam, { r: (t) => Math.abs(t) });
  return sup.contorno(0.02, 1.4) + sup.contorno(-1.4, -0.02) + sup.aro(1.4, 'completo') + sup.aro(-1.4, 'frente') +
    eje(cam, 'z', -1.9, 1.9, { ocultos: [[-1.4, 1.4]] }) + eje(cam, 'x', 0, 2.0) + eje(cam, 'y', 0, 1.75) +
    texto([10, 240], 'z² = x² + y²', { size: 13 });
})(), 'Cono de dos ramas');

D['paraboloide-arriba'] = svg(240, 230, (() => {
  const cam = camSup(115, 170, 55);
  const sup = revolucion(cam, { r: (t) => Math.sqrt(Math.max(t, 0)) });
  return eje(cam, 'x', 0, 2.0) + eje(cam, 'y', -0.2, 2.2) +
    sup.contorno(0.001, 2.2) + sup.aro(2.2, 'completo') +
    eje(cam, 'z', 0, 2.8, { ocultos: [[0, 2.2]] }) + punto3(cam, [0, 0, 0], { r: 2.4 }) +
    texto([10, 222], 'z = x² + y²', { size: 13 });
})(), 'Paraboloide elíptico que abre hacia arriba');

D['paraboloide-abajo'] = svg(240, 230, (() => {
  const cam = camSup(115, 70, 55);
  const sup = revolucion(cam, { r: (t) => Math.sqrt(Math.max(-t, 0)) });
  return sup.contorno(-2.2, -0.001) + sup.aro(-2.2, 'frente') +
    eje(cam, 'z', -2.9, 0.9, { ocultos: [[-2.2, 0]] }) + eje(cam, 'x', 0, 2.0) + eje(cam, 'y', -0.2, 2.2) +
    punto3(cam, [0, 0, 0], { r: 2.4 }) +
    texto([10, 222], 'z = −x² − y²', { size: 13 });
})(), 'Paraboloide elíptico que abre hacia abajo');

D['elipsoide'] = svg(280, 210, (() => {
  const cam = camSup(140, 105, 58);
  const a = 1.9, c = 0.95;
  const sup = revolucion(cam, { r: (t) => a * Math.sqrt(Math.max(0, 1 - (t * t) / (c * c))) });
  return sup.contorno(-c + 1e-4, c - 1e-4) + sup.aro(0, 'frente') +
    eje(cam, 'z', -1.5, 1.6, { ocultos: [[-c, c]] }) + eje(cam, 'y', -2.3, 2.5, { ocultos: [[-a, a]] }) +
    eje(cam, 'x', -1.2, 2.6, { ocultos: [[-a, a]] }) +
    punto3(cam, [0, a, 0], { r: 2.4 }) + punto3(cam, [0, -a, 0], { r: 2.4 }) + punto3(cam, [0, 0, c], { r: 2.4 }) +
    texto([10, 202], 'x²/a² + y²/b² + z²/c² = 1', { size: 13 });
})(), 'Elipsoide');

D['ejm-7'] = svg(450, 230, (() => {
  let out = '';
  const panel = (cx, cy, signo, h, etiqueta) => {
    const cam = camSup(cx, cy, 34);
    const sup = revolucion(cam, { centro: [0, 0, h], r: (t) => Math.sqrt(Math.max(signo * t, 0)) });
    let s = eje(cam, 'x', 0, 1.6) + eje(cam, 'y', -0.2, 1.8);
    if (signo > 0) s += sup.contorno(0.001, 2.0) + sup.aro(2.0, 'completo') + eje(cam, 'z', 0, 2.6, { ocultos: [[0, 2.0]] });
    else s += sup.contorno(-2.0, -0.001) + sup.aro(-2.0, 'frente') + eje(cam, 'z', -1.6, h + 0.9, { ocultos: [[h - 2.0, h]] });
    s += punto3(cam, [0, 0, h], { r: 2.4 });
    if (h) s += texto(add(cam.p([0, 0, h]), [6, 4]), '7', { size: 13, c: ROJO });
    return s + texto([cx - 60, 222], etiqueta, { size: 12 });
  };
  out += panel(75, 150, 1, 0, 'z = x² + y²');
  out += panel(225, 80, -1, 0, 'z = −x² − y²');
  out += panel(375, 150, -1, 2.2, 'z = 7 − x² − y²');
  out += texto([140, 40], '→', { size: 22, italic: false }) + texto([290, 40], '→ sube 7', { size: 14, italic: false });
  return out;
})(), 'z = 7 - x² - y²: el paraboloide hacia abajo subido 7 unidades');

D['hiperboloide-z'] = svg(250, 260, (() => {
  const cam = camSup(125, 130, 52);
  const a = 0.8, c = 0.75;
  const sup = revolucion(cam, { r: (t) => a * Math.sqrt(1 + (t * t) / (c * c)) });
  return sup.contorno(-1.6, 1.6) + sup.aro(1.6, 'completo') + sup.aro(-1.6, 'frente') + sup.aro(0, 'frente', { w: 1.3 }) +
    eje(cam, 'z', -2.2, 2.2, { ocultos: [[-1.6, 1.6]] }) + eje(cam, 'x', 0, 2.6, { ocultos: [[0, a]] }) + eje(cam, 'y', -2.2, 2.6, { ocultos: [[-a, a]] }) +
    texto([10, 252], 'x²/a² + y²/b² − z²/c² = 1', { size: 13 });
})(), 'Hiperboloide de una hoja alrededor del eje z');

D['cono-x'] = svg(260, 210, (() => {
  const cam = camara({ az: 62, el: 18, s: 44, cx: 180, cy: 98 });
  const sup = revolucion(cam, { eje: 'x', r: (t) => t });
  return eje(cam, 'z', 0, 1.7) + eje(cam, 'y', 0, 1.6) +
    sup.contorno(0.01, 1.5) + sup.aro(1.5, 'completo') +
    eje(cam, 'x', 0, 2.5, { ocultos: [[0, 1.5]] }) +
    texto([10, 202], 'x = √(y² + z²)', { size: 13 });
})(), 'Media rama de cono alrededor del eje x');

D['paraboloide-y'] = svg(280, 200, (() => {
  const cam = camara({ az: 22, el: 18, s: 44, cx: 70, cy: 96 });
  const sup = revolucion(cam, { eje: 'y', r: (t) => Math.sqrt(Math.max(t, 0)) });
  return eje(cam, 'x', 0, 1.6) + eje(cam, 'z', 0, 1.8) +
    sup.contorno(0.001, 2.6) + sup.aro(2.6, 'completo') +
    eje(cam, 'y', 0, 4.2, { ocultos: [[0, 2.6]] }) +
    texto([10, 192], 'y = x² + z²', { size: 13 });
})(), 'Paraboloide alrededor del eje y');

D['hiperboloide-x'] = svg(320, 230, (() => {
  const cam = camara({ az: 66, el: 16, s: 44, cx: 160, cy: 112 });
  const sup = revolucion(cam, { eje: 'x', r: (t) => 0.75 * Math.sqrt(1 + t * t / 0.8) });
  return sup.contorno(-2.0, 2.0) + sup.aro(-2.0, 'completo') + sup.aro(2.0, 'completo') + sup.aro(0, 'frente', { w: 1.3 }) +
    eje(cam, 'x', -2.7, 2.8, { ocultos: [[-2.0, 2.0]] }) + eje(cam, 'z', -1.9, 1.9, { ocultos: [[-0.75, 0.75]] }) + eje(cam, 'y', -0.2, 2.0, { ocultos: [[0, 0.75]] }) +
    texto([10, 222], '−x²/a² + y²/b² + z²/c² = 1', { size: 13 });
})(), 'Hiperboloide de una hoja alrededor del eje x');

/* ---------------- Curvas: esfera ∩ cono ---------------- */

D['curva-esfera-cono'] = svg(300, 260, (() => {
  const cam = camara({ s: 64, cx: 140, cy: 200, el: 20 });
  const L = 1.8;
  const plano = [[L, -L, 1], [L, L, 1], [-L, L, 1], [-L, -L, 1]];
  const cono = revolucion(cam, { r: (t) => t });
  const circ = revolucion(cam, { centro: [0, 0, 1], r: () => 1 });
  return eje(cam, 'x', 0, 2.2) + eje(cam, 'y', 0, 2.4) +
    linea3(cam, plano, { cerrar: true, w: 1.2, c: SUAVE }) + texto(add(cam.p([-L, L, 1]), [-34, 16]), 'z = 1', { size: 12 }) +
    esfera(cam, [0, 0, 1], 1, { ecuador: false }) +
    cono.contorno(0.01, 1.0) +
    circ.aro(0, 'frente', { c: ROJO, w: 2.2 }) +
    eje(cam, 'z', 0, 2.55, { ocultos: [[0, 2]] }) + punto3(cam, [0, 0, 0], { r: 2.5 }) +
    texto(add(cam.p([0, 1, 1]), [8, 18]), 'x² + y² = 1', { size: 13, c: ROJO });
})(), 'La esfera y el cono se cortan en el círculo rojo x² + y² = 1, z = 1');

/* ---------------- Planos ---------------- */

D['plano-normal'] = svg(280, 200, (() => {
  const cam = camara({ s: 48, cx: 140, cy: 140, el: 24 });
  const L = 1.9;
  return linea3(cam, [[L, -L, 0], [L, L, 0], [-L, L, 0], [-L, -L, 0]], { cerrar: true, w: 1.6 }) +
    flecha3(cam, [0, 0, 0], [0, 0, 1.9], { w: 2, c: AZUL }) + punto3(cam, [0, 0, 0]) +
    vec(add(cam.p([0, 0, 1.6]), [8, 0]), 'n', { c: AZUL }) +
    texto(add(cam.p([0, 0, 1.6]), [22, 0]), '= (a, b, c)', { size: 13, c: AZUL }) +
    texto([10, 192], 'ax + by + cz = d', { size: 13 });
})(), 'Plano con su vector normal');

D['plano-pqr'] = svg(300, 250, (() => {
  const cam = camara({ s: 44, cx: 150, cy: 130, az: 35, el: 22 });
  const P = [1, -1, 0], Q = [0, 1, -1], R = [-1, 0, 1];
  const u = [1 / Math.SQRT2, -1 / Math.SQRT2, 0], w = [1 / Math.sqrt(6), 1 / Math.sqrt(6), -2 / Math.sqrt(6)];
  const k = 2.0;
  const esq = [add(mul(u, k), mul(w, k)), add(mul(u, -k), mul(w, k)), add(mul(u, -k), mul(w, -k)), add(mul(u, k), mul(w, -k))];
  return ejes(cam, { x: [0, 2.2], y: [0, 2.4], z: [0, 2.2] }) +
    linea3(cam, esq, { cerrar: true, w: 1.5 }) +
    flecha3(cam, P, Q, { c: AZUL, w: 1.8 }) + flecha3(cam, P, R, { c: AZUL, w: 1.8 }) +
    flecha3(cam, [0, 0, 0], [0.9, 0.9, 0.9], { c: ROJO, w: 2 }) +
    punto3(cam, P) + punto3(cam, Q) + punto3(cam, R) +
    texto(add(cam.p(P), [-16, 14]), 'P', { size: 14 }) + texto(add(cam.p(Q), [6, 14]), 'Q', { size: 14 }) + texto(add(cam.p(R), [-16, -6]), 'R', { size: 14 }) +
    vec(add(cam.p([0.9, 0.9, 0.9]), [6, -2]), 'n', { c: ROJO }) +
    texto([10, 242], 'x + y + z = 0', { size: 13 });
})(), 'Plano por P, Q y R con normal PQ × PR');

for (const [nombre, contenido] of Object.entries(D)) writeFileSync(path.join(OUT, `${nombre}.svg`), contenido);
console.log(`${Object.keys(D).length} dibujos en ${path.relative(root, OUT)}`);
