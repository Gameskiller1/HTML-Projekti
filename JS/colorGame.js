const submitbtn = document.getElementById("submit-btn")
const startagainbtn = document.getElementById("start-again-btn")
const shopbtn = document.getElementById("shop-btn")
const resultdisplay = document.getElementById("result-display")
const targetresult = document.getElementById("target-rgb-display")
const scoreNresult = document.getElementById("result-score-number")
const coinsdisplay = document.getElementById("coins-earned-display")

const inventorybtn = document.getElementById('inventory-btn');
const inventorybox = document.getElementById('inventory-box');
let inventorypressed = false

const timeextenderbtn = document.getElementById("time-extender")
const colorhintbtn = document.getElementById("color-hint")
const roundskipbtn = document.getElementById("round-skip")
const rerollbtn = document.getElementById("reroll")
const scorefloorbtn = document.getElementById("score-floor")

let popuptimeout = null
let scorefloorused = false
let colorhintused = false
const popup = document.getElementById("popup")
const popuptext = document.getElementById("popup-text")
showpopup("Welcome to Color Blast!")

const easy = document.getElementById("easy-btn")
const medium = document.getElementById("medium-btn")
const hard = document.getElementById("hard-btn")

const alphaSlider = document.getElementById("alpha-slider")
const sliderR = document.getElementById("slider-r")
const sliderG = document.getElementById("slider-g")
const sliderB = document.getElementById("slider-b")
const sliderA = document.getElementById("slider-a")

const valR = document.getElementById("val-r")
const valG = document.getElementById("val-g")
const valB = document.getElementById("val-b")
const valA = document.getElementById("val-a")

let Easy = true;
let Medium = false;
let Hard = false;

let targetR
let targetG
let targetB
let targetA

let pdisplay = document.getElementById("phrase-display")

let round = document.getElementById("round-display")
let timerdisplay = document.getElementById("timer-display")
let best = document.getElementById("best-display")

let targetBox = document.getElementById("target-box")
let playerBox = document.getElementById("player-box")

let points = 0
let scoreN = 0
let bestscore = 0
let roundC = 1

let scoreFloorActive = false
let gamerunning = true
let lasttime = null
let timer = 60

sliderR.addEventListener("input", updateNumberR)
sliderG.addEventListener("input", updateNumberG)
sliderB.addEventListener("input", updateNumberB)
sliderA.addEventListener("input", updateNumberA)

easy.addEventListener("click", setEasyMode)
medium.addEventListener("click", setMediumMode)
hard.addEventListener("click", setHardMode)

submitbtn.addEventListener("click", checkAnswer)
startagainbtn.addEventListener("click", newGame)
shopbtn.addEventListener("click", () => {
    window.location.href = "shop.html"
})

timeextenderbtn.addEventListener("click", () => {
    if (!hasItem("timeExtender")) {
        showpopup("You don't have any Time Extenders! Earn coins to buy them in the shop.")
        return
    }
    useItem("timeExtender")
    showpopup("Timer extended by 15 seconds!")
    timer += 15
})

colorhintbtn.addEventListener("click", () => {
    if (colorhintused) {
        showpopup("You've already used a Color Hint this round!")
        return
    }
    if (!hasItem("colorHint")) {
        showpopup("You don't have any Color Hints! Earn coins to buy them in the shop.")
        return
    }
    useItem("colorHint")
    showpopup("Color hint revealed!")
    colorhintused = true
    if (Easy === true) {
        pdisplay.textContent = Math.random() <= 1/3 ? `R: ${targetR}` : Math.random() <= 0.50 ? `G: ${targetG}` : `B:  ${targetB}`
    }
    else {
        pdisplay.textContent = Math.random() <= 0.25 ? `R: ${targetR}` : Math.random() <= 1/3 ? `G: ${targetG}` : Math.random() <= 0.50 ? `B: ${targetB}` : `A: ${targetA}`
    }
})

roundskipbtn.addEventListener("click", () => {
    if (!hasItem("roundSkip")) {
        showpopup("You don't have any Round Skips! Earn coins to buy them in the shop.")
        return
    }   
    useItem("roundSkip")
    showpopup("Round skipped!")
    nextRound()
})

rerollbtn.addEventListener("click", () => {
    if (!hasItem("reroll")) {
        showpopup("You don't have any Rerolls! Earn coins to buy them in the shop.")
        return
    }
    useItem("reroll")
    showpopup("New target generated!")
    setTarget()
})
scorefloorbtn.addEventListener("click", () => {
    if (scorefloorused) {
        showpopup("You've already used a Score Floor this round!")
        return
    }
    if (!hasItem("scoreFloor")) {
        showpopup("You don't have any Score Floors! Earn coins to buy them in the shop.")
        return
    }
    useItem("scoreFloor")
    showpopup("Score Floor activated!")
    scorefloorused = true
    scoreFloorActive = true
})

