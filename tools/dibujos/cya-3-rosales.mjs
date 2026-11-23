/**
 * Dibujos del cuaderno "Cálculo y Análisis III" (books/cya-3-rosales/img/*.svg).
 * Regenerar:  node tools/dibujos/cya-3-rosales.mjs
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  LAPIZ, ROJO, AZUL, SUAVE, camara, linea, flecha, punta, punto, texto, vec, circulo,
  linea3, flecha3, punto3, curva3, eje, ejes, revolucion, esfera, svg, add, mul, sub,
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

/* ======================= I parcial, segunda parte ======================= */

const VERDE = '#2f7a4f';
const rect2 = (x, y, w, h, op = {}) => linea([[x, y], [x + w, y], [x + w, y + h], [x, y + h]], { cerrar: true, ...op });

D['planos-coordenados'] = svg(300, 230, (() => {
  const cam = camara({ s: 52, cx: 130, cy: 150 });
  const L = 1.6;
  const cara = (pts, fill) => linea3(cam, pts, { cerrar: true, w: 1, fill, op: .9 });
  return cara([[0, 0, 0], [L, 0, 0], [L, L, 0], [0, L, 0]], 'rgba(44,61,156,.10)') +
    cara([[0, 0, 0], [L, 0, 0], [L, 0, L], [0, 0, L]], 'rgba(192,50,42,.10)') +
    cara([[0, 0, 0], [0, L, 0], [0, L, L], [0, 0, L]], 'rgba(47,122,79,.12)') +
    ejes(cam, { x: [0, 2.3], y: [0, 2.4], z: [0, 2.2] }) +
    texto(cam.p([0.9, 0.9, 0]), 'z = 0', { size: 13, c: AZUL, anchor: 'middle' }) +
    texto(cam.p([0.9, 0, 1.0]), 'y = 0', { size: 13, c: ROJO, anchor: 'middle' }) +
    texto(cam.p([0, 0.85, 1.0]), 'x = 0', { size: 13, c: VERDE, anchor: 'middle' });
})(), 'Los tres planos coordenados: z = 0, y = 0, x = 0');

D['plano-triangulo'] = svg(280, 230, (() => {
  const cam = camara({ s: 80, cx: 110, cy: 150 });
  const A = [1, 0, 0], B = [0, 1, 0], C = [0, 0, 1];
  return ejes(cam, { x: [0, 1.6], y: [0, 1.8], z: [0, 1.5] }) +
    linea3(cam, [A, B, C], { cerrar: true, w: 1.6, fill: 'rgba(44,61,156,.12)', c: AZUL }) +
    punto3(cam, A) + punto3(cam, B) + punto3(cam, C) +
    texto(add(cam.p(A), [-46, 4]), '(1,0,0)', { size: 12 }) + texto(add(cam.p(B), [2, 18]), '(0,1,0)', { size: 12 }) +
    texto(add(cam.p(C), [8, -2]), '(0,0,1)', { size: 12 }) +
    texto([150, 222], 'x + y + z = 1', { size: 13 });
})(), 'El plano x + y + z = 1 corta los ejes en (1,0,0), (0,1,0) y (0,0,1)');

D['plano-y-z'] = svg(280, 230, (() => {
  const cam = camara({ s: 52, cx: 120, cy: 150 });
  const L = 1.7;
  return ejes(cam, { x: [0, 2.3], y: [0, 2.4], z: [0, 2.3] }) +
    linea3(cam, [[0, 0, 0], [L, 0, 0], [L, L, L], [0, L, L]], { cerrar: true, w: 1.5, fill: 'rgba(44,61,156,.12)', c: AZUL }) +
    linea3(cam, [[0, L, 0], [0, L, L]], { dash: true, c: SUAVE }) +
    linea3(cam, [[L, L, 0], [L, L, L]], { dash: true, c: SUAVE }) +
    texto(add(cam.p([0, L, L]), [8, 0]), 'y = z', { size: 13, c: AZUL });
})(), 'El plano y = z contiene al eje x');

D['cilindro-esfera-plano'] = svg(320, 250, (() => {
  const cam = camara({ s: 32, cx: 150, cy: 128, el: 18 });
  const R = Math.sqrt(8);
  const u = [1 / Math.SQRT2, -1 / Math.SQRT2, 0], w = [1 / Math.sqrt(6), 1 / Math.sqrt(6), -2 / Math.sqrt(6)];
  const circ = (t) => add(mul(u, R * Math.cos(t)), mul(w, R * Math.sin(t)));
  const v = [0, 1, 1];
  let out = esfera(cam, [0, 0, 0], R, { ecuador: false, op: { w: 1.3, c: SUAVE } });
  for (let i = 0; i < 12; i++) { const q = circ(i * Math.PI / 6); out += linea3(cam, [add(q, mul(v, -1.6)), add(q, mul(v, 1.6))], { c: AZUL, w: 1.1, op: .8 }); }
  out += curva3(cam, circ, 0, 2 * Math.PI, { c: ROJO, w: 2.2 });
  const q0 = circ(0.6);
  out += flecha3(cam, q0, add(q0, mul(v, 1.2)), { c: AZUL, w: 2.2 }) + punto3(cam, q0, { c: ROJO });
  out += vec(add(cam.p(add(q0, mul(v, 1.2))), [4, -4]), 'v', { c: AZUL });
  return out + texto([10, 242], 'directriz: esfera ∩ plano · generatrices ∥ (0, 1, 1)', { size: 12 });
})(), 'Cilindro con directriz el círculo esfera ∩ plano y generatrices paralelas a (0, 1, 1)');

