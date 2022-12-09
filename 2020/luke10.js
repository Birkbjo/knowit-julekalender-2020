const fs = require('fs')

const games = fs.readFileSync('luke10.txt', 'utf-8')


const player = {}
games.split('\n').forEach(row => {
    row.split(',').filter(p => !!p).map((p,i, arr) => {
     
        if(!player[p]) {
            player[p] = 0
        }
        player[p] += arr.length - (i+1)
    })
})
const sorted = Object.keys(player).sort((a,b) => player[b] - player[a])
console.log(sorted[0],'-',player[sorted[0]])