inventorybtn.addEventListener('click', () => {
    if (!inventorypressed) {inventorypressed = true}
    else {inventorypressed = false}
    gamerunning = inventorypressed === true ? false : true
    if (gamerunning) {
        lasttime = null
        requestAnimationFrame(gameLoop)
    }
    inventorybox.classList.toggle('active');
});

function showpopup(message) {
    clearTimeout(popuptimeout)
    popuptext.textContent = message
    popup.style.opacity = "1"

    popuptimeout = setTimeout(() => {
        popup.style.color = "#e0e0e0"
        popup.style.opacity = "0"
    }, 3000)
}
function gameLoop(timestamp) {
    if (!gamerunning) {
        return
    }
    if (lasttime === null) {
        lasttime = timestamp
    }
    const delta = (timestamp - lasttime) / 1000
    lasttime = timestamp
    timer -= delta
    timerdisplay.textContent = Math.ceil(timer)
    if (timer <= 0) {
    submitbtn.disabled = true
    resultdisplay.style.visibility = "visible"
    pdisplay.textContent = "Time's up!"
    lasttime = null
    scoreNresult.textContent = 0
    newGame() // endgame function on consideration
    return
    }
    requestAnimationFrame(gameLoop)
}

function setEasyMode() {
    resultdisplay.style.visibility = "hidden"
    alphaSlider.style.visibility = "hidden"
    Easy = true;
    Medium = false;
    Hard = false;
    newGame()
}
function setMediumMode() {
    resultdisplay.style.visibility = "hidden"
    alphaSlider.style.visibility = "visible"
    Easy = false;
    Medium = true;
    Hard = false;
    newGame()
}
function setHardMode() {
    resultdisplay.style.visibility = "hidden"
    alphaSlider.style.visibility = "visible"
    Easy = false;
    Medium = false;
    Hard = true;
    newGame()
}
function updateCoinsDisplay(coinsEarned, difficultyAdd) {
    if (Easy === true) {
        coinsdisplay.textContent = "Coins Earned: " + coinsEarned + "🪙"
    } 
    else {
        const bonusLabel = Medium === true ? `<span style="color: #bbff00;">Medium bonus: </span>` : `<span style="color: #ff0000;">Hard bonus: </span>`
        coinsdisplay.innerHTML = "Coins Earned: " + coinsEarned + " + " + bonusLabel + difficultyAdd + "🪙"
    }
}
function updateNumberR() {
    valR.textContent = parseInt(sliderR.value)
    updateBox()
}
function updateNumberG() {
    valG.textContent = parseInt(sliderG.value)
    updateBox()
}
function updateNumberB() {
    valB.textContent = parseInt(sliderB.value)
    updateBox()
}
function updateNumberA() {
    valA.textContent = parseInt(sliderA.value)
    updateBox()
}

function updateBox() {
    if (Easy === true) {
        playerBox.style.backgroundColor = `rgb(${sliderR.value}, ${sliderG.value}, ${sliderB.value})`
    }
    else {
        playerBox.style.backgroundColor = `rgba(${sliderR.value}, ${sliderG.value}, ${sliderB.value}, ${sliderA.value / 255})`
    }
}

function setTarget() {
    submitbtn.disabled = false
    targetR = Math.floor(Math.random() * 256)
    targetG = Math.floor(Math.random() * 256)
    targetB = Math.floor(Math.random() * 256)
    if (Medium === true || Hard === true) {
        targetA = Math.floor(Math.random() * 256)
    }
    else {
        targetA = 255
    }
    console.log(`Target RGBA: ${targetR}, ${targetG}, ${targetB}, ${targetA / 255}`)
    console.log(Easy)
    console.log(Medium)
    console.log(Hard)
    if (Easy === true) {
        targetBox.style.backgroundColor = `rgb(${targetR}, ${targetG}, ${targetB})`
    }
    else {
        targetBox.style.backgroundColor = `rgba(${targetR}, ${targetG}, ${targetB}, ${targetA / 255})`
    }
    updateBox()
}

