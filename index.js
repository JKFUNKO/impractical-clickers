let joe = document.querySelector('.joe-count')
let parsedJoe = parseFloat(joe.innerHTML);

let murrayCost = document.querySelector('.murray-cost')
let parsedMurrayCost = parseFloat(murrayCost.innerHTML);
let murrayLevel = document.querySelector('.murray-level')
let murrayIncrease = document.querySelector('.murray-increase')
let parsedMurrayIncrease = parseFloat(murrayIncrease.innerHTML)

let jpc = 1;

function incrementJoe() {
    joe.innerHTML = Math.round(parsedJoe += jpc)
}

function buyMurray() {
    if (parsedJoe >= parsedMurrayCost) {
        parsedJoe -= parsedMurrayCost;
        joe.innerHTML = parsedJoe;

        murrayLevel.innerHTML ++

        parsedMurrayIncrease = (parrsedMurrayIncrease * 1.03).toFixed(2)
        murrayIncrease.innerHTML = parsedMurrayIncrease
        jpc += parsedMurrayIncrease
    }
}