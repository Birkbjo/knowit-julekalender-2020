const fs = require('fs')

const file = fs.readFileSync('luke12.txt', 'utf-8')

//const text = "Alvor (Alv Alf Alvaro (Halfrid Halvar Halvard (Alvilde Alva (Alfie Alvor Joralv) Alfonse)) Calvin (Tjalve Alvbert Alvard))"

const text = file

const gens = []

let currGen = 0
text.split(' ').forEach(elf => {
    const startGen = elf.indexOf('(')
    if(startGen > -1) {
        currGen++
    }
    let endGen = elf.indexOf(')')

    let elfOut = `${elf.substring(startGen+1,endGen > -1 && endGen || elf.length)},`
    gens[currGen] = gens[currGen] ? gens[currGen].concat(elfOut) : elfOut 
    while(endGen > -1) {
        currGen--
        endGen = elf.indexOf(')',endGen+1)
    }
})

let max = 0
let gen = 0
for(let i=0;i<gens.length;i++) {
    let elfsInGen = gens[i]
    const len = elfsInGen.split(',').length -1
    if(len > max) {
        max = len
        gen = i
    }
}
console.log(max)