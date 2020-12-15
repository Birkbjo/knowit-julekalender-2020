const fs = require('fs')

const str = fs.readFileSync('forest.txt', 'utf8')

const treeSplit = str.split('\n')
const treeRoots = treeSplit[treeSplit.length-2]

let rootsIndexes = []
treeRoots.split('').forEach((s, i) => s === '#' && rootsIndexes.push(i))

let cntUnsymmetric = 0
let cntSymmetric = 0


for(let i = 0; i < rootsIndexes.length; i++) {

    const trunkIndex = rootsIndexes[i]
    //console.log('trunkInd', trunkIndex)
    if(checkSymmetricTree(trunkIndex)) {
        cntSymmetric++
    } else {
        cntUnsymmetric++
    }
}

function checkSymmetricTree(trunkIndex) {
    for(let j = 0; j< treeSplit.length-2; j++) {
        let row = treeSplit[j]

        if(j === treeSplit.length-2) {
            if(row[trunkIndex] !== '#') {
                return false
            }
        }
 
        const isSymmetric = checkSymmetricRow(trunkIndex, row)
        if(!isSymmetric) {
            return false
        }
        
    }
    return true
}

function checkSymmetricRow(trunkIndex, row) {
    let leftIndex = trunkIndex-1
    let rightIndex = trunkIndex+1
    let left = row[leftIndex]
    let right = row[rightIndex]
    while(left === right) {
        if(left === '' || left === ' ') {
            return true
        }
        left = row[--leftIndex]
        right = row[++rightIndex]

        if(left == undefined || right === undefined) {
            return true
        }
    }
    //console.log('no symm', left, right, leftIndex, ' ', rightIndex)
    return false
}