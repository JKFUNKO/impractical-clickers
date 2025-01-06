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

let jpcText = document.getElementById("jpc-text")
let jpsText = document.getElementById("jps-text")

let joeImgContrainer = document.querySelector('.joe-img-container')

let jpc = 1;

let jps = 0;

const upgrades = [
    {
        name: 'murray',
        cost: document.querySelector('.murray-cost'),
        parsedCost: parseFloat(document.querySelector('.murray-cost').innerHTML),
        increase: document.querySelector('.murray-increase'),
        parsedIncrease: parseFloat(document.querySelector('.murray-increase').innerHTML),
        level: document.querySelector('.murray-level'),
        joeMultiplier: 1.025,
        costMultiplier: 1.12,
    },
    {
        name: 'sal',
        cost: document.querySelector('.sal-cost'),
        parsedCost: parseFloat(document.querySelector('.sal-cost').innerHTML),
        increase: document.querySelector('.sal-increase'),
            parsedIncrease: parseFloat(document.querySelector('.sal-increase').innerHTML),
            level: document.querySelector('.sal-level'),
        joeMultiplier: 1.025,
            costMultiplier: 1.12,
    },
    {
        name: 'brian',
        cost: document.querySelector('.brian-cost'),
        parsedCost: parseFloat(document.querySelector('.brian-cost').innerHTML),
        increase: document.querySelector('.brian-increase'),
        parsedIncrease: parseFloat(document.querySelector('.brian-increase').innerHTML),
        level: document.querySelector('.brian-level'),
        joeMultiplier: 1.025,
            costMultiplier: 1.12,
    },
]

console.log(upgrades[0].name)

function incrementJoe(event) {
    joe.innerHTML = Math.round(parsedJoe += jpc)

    const x = event.offsetX
    const y = event.offsetY

    const div = document.createElement('div')
    div.innerHTML = `+${jpc}`
    div.style.cssText = 'color:white; position: absolute; top: $(y)px; left: $(x)px; font-size: 15px; pointer-events: none;'
    joeImgContrainer.appendChild(div)

    div.classList.add('fade-up')

    timeout(div);

}

const timeout = (div) => {
    setTimeout(() => {
    div.remove()
    }, 800)
}

function buyUpgrade(upgrade) {
    const matchedUpgrade = upgrades.find((u) => {
        if (u.name === upgrade) return u
    })

    if (parsedJoe >= matchedUpgrade.parsedCost) {
        joe.innerHTML = Math.round(parsedJoe -= matchedUpgrade.parsedCost);

        matchedUpgrade.level.innerHTML++

        matchedUpgrade.parsedIncrease = parseFloat((matchedUpgrade.parsedIncrease * matchedUpgrade.joeMultiplier).toFixed(2))
        matchedUpgrade.increase.innerHTML = matchedUpgrade.parsedIncrease
        jpc += matchedUpgrade.parsedIncrease

        matchedUpgrade.parsedCost *= matchedUpgrade.costMultiplier;
        matchedUpgrade.cost.innerHTML = Math.round(matchedUpgrade.parsedCost)
    }
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

function save () {
    localStorage.clear()

    upgrades.map((upgrade) => {

        const obj = JSON.stringify({
            parsedLevel: parseFloat(upgrade.level.innerHTML),
            parsedCost: upgrade.parsedCost,
            parsedIncrease: upgrade.parsedIncrease
        })

        localStorage.setItem(upgrade.name, obj)

    })
    localStorage.setItem('jpc', JSON.stringify(jpc))
    localStorage.setItem('jps', JSON.stringify(jps))
    localStorage.setItem('joe', JSON.stringify(parsedJoe))
}

function load () {
    upgrades.map((upgrade) => {

        const savedValue = JSON.parse(localStorage.getItem(upgrade.name))
        console.log(savedValue);

        upgrade.parsedCost = savedValue.parsedCost
        upgrade.parsedIncrease = savedValue.parsedIncrease

        upgrade.level.inerHTML = savedValue.parsedLevel
        upgrade.cost.innerHTML = Math.round(upgrade.parsedCost)
        upgrade.increase.innerHTML = upgrade.parsedIncrease
    })
    jpc = JSON.parse(localStorage.getItem('jpc'))
    jps = JSON.parse(localStorage.getItem('jps'))
    prasedJoe = JSON.parse(localStorage.getItem('joe'))

    joe.innerHTML = Math.round(parsedJoe)
}
