const { readFile } = require('fs')
// const directions = 'v>v<vvv<<vv^v<v>vv>v<<<^^^^^<<'

const directions = "v>v<vvv<<vv^v<v>vv>v<<<^^^^^<<"

readFile("./input.txt", 'utf-8', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    const visitedHouses = new Set();
    let x = 0, y = 0;

    // Start by marking the starting location as visited
    visitedHouses.add(`${x},${y}`);

    // Process each direction in the string
    for (const direction of data) {
        switch (direction) {
            case '^':
                y += 1; // Move north
                break;
            case 'v':
                y -= 1; // Move south
                break;
            case '>':
                x += 1; // Move east
                break;
            case '<':
                x -= 1; // Move west
                break;
        }
        visitedHouses.add(`${x},${y}`); // Mark the new location as visited
    }

    // The number of unique houses visited is the size of the Set
    console.log(visitedHouses.size);
});
