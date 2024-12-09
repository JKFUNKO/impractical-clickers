let joe = document.querySelector('.joe-count')
let parsedJoe = parseFloat(joe.innerHTML);

let murrayCost = document.querySelector('.murray-cost')
let parsedMurrayCost = parseFloat(murrayCost.innerHTML);
let murrayLevel = document.querySelector('.murray-level')
let murrayIncrease = document.querySelector('.murray-increase')
let parsedMurrayIncrease = parseFloat(murrayIncrease.innerHTML)

let salCost = document.querySelector('.sal-cost')
let parsedSalCost = parseFloat(salCost.innerHTML);
let salLevel = document.querySelector('.sal-level')
let salIncrease = document.querySelector('.sal-increase')
let parsedSalIncrease = parseFloat(salIncrease.innerHTML)

let brianCost = document.querySelector('.brian-cost')
let parsedBrianCost = parseFloat(brianCost.innerHTML);
let brianLevel = document.querySelector('.brian-level')
let brianIncrease = document.querySelector('.brian-increase')
let parsedBrianIncrease = parseFloat(brianIncrease.innerHTML)

let jpc = 1;
let jps = 0;

function incrementJoe() {
    joe.innerHTML = Math.round(parsedJoe += jpc)
}

function buyMurray() {
     if (parsedJoe >= parsedMurrayCost) {
         joe.innerHTML = Math.round(parsedJoe -= parsedMurrayCost);

        murrayLevel.innerHTML ++

        parsedMurrayIncrease = parseFloat((parsedMurrayIncrease * 1.03).toFixed(2))
        murrayIncrease.innerHTML = parsedMurrayIncrease
        jpc += parsedMurrayIncrease

        parsedMurrayCost *= 1.18;
        murrayCost.innerHTML = Math.round(parsedMurrayCost)
    }
}

function buySal() {
    if (parsedJoe >= parsedSalCost) {
        joe.innerHTML = Math.round(parsedJoe -= parsedSalCost);

        salLevel.innerHTML++

        parsedSalIncrease = parseFloat((parsedSalIncrease * 1.03).toFixed(2))
        salIncrease.innerHTML = parsedSalIncrease
        jps += parsedSalIncrease

        parsedSalCost *= 1.18;
        salCost.innerHTML = Math.round(parsedSalCost)
    }
}

function buyBrian() {
    if (parsedJoe >= parsedBrianCost) {
        joe.innerHTML = Math.round(parsedJoe -= parsedBrianCost);

        brianLevel.innerHTML++

        parsedBrianIncrease = parseFloat((parsedBrianIncrease * 1.03).toFixed(2))
        brianIncrease.innerHTML = parsedBrianIncrease
        jps += parsedBrianIncrease

        parsedBrianCost *= 1.18;
        brianCost.innerHTML = Math.round(parsedBrianCost)
    }
}

setInterval(() => {
    parsedJoe += jps /10
    joe.innerHTML = Math.round(parsedJoe)
}, 100)