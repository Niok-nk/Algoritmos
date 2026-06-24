export {};
// =============================================
// SOLUCIÓN 1.6 — Analiza los Bucles
// =============================================

// ============================================================
// FUNCIÓN A: multiplicaPorTres — O(log n)
// ============================================================
//
// i = 1, 3, 9, 27, 81, ... → se multiplica por 3 cada vuelta
// Para n = 100: 1, 3, 9, 27, 81 → 5 iteraciones
// Para n = 1000: 1, 3, 9, 27, 81, 243, 729 → 7 iteraciones
// La cantidad de vueltas es log₃(n). En Big-O, la base del
// logaritmo es una constante, así que se simplifica a O(log n).
function multiplicaPorTres(n: number): void {
  for (let i = 1; i < n; i *= 3) {
    console.log(i);
  }
}

// ============================================================
// FUNCIÓN B: contarIteraciones — O(n²)
// ============================================================
//
// ¿Por qué O(n²) si j empieza en i y no en 0?
//   i=0: j=0..n-1 → n iteraciones
//   i=1: j=1..n-1 → n-1 iteraciones
//   i=2: j=2..n-1 → n-2 iteraciones
//   ...
//   i=n-1: j=n-1..n-1 → 1 iteración
//
// Total = n + (n-1) + (n-2) + ... + 1 = n(n+1)/2
//          = n²/2 + n/2 → se simplifica a O(n²)
//
// Esto es la "suma de Gauss": el triángulo de iteraciones.
function contarIteraciones(n: number): number {
  let contador = 0;
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      contador++;
    }
  }
  return contador;
}

// ============================================================
// FUNCIÓN C: buclesCombinados — O(n log n)
// ============================================================
//
// Bucle exterior: i++ → n iteraciones
// Bucle interior: j *= 2 → log n iteraciones
// Anidados: se MULTIPLICAN → n × log n = O(n log n)
//
// Esta es la complejidad de los mejores algoritmos de
// ordenamiento (Merge Sort, Quick Sort en promedio).
function buclesCombinados(n: number): void {
  for (let i = 0; i < n; i++) {
    for (let j = 1; j < n; j *= 2) {
      console.log(i, j);
    }
  }
}

// ============================================================
// RESUMEN: Patrones de bucles y su complejidad
// ============================================================
//
// for (i=0; i<n; i++)           → O(n)
// for (i=0; i<n; i++)           → O(n²)
//   for (j=0; j<n; j++)
// for (i=0; i<n; i++)           → O(n²)  (triangular)
//   for (j=i; j<n; j++)
// for (i=1; i<n; i*=2)          → O(log n)
// for (i=1; i<n; i*=3)          → O(log n)
// for (i=0; i<n; i++)           → O(n log n)
//   for (j=1; j<n; j*=2)

// ============================================================
// PRUEBAS
// ============================================================
console.log("--- FUNCIÓN A: multiplicaPorTres(100) ---");
multiplicaPorTres(100);

console.log("\n--- FUNCIÓN B: contarIteraciones ---");
console.log("n=3:", contarIteraciones(3));  // 6
console.log("n=4:", contarIteraciones(4));  // 10
console.log("n=5:", contarIteraciones(5));  // 15

console.log("\n--- FUNCIÓN C: buclesCombinados(4) ---");
buclesCombinados(4);