function checkAnswer() {
    submitbtn.disabled = true
    colorhintused = false
    scorefloorused = false
    resultdisplay.style.visibility = "visible"
    if (Easy === true) {
        points = Math.abs(sliderR.value - targetR) + Math.abs(sliderG.value - targetG) + Math.abs(sliderB.value - targetB)
        console.log(points)
    }
    else {
        points = Math.abs(sliderR.value - targetR) + Math.abs(sliderG.value - targetG) + Math.abs(sliderB.value - targetB) + Math.abs(sliderA.value - targetA)
        console.log(points)
    }
    if (points <= 10) {
        scoreN = 100
    }
    else {
        if (Easy === true) {
            const ratio = points / 765
            scoreN = Math.round(100 * Math.pow(1 - ratio, 3.5))
        }
        else if (Medium === true) {
            const ratio = points / 1020
            scoreN = Math.round(100 * Math.pow(1 - ratio, 3.1))
        }
        else {
            const ratio = points / 1020
            scoreN = Math.round(100 * Math.pow(1 - ratio, 2.77))
        }
        if (scoreFloorActive) {
            scoreN = Math.max(scoreN, 50)
            scoreFloorActive = false
        }
    }
    if (scoreN > bestscore)
    {
        bestscore = scoreN
        best.textContent = bestscore
    }
    roundC += 1
    round.textContent = roundC
    if (Easy === true) {
        targetresult.textContent = `Red: ${targetR}, Green: ${targetG}, Blue: ${targetB}`
    }
    else {
        targetresult.textContent = `Red: ${targetR}, Green: ${targetG}, Blue: ${targetB} Alpha: ${targetA}`
    }
    scoreNresult.textContent = scoreN
    setTarget()
    if (Easy === true) {
        timer = 75
    }
    if (Medium === true) {
        timer = 55
    }
    if (Hard === true) {
        timer = 35
    }
    updatePhrase(scoreN)
}

function updatePhrase(scoreN) {
    let coinsEarned = 0
    let difficultyAdd = 0
    if (scoreN === 100) {
        pdisplay.textContent = "Perfect Match!"
        coinsEarned = 40
        difficultyAdd = Medium === true ? 30 : Hard === true ? 110 : 0
    }
    else if (scoreN >= 80) {
        pdisplay.textContent = "Very Well!"
        coinsEarned = 18
        difficultyAdd = Medium === true ? 17 : Hard === true ? 62 : 0
    }
    else if (scoreN >= 60) {
        pdisplay.textContent = "Not bad!"
        coinsEarned = 8
        difficultyAdd = Medium === true ? 11 : Hard === true ? 33 : 0
    }
    else if (scoreN >= 35) {
        pdisplay.textContent = "Far away!"
        coinsEarned = 0
        difficultyAdd = Medium === true ? 7 : Hard === true ? 15 : 0
    }
    else {
        pdisplay.textContent = "Not even close!"
        coinsEarned = 0
        difficultyAdd = Hard === true ? 5 : 0
    }
    updateCoinsDisplay(coinsEarned, difficultyAdd)
    addCoins(coinsEarned + difficultyAdd)
    
}

function newGame() {
    gamerunning = false
    resultdisplay.style.visibility = "hidden"   
    setTarget()
    if (Easy === true) {
        timer = 75
    }
    if (Medium === true) {
        timer = 55
    }
    if (Hard === true) {
        timer = 35
    }
    sliderR.value = 128
    valR.textContent = parseInt(sliderR.value)
    sliderG.value = 128
    valG.textContent = parseInt(sliderG.value)
    sliderB.value = 128
    valB.textContent = parseInt(sliderB.value)
    sliderA.value = 128
    valA.textContent = parseInt(sliderA.value)
    bestscore = 0
    roundC = 1
    round.textContent = roundC
    best.textContent = "—"
    lasttime = null
    gamerunning = true
    colorhintused = false
    scorefloorused = false
    requestAnimationFrame(gameLoop)
}

function nextRound() {
    gamerunning = false
    resultdisplay.style.visibility = "hidden"   
    setTarget()
    if (Easy === true) {
        timer = 75
    }
    if (Medium === true) {
        timer = 55
    }
    if (Hard === true) {
        timer = 35
    }
    sliderR.value = 128
    valR.textContent = parseInt(sliderR.value)
    sliderG.value = 128
    valG.textContent = parseInt(sliderG.value)
    sliderB.value = 128
    valB.textContent = parseInt(sliderB.value)
    sliderA.value = 128
    valA.textContent = parseInt(sliderA.value)
    roundC += 1
    round.textContent = roundC
    lasttime = null
    gamerunning = true
    colorhintused = false
    scorefloorused = false
    requestAnimationFrame(gameLoop)
}
newGame()