export {};
// =============================================
// RETO 2.1 — Constructor de Árboles
// Dificultad: 🟡 Medio
// =============================================

// 📘 TypeScript: interface y genéricos
// Estas son las mismas funciones que viste en teoria.ts
// Las incluimos aquí para que el reto funcione.

interface NodoArbol<T> {
  valor: T;
  hijos: NodoArbol<T>[];
}

function crearNodo<T>(valor: T): NodoArbol<T> {
  return { valor, hijos: [] };
}

function agregarHijo<T>(padre: NodoArbol<T>, hijo: NodoArbol<T>): void {
  padre.hijos.push(hijo);
}

function esHoja<T>(nodo: NodoArbol<T>): boolean {
  return nodo.hijos.length === 0;
}

function contarNodos<T>(nodo: NodoArbol<T>): number {
  let total = 1;
  for (const hijo of nodo.hijos) {
    total += contarNodos(hijo);
  }
  return total;
}

function alturaArbol<T>(nodo: NodoArbol<T>): number {
  if (esHoja(nodo)) return 0;
  let maxAltura = 0;
  for (const hijo of nodo.hijos) {
    const alturaHijo = alturaArbol(hijo) + 1;
    if (alturaHijo > maxAltura) maxAltura = alturaHijo;
  }
  return maxAltura;
}
// Usando las funciones de teoría (crearNodo,
// agregarHijo, esHoja, contarNodos, alturaArbol),
// construye el siguiente árbol y responde:
//
//            (100)
//           /    \
//       (50)     (200)
//      /   \     /   \
//   (25)  (75)(150) (300)
//   /  \            /   \
//(10) (30)       (250) (400)
//
// Luego determina:
//   A) ¿Cuántos nodos tiene?
//   B) ¿Cuál es su altura?
//   C) ¿Qué nodos son hojas?
//   D) ¿Cuál es la altura del subárbol con raíz 200?
// =============================================

// TODO: Construye el árbol aquí
// 1. Crea la raíz con valor 100
// 2. Agrega todos los hijos según el diagrama
// 3. Descomenta las pruebas al final

// ─────────────────────────────────────────────
// Pistas:
// - Usa crearNodo(valor) para cada nodo
// - Usa agregarHijo(padre, hijo) para conectarlos
// - Usa contarNodos(raiz) para el total
// - Usa alturaArbol(raiz) para la altura
// - Usa esHoja(nodo) para verificar si es hoja
// ─────────────────────────────────────────────

// Escribe tu código aquí:
const raiz100 = crearNodo(100);




// Pruebas (descomenta cuando tengas el árbol listo):
// console.log("=== ÁRBOL DEL RETO ===");
// console.log("Total nodos:", contarNodos(raiz100));     // ¿?
// console.log("Altura del árbol:", alturaArbol(raiz100)); // ¿?
// console.log("Hojas:", ...);  // Muestra los valores de las hojas
// console.log("Altura del subárbol 200:", alturaArbol(n200)); // ¿?
