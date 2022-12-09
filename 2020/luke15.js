const fs = require("fs");

const dictionaryList = fs
    .readFileSync("luke15ordbok.txt", "utf-8")
    .split("\n")
    .filter((s) => !!s);
const wordPairs = fs
    .readFileSync("luke15ordpar.txt", "utf-8")
    .split("\n")
    .filter((s) => !!s);

const dictionary = new Set(dictionaryList);
const wordPairsTest = `innovasjons, løsheta
spektral, sikringens
verdens, spillet`.split("\n");

function solve(wordPairs) {
    const glues = wordPairs
        .map((pair) => pair.split(", "))
        .flatMap(([w1, w2]) =>
            dictionaryList
                .filter((w) => w.startsWith(w1) && w !== w1)
                .map((prefixMatch) => prefixMatch.substring(w1.length))
                .filter(
                    (potentialGlue) =>
                        dictionary.has(potentialGlue + w2) &&
                        dictionary.has(potentialGlue)
                )
        );
    return Array.from(new Set(glues)).reduce(
        (acc, curr) => acc + curr.length,
        0
    );
}

console.log("start solve");
const start = new Date();
console.log(solve(wordPairs));
console.log("Took", new Date() - start, "ms");
