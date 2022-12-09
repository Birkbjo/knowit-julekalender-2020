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

function solveFp(wordPairs) {
    const glues = wordPairs
        .map((pair) => pair.split(", "))
        .flatMap(([w1, w2]) =>
            dictionaryList
                .filter((w) => w.startsWith(w1) && w !== w1)
                .map((gluePart) => gluePart.substring(w1.length))
                .filter(
                    (potentialGlue) =>
                        dictionary.has(potentialGlue + w2) &&
                        dictionary.has(potentialGlue)
                )
        )
    return Array.from(new Set(glues)).reduce((acc, curr) => acc+curr.length, 0)
}

console.log(solveFp(wordPairs));
