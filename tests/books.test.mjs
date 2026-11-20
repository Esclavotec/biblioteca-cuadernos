/**
 * Valida que todos los cuadernos (books/*.json) tengan el formato correcto.
 * Ejecutar con:  npm test
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { safeSrc } from '../js/util.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const booksDir = path.join(root, 'books');
const readJson = (f) => JSON.parse(readFileSync(f, 'utf8'));
const TIPOS = ['titulo', 'texto', 'lista', 'imagen'];
const index = readJson(path.join(booksDir, 'index.json'));

test('index.json tiene una lista de libros válida', () => {
  assert.ok(Array.isArray(index.libros), 'falta "libros"');
  const ids = new Set();
  for (const l of index.libros) {
    assert.match(l.id, /^[a-z0-9][a-z0-9-]*$/, `id inválido: ${l.id}`);
    assert.ok(!ids.has(l.id), `id repetido: ${l.id}`);
    ids.add(l.id);
    assert.equal(typeof l.titulo, 'string');
    assert.match(l.color, /^#[0-9a-f]{6}$/i, `color inválido en ${l.id}`);
  }
});

test('no hay archivos de libro fuera del índice', () => {
  const ids = new Set(index.libros.map((l) => l.id));
  const files = readdirSync(booksDir).filter((f) => f.endsWith('.json') && f !== 'index.json');
  for (const f of files) assert.ok(ids.has(f.replace(/\.json$/, '')), `${f} no está en index.json`);
});

for (const entry of index.libros) {
  test(`libro "${entry.id}" tiene páginas válidas`, () => {
    const file = path.join(booksDir, `${entry.id}.json`);
    assert.ok(existsSync(file), `falta books/${entry.id}.json`);
    const book = readJson(file);
    assert.equal(book.id, entry.id, 'el id del archivo no coincide con index.json');
    assert.equal(typeof book.titulo, 'string');
    if (book.papel) assert.ok(['rayado', 'cuadriculado', 'blanco'].includes(book.papel), `papel inválido: ${book.papel}`);
    assert.ok(Array.isArray(book.paginas) && book.paginas.length > 0, 'el libro no tiene páginas');

    book.paginas.forEach((p, i) => {
      const where = `${entry.id} pág. ${i + 1}`;
      assert.ok(TIPOS.includes(p.tipo), `${where}: tipo desconocido "${p.tipo}"`);
      if (p.tipo === 'titulo') assert.equal(typeof p.titulo, 'string', `${where}: falta titulo`);
      if (p.tipo === 'texto') assert.equal(typeof p.contenido, 'string', `${where}: falta contenido`);
      if (p.tipo === 'lista') {
        assert.ok(Array.isArray(p.items) && p.items.length, `${where}: falta items`);
        p.items.forEach((it) => assert.equal(typeof it, 'string'));
      }
      if (p.tipo === 'imagen') {
        assert.ok(safeSrc(p.src), `${where}: src no permitido`);
        if (!/^https?:/i.test(p.src)) assert.ok(existsSync(path.join(root, p.src)), `${where}: no existe ${p.src}`);
      }
      if (p.nota !== undefined) {
        const notas = Array.isArray(p.nota) ? p.nota : [p.nota];
        notas.forEach((n) => assert.equal(typeof n, 'string', `${where}: nota debe ser texto o lista de textos`));
      }
      if (p.dibujos !== undefined) {
        assert.ok(Array.isArray(p.dibujos) && p.dibujos.length, `${where}: dibujos debe ser una lista`);
        p.dibujos.forEach((d, j) => {
          assert.ok(safeSrc(d.src), `${where}: dibujo ${j + 1} con src no permitido`);
          if (!/^https?:/i.test(d.src)) assert.ok(existsSync(path.join(root, d.src)), `${where}: no existe ${d.src}`);
          for (const k of ['pie', 'debajo', 'alt', 'color']) if (d[k] !== undefined) assert.equal(typeof d[k], 'string', `${where}: dibujo ${j + 1}.${k} debe ser texto`);
        });
      }
      // Las fórmulas $…$ deben ir en pares, si no se ve un $ suelto en la página
      for (const t of [p.contenido, p.subtitulo, ...(Array.isArray(p.nota) ? p.nota : [p.nota]), ...(p.dibujos || []).flatMap((d) => [d.pie, d.debajo])]) {
        if (typeof t === 'string') assert.equal((t.match(/\$/g) || []).length % 2, 0, `${where}: hay un $ sin cerrar en «${t.slice(0, 40)}…»`);
      }
    });
  });
}
