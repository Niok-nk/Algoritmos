export {};
// =============================================
// SOLUCIÓN 2.1 — Constructor de Árboles
// =============================================

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

// ─────────────────────────────────────────────
// Construcción del árbol del reto:
//
//            (100)
//           /    \
//       (50)     (200)
//      /   \     /   \
//   (25)  (75)(150) (300)
//   /  \            /   \
//(10) (30)       (250) (400)
// ─────────────────────────────────────────────

const raiz = crearNodo(100);

const n50 = crearNodo(50);
agregarHijo(raiz, n50);

const n200 = crearNodo(200);
agregarHijo(raiz, n200);

const n25 = crearNodo(25);
agregarHijo(n50, n25);

const n75 = crearNodo(75);
agregarHijo(n50, n75);

const n150 = crearNodo(150);
agregarHijo(n200, n150);

const n300 = crearNodo(300);
agregarHijo(n200, n300);

const n10 = crearNodo(10);
agregarHijo(n25, n10);

const n30 = crearNodo(30);
agregarHijo(n25, n30);

const n250 = crearNodo(250);
agregarHijo(n300, n250);

const n400 = crearNodo(400);
agregarHijo(n300, n400);

// Pruebas
console.log("=== ÁRBOL DEL RETO ===");
console.log("Total nodos:", contarNodos(raiz));     // 11
console.log("Altura del árbol:", alturaArbol(raiz)); // 3
console.log("Hojas:", esHoja(n10), esHoja(n30), esHoja(n75), esHoja(n150), esHoja(n250), esHoja(n400)); // todas true
console.log("Altura del subárbol 200:", alturaArbol(n200)); // 2