D['cono-general'] = svg(280, 230, (() => {
  const P = [140, 30];
  const curva = [];
  for (let i = 0; i <= 80; i++) { const t = i / 80 * 2 * Math.PI; curva.push([140 + 95 * Math.cos(t) + 12 * Math.cos(3 * t), 175 + 30 * Math.sin(t) + 6 * Math.sin(2 * t)]); }
  let out = linea(curva, { c: AZUL, w: 2 });
  for (let i = 0; i < 80; i += 8) out += linea([P, curva[i]], { w: 1.1, dash: curva[i][1] < 175 ? true : false, c: curva[i][1] < 175 ? SUAVE : LAPIZ });
  const q = curva[12];
  out += linea([P, q], { c: ROJO, w: 1.8 }) + punto(P) + punto(q, { c: ROJO });
  return out + texto([P[0] + 8, P[1] - 4], 'P = (a, b, c)', { size: 13 }) + texto(add(q, [6, 16]), '(x₀, y₀, z₀)', { size: 12, c: ROJO }) +
    texto([18, 222], 'curva 𝒞', { size: 13, c: AZUL });
})(), 'Cono: rectas desde el vértice P hasta cada punto de la curva');

D['cono-vertice'] = svg(280, 250, (() => {
  const cam = camara({ s: 62, cx: 130, cy: 180, el: 20 });
  const sup = revolucion(cam, { r: (t) => t });
  const L = 1.6;
  return eje(cam, 'x', 0, 2.0) + eje(cam, 'y', 0, 2.2) +
    linea3(cam, [[L, -L, 1], [L, L, 1], [-L, L, 1], [-L, -L, 1]], { cerrar: true, w: 1.1, c: SUAVE }) +
    sup.contorno(0.01, 1.0) + sup.aro(1.0, 'frente', { c: ROJO, w: 2.2 }) +
    eje(cam, 'z', 0, 2.1, { ocultos: [[0, 1]] }) + punto3(cam, [0, 0, 0]) +
    texto(add(cam.p([0, 0, 0]), [8, 14]), 'P = (0,0,0)', { size: 12 }) +
    texto(add(cam.p([-L, L, 1]), [-30, 14]), 'z = 1', { size: 12 }) +
    texto(add(cam.p([0, 1, 1]), [10, 16]), 'x² + y² = 1', { size: 12, c: ROJO });
})(), 'Cono con vértice en el origen y directriz el círculo x² + y² = 1, z = 1');

D['parametrizacion'] = svg(340, 210, (() => {
  let out = flecha([14, 150], [120, 150]) + texto([14, 140], 'ℝ', { size: 16, italic: false }) + punto([64, 150]) + texto([60, 170], 't', { size: 14 });
  const cam = camara({ s: 36, cx: 230, cy: 150 });
  const hel = (t) => [0.9 * Math.cos(t), 0.9 * Math.sin(t) + 0.6, 0.25 * t];
  out += ejes(cam, { x: [0, 1.9], y: [0, 2.4], z: [0, 3.2] }) + curva3(cam, hel, 0, 3 * Math.PI, { c: AZUL, w: 2 });
  const q = cam.p(hel(4.2));
  out += punto(q, { c: ROJO }) + texto(add(q, [8, -6]), 'α(t)', { size: 14, c: ROJO });
  const arco = []; for (let i = 0; i <= 20; i++) { const s = i / 20; arco.push([64 + (q[0] - 74) * s, 140 - 70 * Math.sin(Math.PI * s) + (q[1] - 140) * s]); }
  out += linea(arco, { dash: true, c: SUAVE }) + punta(arco[18], arco[20], { c: SUAVE });
  return out + texto([70, 50], 'de ℝ a ℝ³', { size: 13 });
})(), 'Una curva: a cada t de ℝ le toca un punto α(t) de ℝ³');

D['circulo-z2'] = svg(260, 230, (() => {
  const cam = camara({ s: 52, cx: 120, cy: 175, el: 22 });
  const c = revolucion(cam, { centro: [0, 0, 2], r: () => 1 });
  return ejes(cam, { x: [0, 1.9], y: [0, 2.2], z: [0, 2.8] }) +
    linea3(cam, [[0, 0, 2], [1, 0, 2]], { dash: true, c: SUAVE }) +
    c.aro(0, 'completo', { c: AZUL, w: 2 }) + punto3(cam, [0, 0, 2], { r: 2.4 }) +
    texto(add(cam.p([0, 0, 2]), [-18, -6]), '2', { size: 13 }) +
    texto([130, 28], 'α(θ) = (cos θ, sen θ, 2)', { size: 13 });
})(), 'Círculo de radio 1 a la altura z = 2');

