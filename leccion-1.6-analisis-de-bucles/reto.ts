export {};
// =============================================
// RETO 1.6 — Analiza los Bucles
// Dificultad: 🟡 Medio
// =============================================
// Para cada función debes:
//   1. CONTAR cuántas iteraciones hace el bucle
//   2. Anotar su complejidad Big-O en el comentario
//   3. Implementarla si está incompleta
//
// ─────────────────────────────────────────────
// FUNCIÓN A: ¿Cuántas veces se ejecuta este bucle?
// Pista: i arranca en 1 y se multiplica por 3 cada vez
//
// Entrada: n (number)
// Salida:  void (solo imprime)
// ─────────────────────────────────────────────

// TODO: 1 3 9 27 81
// Complejidad: O( log n )
function multiplicaPorTres(n: number): void {
  for (let i = 1; i < n; i *= 3) {
    console.log(i);
  }
}
// Pruebas:
console.log("--- FUNCIÓN A: multiplicaPorTres(100) ---");
multiplicaPorTres(100);

// ─────────────────────────────────────────────
// FUNCIÓN B: Bucle anidado con índice que cambia
// Cuenta cuántas veces se ejecuta el console.log
// Pista: el bucle exterior e interior se relacionan
//
// Entrada: n (number)
// Salida:  number (total de iteraciones)
// ─────────────────────────────────────────────

// TODO: anota la complejidad y completa el return
// Complejidad: O( n² )
function contarIteraciones(n: number): number {
  let contador = 0;
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      contador++;
    }
  }
  return contador; // ??
}

console.log("\n--- FUNCIÓN B: contarIteraciones ---");
console.log("n=3:", contarIteraciones(3));  // 6
console.log("n=4:", contarIteraciones(4));  // 10
console.log("n=5:", contarIteraciones(5));  // 15

// ─────────────────────────────────────────────
// FUNCIÓN C: Dos bucles anidados con índices distintos
// Determina la complejidad combinada
//
// Entrada: n (number)
// Salida:  void
// ─────────────────────────────────────────────

// TODO: anota la complejidad
// Complejidad: O( n log n )
function buclesCombinados(n: number): void {
  for (let i = 0; i < n; i++) {
    for (let j = 1; j < n; j *= 2) {
      console.log(i, j);
    }
  }
}


console.log("\n--- FUNCIÓN C: buclesCombinados(4) ---");
buclesCombinados(4);
