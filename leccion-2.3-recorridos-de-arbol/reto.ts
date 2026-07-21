export {};
// =============================================
// RETO 2.3 — Recorridos de Árbol
//
// Tienes que escribir 3 funciones que
// visiten el árbol en los 3 órdenes.
//
// Árbol de prueba:
//
//          (8)
//         /   \
//       (3)   (10)
//      /   \      \
//    (1)   (6)    (14)
//         /   \    /
//       (4)   (7) (13)
//
// Resultados esperados:
//   INORDER:   1  3  4  6  7  8  10  13  14
//   PREORDER:  8  3  1  6  4  7  10  14  13
//   POSTORDER: 1  4  7  6  3  13  14  10  8
// =============================================

// ── No toques esta parte ─────────────────────
interface NodoBST<T> {
  valor: T;
  izquierda: NodoBST<T> | null;
  derecha: NodoBST<T> | null;
}

function insertarNodo<T extends number | string>(
  raiz: NodoBST<T> | null, valor: T
): NodoBST<T> {
  if (!raiz) return { valor, izquierda: null, derecha: null };
  if (valor < raiz.valor) {
    raiz.izquierda = insertarNodo(raiz.izquierda, valor);
  } else {
    raiz.derecha = insertarNodo(raiz.derecha, valor);
  }
  return raiz;
}

function crearArbol(valores: number[]): NodoBST<number> | null {
  let raiz: NodoBST<number> | null = null;
  valores.forEach(v => { raiz = insertarNodo(raiz, v); });
  return raiz;
}
// ─────────────────────────────────────────────

// =============================================
// TU TAREA: completa estas 3 funciones
// =============================================
//
// Pistas:
//   - Las 3 funciones son IGUALES excepto por
//     el orden en que colocas los elementos
//   - El operador ... (spread) une arreglos
//   - Cada función recibe un nodo (o null)
//   - Si el nodo es null, devuelve []
//
// Ejemplo base:
//   function inorder(nodo: NodoBST<number> | null): number[] {
//     if (!nodo) return [];
//     return [
//       // ¿qué va aquí?
//     ];
//   }
//
// 📝 Recuerda: la teoría dice...
//   INORDER:   izquierda → raíz → derecha
//   PREORDER:  raíz → izquierda → derecha
//   POSTORDER: izquierda → derecha → raíz
// ─────────────────────────────────────────────

function inorder(nodo: NodoBST<number> | null): number[] {
  // [ESCRIBE AQUÍ]
}

function preorder(nodo: NodoBST<number> | null): number[] {
  // [ESCRIBE AQUÍ]
}

function postorder(nodo: NodoBST<number> | null): number[] {
  // [ESCRIBE AQUÍ]
}

// ── Pruebas (no toques) ──────────────────────
const arbol = crearArbol([8, 3, 10, 1, 6, 14, 4, 7, 13]);
console.log("INORDER:  ", inorder(arbol).join("  "));
console.log("PREORDER: ", preorder(arbol).join("  "));
console.log("POSTORDER:", postorder(arbol).join("  "));
