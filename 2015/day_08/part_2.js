const fs = require("fs");

// Read input file
fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  const instructions = data.split("\r\n");
  let codeCharacters = 0;
  let encodedCharacters = 0;

  instructions.forEach((line) => {
    codeCharacters += line.length;

    // Encode the string by escaping backslashes and quotes, then wrapping in new quotes
    let encodedString = `"${line.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;

    encodedCharacters += encodedString.length;
  });

  console.log(`Difference: ${encodedCharacters - codeCharacters}`);
});
