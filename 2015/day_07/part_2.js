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
      result = ~evaluate(x, circuit, cache) & 0xffff;
    } else {
      result = evaluate(expr, circuit, cache); // Asignación directa
    }

    cache[wire] = result; // Guardar en caché
    return result;
  }

  const circuit = parseInstructions(instructions);
  let cache = {};
  const signalA = evaluate("a", circuit, cache);
  console.log("Señal en el cable 'a' (parte 1):", signalA);

  // Parte 2: Sobrescribir 'b' con el valor de 'a' y recalcular
  circuit["b"] = signalA; // Sobrescribir b con el valor de a
  cache = {}; // Reiniciar el caché
  const newSignalA = evaluate("a", circuit, cache);
  console.log("Nueva señal en el cable 'a' (parte 2):", newSignalA);
});
