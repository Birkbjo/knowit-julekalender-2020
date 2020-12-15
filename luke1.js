const fs = require('fs')


const numbers = fs.readFileSync('numbers.txt', 'utf8').split(',').map(Number)
const sorted = numbers.sort((a,b) => a-b)

for(let i = 0; i<sorted.length;i++) {
    if(sorted[i] !== i+1) {
        console.log('Missing', i+1)
        return
    }
}

//console.log(numbers.sort())
