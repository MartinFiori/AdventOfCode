const fs = require("fs");

const timer = 2503;
function parseData(data) {
  let arr = {}
  const times = data.split("\n").map((line) => line.trim())
  for (let i = 0; i < 1; i++) {
    for (let i = 0; i < times.length; i++) {
      let words = times[i].split(' ')
      arr[words[0]] = {}
      arr[words[0]].kms = +words[3]
      arr[words[0]].duration = +words[6]
      arr[words[0]].rest = +words[13]
    }
  }
  return arr
}


function calcDistance(reno, name) {
  let innerTimer = timer;
  let count = 0;
  console.log("reno " + name, reno)
  while (innerTimer >= 0) {
    if (innerTimer < reno.duration) {
      count += innerTimer * reno.kms

      break;
    }
    count += reno.duration * reno.kms
    innerTimer -= reno.duration + reno.rest
  }
  console.log("el cuon", count)
  return count;
}


// Read input file and execute logic
fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  data = parseData(data)
  // console.log(data)
  // data = {
  //   Comet: { kms: 14, duration: 10, rest: 127 },
  //   Dancer: { kms: 16, duration: 11, rest: 162 }
  // }

  let winner = -Infinity;
  for (const name in data) {
    let curr = calcDistance(data[name], name)
    if (curr >= winner) winner = curr
  }

  console.log(winner)
});

