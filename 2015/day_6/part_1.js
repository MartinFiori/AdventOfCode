const { readFile } = require("fs");

readFile("./input.txt", "utf-8", (err, data) => {
  if (err) {
    console.log("error", err);
    return;
  }
  const arr = data.split("\r\n");
  const grid = new Set();

  let indicators = {
    rowStart: 0,
    columnStart: 0,
    rowEnd: 0,
    columnEnd: 0,
  };

  for (const text of arr) {
    const instructions = {
      "turn off ": () => lightGrid("turn off "),
      "turn on ": () => lightGrid("turn on "),
      "toggle ": () => lightGrid("toggle "),
    };

    for (const start in instructions) {
      if (text.startsWith(start)) {
        setIndicator(text);
        instructions[start]();
      }
    }
  }

  function setIndicator(t) {
    const start = t.indexOf(",");
    const end = t.lastIndexOf(",");

    indicators.rowStart = Number(t.slice(start + 1, t.indexOf(" ", start) + 1));
    indicators.columnStart = Number(
      t.slice(t.lastIndexOf(" ", start) + 1, start),
    );
    indicators.rowEnd = Number(t.slice(end + 1));
    indicators.columnEnd = Number(t.slice(t.lastIndexOf(" ") + 1, end));
  }

  function lightGrid(cmd) {
    const { rowStart, columnStart, rowEnd, columnEnd } = indicators;
    switch (cmd) {
      case "turn off ":
        for (let i = columnStart; i <= columnEnd; i++) {
          for (let j = rowStart; j <= rowEnd; j++) {
            grid.delete(`${i},${j}`);
          }
        }
        break;
      case "turn on ":
        for (let i = columnStart; i <= columnEnd; i++) {
          for (let j = rowStart; j <= rowEnd; j++) {
            grid.add(`${i},${j}`);
          }
        }
        break;
      case "toggle ":
        for (let i = columnStart; i <= columnEnd; i++) {
          for (let j = rowStart; j <= rowEnd; j++) {
            if (grid.has(`${i},${j}`)) grid.delete(`${i},${j}`);
            else grid.add(`${i},${j}`);
          }
        }
        break;
    }
  }
  console.log(grid.size);
});
