const fs = require("fs");

// Read input file
fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }
  const instructions = data.split("\r\n");
});
