const fs = require("fs");

const timer = 10;
function parseData(data) {
  let obj = {}
  const times = data.split("\n").map((line) => line.trim())
  for (let i = 0; i < 1; i++) {
    for (let i = 0; i < times.length; i++) {
      let words = times[i].split(' ')
      obj[words[0]] = {
        total: 0,
        isFlying: true,
      }
      obj[words[0]].kms = +words[3]
      obj[words[0]].duration = +words[6]
      obj[words[0]].flag = +words[6]
      obj[words[0]].rest = +words[13]

    }
  }
  return obj
}

function prueba(renos) {
  let n = 0;
  // let obj = {}
  while (timer > n) {
    for (const name in renos) {
      const reno = renos[name]
      if (reno.isFlying) {
        renos[name].total += reno.kms;
        if (n === reno.flag) {
          renos[name] = {
            ...renos[name],
            flag: reno.flag + reno.duration,
            isFlying: false
          }
          renos[name].flag = reno.flag + reno.duration
        }
      } else {
        if (n === reno.flag) {
          renos[name].isFlying = true
        }
      }
      console.log(name, n, renos[name].flag, renos[name].isFlying)
    }
    n++;
  }
  console.log(renos)
}

// Read input file and execute logic
fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  data = parseData(data)
  // console.log(data)
  data = {
    Comet: { kms: 14, duration: 10, rest: 127, flag: 10, total: 0, isFlying: true },
    Dancer: { kms: 16, duration: 11, rest: 162, flag: 11, total: 0, isFlying: true },
    // Vixen: { kms: 8, duration: 4, rest: 2, flag: 4, total: 0, isFlying: true }
  }
  prueba(data)
  return;
  let winner = -Infinity;
  for (const name in data) {
    let curr = prueba(data[name], name)
    // let curr = calcDistance(data[name], name)
    if (curr >= winner) winner = curr
  }

  console.log(winner)
});

