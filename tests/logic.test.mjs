/**
 * Tests de la lógica pura: markdown seguro, validación de firmas y filtros de imágenes.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderMarkdown, renderInline } from '../js/markdown.js';
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
