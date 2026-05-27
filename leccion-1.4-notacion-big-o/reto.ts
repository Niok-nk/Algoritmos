export {};
// =============================================
// RETO 1.4 — Clasificador de Complejidades
// Dificultad: 🟡 Medio
// =============================================
// Tienes 3 funciones incompletas. Para CADA UNA debes:
//   1. Implementarla correctamente
//   2. Indicar su complejidad Big-O en el comentario marcado
//
// ─────────────────────────────────────────────
// FUNCIÓN A: Verificar si un número es primo
// Un número es primo si solo es divisible por 1 y por sí mismo.
// Pista: solo necesitas probar divisores hasta √n
//        (si n tiene un divisor mayor que √n, también tiene uno menor)
//
// Entrada: n (number)
// Salida:  boolean
// Complejidad esperada: O(√n)
// ─────────────────────────────────────────────

// TODO: implementa y anota la complejidad en el comentario
// Complejidad: O( creo que es lineal )
function esPrimo(n: number): boolean {
    if (n < 2) return false;
    for (let i = 2; i < n; i++){
        if (n % i === 0) return false;
    }
    return true;
}
// Pruebas:
console.log("--- esPrimo ---");
console.log(esPrimo(2));   // true
console.log(esPrimo(7));   // true
console.log(esPrimo(9));   // false (3 × 3)
console.log(esPrimo(1));   // false (por definición, 1 no es primo)
// ─────────────────────────────────────────────
// FUNCIÓN B: Encontrar el par de suma más eficiente
// Dado un arreglo ORDENADO y un objetivo,
// usa dos punteros (uno desde el inicio, otro desde el final)
// para encontrar los VALORES (no índices) que suman el objetivo.
//
// Técnica: Two Pointers — mueve izquierda si la suma es muy pequeña,
//          mueve derecha si la suma es muy grande.
//
// Entrada: arr (number[] ordenado), objetivo (number)
// Salida:  [number, number] | null
// Complejidad esperada: O(n)
// ─────────────────────────────────────────────

// TODO: implementa y anota la complejidad en el comentario
// Complejidad: O( ??? )
function dosPunteros(arr: number[], objetivo: number): [number, number] | null {
    let inicio = 0;
    let fin = arr.length - 1;    
    while(inicio <= fin ){
        const suma = arr[inicio] + arr[fin];
        if (suma === objetivo){
            return [arr[inicio], arr[fin]]
        }   else if (suma < objetivo){
            inicio++;           
            }else{
                fin--;
            }
    }
    return null;
    

}
console.log("--- dosPunteros ---");
console.log(dosPunteros([1, 3, 5, 7, 9], 8));   // [1, 7] o [3, 5]
console.log(dosPunteros([2, 4, 6, 8], 10));      // [2, 8] o [4, 6]
console.log(dosPunteros([1, 2, 3], 10));          // null


// ─────────────────────────────────────────────
// FUNCIÓN C: Contar elementos únicos
// Dado un arreglo, devuelve cuántos valores DISTINTOS tiene.
// Ejemplo: [1, 2, 2, 3, 3, 3] → 3 (los distintos son 1, 2, 3)
// Pista: Set es una estructura que solo guarda valores únicos.
//        new Set([1,2,2,3]) → {1, 2, 3} → .size = 3
//
// Entrada: arr (number[])
// Salida:  number
// Complejidad esperada: O(n)
// ─────────────────────────────────────────────

// TODO: implementa y anota la complejidad en el comentario
// Complejidad: O( ??? )
function contarUnicos(arr: number[]): number {

}

console.log("--- contarUnicos ---");
console.log(contarUnicos([1, 2, 2, 3, 3, 3])); // 3
console.log(contarUnicos([5, 5, 5, 5]));        // 1
console.log(contarUnicos([1, 2, 3, 4]));        // 4
