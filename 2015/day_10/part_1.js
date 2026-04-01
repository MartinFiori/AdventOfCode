const fs = require("fs");

function lookAndSay(str) {
  let res = '', i = 0;
  while (i < str.length) {
    let count = 1;
    const digit = str[i]
    while (i + count < str.length && str[i] === str[i + count]) count++;
    res += count + str[i];
    i += count;
  }
  return res;

  // const values = num.toString().split("")
  // let newString = ''
  // for (let i = 0; i < values.length; i++) {
  //   let count = 0;
  //   for (let j = i; j < values.length; j++) {
  //     if (values[j] !== values[i]) break;
  //     count++;
  //   }
  //   if (values[i] != values[i - 1]) newString += `${count}${values[i]}`
  // }
  // return newString
}

// Read input file and execute logic
fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  let num = data
  for (let i = 0; i < 40; i++) num = lookAndSay(num)
  console.log("resultfinal", num.length)
});


