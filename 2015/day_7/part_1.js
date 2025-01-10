const { readFile } = require("fs");

readFile("./input.txt", "utf-8", (err, data) => {
  if (err) {
    console.log("error", err);
    return;
  }
  const instructions = data.split("\r\n");
  // Función para analizar las instrucciones
  function parseInstructions(instructions) {
    const circuit = {};
    instructions.forEach((instruction) => {
      const [operation, wire] = instruction.split(" -> ");
      circuit[wire] = operation;
    });
    return circuit;
  }

  // Función recursiva para evaluar un cable
  function evaluate(wire, circuit, cache) {
    if (!isNaN(wire)) {
      // Si es un número, devolverlo directamente
      return parseInt(wire, 10);
    }
    if (cache[wire] !== undefined) {
      // Si ya está en caché, devolverlo
      return cache[wire];
    }

    const expr = circuit[wire];
    let result;

    if (/AND/.test(expr)) {
      const [x, y] = expr.split(" AND ");
      result = evaluate(x, circuit, cache) & evaluate(y, circuit, cache);
    } else if (/OR/.test(expr)) {
      const [x, y] = expr.split(" OR ");
      result = evaluate(x, circuit, cache) | evaluate(y, circuit, cache);
    } else if (/LSHIFT/.test(expr)) {
      const [x, n] = expr.split(" LSHIFT ");
      result = evaluate(x, circuit, cache) << parseInt(n, 10);
    } else if (/RSHIFT/.test(expr)) {
      const [x, n] = expr.split(" RSHIFT ");
      result = evaluate(x, circuit, cache) >> parseInt(n, 10);
    } else if (/NOT/.test(expr)) {
      const x = expr.split("NOT ")[1];
      result = ~evaluate(x, circuit, cache) & 0xffff; // Máscara de 16 bits
    } else {
      console.log(expr);
      result = evaluate(expr, circuit, cache); // Asignación directa
    }

    cache[wire] = result; // Guardar en caché
    return result;
  }
  // Simular el circuito
  const circuit = parseInstructions(instructions);
  const cache = {};
  const result = evaluate("fs", circuit, cache); // Cambia "a" por el cable deseado

  console.log("Señal en el cable 'lx':", result);

  console.log(result);
});