D['triedro-frenet'] = svg(300, 240, (() => {
  const cam = camara({ s: 64, cx: 150, cy: 175, el: 24 });
  const c = revolucion(cam, { centro: [0, 0, 1], r: () => 1 });
  let out = ejes(cam, { x: [0, 1.9], y: [0, 2.2], z: [0, 2.4] }) + c.aro(0, 'completo', { w: 1.6 });
  for (const t of [-0.5, 1.2]) {
    const q = [Math.cos(t), Math.sin(t), 1];
    const T = [-Math.sin(t), Math.cos(t), 0], N = [-Math.cos(t), -Math.sin(t), 0], B = [0, 0, 1];
    const k = 0.6;
    out += flecha3(cam, q, add(q, mul(T, k)), { c: AZUL, w: 2 }) + flecha3(cam, q, add(q, mul(N, k)), { c: ROJO, w: 2 }) + flecha3(cam, q, add(q, mul(B, k)), { c: VERDE, w: 2 }) + punto3(cam, q);
    out += texto(add(cam.p(add(q, mul(T, k))), [4, -4]), 'T', { size: 13, c: AZUL }) + texto(add(cam.p(add(q, mul(N, k))), [-12, 14]), 'N', { size: 13, c: ROJO }) + texto(add(cam.p(add(q, mul(B, k))), [4, -2]), 'B', { size: 13, c: VERDE });
  }
  return out;
})(), 'Triedro de Frenet: T tangente, N normal (hacia el centro) y B binormal');

D['circulo-inclinado'] = svg(300, 240, (() => {
  const cam = camara({ s: 120, cx: 150, cy: 125, el: 18 });
  const r = 1 / Math.SQRT2;
  const al = (t) => [Math.cos(t) / Math.SQRT2, Math.sin(t) / Math.sqrt(20), 3 * Math.sin(t) / Math.sqrt(20)];
  const n = 1 / Math.sqrt(10), L = 0.95;
  const e1 = [1, 0, 0], e2 = [0, n, 3 * n];
  const esq = [add(mul(e1, L), mul(e2, L)), add(mul(e1, -L), mul(e2, L)), add(mul(e1, -L), mul(e2, -L)), add(mul(e1, L), mul(e2, -L))];
  return linea3(cam, esq, { cerrar: true, w: 1, c: SUAVE, fill: 'rgba(44,61,156,.07)' }) +
    ejes(cam, { x: [0, 1.25], y: [0, 1.15], z: [0, 1.1] }) +
    curva3(cam, al, 0, 2 * Math.PI, { c: ROJO, w: 2.2 }) +
    linea3(cam, [[0, 0, 0], al(0)], { dash: true }) + punto3(cam, [0, 0, 0], { r: 2.5 }) +
    texto(add(cam.p(mul(al(0), 0.5)), [8, -8]), 'r = 1/√2', { size: 12 }) +
    texto(add(cam.p(esq[1]), [-10, -6]), 'z = 3y', { size: 12, c: AZUL });
})(), 'La curva es un círculo de radio 1/√2 centrado en el origen, dentro del plano z = 3y');

D['globo-monge'] = svg(320, 250, (() => {
  const cam = camara({ s: 46, cx: 160, cy: 130, el: 18 });
  const curva = (t) => [0.3 * Math.sin(2 * t), 1.1 + 0.25 * t * t * 0 + 0.35 * Math.cos(t), t];
  const z0 = 0.3, q = curva(z0), r = Math.hypot(q[0], q[1]);
  const sph = Math.hypot(q[0], q[1], q[2]);
  const L = 1.9;
  const ring = revolucion(cam, { centro: [0, 0, z0], r: () => r });
  return esfera(cam, [0, 0, 0], sph, { ecuador: false, op: { w: 1.2, c: SUAVE } }) +
    linea3(cam, [[L, -L, z0], [L, L, z0], [-L, L, z0], [-L, -L, z0]], { cerrar: true, w: 1, c: SUAVE }) +
    eje(cam, 'z', -2.2, 2.4, { nombre: 'eje' }) +
    curva3(cam, curva, -1.9, 1.9, { c: AZUL, w: 2 }) +
    ring.aro(0, 'frente', { c: ROJO, w: 2 }) + punto3(cam, [0, 0, 0], { r: 2.4 }) + punto3(cam, q, { c: ROJO }) +
    texto(add(cam.p(curva(1.9)), [6, 4]), '𝒞', { size: 15, c: AZUL }) +
    texto(add(cam.p([0, 0, 0]), [-18, 14]), 'P', { size: 13 }) +
    texto(add(cam.p([L, -L, z0]), [6, 12]), 'plano de Monge', { size: 12 }) +
    texto([10, 22], 'esfera de Monge', { size: 12, c: SUAVE }) +
    texto(add(cam.p(q), [8, -6]), '(x₀, y₀, z₀)', { size: 12, c: ROJO });
})(), 'Globo de Monge: esfera con centro en el eje y plano perpendicular al eje; se cortan en el círculo que recorre el punto');

