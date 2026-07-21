export {};
// ============================================================
// LECCIÓN 2.3 — Recorridos de Árbol
// Inorder · Preorder · Postorder
// ============================================================

// Los recorridos definen el ORDEN en que visitamos los nodos.
//
// Hay 3 formas principales:
//
//   INORDER:   izquierda → raíz → derecha
//   PREORDER:  raíz → izquierda → derecha
//   POSTORDER: izquierda → derecha → raíz
//
// La palabra dice DÓNDE está la raíz:
//   IN    = raíz en medio   (izquierda → IN → derecha)
//   PRE   = raíz al principio (PRE → izquierda → derecha)
//   POST  = raíz al final     (izquierda → derecha → POST)
//
// ─────────────────────────────────────────────────────────────
// Árbol de ejemplo (BST)
// ─────────────────────────────────────────────────────────────
//
//          (8)                ← raíz
//         /   \
//       (3)   (10)
//      /   \      \
//    (1)   (6)    (14)
//         /   \    /
//       (4)   (7) (13)
//
// Recorridos sobre este árbol:
//
//   INORDER:   1  3  4  6  7  8  10  13  14
//              └───  ↑  ───┘  ↑  └───  ↑  ───┘
//              izquierda  raíz      derecha
//              (subárbol   (8)    (subárbol
//               izquierdo)          derecho)
//
//   → En un BST, INORDER da los valores ORDENADOS.
//     (porque visita izquierda < raíz < derecha)
//
//   PREORDER:  8  3  1  6  4  7  10  14  13
//              ↑  └────── ↑ ──────┘  └── ↑ ──┘
//             raíz    subárbol         subárbol
//                     izquierdo        derecho
//
//   → PREORDER se usa para COPIAR un árbol.
//     (primero ves la raíz, luego construyes hijos)
//
//   POSTORDER: 1  4  7  6  3  13  14  10  8
//              └────── ↑ ──────┘  └── ↑ ──┘  ↑
//               subárbol        subárbol   raíz
//               izquierdo       derecho
//
//   → POSTORDER se usa para BORRAR un árbol.
//     (borras hijos primero, después el padre)
//
// ─────────────────────────────────────────────────────────────
// Casos de uso reales
// ─────────────────────────────────────────────────────────────
//
// 1. INORDER (orden ascendente):
//    - Mostrar una lista de contactos ordenados alfabéticamente
//    - Generar un reporte de empleados por ID ascendente
//    - Sincronizar dos BST (compararlos elemento por elemento)
//
// 2. PREORDER (copiar / serializar):
//    - Guardar un árbol en un archivo (serialización)
//    - Enviar un árbol por la red (se reconstruye fácilmente)
//    - Mostrar la estructura de carpetas como un árbol
//
// 3. POSTORDER (liberar memoria / evaluar expresiones):
//    - Borrar un árbol de la memoria (primero hijos, luego padre)
//    - Evaluar expresiones matemáticas (árbol de expresión:
//      primero operandos, luego operador)
//    - Calcular el tamaño total de una carpeta
//      (sumar hijos antes que el padre)
//
// ─────────────────────────────────────────────────────────────
// Implementación de los recorridos
// ─────────────────────────────────────────────────────────────

interface NodoBST<T> {
  valor: T;
  izquierda: NodoBST<T> | null;
  derecha: NodoBST<T> | null;
}

class ArbolBST<T extends number | string> {
  raiz: NodoBST<T> | null = null;
  //  ↑ pública para que podamos recorrer desde fuera

  insertar(valor: T): void {
    const nuevo: NodoBST<T> = { valor, izquierda: null, derecha: null };
    if (!this.raiz) { this.raiz = nuevo; return; }
    this.insertarNodo(this.raiz, nuevo);
  }

