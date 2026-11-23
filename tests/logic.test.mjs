/**
 * Tests de la lógica pura: markdown seguro, validación de firmas y filtros de imágenes.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderMarkdown, renderInline } from '../js/markdown.js';
import { pageInnerHtml, conIndice, acomodar, POR_HOJA_INDICE } from '../js/book.js';
import { safeSrc, contrastText, escapeHtml } from '../js/util.js';
import { validarFirma, firebaseListo } from '../js/store.js';

test('markdown escapa HTML (no se puede inyectar <script>)', () => {
  const html = renderMarkdown('<script>alert(1)</script> **hola**');
  assert.ok(!html.includes('<script>'));
  assert.ok(html.includes('&lt;script&gt;'));
  assert.ok(html.includes('<strong>hola</strong>'));
});

test('markdown: títulos, listas, citas y resaltado', () => {
  const html = renderMarkdown('# Tema\n- uno\n- dos\n\n1. a\n2. b\n> cita ==clave==');
  assert.match(html, /<h2>Tema<\/h2>/);
  assert.match(html, /<ul><li>uno<\/li><li>dos<\/li><\/ul>/);
  assert.match(html, /<ol><li>a<\/li><li>b<\/li><\/ol>/);
  assert.match(html, /<blockquote>cita <mark>clave<\/mark><\/blockquote>/);
  assert.equal(renderInline('`git add`'), '<code>git add</code>');
});

test('safeSrc acepta rutas y URLs seguras y rechaza javascript:', () => {
  assert.equal(safeSrc('books/x/img/a.jpg'), 'books/x/img/a.jpg');
  assert.equal(safeSrc('https://ejemplo.com/a.png'), 'https://ejemplo.com/a.png');
  assert.ok(safeSrc('data:image/jpeg;base64,AAAA'));
  assert.equal(safeSrc('javascript:alert(1)'), '');
  assert.equal(safeSrc('../../etc/passwd'), '');
  assert.equal(safeSrc('x" onerror="alert(1)'), '');
});

test('contrastText elige texto legible', () => {
  assert.equal(contrastText('#ffffff'), '#2b2a33');
  assert.equal(contrastText('#1a1a1a'), '#fdf8ee');
  assert.equal(escapeHtml(`"<'&>`), '&quot;&lt;&#39;&amp;&gt;');
});

test('validarFirma aplica los mismos límites que firestore.rules', () => {
  assert.equal(validarFirma({ nombre: 'Ana', texto: 'Hola' }).ok, true);
  assert.equal(validarFirma({ nombre: '', texto: 'Hola' }).ok, false);
  assert.equal(validarFirma({ nombre: 'Ana', texto: '' }).ok, false, 'necesita mensaje o dibujo');
  assert.equal(validarFirma({ nombre: 'Ana', dibujo: 'data:image/jpeg;base64,AAAA' }).ok, true);
  assert.equal(validarFirma({ nombre: 'Ana', dibujo: 'data:image/svg+xml;base64,AAAA' }).ok, false);
  assert.equal(validarFirma({ nombre: 'x'.repeat(61), texto: 'a' }).ok, false);
  assert.equal(validarFirma({ nombre: 'Ana', texto: 'x'.repeat(501) }).ok, false);
  assert.equal(validarFirma({ nombre: '  Ana  ', texto: ' hola ' }).firma.nombre, 'Ana');
});

test('sin config de Firebase se usa modo local', () => {
  assert.equal(firebaseListo(null), false);
  assert.equal(firebaseListo({ apiKey: 'x', projectId: 'p' }), true);
});

test('markdown: fórmulas sin KaTeX quedan como TeX escapado', () => {
  const html = renderInline('si $a*b<c$ y *cursiva*');
  assert.match(html, /<span class="math-raw">a\*b&lt;c<\/span>/, 'el * de la fórmula no debe volverse cursiva');
  assert.match(html, /<em>cursiva<\/em>/);
  const block = renderMarkdown('$$\\sum x_i$$');
  assert.match(block, /^<div class="math-display"><span class="math-raw">\\sum x_i<\/span><\/div>$/);
  const multi = renderMarkdown('$$\n<b>\n$$');
  assert.ok(!multi.includes('<b>'), 'el TeX también se escapa');
});

test('markdown: tintas en línea y en bloque, y sublistas', () => {
  assert.equal(renderInline('{rojo|Ejm:} hola'), '<span class="tinta tinta-rojo">Ejm:</span> hola');
  assert.equal(renderInline('{verde|no existe}'), '{verde|no existe}');
  const html = renderMarkdown(':::azul\nDefinición\n:::\nnota');
  assert.equal(html, '<div class="tinta tinta-azul"><p>Definición</p></div><p>nota</p>');
  assert.match(renderMarkdown(':::lapiz\nsin cerrar'), /<\/div>$/);
  assert.match(renderMarkdown('- a\n  - b'), /<li>a<\/li><li class="sub">b<\/li>/);
  assert.match(renderMarkdown('2. Caso'), /<ol start="2">/);
});

test('post-its: el dibujo se puede levantar y se escapa todo', () => {
  const html = pageInnerHtml({ tipo: 'texto', contenido: 'x', dibujos: [{ src: 'books/a/img/b.svg', pie: '<i>p</i>', debajo: 'debajo **aquí**' }], nota: ['uno', 'dos'] });
  assert.match(html, /class="postit-slot"/);
  assert.match(html, /data-act="lift" aria-pressed="false"/);
  assert.match(html, /<strong>aquí<\/strong>/);
  assert.ok(!html.includes('<i>p</i>'));
  assert.equal((html.match(/class="nota"/g) || []).length, 2);
  const malo = pageInnerHtml({ tipo: 'texto', contenido: 'x', dibujos: [{ src: 'javascript:alert(1)' }] });
  assert.ok(!malo.includes('javascript:'));
});

test('todos los archivos propios usan la misma versión (?v=) para saltarse la caché', async () => {
  const { readFileSync, readdirSync } = await import('node:fs');
  const files = ['index.html', ...readdirSync('js').filter((f) => f.endsWith('.js')).map((f) => `js/${f}`)];
  const vistos = new Set();
  for (const f of files) {
    const src = readFileSync(f, 'utf8');
    for (const m of src.matchAll(/from '\.\/[\w-]+\.js(\?v=[\w.]+)?'/g)) {
      assert.ok(m[1], `${f}: import sin ?v= → ${m[0]}`);
      vistos.add(m[1]);
    }
    for (const m of src.matchAll(/(?:href|src)="((?:css|js)\/[\w-]+\.(?:css|js))(\?v=[\w.]+)?"/g)) {
      assert.ok(m[2], `${f}: ${m[1]} sin ?v=`);
      vistos.add(m[2]);
    }
  }
  assert.equal(vistos.size, 1, `hay versiones distintas: ${[...vistos].join(', ')}`);
});

test('las notas admiten listas', () => {
  const html = pageInnerHtml({ tipo: 'texto', contenido: 'x', nota: 'Propiedades:\n1. uno\n2. dos' });
  assert.match(html, /<aside class="nota"><p>Propiedades:<\/p><ol><li>uno<\/li><li>dos<\/li><\/ol><\/aside>/);
});

test('índice: hojas después de la portadilla con números que ya las cuentan', () => {
  const paginas = [{ tipo: 'titulo', titulo: 'Portada' }, ...Array.from({ length: POR_HOJA_INDICE + 2 }, (_, i) => ({ tipo: 'texto', titulo: `Tema ${i + 1}`, contenido: 'x' }))];
  const { paginas: out, indice } = conIndice(paginas);
  assert.equal(indice, 2, 'la primera hoja de índice es la página 2');
  assert.equal(out[1].tipo, 'indice');
  assert.equal(out[2].tipo, 'indice', 'con más temas que caben, hay una segunda hoja');
  assert.equal(out[3].titulo, 'Tema 1');
  assert.equal(out[1].entradas[0].pagina, 4, 'Tema 1 queda en la página 4 (portada + 2 hojas de índice)');
  const ult = out[2].entradas.at(-1);
  assert.equal(out[ult.pagina - 1].titulo, ult.titulo, 'cada número apunta a su página');
  const html = pageInnerHtml(out[1]);
  assert.match(html, /data-act="goto" data-page="4"/);
  assert.equal(conIndice([{ tipo: 'texto', titulo: 'a', contenido: 'x' }]).indice, 0, 'sin índice si hay pocos temas');
});

test('acomodo: el contenido corre de hoja en hoja sin cortar bloques ni dejar títulos solos', () => {
  const paginas = [{ tipo: 'titulo', titulo: 'Portada' }, { tipo: 'texto', titulo: 'A', contenido: 'x' }, { tipo: 'texto', titulo: 'B', contenido: 'x' }, { tipo: 'texto', titulo: 'C', contenido: 'x' }];
  // bloques en el flujo: (tema, top, bottom, ¿título?)
  const b = (s, top, bottom, encabezado = false) => ({ s, top, bottom, encabezado });
  const bloques = [b(0, 0, 50), b(1, 60, 80, true), b(1, 80, 300), b(2, 320, 340, true), b(2, 340, 420), b(3, 440, 460, true), b(3, 460, 700)];
  const r = acomodar(paginas, bloques, { cap: 400, porIndice: 20 });
  assert.deepEqual(r.hojas, [[1, 2, 3, 4], [5, 6]], 'la portada va aparte; A y B juntas; C pasa entera a otra hoja');
  assert.equal(r.indice.length, 1);
  assert.equal(r.primeraIndice, 2);
  assert.deepEqual(r.indice[0].entradas.map((e) => [e.titulo, e.pagina]), [['A', 3], ['B', 3], ['C', 4]]);
  // Un título que cabe pero cuyo primer bloque no, baja con él
  const r2 = acomodar(paginas, [b(0, 0, 50), b(1, 60, 380, false), b(2, 390, 410, true), b(2, 410, 600)], { cap: 400 });
  assert.deepEqual(r2.hojas, [[1], [2, 3]]);
});
