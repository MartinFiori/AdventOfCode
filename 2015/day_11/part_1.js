const fs = require("fs");

function passwordChecks(pwd) {
  let secuential = false
  let isBanned = false
  let double = 0
  let repeatedDigit = null;
  const bannedDigits = ["i".charCodeAt(0), "o".charCodeAt(0), "l".charCodeAt(0)]
  for (let i = 0; i < pwd.length; i++) {
    let digit = pwd.charCodeAt(i)

    if (digit + 1 === pwd.charCodeAt(i + 1) && digit + 2 === pwd.charCodeAt(i + 2)) {
      secuential = true
    }
    if (digit === pwd.charCodeAt(i + 1) && repeatedDigit != digit && digit != pwd.charCodeAt(i - 1)) { double++; repeatedDigit = digit }
    if (bannedDigits.includes(digit)) isBanned = true

  }
  return secuential && double === 2 && !isBanned
}

function incrementPassword(pwd) {
  const splitted = pwd.split('')
  for (let i = splitted.length - 1; i >= 0; i--) {
    const letter = splitted[i]
    if (letter === 'z') splitted[i] = 'a'
    else { splitted[i] = String.fromCharCode(splitted[i].charCodeAt(0) + 1); break }
  }
  return splitted.join('')
}
// Read input file and execute logic
fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }
  incrementPassword(data)
  let i = 0
  do {
    data = incrementPassword(data);
  } while (!passwordChecks(data));
  console.log("dsafkajsdfasjkasjñdklsdfajkñl", data)
});


