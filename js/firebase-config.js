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
// Proyecto: biblioteca-cuadernos-vm5q (plan Spark gratuito, Firestore en nam5)
export const firebaseConfig = {
  apiKey: 'AIzaSyBWZ_BsBYqFtiP1ze5nt9dTUZkhJ-B_w58',
  authDomain: 'biblioteca-cuadernos-vm5q.firebaseapp.com',
  projectId: 'biblioteca-cuadernos-vm5q',
  storageBucket: 'biblioteca-cuadernos-vm5q.firebasestorage.app',
  messagingSenderId: '595739744544',
  appId: '1:595739744544:web:6f6aa19ff0e9047b22df45',
};
