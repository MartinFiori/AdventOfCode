const fs = require("fs");

function parseData(data) {
  const graph = { 'yo': {} };
  const instructions = data.split("\n").map((line) => line.trim())
  for (const word of instructions) {
    const [person, , stat, num, , , , , , , neighbor] = word.slice(0, -1).split(' ')
    const n = parseInt(num)
    if (!graph[person]) graph[person] = {}

    graph[person][neighbor] = stat === 'lose' ? -n : n
    graph[person]['yo'] = 0
  }

  for (const prop in graph) {
    graph[prop]['yo'] = 0
  }

  for (const name of Object.keys(graph)) {
    graph['yo'][name] = 0
  }
  return [graph, Object.keys(graph)]
}

function calculateHappiness(graph, people) {
  const n = people.length;
  let total = 0;
  for (let i = 0; i < n; i++) {
    const l = people[(i - 1 + n) % n]
    const r = people[(i + 1) % n]
    total += graph[people[i]][r] + graph[people[i]][l]
  }
  return total
}

function perm(xs) {
  let ret = [];

  for (let i = 0; i < xs.length; i = i + 1) {
    let rest = perm(xs.slice(0, i).concat(xs.slice(i + 1)));

    if (!rest.length) {
      ret.push([xs[i]])
    } else {
      for (let j = 0; j < rest.length; j = j + 1) {
        ret.push([xs[i]].concat(rest[j]))
      }
    }
  }
  return ret;
}

// Read input file and execute logic
fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  let people = [];
  [data, people] = parseData(data)

  let best = -Infinity;
  console.log(people)
  // const arrangement = perm(people)
  for (let j = 0; j < arrangement.length; j++) {
    let sum = calculateHappiness(data, arrangement[j])
    if (sum >= best) best = sum
  }

  console.log(best)
});