D['cono-revolucion'] = svg(260, 250, (() => {
  const cam = camara({ s: 60, cx: 125, cy: 128, el: 18 });
  const sup = revolucion(cam, { r: (t) => Math.abs(t) });
  return sup.contorno(0.02, 1.4, { c: SUAVE }) + sup.contorno(-1.4, -0.02, { c: SUAVE }) + sup.aro(1.4, 'completo', { c: SUAVE }) + sup.aro(-1.4, 'frente', { c: SUAVE }) +
    eje(cam, 'z', -1.9, 1.9, { ocultos: [[-1.4, 1.4]] }) + eje(cam, 'x', -1.7, 2.1) + eje(cam, 'y', 0, 1.75) +
    linea3(cam, [[-1.4, 0, -1.4], [1.4, 0, 1.4]], { c: ROJO, w: 2.2 }) +
    texto(add(cam.p([1.4, 0, 1.4]), [10, 4]), 'z = x, y = 0', { size: 12, c: ROJO }) +
    texto([10, 242], 'al girar la recta roja: z² = x² + y²', { size: 12 });
})(), 'La recta z = x (y = 0) gira alrededor del eje z y forma el cono');

D['lema-r2'] = svg(280, 210, (() => {
  const O = [50, 170], Q = [220, 50];
  return flecha([20, 170], [262, 170], { c: SUAVE, w: 1.2 }) + flecha([50, 196], [50, 14], { c: SUAVE, w: 1.2 }) +
    linea([O, Q], { w: 2, c: AZUL }) + linea([[Q[0], 170], Q], { dash: true }) + linea([[50, Q[1]], Q], { dash: true, c: SUAVE }) +
    punto(Q) + texto([Q[0] + 6, Q[1] - 6], '(x, y)', { size: 13 }) +
    texto([125, 190], '|x|', { size: 14, anchor: 'middle' }) + texto([Q[0] + 8, 115], '|y|', { size: 14 }) +
    texto([96, 98], '‖x‖ = √(x² + y²)', { size: 13, c: AZUL, anchor: 'middle' });
})(), 'Cada cateto es menor o igual que la hipotenusa: |x| ≤ ‖x‖ y |y| ≤ ‖x‖');

D['bola-abierta'] = svg(260, 220, (() => {
  const cam = camara({ s: 80, cx: 130, cy: 112 });
  const c = cam.p([0, 0, 0]);
  return `<circle cx="${c[0]}" cy="${c[1]}" r="80" fill="rgba(44,61,156,.10)"/>` +
    circulo(c, 80, { dash: '6 5', w: 1.6 }) +
    revolucion(cam, { r: (t) => Math.sqrt(Math.max(0, 1 - t * t)) }).aro(0, 'frente', { w: 1, dash: '6 5' }) +
    flecha(c, [c[0] + 56, c[1] - 57], { c: ROJO, w: 1.8 }) + punto(c) +
    texto([c[0] - 6, c[1] + 18], 'a', { size: 14 }) + texto([c[0] + 26, c[1] - 34], 'ε', { size: 15, c: ROJO }) +
    texto([10, 212], 'borde punteado: la cáscara no es parte de la bola', { size: 11 });
})(), 'Bola abierta: los puntos a distancia menor que ε del centro a');

D['bola-r2'] = svg(260, 210, (() => {
  const c = [160, 80];
  return flecha([20, 175], [250, 175], { c: SUAVE, w: 1.2 }) + flecha([60, 200], [60, 12], { c: SUAVE, w: 1.2 }) +
    `<circle cx="${c[0]}" cy="${c[1]}" r="50" fill="rgba(44,61,156,.12)"/>` + circulo(c, 50, { dash: '6 5', w: 1.6 }) +
    linea([c, [c[0] + 35, c[1] - 35]], { c: ROJO, w: 1.8 }) + punto(c) +
    texto([c[0] - 4, c[1] + 18], 'a', { size: 14 }) + texto([c[0] + 18, c[1] - 26], 'ε', { size: 15, c: ROJO }) +
    texto([150, 200], 'B(a; ε) en ℝ²: un disco sin su borde', { size: 11, anchor: 'middle' });
})(), 'En ℝ² la bola abierta es un disco sin el borde');