  private insertarNodo(actual: NodoBST<T>, nuevo: NodoBST<T>): void {
    if (nuevo.valor < actual.valor) {
      if (!actual.izquierda) actual.izquierda = nuevo;
      else this.insertarNodo(actual.izquierda, nuevo);
    } else {
      if (!actual.derecha) actual.derecha = nuevo;
      else this.insertarNodo(actual.derecha, nuevo);
    }
  }

  // ── INORDER: izquierda → raíz → derecha ────────────────
  inorder(nodo: NodoBST<T> | null = this.raiz): T[] {
    if (!nodo) return [];
    return [
      ...this.inorder(nodo.izquierda),  // 1. todo lo de la izquierda
      nodo.valor,                        // 2. este nodo
      ...this.inorder(nodo.derecha),    // 3. todo lo de la derecha
    ];
    // Se lee: "del subárbol izquierdo, luego yo, luego el derecho"
  }

  // ── PREORDER: raíz → izquierda → derecha ───────────────
  preorder(nodo: NodoBST<T> | null = this.raiz): T[] {
    if (!nodo) return [];
    return [
      nodo.valor,                         // 1. este nodo (primero)
      ...this.preorder(nodo.izquierda),  // 2. subárbol izquierdo
      ...this.preorder(nodo.derecha),    // 3. subárbol derecho
    ];
  }

  // ── POSTORDER: izquierda → derecha → raíz ──────────────
  postorder(nodo: NodoBST<T> | null = this.raiz): T[] {
    if (!nodo) return [];
    return [
      ...this.postorder(nodo.izquierda), // 1. subárbol izquierdo
      ...this.postorder(nodo.derecha),   // 2. subárbol derecho
      nodo.valor,                         // 3. este nodo (último)
    ];
  }
}

// ─────────────────────────────────────────────────────────────
// Traza visual: inorder en el árbol de ejemplo
// ─────────────────────────────────────────────────────────────
//
// Llamada: arbol.inorder()
//   → this.inorder(8)
//
//   inorder(8):
//     ├─ inorder(3):
//     │   ├─ inorder(1):
//     │   │   ├─ inorder(null)  → []
//     │   │   ├─ [1]
//     │   │   └─ inorder(null)  → []
//     │   │   = [1]
//     │   ├─ [3]
//     │   └─ inorder(6):
//     │       ├─ inorder(4):
//     │       │   ├─ [] + [4] + [] = [4]
//     │       ├─ [6]
//     │       └─ inorder(7):
//     │           ├─ [] + [7] + [] = [7]
//     │       = [4, 6, 7]
//     │   = [1, 3, 4, 6, 7]
//     ├─ [8]
//     └─ inorder(10):
//         ├─ inorder(null)  → []
//         ├─ [10]
//         └─ inorder(14):
//             ├─ inorder(13): [] + [13] + [] = [13]
//             ├─ [14]
//             └─ inorder(null) → []
//             = [13, 14]
//         = [10, 13, 14]
//     = [1, 3, 4, 6, 7, 8, 10, 13, 14] ✅

// ─────────────────────────────────────────────────────────────
// NOTA: Los 3 recorridos son IDÉNTICOS excepto por 1 línea:
// la posición donde ponemos nodo.valor.
//
//   inorder:   [...izquierda,  nodo.valor,  ...derecha]
//   preorder:  [nodo.valor,  ...izquierda,  ...derecha]
//   postorder: [...izquierda,  ...derecha,  nodo.valor]
//
// Solo cambia el orden de la propagación.
// ─────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────
// Pruebas
// ─────────────────────────────────────────────────────────────
const arbol = new ArbolBST<number>();
[8, 3, 10, 1, 6, 14, 4, 7, 13].forEach(v => arbol.insertar(v));

console.log("INORDER:  ", arbol.inorder().join("  "));
//   Debería: 1  3  4  6  7  8  10  13  14
console.log("PREORDER: ", arbol.preorder().join("  "));
//   Debería: 8  3  1  6  4  7  10  14  13
console.log("POSTORDER:", arbol.postorder().join("  "));
//   Debería: 1  4  7  6  3  13  14  10  8
