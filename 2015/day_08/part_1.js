const fs = require("fs");

// Read input file
fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  let codeCharacters = 0;
  let memoryCharacters = 0;

  const instructions = data.split("\r\n");
  instructions.forEach((line) => {
    codeCharacters += line.length;

    // Removemos las comillas iniciales y finales
    let processed = line.slice(1, -1);

    // Contamos los caracteres reales en memoria
    let memoryLength = 0;
    for (let i = 0; i < processed.length; i++) {
      if (processed[i] === "\\") {
        if (processed[i + 1] === "\\" || processed[i + 1] === '"') {
          // Escaped backslash or quote (\\ or \")
          i++;
        } else if (
          processed[i + 1] === "x" &&
          /^[0-9a-fA-F]{2}$/.test(processed.slice(i + 2, i + 4))
        ) {
          // Hexadecimal escape (\xNN)
          i += 3;
        }
      }
      memoryLength++;
    }

    memoryCharacters += memoryLength;
  });
  console.log(`Difference: ${codeCharacters - memoryCharacters}`);
});