D['cuadrante-abierto'] = svg(280, 230, (() => {
  const O = [50, 190], a = [180, 90], e = 0.55 * Math.min(a[0] - O[0], O[1] - a[1]);
  return `<rect x="${O[0]}" y="14" width="${266 - O[0]}" height="${O[1] - 14}" fill="url(#rayas)" opacity=".8"/>` +
    linea([[O[0], O[1]], [270, O[1]]], { dash: true }) + linea([[O[0], O[1]], [O[0], 12]], { dash: true }) +
    linea([[14, O[1]], O], { c: SUAVE, w: 1.2 }) + linea([O, [O[0], 222]], { c: SUAVE, w: 1.2 }) +
    `<circle cx="${a[0]}" cy="${a[1]}" r="${e}" fill="#fff" fill-opacity=".75"/>` + circulo(a, e, { dash: '5 4', c: ROJO, w: 1.6 }) +
    linea([[a[0], a[1]], [a[0], O[1]]], { dash: '3 3', c: SUAVE }) + linea([[O[0], a[1]], a], { dash: '3 3', c: SUAVE }) +
    punto(a) + texto([a[0] + 6, a[1] - 6], '(a₁, a₂)', { size: 12 }) +
    texto([a[0] + 5, 150], 'a₂', { size: 12 }) + texto([110, a[1] - 5], 'a₁', { size: 12 }) +
    texto([a[0] - e + 4, a[1] + 4], 'ε', { size: 13, c: ROJO }) +
    texto([150, 216], 'x > 0, y > 0 (los ejes no entran)', { size: 11, anchor: 'middle' });
})(), 'Primer cuadrante abierto: alrededor de cada punto cabe una bola de radio menor que a₁ y a₂');

D['cuadrante-cerrado'] = svg(280, 230, (() => {
  const O = [120, 150], e = 46;
  return `<rect x="${O[0]}" y="14" width="${266 - O[0]}" height="${O[1] - 14}" fill="url(#rayas)" opacity=".8"/>` +
    linea([[14, O[1]], [266, O[1]]], { w: 1.4 }) + linea([[O[0], 222], [O[0], 12]], { w: 1.4 }) +
    linea([O, [266, O[1]]], { w: 2.4 }) + linea([O, [O[0], 14]], { w: 2.4 }) +
    circulo(O, e, { dash: '5 4', c: ROJO, w: 1.6 }) + punto(O) +
    punto([O[0] - e / 2, O[1]], { c: ROJO }) + texto([O[0] - e / 2 - 70, O[1] + 34], '(−ε/2, 0) ∉ A', { size: 12, c: ROJO }) +
    texto([O[0] + 6, O[1] - 8], '(0,0)', { size: 12 }) +
    texto([150, 216], 'x ≥ 0, y ≥ 0 (los ejes sí entran)', { size: 11, anchor: 'middle' });
})(), 'Cuadrante cerrado: toda bola centrada en el origen se sale de A');

D['tres-cuadrantes'] = svg(260, 220, (() => {
  const O = [130, 110];
  return `<path d="M14 14 H${O[0]} V${O[1]} H246 V206 H14 Z" fill="url(#rayas)" opacity=".85"/>` +
    linea([[14, O[1]], [246, O[1]]], { w: 1.8 }) + linea([[O[0], 206], [O[0], 14]], { w: 1.8 }) +
    texto([188, 66], 'ℝ² − A', { size: 14, anchor: 'middle', c: AZUL }) + texto([188, 86], 'x > 0, y > 0', { size: 11, anchor: 'middle', c: AZUL }) +
    texto([70, 66], 'A', { size: 16, anchor: 'middle' });
})(), 'A son tres cuadrantes con sus bordes; su complemento es el primer cuadrante abierto');

D['bola-cerrada'] = svg(280, 230, (() => {
  const c = [110, 120], R = 55, a = [215, 55];
  const dist = Math.hypot(a[0] - c[0], a[1] - c[1]);
  const e = (dist - R) / 2;
  const borde = [c[0] + (a[0] - c[0]) * R / dist, c[1] + (a[1] - c[1]) * R / dist];
  return `<rect x="8" y="8" width="264" height="214" fill="url(#rayas-rojo)"/>` +
    `<circle cx="${c[0]}" cy="${c[1]}" r="${R}" fill="#fff"/><circle cx="${c[0]}" cy="${c[1]}" r="${R}" fill="url(#rayas)"/>` +
    circulo(c, R, { w: 2 }) + linea([[8, c[1]], [272, c[1]]], { c: SUAVE, w: 1 }) + linea([[c[0], 222], [c[0], 8]], { c: SUAVE, w: 1 }) +
    `<circle cx="${a[0]}" cy="${a[1]}" r="${e}" fill="#fff"/>` + circulo(a, e, { dash: '4 3', c: AZUL, w: 1.6 }) +
    linea([borde, a], { c: LAPIZ, w: 1.2, dash: '3 3' }) + punto(a, { c: AZUL }) + punto(c, { r: 2.4 }) +
    texto([a[0] + 6, a[1] - 8], 'a', { size: 14, c: AZUL }) + texto([(borde[0] + a[0]) / 2 - 18, (borde[1] + a[1]) / 2 + 2], 'd', { size: 13 }) +
    texto([c[0] - 30, c[1] + 40], 'B[0; 1]', { size: 12 }) + texto([196, 214], 'complemento', { size: 12, c: ROJO });
})(), 'La bola cerrada y su complemento: alrededor de a cabe una bola de radio (‖a‖ − 1)/2 fuera de B[0; 1]');

