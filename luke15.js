const fs = require("fs");

const dictionaryList = fs
    .readFileSync("luke15ordbok.txt", "utf-8")
    .split("\n")
    .filter((s) => !!s);
const wordPairs = fs
    .readFileSync("luke15ordpar.txt", "utf-8")
    .split("\n")
    .filter((s) => !!s);

const dictionary = dictionaryList.reduce((acc, curr) => {
    acc[curr] = 1;
    return acc;
}, {});

const wordPairsTest = `innovasjons, løsheta
spektral, sikringens
verdens, spillet`.split("\n");

function solve(words) {
    const gluewordsSet = new Set();
    let res = 0;

    words.forEach((w) => {
        const [w1, w2] = w.split(", ");
        console.log(w1, w2, w1.concat(w2));
        for (let i = 0; i < dictionaryList.length; i++) {
            const dictWord = dictionaryList[i];
            const potentialGlueword1 = w1.concat(dictWord);
            const potentialGlueword2 = dictWord.concat(w2);

            //const pot3 = w2.concat(dictWord);
            //const pot4 = dictWord.concat(w1);
            // if(dictionary[pot3] && dictionary[pot4])
            //     console.log('found other potentials', pot3, pot4)
            if (
                dictionary[potentialGlueword1] &&
                dictionary[potentialGlueword2] &&
                !gluewordsSet.has(dictWord)
            ) {
                //console.log("found glueword", dictWord, ': ', potentialGlueword1, ' and ', potentialGlueword2);
                //gluewords.push(potentialGlueword);
                res += dictWord.length;
                gluewordsSet.add(dictWord);
                break;
            }
        }
    });

    return res;
}
console.log("start solve");
const start = new Date();
console.log(solve(wordPairs));
console.log("Took", new Date() - start, "ms");
