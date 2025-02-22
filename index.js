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

function saveGame() {
    const gameData = {
        joes: parsedJoe,
        jpc: jpc,
        jps: jps,
        murray: {
            level: parseInt(murrayLevel.innerHTML),
            cost: parsedMurrayCost,
            increase: parsedMurrayIncrease
        },
        sal: {
            level: parseInt(salLevel.innerHTML),
            cost: parsedSalCost,
            increase: parsedSalIncrease
        },
        brian: {
            level: parseInt(brianLevel.innerHTML),
            cost: parsedBrianCost,
            increase: parsedBrianIncrease
        }
    };
    localStorage.setItem('clickerSave', JSON.stringify(gameData));
}

function loadGame() {
    const savedGame = localStorage.getItem('clickerSave');
    if (savedGame) {
        const gameData = JSON.parse(savedGame);
        
        // Load main values
        parsedJoe = gameData.joes;
        jpc = gameData.jpc;
        jps = gameData.jps;
        joe.innerHTML = Math.round(parsedJoe);
        
        // Load Murray
        murrayLevel.innerHTML = gameData.murray.level;
        parsedMurrayCost = gameData.murray.cost;
        parsedMurrayIncrease = gameData.murray.increase;
        murrayCost.innerHTML = Math.round(parsedMurrayCost);
        murrayIncrease.innerHTML = parsedMurrayIncrease;
        // Update Murray in upgrades array
        upgrades[0].parsedCost = parsedMurrayCost;
        upgrades[0].parsedIncrease = parsedMurrayIncrease;
        
        // Load Sal
        salLevel.innerHTML = gameData.sal.level;
        parsedSalCost = gameData.sal.cost;
        parsedSalIncrease = gameData.sal.increase;
        salCost.innerHTML = Math.round(parsedSalCost);
        salIncrease.innerHTML = parsedSalIncrease;
        // Update Sal in upgrades array
        upgrades[1].parsedCost = parsedSalCost;
        upgrades[1].parsedIncrease = parsedSalIncrease;
        
        // Load Brian
        brianLevel.innerHTML = gameData.brian.level;
        parsedBrianCost = gameData.brian.cost;
        parsedBrianIncrease = gameData.brian.increase;
        brianCost.innerHTML = Math.round(parsedBrianCost);
        brianIncrease.innerHTML = parsedBrianIncrease;
        // Update Brian in upgrades array
        upgrades[2].parsedCost = parsedBrianCost;
        upgrades[2].parsedIncrease = parsedBrianIncrease;
    }
}

function incrementJoe(event) {
    joe.innerHTML = Math.round(parsedJoe += jpc)

    const x = event.offsetX
    const y = event.offsetY

    const div = document.createElement('div')
    div.innerHTML = `+${Math.round(jpc)}`
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

        // Update both the upgrades array and individual variables
        if (upgrade === 'murray') {
            parsedMurrayIncrease = parseFloat((parsedMurrayIncrease * matchedUpgrade.joeMultiplier).toFixed(2));
            parsedMurrayCost *= matchedUpgrade.costMultiplier;
            jpc += parsedMurrayIncrease;
        } else if (upgrade === 'sal') {
            parsedSalIncrease = parseFloat((parsedSalIncrease * matchedUpgrade.joeMultiplier).toFixed(2));
            parsedSalCost *= matchedUpgrade.costMultiplier;
            jps += parsedSalIncrease;
        } else if (upgrade === 'brian') {
            parsedBrianIncrease = parseFloat((parsedBrianIncrease * matchedUpgrade.joeMultiplier).toFixed(2));
            parsedBrianCost *= matchedUpgrade.costMultiplier;
            jps += parsedBrianIncrease;
        }

        // Update the upgrades array
        matchedUpgrade.parsedIncrease = parseFloat((matchedUpgrade.parsedIncrease * matchedUpgrade.joeMultiplier).toFixed(2));
        matchedUpgrade.increase.innerHTML = matchedUpgrade.parsedIncrease;
        matchedUpgrade.parsedCost *= matchedUpgrade.costMultiplier;
        matchedUpgrade.cost.innerHTML = Math.round(matchedUpgrade.parsedCost);

        // Save after each upgrade purchase
        saveGame();
    }
}

function resetGame() {
    localStorage.removeItem('clickerSave');
    location.reload();
}

function buyMurray() {
    if (parsedJoe >= parsedMurrayCost) {
        joe.innerHTML = Math.round(parsedJoe -= parsedMurrayCost);

        murrayLevel.innerHTML++

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
    parsedJoe += jps / 10
    joe.innerHTML = Math.round(parsedJoe)
    jpcText.innerHTML = Math.round(jpc)
    jpsText.innerHTML = Math.round(jps);
}, 100)

// Auto-save every 30 seconds
setInterval(saveGame, 30000);

// Load saved game when page loads
window.onload = loadGame;