D['frontera'] = svg(280, 220, (() => {
  const x2 = 130, r = 26, P = [x2, 80];
  return `<rect x="${x2}" y="10" width="${270 - x2}" height="200" fill="url(#rayas)" opacity=".85"/>` +
    flecha([14, 150], [266, 150], { c: SUAVE, w: 1.2 }) + flecha([40, 206], [40, 12], { c: SUAVE, w: 1.2 }) +
    linea([[x2, 10], [x2, 210]], { dash: '6 5', c: ROJO, w: 2 }) +
    circulo(P, r, { dash: '4 3', c: AZUL, w: 1.6 }) + punto(P, { c: ROJO }) +
    texto([x2 + 6, 166], '2', { size: 13 }) + texto([x2 - 50, 40], 'Fr(A)', { size: 13, c: ROJO }) +
    texto([210, 120], 'A: x > 2', { size: 13, anchor: 'middle' });
})(), 'La frontera de x > 2 es la recta x = 2: toda bola con centro ahí toca A y su complemento');

/* ======================= I parcial: límites y continuidad ======================= */

/** Disco alrededor de (a,b) en el plano y la función que lo manda a un intervalo de la recta real. */
function dibujoLimite({ centro = 'L', izq = 'L − ε', der = 'L + ε', positivo = false } = {}) {
  const c = [80, 95], R = 30;
  let out = flecha([14, 170], [170, 170], { c: SUAVE, w: 1.2 }) + flecha([30, 196], [30, 16], { c: SUAVE, w: 1.2 }) +
    `<circle cx="${c[0]}" cy="${c[1]}" r="${R}" fill="rgba(44,61,156,.12)"/>` + circulo(c, R, { dash: '5 4', c: AZUL, w: 1.6 }) +
    linea([c, [c[0] + 21, c[1] - 21]], { c: AZUL, w: 1.4 }) + punto(c) +
    texto([c[0] - 18, c[1] + 18], '(a, b)', { size: 12 }) + texto([c[0] + 12, c[1] - 16], 'δ', { size: 13, c: AZUL });
  // Recta real a la derecha (vertical)
  const X = 236, y0 = 200, y1 = 18;
  out += flecha([X, y0], [X, y1]) + texto([X + 8, y1 + 6], 'ℝ', { size: 14, italic: false });
  const m = 90, e = 34;
  out += linea([[X - 7, m - e], [X + 7, m - e]], { c: ROJO, w: 2 }) + linea([[X - 7, m + e], [X + 7, m + e]], { c: ROJO, w: 2 }) +
    linea([[X, m - e], [X, m + e]], { c: ROJO, w: 3.2 }) + punto([X, m], { c: ROJO }) +
    texto([X + 10, m + 4], centro, { size: 12, c: ROJO }) +
    texto([X + 10, m - e + 4], der, { size: 11, c: ROJO }) + texto([X + 10, m + e + 4], izq, { size: 11, c: ROJO });
  if (positivo) out += linea([[X - 9, 182], [X + 9, 182]], { w: 1.6 }) + texto([X + 12, 186], '0', { size: 12 });
  const arco = [];
  for (let i = 0; i <= 24; i++) { const s = i / 24; arco.push([c[0] + R + (X - 16 - c[0] - R) * s, c[1] - 10 - 50 * Math.sin(Math.PI * s) + (m - c[1] + 10) * s]); }
  out += linea(arco, { dash: true, c: SUAVE }) + punta(arco[22], arco[24], { c: SUAVE }) + texto([150, 40], 'f', { size: 15 });
  return out;
}

D['limite-r2'] = svg(310, 210, dibujoLimite(), 'Los puntos a distancia menor que δ de (a, b) caen a distancia menor que ε de L');

D['continua-positiva'] = svg(310, 210, dibujoLimite({ centro: 'f(a,b)', izq: 'f − ε', der: 'f + ε', positivo: true }),
  'Si f es continua y f(a, b) > 0, con ε = f(a, b)/2 todo el intervalo queda por encima de 0');

D['caminos-ejes'] = svg(280, 220, (() => {
  const O = [140, 110];
  let out = flecha([16, O[1]], [264, O[1]], { c: SUAVE, w: 1.2 }) + flecha([O[0], 206], [O[0], 14], { c: SUAVE, w: 1.2 });
  for (const [a, b] of [[[40, O[1]], [118, O[1]]], [[240, O[1]], [162, O[1]]]]) out += linea([a, b], { c: AZUL, w: 2.2 }) + punta(a, b, { c: AZUL, w: 2.2 });
  for (const [a, b] of [[[O[0], 24], [O[0], 88]], [[O[0], 196], [O[0], 132]]]) out += linea([a, b], { c: ROJO, w: 2.2 }) + punta(a, b, { c: ROJO, w: 2.2 });
  return out + `<circle cx="${O[0]}" cy="${O[1]}" r="4" fill="#fff" stroke="${LAPIZ}" stroke-width="1.5"/>` +
    texto([40, O[1] - 10], 'A: y = 0 → 1', { size: 12, c: AZUL }) + texto([O[0] + 10, 34], 'B: x = 0 → −1', { size: 12, c: ROJO }) +
    texto([O[0] + 8, O[1] + 18], '(0,0)', { size: 11 });
})(), 'Por el eje x el límite da 1 y por el eje y da −1: no existe');

