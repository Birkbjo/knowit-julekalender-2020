function generateSieve(limit) {

    const composites = Array(limit).fill(true)
    composites[0] = false
    composites[1] = false
    for(let i = 2; i < Math.sqrt(limit); i++) {
        if(composites[i]) {
            const i2 = i ** 2
            let cnt = 0
            for(let j =i2; j < limit; j = i2+(cnt*i )) {
                composites[j] = false
                cnt++
            }
        }
    }
    return composites.map((isPrime, i) => ({val: i, isPrime}))
}



function generateSequence(seq, length) {
    const seqSet = new Set(seq)
    for(let i = 2; i <=length; i++) {
        const n = i
        //console.log('n', n)
        const sub = seq[i-2] - n
        if((sub > -1 && !seqSet.has(sub))) {
            //console.log('sub', sub)
            seqSet.add(sub)
            seq.push(sub)
        } else {
            const add = n + seq[i-2]
            //console.log('add:', n, seq[i-2], '=', add)
            seqSet.add(add)
            seq.push(add)
        }
    }

    return seq
}

const len = 1800813

const seq = generateSequence([0,1], len)

const max = seq.reduce((acc, curr) => acc > curr ? acc : curr, 0)

console.log('generating sieve up to ', max+1)
const sieve = generateSieve(max+1)
//console.log(sieve)
let cnt = 0

const primesCnt = seq.reduce((acc, curr) => sieve[curr].isPrime ? acc + 1 : acc, 0)

console.log(primesCnt)