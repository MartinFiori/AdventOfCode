/**
 *
 * PARTE 1
 *
 */
const { readFile } = require("fs");
readFile("./input.txt", "utf-8", (err, data) => {
  if (err) {
    console.log("error", err);
    return;
  }
  // Initialize a 1000x1000 grid with all lights off (false)
  const grid = Array.from({ length: 1000 }, () => Array(1000).fill(false));

  // Function to process instructions
  function processInstructions(instructions) {
    for (const instruction of instructions) {
      const match = instruction.match(
        /(turn on|turn off|toggle) (\d+),(\d+) through (\d+),(\d+)/,
      );
      if (!match) continue;

      const action = match[1];
      const x1 = parseInt(match[2]);
      const y1 = parseInt(match[3]);
      const x2 = parseInt(match[4]);
      const y2 = parseInt(match[5]);

      for (let x = x1; x <= x2; x++) {
        for (let y = y1; y <= y2; y++) {
          if (action === "turn on") {
            grid[x][y] = true;
          } else if (action === "turn off") {
            grid[x][y] = false;
          } else if (action === "toggle") {
            grid[x][y] = !grid[x][y];
          }
        }
      }
    }
  }

  // Count the number of lights that are on
  function countLightsOn() {
    let count = 0;
    for (let x = 0; x < 1000; x++) {
      for (let y = 0; y < 1000; y++) {
        if (grid[x][y]) count++;
      }
    }
    return count;
  }

  const instructions = data.split("\r\n");

  // Process the instructions
  processInstructions(instructions);

  // Output the number of lights that are on
  console.log(`Number of lights that are on: ${countLightsOn()}`);
});

/**
 *
 * PARTE 2
 *
 */

readFile("./input.txt", "utf-8", (err, data) => {
  if (err) {
    console.log("error", err);
    return;
  }
  // Initialize a 1000x1000 grid with all lights off (false)
  const grid = Array.from({ length: 1000 }, () => Array(1000).fill(false));

  // Function to process instructions
  function processInstructionsWithBrightness(instructions) {
    for (const instruction of instructions) {
      const match = instruction.match(
        /(turn on|turn off|toggle) (\d+),(\d+) through (\d+),(\d+)/,
      );
      if (!match) continue;

      const action = match[1];
      const x1 = parseInt(match[2]);
      const y1 = parseInt(match[3]);
      const x2 = parseInt(match[4]);
      const y2 = parseInt(match[5]);

      for (let x = x1; x <= x2; x++) {
        for (let y = y1; y <= y2; y++) {
          if (action === "turn on") {
            grid[x][y] += 1; // Increase brightness by 1
          } else if (action === "turn off") {
            grid[x][y] = Math.max(0, grid[x][y] - 1); // Decrease brightness by 1, minimum 0
          } else if (action === "toggle") {
            grid[x][y] += 2; // Increase brightness by 2
          }
        }
      }
    }
  }

  // Function to calculate the total brightness
  function calculateTotalBrightness() {
    let totalBrightness = 0;
    for (let x = 0; x < 1000; x++) {
      for (let y = 0; y < 1000; y++) {
        totalBrightness += grid[x][y];
      }
    }
    return totalBrightness;
  }

  const instructions = data.split("\r\n");
  // Process the instructions
  processInstructionsWithBrightness(instructions);

  // Output the total brightness
  console.log(`Total brightness: ${calculateTotalBrightness()}`);
});
