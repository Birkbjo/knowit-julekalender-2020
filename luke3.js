const fs = require("fs");

const words = fs.readFileSync("luke3words.txt", "utf-8").split("\n").filter(s => !!s.trim());

const wordMatrix = fs
    .readFileSync("luke3matrix.txt", "utf-8")
    .split("\n")
    .map((row) => row)
    .filter(s => !!s.trim());

const wordsMap = words.reduce((acc, val) => {
    //console.log(acc, val);
    acc[val] = false;
    return acc;
}, {});

console.log(wordMatrix[wordMatrix.length-1])

console.log('\n\n', wordMatrix[0][372])

function searchMatrix(word) {
    const rowLen = wordMatrix[0].length
    
    for (let i = 0; i < wordMatrix.length; i++) {
        for (let j = 0; j < wordMatrix[0].length; j++) {
            const c = wordMatrix[i][j]
            if(c === word[0]) {
                if(c.length > 1) {
                    throw new Error('shouldnt happen', c)
                }
                if(checkDirs(word, i, j, wordMatrix)) {
                    console.log('FOUND', word)
                    wordsMap[word] = true
                }
            }
        }
    }
}

const dirX = [ -1, -1, -1, 0, 0, 1, 1, 1 ]; 
const dirY = [ -1, 0, 1, -1, 1, -1, 0, 1 ]; 

function checkDirs(word, row, col, matrix) {
    let k = 1
    const rowLen = matrix.length
    const colLen = matrix[0].length
    //console.log('before', matrix[0][])
    for(let dir = 0; dir < 8; dir++) {
        let rowDir = row + dirX[dir]
        let columnDir = col + dirY[dir]
        
        
        //loop chars in word
        let s = word[0]
        if(s.length > 1) {
            throw new Error(s)
        }

        for(k; k< word.length; k++) {

            if(rowDir >= rowLen || rowDir < 0 || columnDir >= colLen || columnDir < 0) {
                break;
            }
         
          
            // no match, break
            if(matrix[rowDir][columnDir] != word[k]) {
                if(k > 5) {
                    //console.log(s, matrix[rowDir][columnDir])
                    //console.log('no match for ', word, '. Found upto ', s, ' but got ', matrix[rowDir, columnDir])
                }
                break;
            }
            //console.log('prev', s, rowDir, columnDir, matrix[rowDir,columnDir])
            s+=matrix[rowDir][columnDir]
            if(s.length > word.length) {
                throw new Error(s)
                //console.log('wtf, ', word, matrix[rowDir, columnDir])
            }
            // continue search
            rowDir += dirX[dir]
            columnDir += dirY[dir]
        }
        if(k === word.length) {
            console.log('found', word, ' at ', rowDir, ":", columnDir, ' with dir ', dir)
            return true;
        }
    }
    return false

}

function start() {

    words.forEach(w => {
        console.log('search for', w)
        searchMatrix(w)
    })
    console.log(Object.keys(wordsMap).filter((val) => !wordsMap[val]).sort((a,b) => a.localeCompare(b)))

    const l = Object.keys(wordsMap).filter((val) => !wordsMap[val]).sort((a,b) => a.localeCompare(b))

    l.forEach(s => process.stdout.write(`${s},`))
}
start()