const fs = require("fs");

const file = fs.readFileSync("luke11.txt", "utf-8");

const alfabet = "abcdefghijklmnopqrstuvwxyz";

const getAlfabetIndex = (char) =>
    alfabet.split("").reduce((acc, curr, currInd) => {
        if (curr === char) {
            acc = currInd;
            return currInd;
        }
        return acc;
    }, "");

function checkHint(word, pass) {
    const hintRows = [word];
    let prevHintRow = word;
    while (prevHintRow.length > 1) {
        const newHintRow = prevHintRow
            .substring(1)
            .split("")
            .map((c, ind) => {
                const charUp =
                    alfabet[(getAlfabetIndex(c) + 1) % alfabet.length]; // move one char up
                const summedWithPrev =
                    alfabet[
                        (getAlfabetIndex(charUp) +
                            getAlfabetIndex(prevHintRow[ind])) %
                            alfabet.length
                    ];
                return summedWithPrev;
            })
            .join("");
        hintRows.push(newHintRow);
        prevHintRow = newHintRow;
    }

    // collect columns
    const hints = hintRows.reduce((acc, curr, currIndex) => {
        curr.split("").forEach((c, i) => {
            acc[i] = acc[i] ? acc[i] + c : c;
        });
        return acc;
    }, []);
    const match = hints.filter((h) => h.includes(pass));

    return match;
}

const pass = file
    .split("\n")
    .filter((s) => !!s)
    .map((w) => {
        return {
            match: checkHint(w, "eamqia"),
            word: w,
        };
    })
    .filter((m) => m.match.length > 0);

console.log("pass", pass[0].word);
