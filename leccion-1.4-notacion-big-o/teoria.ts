export {};
// ============================================================
// LECCIÓN 1.4 — Notación Big-O: Cómo medir la velocidad
// Ejecutar con: npx ts-node teoria.ts
// ============================================================

// ¿Recuerdas que en la lección anterior vimos O(1), O(n) y O(n²)?
// La notación Big-O es el LENGUAJE formal para describir eso.
// No mide segundos — mide cómo CRECE el trabajo cuando n crece.
//
// REGLAS para simplificar Big-O:
//  1. Descartar constantes:  O(3n) → O(n)       (solo importa la forma)
//  2. Descartar términos pequeños: O(n² + n) → O(n²)   (domina el mayor)
//  3. Siempre expresar el PEOR CASO (a menos que se diga lo contrario)

// ─────────────────────────────────────────────────────────────
// Las 7 complejidades más comunes (de mejor a peor):
//
//  O(1)        → Constante     — siempre igual, sin importar n
//  O(log n)    → Logarítmico   — divide el problema a la mitad
//  O(n)        → Lineal        — proporcional al tamaño
//  O(n log n)  → Linerogarítmico — típico de buenos sorts
//  O(n²)       → Cuadrático    — doble bucle anidado
//  O(2ⁿ)       → Exponencial   — duplica trabajo con cada elemento
//  O(n!)       → Factorial     — todas las permutaciones posibles
// ─────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────
// O(1) — Constante
// ─────────────────────────────────────────────────────────────
// No importa si la lista tiene 10 o 10 millones de elementos.
// Siempre hace exactamente 1 operación.
function obtenerUltimo(arr: number[]): number {
  return arr[arr.length - 1]; // 1 operación, siempre
  //     └── acceso directo por índice → O(1)
}

// ─────────────────────────────────────────────────────────────
// O(log n) — Logarítmico
// ─────────────────────────────────────────────────────────────
// Divide el espacio de búsqueda a la MITAD en cada paso.
// Para n=1,000,000 solo necesita ≈20 pasos (log₂ de 1,000,000 ≈ 20)
//
// REQUISITO: el arreglo debe estar ORDENADO.
function busquedaBinaria(arr: number[], objetivo: number): number {
  let inicio = 0;
  let fin = arr.length - 1;
  //      ↑                 ↑
  //  Puntero izq       Puntero der
  // Ambos se acercan al centro en cada iteración

  while (inicio <= fin) {
    const medio = Math.floor((inicio + fin) / 2); // Posición central
    //    └── redondeamos hacia abajo para obtener un índice entero

    if (arr[medio] === objetivo) {
      return medio;              // ¡Encontrado! Retorna la posición
    } else if (arr[medio] < objetivo) {
      inicio = medio + 1;        // El objetivo está en la mitad DERECHA
    } else {
      fin = medio - 1;           // El objetivo está en la mitad IZQUIERDA
    }
    // En cada iteración, el espacio de búsqueda se DIVIDE A LA MITAD → O(log n)
  }
  return -1; // No encontrado
}

const ordenado = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
console.log("Binaria busca 11:", busquedaBinaria(ordenado, 11)); // → 5 (índice)
console.log("Binaria busca 6: ", busquedaBinaria(ordenado, 6));  // → -1 (no existe)
console.log("Binaria busca 19: ", busquedaBinaria(ordenado, 19));
// ─────────────────────────────────────────────────────────────
// O(n log n) — Linerogarítmico
// ─────────────────────────────────────────────────────────────
// Es la complejidad de los mejores algoritmos de ordenamiento.
// "Divide" el arreglo (log n veces) y "mezcla" (n operaciones cada vez).
// No lo implementamos aquí — lo veremos en el Módulo 5 (Merge Sort).

// ─────────────────────────────────────────────────────────────
// O(n²) — Cuadrático
// ─────────────────────────────────────────────────────────────
// Cada elemento se compara con todos los demás → doble bucle.
function bubbleSortSimple(arr: number[]): number[] {
  const resultado = [...arr]; // Copia del arreglo (no mutamos el original)
  //                 ↑
  // "Spread operator": expande los elementos de arr en un nuevo arreglo

  for (let i = 0; i < resultado.length; i++) {       // n veces
    for (let j = 0; j < resultado.length - i - 1; j++) { // n veces
      if (resultado[j] > resultado[j + 1]) {
        // Swap: intercambiar dos elementos
        const temp = resultado[j];       // Guardar temporalmente
        resultado[j] = resultado[j + 1]; // Mover el menor hacia adelante
        resultado[j + 1] = temp;         // Colocar el mayor atrás
      }
    }
  }
  return resultado;
}

console.log("\nBubble Sort:", bubbleSortSimple([64, 34, 25, 12, 22, 11, 90]));
// → [11, 12, 22, 25, 34, 64, 90]

// ─────────────────────────────────────────────────────────────
// O(2ⁿ) — Exponencial
// ─────────────────────────────────────────────────────────────
// Fibonacci sin memoria: recalcula TODO cada vez.
// Para n=40, hace más de 300 MILLONES de llamadas.
function fibExponencial(n: number): number {
  if (n <= 1) return n;
  return fibExponencial(n - 1) + fibExponencial(n - 2);
  // Cada llamada genera DOS llamadas más → árbol que se duplica → O(2ⁿ)
}
// Nota: NO llamar con n > 35 → tardará mucho

console.log("\nFib(10) exponencial:", fibExponencial(10)); // 55

// ─────────────────────────────────────────────────────────────
// Tabla visual de impacto
// ─────────────────────────────────────────────────────────────
console.log("\n=== Operaciones según complejidad ===");
console.log("n\t\tO(1)\tO(log n)\tO(n)\tO(n²)");
for (const n of [10, 100, 1000]) {
  const logN = Math.round(Math.log2(n));
  console.log(`${n}\t\t1\t${logN}\t\t${n}\t${n * n}`);
}
