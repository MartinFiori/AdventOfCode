const { readFile } = require("fs");

readFile("./input.txt", "utf-8", (err, data) => {
  if (err) {
    console.log("error", err);
    return;
  }
  let niceWords = 0;

  const words = data.split("\n");
  for (const word of words) {
    let vocalsCount = 0;
    let repeatedLetter = false;
    if (
      !word.includes("ab") &&
      !word.includes("cd") &&
      !word.includes("pq") &&
      !word.includes("xy")
    ) {
      for (let i = 0; i < word.length; i++) {
        if (
          word[i] === "a" ||
          word[i] === "e" ||
          word[i] === "i" ||
          word[i] === "o" ||
          word[i] === "u"
        ) {
          vocalsCount++;
        }
        if (word[i] === word[i + 1]) repeatedLetter = true;
      }
      niceWords += Number(vocalsCount >= 3 && repeatedLetter);
    }
  }
  console.log(niceWords);
});
