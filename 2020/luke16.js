function generateSieve(limit) {
    const composites = Array(limit).fill(true);
    composites[0] = false;
    composites[1] = false;
    for (let i = 2; i < Math.sqrt(limit); i++) {
        if (composites[i]) {
            const i2 = i ** 2;
            let cnt = 0;
            for (let j = i2; j < limit; j = i2 + cnt * i) {
                composites[j] = false;
                cnt++;
            }
        }
    }
    return composites.map((isPrime, i) => ({ val: i, isPrime }));
}

function getDivisors(num) {
    const divisors = [];
    for (let i = 1; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            if (num / i === i) {
                divisors.push(i);
            } else {
                divisors.push(i, num / i);
            }
        }
    }
    return divisors;
}
//console.log(getDivisors(100))

function solve(limit) {
    const sieve = generateSieve(limit);
    const noPrimes = sieve.filter((num) => !num.isPrime).slice(1);

    const divisors = noPrimes.map((num) => {
        const divisors = getDivisors(num.val);
        return {
            val: num.val,
            divisors,
            sum: divisors.reduce((acc, curr) => acc + curr, 0),
        };
    });

    //console.log(divisors)

    const richNumbers = divisors.filter((num) => num.sum > 2 * num.val);
   // console.log(richNumbers)
    const quadricSum = richNumbers.filter(
        (num) => Math.sqrt(num.sum - num.val * 2) % 1 === 0
    );
   // console.log(quadricSum[0]);
    console.log(quadricSum.length);
}
//console.log(getDivisors(12))
solve(1000001);
