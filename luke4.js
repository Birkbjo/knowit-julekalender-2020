

const fs = require('fs')

const file = fs.readFileSync('luke4.txt', 'utf-8')

const factors = {
    sukker: 2,
    mel: 3,
    melk: 3,
    egg: 1,
};

const ingredients = {}
file.split(',').map(s => {
    s.split('\n').map(e => e.split(':').map(e => e.trim())).map(([ingredient, val]) => {
        if(!ingredient || !val) {
            return
        }
        val = parseInt(val)
        ingredients[ingredient] = ingredients[ingredient] ? ingredients[ingredient]+val : val 
    })
})

const mins = Object.keys(ingredients).map(key => {
    const val = ingredients[key]
    return Math.floor(val / factors[key])
})
console.log(Math.min(...mins))