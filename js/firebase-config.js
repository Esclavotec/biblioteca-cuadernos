/**
 * firebase-config.js — Configuración web de Firebase.
 *
 * Mientras valga `null`, el cuaderno de visitas funciona en MODO LOCAL
 * (las firmas se guardan solo en el navegador de cada visitante).
 *
 * Para conectarlo a Firestore pega aquí el objeto que te da la consola de Firebase
 * (Configuración del proyecto → Tus apps → App web → firebaseConfig). Ejemplo:
 *
 * export const firebaseConfig = {
 *   apiKey: "AIza...",
 *   authDomain: "mi-proyecto.firebaseapp.com",
 *   projectId: "mi-proyecto",
 *   storageBucket: "mi-proyecto.appspot.com",
 *   messagingSenderId: "123456789",
 *   appId: "1:123456789:web:abcdef"
 * };
 *
 * Esta config es pública por diseño (va en el navegador). La seguridad la dan las reglas de
 * firestore.rules, que solo permiten LEER y CREAR firmas válidas, nunca editar ni borrar.
 */
export const firebaseConfig = null;
