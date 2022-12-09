const fs = require('fs')

const file = fs.readFileSync('luke6godteri.txt', 'utf-8')

const numbers = file.split(',').map(Number)
const total = numbers.reduce((acc, curr) => acc + curr, 0)

//const numbers = '10,14,14,13,13,13,15,14,11,15,11'.split(',').map(Number)
//const total = numbers.reduce((acc, curr) => acc + curr, 0)

const nrElfs = 127

let cnt = 0
let max = 0
numbers.forEach(n => {
    cnt += n
    if((cnt % nrElfs) == 0) {
        max = cnt
    }
})
console.log(max/127)