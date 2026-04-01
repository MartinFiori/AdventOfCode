const { readFile } = require('fs')

const directions = "v>v<vvv<<vv^v<v>vv>v<<<^^^^^<<"

readFile("./input.txt", 'utf-8', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    const obj = {
        "^": (delivery) => delivery['y']++,
        ">": (delivery) => delivery['x']++,
        "v": (delivery) => delivery['y']--,
        "<": (delivery) => delivery['x']--,
    }
    const housesCoordenates = new Set();
    let x = 0, y = 0;
    const santa = {
        x: 0,
        y: 0
    }

    const robotSanta = {
        x: 0,
        y: 0
    }

    // Start by marking the starting location as visited
    housesCoordenates.add(`${x},${y}`);

    // Process each direction in the string
    for (let i = 0; i < data.length; i += 2) {
        obj[data[i]](robotSanta)
        obj[data[i + 1]](santa)
        housesCoordenates.add(`${santa['x']},${santa['y']}`);
        housesCoordenates.add(`${robotSanta['x']},${robotSanta['y']}`);
    }
    // The number of unique houses visited is the size of the Set
    console.log(housesCoordenates.size);
});
