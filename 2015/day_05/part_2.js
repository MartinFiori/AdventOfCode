const { readFile } = require("fs");

readFile("./input.txt", "utf-8", (err, data) => {
  if (err) {
    console.log("error", err);
    return;
  }
  let niceWords = 0;
  // const word = "hexvporkmherrtrn";
  const words = data.split("\r\n");
  for (const word of words) {
    let twiceMatch = false;
    let capicua = false;
    for (let i = 0; i < word.length; i++) {
      const pair = word[i] + word[i + 1];
      if (
        word.indexOf(pair) != word.lastIndexOf(pair) &&
        word.indexOf(pair) + 1 != word.lastIndexOf(pair)
      ) {
        twiceMatch = true;
      }
      if (word[i] && word[i + 1] && word[i + 2]) {
        if (word[i] != word[i + 1] && word[i] == word[i + 2]) {
          console.log(word[i], word[i + 2], word[i + 1]);
          capicua = true;
        }
        if (twiceMatch && capicua) {
          // console.log(word, pair, word[i], word[i + 1], word[i + 2]);
          // console.log("word: ", word);
          // console.log("pair: ", pair, word.indexOf(pair), word.lastIndexOf(pair));
          // console.log("word[i]: ", word[i]);
          // console.log("word[i + 1]: ", word[i + 1]);
          // console.log("word[i + 2]: ", word[i + 2]);
          // console.log("-".repeat(20));
          // console.log("\n");
        }
      }
    }
    niceWords += Number(twiceMatch && capicua);
  }
  console.log(niceWords);
});
