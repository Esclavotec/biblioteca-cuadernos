/**
 * serve.mjs — Servidor local mínimo (sin dependencias) para ver la biblioteca.
 * Uso:  npm start   →  http://localhost:5173
 */
import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const port = Number(process.env.PORT) || 5173;
const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon',
};

http.createServer(async (req, res) => {
  try {
    let p = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if (p.endsWith('/')) p += 'index.html';
    const file = path.join(root, p);
    if (!file.startsWith(root)) { res.writeHead(403).end(); return; } // evita salir de la carpeta
    const data = await readFile(file);
    res.writeHead(200, { 'Content-Type': types[path.extname(file).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
    res.end(data);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('No encontrado');
  }
}).listen(port, () => console.log(`Biblioteca en http://localhost:${port}`));
