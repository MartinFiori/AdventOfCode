const fs = require("fs");


function sumJson(value) {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') return 0

  if (Array.isArray(value)) {
    let total = 0;
    for (let i = 0; i < value.length; i++) {
      total += sumJson(value[i])
    }
    return total
  }

  if (value != null && typeof value === 'object' && !Object.values(value).includes('red')) {
    let total = 0;
    for (const prop in value) {
      total += sumJson(value[prop])
    }
    return total;
  }
  return 0
}

// Read input file and execute logic
fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }
  data = JSON.parse(data)
  console.log("result final", sumJson(data))
});

