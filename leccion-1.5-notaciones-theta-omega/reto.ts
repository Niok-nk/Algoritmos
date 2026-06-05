export {};
// =============================================
// RETO 1.5 — Clasificador de Notaciones
// Dificultad: 🟡 Medio
// =============================================
// Para cada función debes:
//   1. Implementarla correctamente
//   2. Indicar su notación O, Ω y si es Θ en los comentarios
//
// ─────────────────────────────────────────────
// FUNCIÓN A: Buscar el máximo en un arreglo
// Dado un arreglo de números, encuentra el valor más grande.
//
// Pregúntate:
//   - ¿Cuál es el mejor caso? (¿puede terminar antes?)
//   - ¿Cuál es el peor caso?
//   - ¿Son iguales?
//
// Entrada: arr (number[])
// Salida:  number
// ─────────────────────────────────────────────

// TODO: implementa y anota las notaciones
// O(n)
// Ω(n)
// ¿Es Θ? (si, Θ(n))
function encontrarMaximo(arr: number[]): number {
  if (arr.length === 0) throw new Error("Arreglo vacío");
  let maximo = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maximo) {
      maximo = arr[i];
    }
  }
  return maximo;
  //
}

console.log("--- encontrarMaximo ---");
console.log(encontrarMaximo([3, 7, 2, 9, 5]));  // 9 
console.log(encontrarMaximo([-5, -2, -10]));     // -2 
console.log(encontrarMaximo([100] ));              // 100 

// ─────────────────────────────────────────────
// FUNCIÓN B: Verificar si un arreglo está ordenado
// Dado un arreglo de números, devuelve true si está
// ordenado de MENOR a MAYOR, false si no.
//
// Ejemplo:
//   [1, 3, 5, 8] → true (está ordenado)
//   [1, 5, 3, 8] → false (5 > 3, desordenado)
//
// Pregúntate:
//   - ¿Cuándo termina más rápido?
//   - ¿Cuándo termina más lento?
//
// Entrada: arr (number[])
// Salida:  boolean
// ─────────────────────────────────────────────

// TODO: implementa y anota las notaciones
// O(?)
// Ω(?)
// ¿Es Θ? (?)
function estaOrdenado(arr: number[]): boolean {

}

console.log("--- estaOrdenado ---");
// console.log(estaOrdenado([1, 3, 5, 8]));   // true
// console.log(estaOrdenado([1, 5, 3, 8]));   // false
// console.log(estaOrdenado([3]));             // true
// console.log(estaOrdenado([]));              // true (vacío está ordenado)

// ─────────────────────────────────────────────
// FUNCIÓN C: Determinar si Θ aplica o no
// Para cada par (Ω, O) indica si el algoritmo
// se puede describir con Θ.
//
// Completa los valores en el switch/case.
//
// Ejemplo:
//   Ω(1), O(n)    → NO es Θ (porque 1 ≠ n)
//   Ω(n), O(n)    → SÍ es Θ(n) (porque son iguales)
//   Ω(1), O(1)    → SÍ es Θ(1)
//
// Entrada: omega (string), o (string)
// Salida:  string ("Θ(...)" o "No es Θ")
// ─────────────────────────────────────────────

// TODO: completa los casos faltantes
function esTheta(omega: string, o: string): string {
  // Recibe descripciones como "n", "1", "log n", "n²", etc.
  if (omega === o) {
    return `Θ(${omega})`; // Cuando coinciden, SÍ es Θ
  }
  return `No es Θ (Ω = ${omega}, O = ${o}, son diferentes)`;
}

console.log("\n--- esTheta ---");
console.log("Ω(1), O(n):", esTheta("1", "n"));     // No es Θ
console.log("Ω(n), O(n):", esTheta("n", "n"));     // Θ(n)
console.log("Ω(1), O(1):", esTheta("1", "1"));     // Θ(1)
console.log("Ω(1), O(log n):", esTheta("1", "log n")); // No es Θ
console.log("Ω(n²), O(n²):", esTheta("n²", "n²")); // Θ(n²)
