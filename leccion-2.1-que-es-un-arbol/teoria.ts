export {};
// ============================================================
// LECCIÓN 2.1 — ¿Qué es un Árbol?
// Terminología: nodo, raíz, hoja, altura
// Ejecutar con: npx ts-node teoria.ts
// ============================================================

// Un ÁRBOL es una estructura de datos jerárquica.
// A diferencia de un arreglo (lineal) o una lista (secuencial),
// un árbol tiene una estructura de "ramas": un nodo puede
// tener múltiples "hijos".
//
// Analogía: Un árbol genealógico. Tienes un ancestro (RAÍZ),
// sus hijos, los hijos de sus hijos, etc. Al final están
// las personas sin descendencia (HOJAS).

// ─────────────────────────────────────────────────────────────
// Terminología clave
// ─────────────────────────────────────────────────────────────
//
// NODO (Node):       Cada elemento del árbol.
// RAÍZ (Root):       El nodo superior, sin padre.
// HIJO (Child):      Nodo que cuelga de otro nodo.
// PADRE (Parent):    Nodo que tiene uno o más hijos.
// HERMANOS (Sibling): Nodos que comparten el mismo padre.
// HOJA (Leaf):       Nodo sin hijos.
// ALTURA (Height):   Distancia desde la raíz hasta la hoja
//                    más lejana (cantidad de niveles - 1).
//
// Visualización de un árbol:
//
//         (10)       ← RAÍZ (nivel 0)
//        /    \
//     (5)     (15)   ← HIJOS de 10, HERMANOS entre sí
//    /   \       \
//  (3)   (7)    (20) ← HIJOS de 5 y 15
//  /               \
//(1)              (25) ← HOJAS (no tienen hijos)
//
// Altura = 3 (niveles 0→1→2→3, son 4 niveles, altura = 3)

// ─────────────────────────────────────────────────────────────
// Implementación de un Nodo en TypeScript
// ─────────────────────────────────────────────────────────────

// 📘 Nota TypeScript: interface
// Una interface define la FORMA de un objeto.
// Es como un "contrato": todo objeto que implemente esta
// interfaz DEBE tener las propiedades aquí definidas.
//
// interface NodoArbol<T> { ... }
//    ↑              ↑
//    └─ palabra     └─ T es un "genérico": el tipo del valor
//       clave para     puede ser number, string, etc.
//       definir una
//       estructura

interface NodoArbol<T> {
  valor: T;                 // El dato que guarda el nodo
  hijos: NodoArbol<T>[];    // Arreglo de nodos hijo
  //     ↑
  //     └─ NodoArbol<T>[] significa: "arreglo de nodos del mismo tipo"
  //        Si T es number, es NodoArbol<number>[]
}

// ─────────────────────────────────────────────────────────────
// Funciones básicas del árbol
// ─────────────────────────────────────────────────────────────

// Crear un nodo nuevo
function crearNodo<T>(valor: T): NodoArbol<T> {
  return { valor, hijos: [] };
  //   ↑       ↑
  //   └─ el   └─ arreglo vacío de hijos
  //      valor     (por ahora es una hoja)
}

// Agregar un hijo a un nodo
function agregarHijo<T>(padre: NodoArbol<T>, hijo: NodoArbol<T>): void {
  padre.hijos.push(hijo);
  // .push() agrega un elemento al FINAL del arreglo
}

// Verificar si un nodo es hoja (no tiene hijos)
function esHoja<T>(nodo: NodoArbol<T>): boolean {
  return nodo.hijos.length === 0;
}

// Contar el total de nodos en el árbol (recursivamente)
function contarNodos<T>(nodo: NodoArbol<T>): number {
  let total = 1; // Contamos el nodo actual
  for (const hijo of nodo.hijos) {
    total += contarNodos(hijo); // Sumamos los nodos de cada hijo
  }
  return total;
}

// Calcular la altura del árbol
function alturaArbol<T>(nodo: NodoArbol<T>): number {
  if (esHoja(nodo)) return 0; // Una hoja tiene altura 0
  let maxAltura = 0;
  for (const hijo of nodo.hijos) {
    const alturaHijo = alturaArbol(hijo) + 1;
    // +1 porque cada nivel cuenta
    if (alturaHijo > maxAltura) {
      maxAltura = alturaHijo;
    }
  }
  return maxAltura;
}

// ─────────────────────────────────────────────────────────────
// Construcción del árbol del ejemplo
// ─────────────────────────────────────────────────────────────
const raiz = crearNodo(10);             // Nodo raíz
const n5 = crearNodo(5);                // Hijo izquierdo
const n15 = crearNodo(15);              // Hijo derecho
agregarHijo(raiz, n5);
agregarHijo(raiz, n15);

const n3 = crearNodo(3);
const n7 = crearNodo(7);
agregarHijo(n5, n3);
agregarHijo(n5, n7);

const n20 = crearNodo(20);
agregarHijo(n15, n20);

const n1 = crearNodo(1);
agregarHijo(n3, n1);

const n25 = crearNodo(25);
agregarHijo(n20, n25);

// Pruebas
console.log("=== Árbol de ejemplo ===");
console.log("Valor raíz:", raiz.valor);                     // 10
console.log("Hijos de raíz:", raiz.hijos.map(h => h.valor)); // [5, 15]
console.log("¿Es hoja la raíz?", esHoja(raiz));              // false
console.log("¿Es hoja el nodo 1?", esHoja(n1));              // true
console.log("¿Es hoja el nodo 7?", esHoja(n7));              // true
console.log("Total nodos:", contarNodos(raiz));              // 9
console.log("Altura del árbol:", alturaArbol(raiz));         // 3

console.log("\nRecorrido: Raíz -> hijos directos:");
for (const hijo of raiz.hijos) {
  console.log(`  ${raiz.valor} → ${hijo.valor}`);
}
