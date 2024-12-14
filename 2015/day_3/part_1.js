const { readFile } = require('fs')
// const directions = 'v>v<vvv<<vv^v<v>vv>v<<<^^^^^<<'

const directions = "v>v<vvv<<vv^v<v>vv>v<<<^^^^^<<"

readFile("./input.txt", 'utf-8', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    const location = {
        col: 0,
        row: 0
    }
    const { col, row } = location;
    const moves = {
        "0-0": 1
    }
    const obj = {
        "v": () => location.col++,
        ">": () => location.row++,
        "^": () => location.col--,
        "<": () => location.row--,
    }
    for (const dir of data) {
        obj[dir]()
        // console.log(location);
        const currValue = location.col.toString() + '-' + location.row.toString()
        console.log(currValue);
        if (!moves[currValue]) moves[currValue] = 0
        moves[currValue]++;
    }
    console.log("Visitaron un total de: ", Object.values(moves).length);
});
