const fs = require("fs");

/**
 * Parse input data and create a bidirectional distance graph.
 * @param {string} data - Raw input data from file.
 * @returns {Object} - Graph representation of cities and distances.
 */
function parseInput(data) {
  const graph = {};
  const instructions = data.split("\n").map((line) => line.trim());

  for (const instruction of instructions) {
    const [from, , to, , distance] = instruction.split(" ");
    const dist = parseInt(distance, 10);

    if (!graph[from]) graph[from] = {};
    if (!graph[to]) graph[to] = {};

    graph[from][to] = dist;
    graph[to][from] = dist;
  }

  return graph;
}

/**
 * Recursive function to find the shortest route using backtracking.
 * @param {string} current - Current city.
 * @param {Set} visited - Set of visited cities.
 * @param {number} currentDistance - Distance traveled so far.
 * @param {Object} graph - Distance graph.
 * @param {number} minDistance - Minimum distance found so far.
 * @returns {number} - Updated minimum distance.
 */
function findShortestRouteRecursive(
  current,
  visited,
  currentDistance,
  graph,
  minDistance,
) {
  if (visited.size === Object.keys(graph).length) {
    return Math.min(minDistance, currentDistance); // Return shortest route found
  }

  for (const neighbor in graph[current]) {
    if (!visited.has(neighbor)) {
      visited.add(neighbor);
      minDistance = findShortestRouteRecursive(
        neighbor,
        visited,
        currentDistance + graph[current][neighbor],
        graph,
        minDistance,
      );
      visited.delete(neighbor); // Backtrack
    }
  }

  return minDistance;
}

/**
 * Wrapper function to call recursive search for all starting cities.
 * @param {Object} graph - Distance graph.
 * @returns {number} - The shortest route distance.
 */
function findShortestRoute(graph) {
  let minDistance = Infinity;
  const cities = Object.keys(graph);

  for (const startCity of cities) {
    const visited = new Set([startCity]);
    minDistance = findShortestRouteRecursive(
      startCity,
      visited,
      0,
      graph,
      minDistance,
    );
  }

  return minDistance;
}

// Read input file and execute logic
fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  const graph = parseInput(data);
  const shortestDistance = findShortestRoute(graph);

  console.log(`La distancia más corta es: ${shortestDistance}`);
});
