
const fs = require('fs')

const alfabet = 'abcdefghijklmnopqrstuvwxyz'
const text = fs.readFileSync('luke13.txt', 'utf-8')

function solve(text) {
    let newText = ''
    for(let i = 0; i < alfabet.length; i++) {
        const n = i+1
        const char = alfabet[i]

        let matchIndex = 0
        let cntMatches = 0
        matchIndex = text.indexOf(char, matchIndex)
        while(matchIndex > -1) {
            cntMatches++
            if(cntMatches !== n) {
                newText += alfabet[i]
            } else {
                matchIndex++
            }
            matchIndex = newText.indexOf(char, matchIndex)
        }

    }
    return newText
}

console.log(solve(text))