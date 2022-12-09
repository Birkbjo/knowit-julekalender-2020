const fs = require("fs");

const file = fs.readFileSync("luke9.txt", "utf-8");

const testSquare = `FFFSF  
FSFFF  
FSFSF  
SFFSF  
FSFFF`;

const dirX = [0, 1, 0, -1];
const dirY = [-1, 0, 1, 0];

function neighbours(matrix, coord) {
    const arr = [];
    for (let dir = 0; dir < 4; dir++) {
        const rowDir = coord[0] + dirY[dir];
        const columnDir = coord[1] + dirX[dir];
        //console.log(rowDir, columnDir);

        if (
            rowDir < matrix.length &&
            rowDir > -1 &&
            columnDir > -1 &&
            columnDir < matrix[0].length
        ) {
            arr.push([rowDir, columnDir]);
        }
    }
    return arr;
}

function spread(matrix) {
    let newMatrix = []
    let nrSpread = 0
    for(let i = 0; i< matrix.length; i++) {
        newMatrix[i] = [...matrix[i]]
        for(let j = 0; j < matrix[0].length;j++) {
            newMatrix[i][j] = matrix[i][j]
            const ns = neighbours(matrix, [i,j])
            const sickNeighbours = ns.filter(nCoord => matrix[nCoord[0]][nCoord[1]] === "S")
            //console.log(i,j, ' sick:', sickNeighbours)
            if(matrix[i][j] !== 'S' && sickNeighbours.length > 1) {
                nrSpread++
                newMatrix[i][j] = 'S'
            }
        }
    }
    //console.log(newMatrix, nrSpread)
    return [newMatrix, nrSpread]
}

function solve(square) {
    let matrix = square.split("\n").map((row) => row.trim().split(""));
    const ns = neighbours(matrix, [0, 0]);

    let stillSpreading = true
    let posX = 0
    let poxY = 0
    let day = 0
    while(stillSpreading) {
        const [spreadMatrix, nrSpread] = spread(matrix)
    //    console.log(spreadMatrix, nrSpread)
    
        day++
        //return
        if(nrSpread === 0) {
            stillSpreading = false
        }
        //console.log(spreadMatrix)
        matrix = spreadMatrix
    }
    console.log(day);
   // console.log(ns.filter((nCoord) => matrix[nCoord[0]][nCoord[1]] === "S"));
}

solve(file);