D['caminos-parabola'] = svg(300, 230, (() => {
  const O = [150, 150], s = 60;
  let out = flecha([20, O[1]], [284, O[1]], { c: SUAVE, w: 1.2 }) + flecha([O[0], 222], [O[0], 14], { c: SUAVE, w: 1.2 });
  for (const m of [1.3, -0.7, 0.35]) out += linea([[O[0] - 2 * s, O[1] + 2 * s * m], [O[0] + 2 * s, O[1] - 2 * s * m]], { c: AZUL, w: 1.4 });
  const par = []; for (let i = -40; i <= 40; i++) { const x = i / 20; par.push([O[0] + x * s, O[1] - x * x * s * 0.6]); }
  out += linea(par, { c: ROJO, w: 2.2 }) + punta(par[6], par[8], { c: ROJO, w: 2 }) + punta(par[74], par[72], { c: ROJO, w: 2 });
  return out + `<circle cx="${O[0]}" cy="${O[1]}" r="4" fill="#fff" stroke="${LAPIZ}" stroke-width="1.5"/>` +
    texto([24, 216], 'rectas y = mx → 0', { size: 12, c: AZUL }) + texto([196, 26], 'y = x² → ½', { size: 13, c: ROJO });
})(), 'Por todas las rectas el límite da 0, pero por la parábola y = x² da 1/2');

D['caminos-r3'] = svg(280, 230, (() => {
  const cam = camara({ s: 70, cx: 140, cy: 120 });
  const B = (x) => [x, x, x * x * x - 2 * x];
  let out = ejes(cam, { x: [-1.2, 1.7], y: [-1.2, 1.7], z: [-1.2, 1.4] }) +
    curva3(cam, B, -0.75, 0.75, { c: ROJO, w: 2.2 }) +
    linea3(cam, [[1.3, 0, 0], [0.12, 0, 0]], { c: AZUL, w: 2.2 }) + punta(cam.p([0.3, 0, 0]), cam.p([0.12, 0, 0]), { c: AZUL, w: 2.2 });
  out += punta(cam.p(B(-0.3)), cam.p(B(-0.12)), { c: ROJO, w: 2 });
  return out + punto3(cam, [0, 0, 0]) +
    texto(add(cam.p([1.3, 0, 0]), [-60, 18]), 'A → 0', { size: 12, c: AZUL }) +
    texto(add(cam.p(B(0.75)), [4, -6]), 'B → −2', { size: 12, c: ROJO });
})(), 'En ℝ³ se puede llegar al origen por el eje x (da 0) o por la curva B (da −2)');

D['sen-1x'] = svg(320, 200, (() => {
  const O = [160, 100], sx = 140, sy = 60;
  let out = flecha([14, O[1]], [306, O[1]], { c: SUAVE, w: 1.2 }) + flecha([O[0], 190], [O[0], 12], { c: SUAVE, w: 1.2 });
  const pts = [];
  for (let i = 1; i <= 1600; i++) { const x = (i / 1600); pts.push([O[0] + x * sx, O[1] - Math.sin(1 / Math.max(x, 0.004)) * sy]); }
  const neg = pts.map(([x, y]) => [2 * O[0] - x, 2 * O[1] - y]).reverse();
  out += linea(neg, { c: AZUL, w: 1.1 }) + linea(pts, { c: AZUL, w: 1.1 });
  for (let n = 0; n < 3; n++) {
    const xn = 1 / (Math.PI / 2 + 2 * n * Math.PI), yn = 1 / (3 * Math.PI / 2 + 2 * n * Math.PI);
    out += punto([O[0] + xn * sx, O[1] - sy], { c: ROJO, r: 3.2 }) + punto([O[0] + yn * sx, O[1] + sy], { c: VERDE, r: 3.2 });
  }
  out += linea([[O[0] - 6, O[1] - sy], [O[0] + 6, O[1] - sy]], { w: 1.2 }) + linea([[O[0] - 6, O[1] + sy], [O[0] + 6, O[1] + sy]], { w: 1.2 });
  return out + texto([O[0] - 10, O[1] - sy + 4], '1', { size: 12, anchor: 'end' }) + texto([O[0] - 10, O[1] + sy + 4], '−1', { size: 12, anchor: 'end' }) +
    texto([214, O[1] - sy - 8], 'xₙ → sen = 1', { size: 12, c: ROJO }) + texto([214, O[1] + sy + 18], 'yₙ → sen = −1', { size: 12, c: VERDE });
})(), 'sen(1/x) oscila cada vez más rápido cerca de 0: por xₙ vale 1 y por yₙ vale −1');

