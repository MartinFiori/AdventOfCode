const fs = require("fs");


function sumAll(data) {
  let total = 0;
  for (let i = 0; i < data.length; i++) {
    if (typeof data[i] === 'string') continue;
    if (Array.isArray(data[i])) total += sumArr(data[i])
    if (typeof data[i] === 'object' && !Array.isArray(data[i])) total += sumObj(data[i])
    if (typeof data[i] === 'number') { total += data[i] }
  }
  return total
}

function sumArr(arr) {
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] === 'string') continue;
    if (Array.isArray(arr[i])) total += sumArr(arr[i]);
    if (typeof arr[i] === 'object' && !Array.isArray(arr[i])) total += sumObj(arr[i]);
    if (typeof arr[i] === 'number') { total += arr[i] }
  }
  return total;
}

function sumObj(obj) {
  let total = 0;
  if (Object.values(obj).includes('red')) return 0;
  for (const prop in obj) {
    if (typeof obj[prop] === 'string') continue;
    if (Array.isArray(obj[prop])) total += sumArr(obj[prop]);
    if (typeof obj[prop] === 'object' && !Array.isArray(obj[prop])) total += sumObj(obj[prop]);
    if (typeof obj[prop] === 'number') { total += obj[prop] }
  }
  return total;
}

// Read input file and execute logic
fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }
  data = JSON.parse(data)
  console.log("result final", sumAll(data))
});

