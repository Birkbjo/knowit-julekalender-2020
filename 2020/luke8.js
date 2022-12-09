const fs = require("fs");

const file = fs.readFileSync("luke8.txt", "utf-8");

function parse(file) {
    const locCoords = {};
    const route = [];

    file.split("\n").forEach((s) => {
        if (s.includes(":")) {
            let [name, strCoords] = s.split(":").map((s) => s.trim());
            const coords = strCoords
                .substring(1, strCoords.length - 1)
                .split(",")
                .map(Number);
            locCoords[name] = {
                coords,
                time: 0,
                name,
            };
        } else {
            route.push(s);
        }
    });

    return [locCoords, route];
}

const taxicabDist = (c1, c2) =>
    Math.abs(c1[0] - c2[0]) + Math.abs(c1[1] - c2[1]);

function getAndUpdateClosestCoords(locByCoord, coord) {
    for ([key, val] of Object.entries(locByCoord)) {
        const dist = taxicabDist(coord, val.coords);
        // console.log('dist from ', coord, ' to ', val.name, `(${val.coords})`, ':', dist)

        if (dist >= 50) {
            val.time += 1;
        } else if (dist >= 20) {
            val.time += 0.75;
        } else if (dist >= 5) {
            val.time += 0.5;
        } else if (dist > 0) {
            val.time += 0.25;
        }
        //arr.push(val);
    }

}

function run(file) {
    const [locCoords, route] = parse(file);

    let maxX = 0;
    let maxY = 0;
    for (let [key, value] of Object.entries(locCoords)) {
        maxX = Math.max(maxX, value.coords[0]);
        maxY = Math.max(maxY, value.coords[1]);
    }
    console.log(maxX, maxY);

    const reversedRoute = [...route].reverse();

    let nextLoc = reversedRoute.pop();
    let prevCoord = [0, 0];
    const start = new Date()
    while (nextLoc) {
        const nextCoord = locCoords[nextLoc].coords;
        for (let x = prevCoord[0]; x <= maxX; ) {
            if (x === nextCoord[0]) {
                for (let y = prevCoord[1]; y <= maxY;) {
                    if (y === nextCoord[1]) {
                        break;
                    } else if (y < nextCoord[1]) {
                        y++;
                    } else if (y > nextCoord[1]) {
                        y--;
                    }
                    getAndUpdateClosestCoords(locCoords, [x,y])
                }
                break;
            } else if (x < nextCoord[0]) {
                x++;
            } else if (x > nextCoord[0]) {
                x--;
            }
            getAndUpdateClosestCoords(locCoords, [x,prevCoord[1]])
        }
        prevCoord = nextCoord;
        nextLoc = reversedRoute.pop();
    }

    let min = Number.MAX_SAFE_INTEGER
    let max = 0
    for([key, val] of Object.entries(locCoords)) {
        if(val.time < min) {
            min = val.time
        } 
        if(val.time > max) {
            max = val.time
        }
    }
    console.log(`Took ${new Date() - start}`)
    console.log(max - min)
}

run(file)