/* ======================= II parcial: derivadas ======================= */

D['derivada-direccional'] = svg(300, 220, (() => {
  const a = [150, 120], v = [0.82, -0.57];
  const P = (t) => [a[0] + v[0] * t, a[1] + v[1] * t];
  return flecha([20, 190], [284, 190], { c: SUAVE, w: 1.2 }) + flecha([50, 210], [50, 14], { c: SUAVE, w: 1.2 }) +
    linea([P(-150), P(150)], { c: ROJO, w: 1.8 }) + punta(P(130), P(150), { c: ROJO, w: 1.8 }) +
    flecha(a, P(52), { c: AZUL, w: 2.4 }) + punto(a) + punto(P(95), { c: ROJO, r: 2.6 }) +
    texto([a[0] - 14, a[1] + 18], 'a', { size: 15 }) + vec([P(40)[0] + 4, P(40)[1] + 22], 'v', { c: AZUL }) +
    texto([P(95)[0] + 6, P(95)[1] + 14], 'a + tv', { size: 13, c: ROJO }) +
    texto([150, 212], 'f restringida a la recta: una función de t', { size: 11, anchor: 'middle' });
})(), 'Derivada direccional: cómo cambia f al moverse desde a en la dirección v');

D['tvm'] = svg(300, 220, (() => {
  const X = (x) => 50 + x * 220, Y = (y) => 190 - y * 160;
  const f = (x) => 0.15 + 0.7 * x + 0.35 * Math.sin(2 * Math.PI * x * 0.9);
  const pts = []; for (let i = 0; i <= 80; i++) { const x = i / 80; pts.push([X(x), Y(f(x))]); }
  const m = (f(1) - f(0));
  // θ donde f'(θ) = m (numérico)
  let th = 0.1, best = 9;
  for (let x = 0.01; x < 0.6; x += 0.001) { const d = (f(x + 1e-4) - f(x - 1e-4)) / 2e-4; if (Math.abs(d - m) < best) { best = Math.abs(d - m); th = x; } }
  const tan = (x) => f(th) + m * (x - th);
  return flecha([30, 190], [286, 190], { c: SUAVE, w: 1.2 }) + flecha([50, 206], [50, 14], { c: SUAVE, w: 1.2 }) +
    linea(pts, { c: LAPIZ, w: 2 }) + linea([[X(0), Y(f(0))], [X(1), Y(f(1))]], { c: AZUL, w: 1.6 }) +
    linea([[X(th - 0.25), Y(tan(th - 0.25))], [X(th + 0.3), Y(tan(th + 0.3))]], { c: ROJO, w: 1.8 }) +
    punto([X(0), Y(f(0))]) + punto([X(1), Y(f(1))]) + punto([X(th), Y(f(th))], { c: ROJO }) +
    linea([[X(th), Y(f(th))], [X(th), 190]], { dash: true, c: SUAVE }) +
    texto([X(0) - 4, 206], 'a', { size: 13 }) + texto([X(th) - 4, 206], 'θ', { size: 13, c: ROJO }) + texto([X(1) - 4, 206], 'b', { size: 13 }) +
    texto([X(0.62), Y(f(0.62)) - 34], 'secante', { size: 12, c: AZUL }) + texto([X(th) - 30, Y(tan(th + 0.3)) - 6], 'tangente ∥', { size: 12, c: ROJO });
})(), 'Teorema del valor medio: en algún θ la tangente es paralela a la secante');

D['camino-raiz'] = svg(280, 200, (() => {
  const O = [40, 170], s = 200;
  const pts = []; for (let i = 0; i <= 60; i++) { const x = i / 60; pts.push([O[0] + x * s, O[1] - Math.sqrt(x) * 140]); }
  return flecha([20, O[1]], [266, O[1]], { c: SUAVE, w: 1.2 }) + flecha([O[0], 194], [O[0], 14], { c: SUAVE, w: 1.2 }) +
    linea([[O[0], O[1]], [250, O[1]]], { c: AZUL, w: 2.2 }) + punta([90, O[1]], [60, O[1]], { c: AZUL, w: 2.2 }) +
    linea(pts, { c: ROJO, w: 2.2 }) + punta(pts[10], pts[6], { c: ROJO, w: 2 }) +
    `<circle cx="${O[0]}" cy="${O[1]}" r="4" fill="#fff" stroke="${LAPIZ}" stroke-width="1.5"/>` +
    texto([140, O[1] + 18], 'ejes: f = 0', { size: 12, c: AZUL }) + texto([130, 96], 'y = √x: f → ½', { size: 13, c: ROJO });
})(), 'Las derivadas parciales en el origen valen 0, pero por y = √x la función tiende a 1/2: no es continua');

for (const [nombre, contenido] of Object.entries(D)) writeFileSync(path.join(OUT, `${nombre}.svg`), contenido);
console.log(`${Object.keys(D).length} dibujos en ${path.relative(root, OUT)}`);
