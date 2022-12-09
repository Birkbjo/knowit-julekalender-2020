const fs = require("fs");

const map = fs.readFileSync("luke17kart.txt", "utf-8");

const vacuumShape = `  sss  
 sssss 
sssssss
sssXsss
sssssss
 sssss 
  sss  `;
const shapeCenter = [3, 3];

const vacuumBrush = `kkk   kkk
kkkkkkkkk
kkkkkkkkk
 kkkkkkk 
 kkkXkkk 
 kkkkkkk 
kkkkkkkkk
kkkkkkkkk
kkk   kkk`;
const brushCenter = [4, 4];

const testMapDone = `xxxxxxxxxxxxxxxxxxxx
x ..x.ssssss...  x x
x.xxxssssssss..  xxx
x..sssssssssss  x  x
x.ssssssssssss     x
xsssssssssssss     x
xssssssssssssxx    x
xssssssssssssxx    x
xssssssssssssxx    x
x.sssssssssssxx    x
x..ssssssssssxx    x
xxxxxxsssssssxx    x
x  ..ssssssss.     x
x   sssssssss.     x
x   ssssssss..     x
x   sssssss...     x
x  ..sssssxxxxxxxxxx
x  ..xsssxxxxx     x
x  ...   ...       x
xxxxxxxxxxxxxxxxxxxx`;

const testMapBefore = testMapDone.replace(/s|\./gi, " ")
let testMapBeforeArr = testMapBefore.split('\n').map(row => row.split(''))
function generateVacuumCollison() {
    const shapeCoords = vacuumShape
        .split("\n")
        .map((row) => row.split("").map((c) => c === "s"));

    const brushCoords = vacuumBrush
        .split("\n")
        .map((row) => row.split("").map((c) => c === "k"));

    return [shapeCoords, brushCoords];
}

//console.log(wallVertices);
console.log(testMapBefore)
//fs.writeFileSync('wallverticies.json',JSON.stringify(wallVertices))
function fits(shape, currCenter, map) {
    const relativeY = currCenter[1] - 3
    const relativeX = currCenter[0] - 3
    //console.log(relativeX, relativeY)
    let cnt = 0
    let testMapBeforeArrCopy = [...testMapBeforeArr]
    for(let yBase = 0; yBase<shape.length;yBase++) {
        for(let xBase = 0; xBase < shape[yBase].length;xBase++) {
           // if(cnt++ > 0) return 
            if(relativeY < 0 || relativeX < 0 || relativeY > map.length || relativeX > map[relativeY].length) {
                return false
            }

            const mapPos = map[relativeY+yBase][relativeX+xBase]
            //console.log('check', relativeY+yBase, relativeX+xBase)
           // testMapBeforeArr[relativeY+yBase][relativeX+xBase] = 'c'
           // testMapBeforeArr[currCenter[1]][currCenter[0]] = 'O'
            //console.log(testMapBeforeArr.map((row, i) => row && console.log('row',row.join(''), i)))
           // console.log(mapPos)
           // check collision
            if((mapPos === true && shape[yBase][xBase] === true)) {
                testMapBeforeArrCopy[relativeY+yBase][relativeX+xBase] = 'C'
              //  testMapBeforeArr = testMapBeforeArrCopy
                return false
            }
            if(shape[yBase][xBase] === true) {
                testMapBeforeArrCopy[relativeY+yBase][relativeX+xBase] = 's'
            } else {
               // testMapBeforeArr[relativeY+yBase][relativeX+xBase] = '_'

            }
            //console.log('fits')
        }
    }
    console.log('fits')
    testMapBeforeArrCopy.map((row, i) => row && console.log('row',row.join(''), i))
    const cnter = testMapBeforeArrCopy.reduce((acc, row) => acc+row.reduce((rowAcc, c) => c === ' ' ? rowAcc+1: rowAcc, 0), 0)
    //console.log('FITS', testMapBefore)
    console.log('fitsend', cnter)
    return testMapBeforeArrCopy
}


function solve(map) {
    const [baseShapeCoords, baseBrushCoords] = generateVacuumCollison();

    const wallVertices = map
        .split("\n")
        .filter((row) => !!row)
        .map((row) => row.split("").map((c) => c === "x"));

        //console.log(wallVertices)
        //console.log(wallVertices.length, wallVertices[19].length)
    let arr 
    for (let y = shapeCenter[1]; y<  wallVertices.length; y++) {
        //console.log(wallVertices[y].length)
        for (let x = shapeCenter[0]; x < wallVertices[0].length; x++) {
            const currCenter = [y,x]
            //console.log('loop', x, y)
            
           const res = fits(baseShapeCoords, currCenter, wallVertices)
           if(Array.isArray(res)) {
               arr = res
           }
            //console.log(currCenter, fits(baseShapeCoords, currCenter, wallVertices))
        }
    }
    arr.map((row, i) => row && console.log('row',row.join(''), i))
    //console.log(arr.flatMap(x => x))

    //console.log(fits(baseShapeCoords, [6,6], wallVertices))
    //console.log(baseShapeCoords)
}
solve(testMapBefore)
//console.log(testMapBeforeArr.map((row, i) => row && console.log('row',row.join(''), i)))