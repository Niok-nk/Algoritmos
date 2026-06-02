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
// Las 8 complejidades más comunes (de mejor a peor):
//
//  O(1)        → Constante       — siempre igual, sin importar n
//  O(log n)    → Logarítmico     — divide el problema a la mitad
//  O(√n)       → Raíz cuadrada   — itera hasta la raíz de n
//  O(n)        → Lineal          — proporcional al tamaño
//  O(n log n)  → Linerogarítmico — típico de buenos sorts
//  O(n²)       → Cuadrático      — doble bucle anidado
//  O(2ⁿ)       → Exponencial     — duplica trabajo con cada elemento
//  O(n!)       → Factorial       — todas las permutaciones posibles
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
// O(√n) — Raíz cuadrada
// ─────────────────────────────────────────────────────────────
// El bucle itera hasta la raíz cuadrada de n, no hasta n.
// Cada iteración es una operación, pero el número de iteraciones
// crece con √n, no con n. Ejemplo: suma de divisores de un número.
// ─────────────────────────────────────────────────────────────
// Para n=36, los divisores son 1, 2, 3, 4, 6, 9, 12, 18, 36.
// Siempre vienen en pares: (1,36), (2,18), (3,12), (4,9), (6,6).
// Solo necesitamos llegar hasta √n para encontrar todos los pares.
function sumaDivisores(n: number): number {
  if (n <= 0) return 0;
  let suma = 0;
  for (let i = 1; i * i <= n; i++) { // solo hasta √n
    if (n % i === 0) {
      suma += i;           // i es divisor
      const par = n / i;   // su pareja
      if (par !== i) suma += par; // evitar contar √n dos veces
    }
  }
  return suma;
}

console.log("\nSuma de divisores (O(√n)):");
console.log("sumaDivisores(36):", sumaDivisores(36)); // 1+2+3+4+6+9+12+18+36 = 91
console.log("sumaDivisores(12):", sumaDivisores(12)); // 1+2+3+4+6+12 = 28
console.log("sumaDivisores(7):", sumaDivisores(7)); 
/*  // 1+7 = 8 (primo)
Este código es una forma muy optimizada de encontrar y sumar todos los divisores de un número. Para entender por qué funciona, el truco está en ver cómo los divisores de un número siempre vienen en **parejas**.

Vamos a desarmar la lógica paso a paso usando un ejemplo sencillo: **$n = 12$**.

---

## El secreto: Los divisores vienen en parejas

Si intentas dividir el número 12 por otros números, notarás que cada vez que encuentras un divisor, automáticamente encuentras otro:

* Si divides $12 / 1$, el resultado es $12$. Ya tienes la pareja: **$1$ y $12$** ($1 \times 12 = 12$).
* Si divides $12 / 2$, el resultado es $6$. Tienes la pareja: **$2$ y $6$** ($2 \times 6 = 12$).
* Si divides $12 / 3$, el resultado es $4$. Tienes la pareja: **$3$ y $4$** ($3 \times 4 = 12$).

Si seguimos buscando, el siguiente número sería el $4$, pero su pareja es el $3$, algo que ya descubrimos. **No hace falta seguir buscando más allá de la raíz cuadrada.** La raíz cuadrada de 12 es aproximadamente $3.46$. Al llegar a $3$, ya encontramos todas las parejas posibles.

---

## ¿Qué hace cada línea del código?

Analicemos el ciclo `for` y lo que pasa adentro:

### 1. La condición del ciclo: `i * i <= n`

En lugar de usar una función lenta como `Math.sqrt(n)`, el código usa un truco matemático equivalente. Decir que $i \le \sqrt{n}$ es exactamente lo mismo que decir que $i \times i \le n$.
Para $n = 12$:

* Con $i = 1$: $1 \times 1 \le 12$ (Verdadero)
* Con $i = 2$: $2 \times 2 \le 12$ (Verdadero)
* Con $i = 3$: $3 \times 3 \le 12$ (Verdadero)
* Con $i = 4$: $4 \times 4 \le 12$ (Falso, $16$ es mayor que $12$). El ciclo se detiene aquí.

### 2. Encontrar el divisor y su pareja

Dentro del `if (n % i === 0)`, el código confirma que `i` divide a `n` de forma exacta (el residuo es cero).

```typescript
suma += i;           // Agrega el divisor pequeño (por ejemplo, 2)
const par = n / i;   // Calcula su pareja (12 / 2 = 6)

```

### 3. El caso especial: `if (par !== i)`

¿Por qué existe esta línea? Imagina que calculamos los divisores de **$n = 16$** (un cuadrado perfecto).
La raíz cuadrada de $16$ es $4$.
Cuando el ciclo llega a $i = 4$:

* `i` es $4$.
* `par` es $16 / 4 = 4$.

Si sumáramos ambos directamente, estaríamos sumando el mismo $4$ dos veces ($4 + 4$). Esta condición se asegura de que si el divisor y su pareja son el mismo número, solo se sume una vez.

---

## Ejecución paso a paso con $n = 12$

Empezamos con `suma = 0`.

* **Paso 1 ($i = 1$):**
* ¿$12 \% 1 === 0$? Sí.
* `suma += 1` $\rightarrow$ (`suma` ahora es 1).
* `par = 12 / 1 = 12`.
* ¿$12 \neq 1$? Sí $\rightarrow$ `suma += 12` $\rightarrow$ (`suma` ahora es 13).


* **Paso 2 ($i = 2$):**
* ¿$12 \% 2 === 0$? Sí.
* `suma += 2` $\rightarrow$ (`suma` ahora es 15).
* `par = 12 / 2 = 6`.
* ¿$6 \neq 2$? Sí $\rightarrow$ `suma += 6` $\rightarrow$ (`suma` ahora es 21).


* **Paso 3 ($i = 3$):**
* ¿$12 \% 3 === 0$? Sí.
* `suma += 3` $\rightarrow$ (`suma` ahora es 24).
* `par = 12 / 3 = 4`.
* ¿$4 \neq 3$? Sí $\rightarrow$ `suma += 4` $\rightarrow$ (`suma` ahora es 28).


* **Termina el ciclo:** Como el siguiente paso sería $i = 4$ y $4 \times 4 > 12$, el programa sale del bucle y devuelve `28`.

Gracias a este límite de la raíz cuadrada, si le pides al programa procesar un número enorme como un millón, el ciclo solo se ejecutará 1000 veces en lugar de un millón de veces, haciendo que el código sea extremadamente rápido.

*/
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
console.log("n\t\tO(1)\tO(log n)\tO(√n)\tO(n)\tO(n²)");
for (const n of [10, 100, 1000]) {
  const logN = Math.round(Math.log2(n));
  const raiz = Math.round(Math.sqrt(n));
  console.log(`${n}\t\t1\t${logN}\t\t${raiz}\t${n}\t${n * n}`);
}
