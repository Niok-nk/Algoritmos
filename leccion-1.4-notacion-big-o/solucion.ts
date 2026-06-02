export {};
// =============================================
// SOLUCIÓN 1.4 — Clasificador de Complejidades
// =============================================

// ============================================================
// 📘 NOTA TYPE SCRIPT — ¿Qué tipos usamos en este archivo?
// ============================================================
//
// boolean   → true o false. Se usa en esPrimoOptimo.
// number    → cualquier número (entero o decimal).
// number[]  → arreglo de números, ej: [1, 2, 3].
// [number, number] → TUPLA: arreglo de EXACTAMENTE 2 números.
// null      → "no hay valor", distinto de undefined.
// Set<number> → colección de números únicos.
//
// ============================================================

// ============================================================
// FUNCIÓN A: esPrimoOptimo — ¿El número es primo?
// Complejidad: O(√n)
// ============================================================
//
// ¿Qué significa O(√n)?
//   El bucle da, como máximo, √n vueltas.
//   Para n=100 → 10 vueltas. Para n=1,000,000 → 1,000 vueltas.
//   No revisamos TODOS los números hasta n, solo hasta √n.
//
// ¿Por qué funciona?
//   Los divisores vienen en parejas. Si n = a × b,
//   entonces UNO de los dos es ≤ √n. Siempre.
//   Si no hay divisores hasta √n, no los hay después.
//   Ej: 36 = 6×6 (√n), 36 = 4×9 (4 ≤ 6), 36 = 3×12 (3 ≤ 6).
//
// ── Paso a paso ──────────────────────────────────────────
//
// function esPrimoOptimo(n: number): boolean {
//   ↑               ↑          ↑         ↑
//   └─ palabra      └─ nombre  └─ paráme- └─ promete devolver
//      clave de       de la       tro de      true o false
//      declaración    función     tipo
//
// Las validaciones iniciales (guard clauses o retornos tempranos):
//
// if (n < 2) return false;    ← 1 y 0 NO son primos, salimos ya
// if (n === 2) return true;   ← 2 es primo, salimos ya
// if (n % 2 === 0) return false; ← pares > 2 no son primos
//
//   n % 2 se lee "n módulo 2" → el RESTO de dividir n entre 2.
//   Si el resto es 0 → es par → no es primo.
//
// El bucle for:
// for (let i = 3; i * i <= n; i += 2) { ... }
//  ↑        ↑         ↑            ↑
//  └─ crea  └─ desde  └─ mientras  └─ avanza de 2 en 2
//     variable  3         i² ≤ n      (solo impares)
//
//   i * i es lo mismo que i². Evitamos Math.sqrt() por eficiencia.
//   i += 2 es igual a i = i + 2. Saltamos los pares.
//
// Dentro del bucle:
//   if (n % i === 0) return false;
//   Si i divide exactamente a n (resto = 0), n NO es primo.
//
// Si el bucle termina sin encontrar divisores:
//   return true; → n es primo.
//
function esPrimoOptimo(n: number): boolean {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;

  for (let i = 3; i * i <= n; i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

// ── Ejecución visual con n = 97 ──────────────────────────
//
//   ¿n < 2? 97 < 2 → NO, seguimos
//   ¿n === 2? → NO, seguimos
//   ¿97 % 2 === 0? 97 ÷ 2 = 48, resto 1 → NO, seguimos
//
//   i=3:  ¿3×3 ≤ 97? (9 ≤ 97) → SÍ. ¿97 % 3 = 1? → NO, siguiente
//   i=5:  ¿5×5 ≤ 97? (25 ≤ 97) → SÍ. ¿97 % 5 = 2? → NO
//   i=7:  ¿49 ≤ 97? → SÍ. ¿97 % 7 = 6? → NO
//   i=9:  ¿81 ≤ 97? → SÍ. ¿97 % 9 = 7? → NO
//   i=11: ¿121 ≤ 97? → NO. Se acaba el bucle.
//
//   return true → 97 es primo ✅
//
// ── ¿Cuántas iteraciones? ────────────────────────────────
//   Para n=97 → i=3,5,7,9,11 → 5 iteraciones (√97 ≈ 9.8)
//   Si hubiéramos usado O(n): i=2..96 → 95 iteraciones
//   Ahorramos 90 iteraciones. Con n grandes, la diferencia es enorme.

// ============================================================
// FUNCIÓN B: dosPunteros — Encontrar par que suma objetivo
// Complejidad: O(n)
// ============================================================
//
// ¿Qué hace esta función?
//   Recibe un arreglo ORDENADO y un número objetivo.
//   Busca DOS valores dentro del arreglo que sumen el objetivo.
//   Si los encuentra, devuelve [valor1, valor2].
//   Si no, devuelve null.
//
// ¿Qué técnica usa? "Two Pointers" (Dos Punteros).
//   Colocamos un puntero al INICIO y otro al FINAL.
//   Calculamos la suma de ambos. Según el resultado:
//     - Si suma === objetivo → ¡lo encontramos!
//     - Si suma  < objetivo → la suma es muy chica,
//       movemos el puntero izquierdo a la derecha (suma más grande)
//     - Si suma  > objetivo → la suma es muy grande,
//       movemos el puntero derecho a la izquierda (suma más chica)
//   Repetimos hasta que los punteros se crucen.
//
// ── ¿Por qué funciona con arreglos ordenados? ──────────────
//   Al moverse desde los extremos hacia el centro, cada paso
//   acerca la suma al objetivo de forma controlada.
//   Es como ajustar el agua fría y caliente de una ducha:
//   si está muy fría, abres más la caliente (inicio++),
//   si está muy caliente, abres más la fría (fin--).
//
// ── Paso a paso del código ────────────────────────────────
//
// function dosPunteros(
//   arr: number[],      ← arreglo ORDENADO de números
//   objetivo: number    ← el número que queremos lograr
// ): [number, number] | null {
//    ↑                       ↑
//    └─ devuelve una         └─ O devuelve null
//       tupla de 2 números      (si no hay par)
//
//   let inicio = 0;
//   ↑                  ↑
//   └─ variable que    └─ arranca en el primer índice (0)
//      puede cambiar
//
//   let fin = arr.length - 1;
//   ↑                 ↑
//   └─ variable que   └─ arranca en el ÚLTIMO índice
//      puede cambiar      (si el arreglo tiene 5 elementos,
//                          el último índice es 4)
//
function dosPunteros(arr: number[], objetivo: number): [number, number] | null {
  let inicio = 0;
  let fin = arr.length - 1;

  // ── while: ¿Qué es y cómo funciona? ─────────────────────
  //
  // while (condición) {
  //     ↑              └─ el bloque se repite MIENTRAS
  //     └─ expresión     la condición sea TRUE
  //        booleana
  // }
  //
  // DIFERENCIA con for:
  //   for   → se usa cuando SABES cuántas veces vas a iterar
  //           (ej: recorrer un arreglo completo)
  //   while → se usa cuando NO SABES cuántas veces vas a iterar
  //           (ej: búsqueda binaria, two pointers, menú de usuario)
  //
  // En este caso, no sabemos de antemano cuántos movimientos
  // de punteros harán falta. Depende de los valores. Por eso
  // usamos while.
  //
  // while (inicio <= fin) { ... }
  //         ↑
  //         └─ mientras inicio NO se haya cruzado con fin
  //
  // ¿Cuándo se cruzan? Si inicio es 0 y fin es 4, el while
  // ejecuta mientras 0 ≤ 4, 1 ≤ 4, 2 ≤ 4, 3 ≤ 4, 4 ≤ 4.
  // Cuando inicio = 5 y fin = 4, 5 ≤ 4 es FALSE → se acaba.
  // Esto significa que ya revisamos todas las combinaciones
  // posibles sin encontrar el par → no existe → null.

  while (inicio <= fin) {

    // ── Calcular la suma actual ───────────────────────────
    // const: palabra clave para declarar una variable
    // que NO se puede reasignar.
    // suma = arr[inicio] + arr[fin];
    //        ↑            ↑
    //        valor en el  valor en el
    //        puntero izq  puntero der
    //
    // arr[inicio] se lee: "accede al elemento del arreglo
    // en la posición inicio".

    const suma = arr[inicio] + arr[fin];

    // ── Tres caminos posibles ────────────────────────────
    //
    // if (suma === objetivo)
    //     ↑
    //     └─ comparación ESTRICTA (valor Y tipo)
    //        === es diferente de == (que hace coerción de tipos)
    //
    // Encontramos el par exacto:
    // return [arr[inicio], arr[fin]];
    //   ↑     ↑
    //   └─ la  └─ creamos una tupla (arreglo de 2 elementos)
    //      función    con los VALORES (no los índices)
    //      termina
    //      aquí

    if (suma === objetivo) {
      return [arr[inicio], arr[fin]];

    // else if (suma < objetivo)
    //   "Si la condición del if no se cumplió,
    //    y además suma < objetivo, entonces..."
    //
    //   inicio++; equivale a inicio = inicio + 1
    //   Mover el puntero izquierdo UNA posición a la derecha
    //   incrementa la suma (porque el arreglo está ordenado
    //   de menor a mayor).

    } else if (suma < objetivo) {
      inicio++;

    // else { ... }
    //   "Si no se cumplió NINGUNA de las condiciones anteriores,
    //    entonces..."
    //   La única posibilidad que queda es suma > objetivo.
    //   Movemos el puntero derecho a la izquierda.

    } else {
      fin--;
    }
    // Al llegar aquí, el while vuelve a evaluar inicio <= fin.
    // Si es true, itera de nuevo. Si es false, sale del bucle.
  }

  // ── Si salimos del while sin haber hecho return ────────
  // return null significa "no se encontró el par".
  // null es un valor ESPECIAL en JavaScript/TypeScript que
  // representa "ausencia intencional de valor".
  return null;
}

// ── Ejecución visual con [1, 3, 5, 7, 9] y objetivo=8 ────
//
// inicio=0 (valor 1), fin=4 (valor 9)
// ┌─────────────────────────────────────────────────────┐
// │ while(0 ≤ 4) → TRUE                                 │
// │   suma = 1 + 9 = 10                                 │
// │   10 === 8? NO │ 10 < 8? NO │ else { fin-- } fin=3 │
// ├─────────────────────────────────────────────────────┤
// │ while(0 ≤ 3) → TRUE                                 │
// │   suma = 1 + 7 = 8                                  │
// │   8 === 8? → SÍ → return [1, 7] ✅                  │
// └─────────────────────────────────────────────────────┘
// Solo 2 iteraciones. Con fuerza bruta (doble bucle)
// hubieran sido 10 comparaciones.

// ============================================================
// FUNCIÓN C: contarUnicos — ¿Cuántos valores distintos hay?
// Complejidad: O(n) — recorre el arreglo una sola vez
// ============================================================
//
// ¿Qué es Set?
//   Set es una estructura de datos que almacena VALORES ÚNICOS.
//   Cuando agregas un valor que ya existe, simplemente lo ignora.
//
// ¿Cómo se usa?
//   new Set<T>(iterable)
//     ↑       ↑
//     └─ crea  └─ Tipo de los elementos (se infiere solo)
//        una nueva     Puede ser number, string, etc.
//        instancia
//
//   Ejemplo:
//     new Set([1, 2, 2, 3])
//       internamente hace:
//         .add(1) → Set {1}
//         .add(2) → Set {1, 2}
//         .add(2) → Set {1, 2}  ← 2 ya existe, se ignora
//         .add(3) → Set {1, 2, 3}
//       Resultado: Set { 1, 2, 3 }
//
// ¿Qué es .size?
//   .size es una PROPIEDAD (no un método, por eso NO lleva () ).
//   Devuelve la cantidad de elementos que tiene el Set.
//
//   Diferencia clave con .length:
//     [1,2,2,3].length   → 4  (cuenta TODO, con duplicados)
//     new Set([1,2,2,3]).size → 3  (solo valores ÚNICOS)
//
// ¿Por qué se llama .size y no .length?
//   .length se usa en estructuras con ÍNDICES numéricos
//   (arreglos, strings). Set no tiene índices numéricos,
//   no puedes hacer set[0]. Por eso usa .size.
//   Map también usa .size por la misma razón.
//
// ── ¿Qué hace la función? ────────────────────────────────
//
// function contarUnicos(arr: number[]): number {
//   return new Set(arr).size;
//          ↑      ↑      ↑
//          │      │      └─ .size cuenta los únicos
//          │      └─ creamos un Set a partir del arreglo
//          └─ devolvemos el resultado DIRECTAMENTE
//             (return expression → evalúa la expresión
//              y la devuelve sin guardarla en variable)
// }
//
// En una sola línea:
// 1. Convertimos el arreglo a Set (elimina duplicados)
// 2. Leemos .size (cantidad de elementos únicos)
// 3. Lo devolvemos
//
// ── Ejecución visual con [1, 2, 2, 3, 3, 3] ────────────
//
//   new Set([1, 2, 2, 3, 3, 3])
//     add(1) → {1}
//     add(2) → {1, 2}
//     add(2) → {1, 2}         ← duplicado, ignorado
//     add(3) → {1, 2, 3}
//     add(3) → {1, 2, 3}      ← duplicado, ignorado
//     add(3) → {1, 2, 3}      ← duplicado, ignorado
//   .size → 3 ✅
//
function contarUnicos(arr: number[]): number {
  return new Set(arr).size;
}

// ============================================================
// PRUEBAS
// ============================================================
console.log("=== esPrimoOptimo (O(√n)) ===");
console.log("esPrimoOptimo(2):", esPrimoOptimo(2));   // true  (2 es primo)
console.log("esPrimoOptimo(7):", esPrimoOptimo(7));   // true  (7 es primo)
console.log("esPrimoOptimo(9):", esPrimoOptimo(9));   // false (9 = 3×3)
console.log("esPrimoOptimo(4):", esPrimoOptimo(4));   // false (4 = 2×2)

console.log("\n=== dosPunteros (O(n)) ===");
console.log("Buscar suma 8 en [1,3,5,7,9]:", dosPunteros([1, 3, 5, 7, 9], 8));   // [1, 7]
console.log("Buscar suma 10 en [2,4,6,8]:", dosPunteros([2, 4, 6, 8], 10));      // [2, 8]
console.log("Buscar suma 10 en [1,2,3]:", dosPunteros([1, 2, 3], 10));           // null

console.log("\n=== contarUnicos (O(n)) ===");
console.log("Únicos en [1,2,2,3,3,3]:", contarUnicos([1, 2, 2, 3, 3, 3])); // 3
console.log("Únicos en [5,5,5,5]:", contarUnicos([5, 5, 5, 5]));           // 1
console.log("Únicos en [1,2,3,4]:", contarUnicos([1, 2, 3, 4]));           // 4
