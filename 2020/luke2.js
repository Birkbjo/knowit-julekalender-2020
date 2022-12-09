function generateSieve(limit) {

    const composites = Array(limit).fill(true)

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

const sieve = generateSieve(5433000)

let delivered = 0

for(let i = 0; i < sieve.length;) {
    const v = sieve[i].val
    if(v.toString().includes(7)) {
        let closestPrime
        for(let j = v; j>2;j--) {
            const num = sieve[j]
            if(num.isPrime) {
                closestPrime = num.val
                break
            }
        }
        i = i+closestPrime
    } else {
        console.log('Delivered', i)
        delivered++
    }
    i++
}

console.log(delivered)