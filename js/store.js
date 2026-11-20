/**
 * store.js — Dónde se guardan las firmas del cuaderno de visitas.
 *
 *  - Modo "firebase": colección `firmas` en Firestore (compartida por todos los visitantes).
 *  - Modo "local":    localStorage del navegador (solo mientras no haya firebaseConfig).
 *
 * validarFirma() aplica los mismos límites que firestore.rules, para avisar antes de enviar.
 */
import { firebaseConfig } from './firebase-config.js?v=1.3.2';

const SDK = 'https://www.gstatic.com/firebasejs/11.0.2';
const LOCAL_KEY = 'biblioteca.firmas.v1';
const MAX_FIRMAS = 150; // cuántas firmas (las más recientes) se cargan

export const LIMITES = { nombre: 60, texto: 500, dibujo: 400000 };
const DIBUJO_RE = /^data:image\/jpeg;base64,[A-Za-z0-9+/=]+$/;

/** Limpia y valida una firma. Devuelve { ok, errores[], firma }. */
export function validarFirma(datos) {
  const nombre = String(datos?.nombre ?? '').trim();
  const texto = String(datos?.texto ?? '').trim();
  const dibujo = String(datos?.dibujo ?? '');
  const errores = [];
  if (!nombre) errores.push('Escribe tu nombre');
  if (nombre.length > LIMITES.nombre) errores.push(`El nombre admite hasta ${LIMITES.nombre} caracteres`);
  if (texto.length > LIMITES.texto) errores.push(`El mensaje admite hasta ${LIMITES.texto} caracteres`);
  if (dibujo && (!DIBUJO_RE.test(dibujo) || dibujo.length > LIMITES.dibujo)) errores.push('El dibujo no es válido o es demasiado grande');
  if (!texto && !dibujo) errores.push('Escribe un mensaje o haz un dibujo');
  return { ok: errores.length === 0, errores, firma: { nombre, texto, dibujo } };
}

/** ¿Hay una configuración de Firebase utilizable? */
export function firebaseListo(cfg = firebaseConfig) {
  return Boolean(cfg && cfg.apiKey && cfg.projectId);
}

// Carga perezosa del SDK de Firebase (solo si hace falta)
let conexion = null;
function firestore() {
  conexion ??= (async () => {
    const [{ initializeApp }, fs] = await Promise.all([
      import(`${SDK}/firebase-app.js`),
      import(`${SDK}/firebase-firestore.js`),
    ]);
    return { fs, db: fs.getFirestore(initializeApp(firebaseConfig)) };
  })();
  return conexion;
}

function leerLocal() {
  try { return JSON.parse(localStorage.getItem(LOCAL_KEY)) || []; } catch { return []; }
}

export const store = {
  get mode() { return firebaseListo() ? 'firebase' : 'local'; },

  /** Lista de firmas, de la más antigua a la más reciente. */
  async list() {
    if (this.mode === 'local') {
      return leerLocal().slice(-MAX_FIRMAS).map((f) => ({ ...f, fecha: new Date(f.fecha) }));
    }
    const { fs, db } = await firestore();
    const snap = await fs.getDocs(fs.query(fs.collection(db, 'firmas'), fs.orderBy('fecha', 'desc'), fs.limit(MAX_FIRMAS)));
    return snap.docs.map((d) => {
      const x = d.data();
      return { id: d.id, nombre: x.nombre, texto: x.texto, dibujo: x.dibujo, fecha: x.fecha?.toDate?.() ?? new Date() };
    }).reverse();
  },

  /** Guarda una firma nueva. Lanza Error con mensaje legible si algo falla. */
  async add(datos) {
    const v = validarFirma(datos);
    if (!v.ok) throw new Error(v.errores.join('. '));
    if (this.mode === 'local') {
      const arr = leerLocal();
      arr.push({ ...v.firma, id: globalThis.crypto?.randomUUID?.() ?? String(Date.now()), fecha: new Date().toISOString() });
      try { localStorage.setItem(LOCAL_KEY, JSON.stringify(arr)); }
      catch { throw new Error('No queda espacio para guardar en este navegador'); }
      return;
    }
    const { fs, db } = await firestore();
    await fs.addDoc(fs.collection(db, 'firmas'), { ...v.firma, fecha: fs.serverTimestamp() });
  },
};
