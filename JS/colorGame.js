const submitbtn = document.getElementById("submit-btn")
const startagainbtn = document.getElementById("start-again-btn")
const resultdisplay = document.getElementById("result-display")
const targetresult = document.getElementById("target-rgb-display")
const scoreNresult = document.getElementById("result-score-number")

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
    newGame()
    requestAnimationFrame(gameLoop)
    return
    }
    requestAnimationFrame(gameLoop)
}

function setEasyMode() {
    resultdisplay.style.visibility = "hidden"
    alphaSlider.style.display = "none"
    Easy = true;
    Medium = false;
    Hard = false;
    newGame()
}
function setMediumMode() {
    alphaSlider.style.display = "flex"
    Easy = false;
    Medium = true;
    Hard = false;
    newGame()
}
function setHardMode() {
    resultdisplay.style.visibility = "hidden"
    alphaSlider.style.display = "flex"
    Easy = false;
    Medium = false;
    Hard = true;
    newGame()
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
}

function checkAnswer() {
    submitbtn.disabled = true
    resultdisplay.style.visibility = "visible"
    if (Easy === true) {
        points = Math.abs(sliderR.value - targetR) + Math.abs(sliderG.value - targetG) + Math.abs(sliderB.value - targetB)
        console.log(points)
    }
    else {
        points = Math.abs(sliderR.value - targetR) + Math.abs(sliderG.value - targetG) + Math.abs(sliderB.value - targetB) + Math.abs(sliderA.value - targetA)
        console.log(points)
    }
    if (Easy === true) {
        scoreN = Math.round(100 - (points / 765) * 100)
    }
    else {
        scoreN = Math.round(100 - (points / 1020) * 100)
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
        timer = 60
    }
    if (Medium === true) {
        timer = 45
    }
    if (Hard === true) {
        timer = 25
    }
    updatePhrase(scoreN)
}

function updatePhrase(scoreN) {
    if (scoreN === 100) {
        pdisplay.textContent = "Perfect Match!"
    }
    else if (scoreN >= 80) {
        pdisplay.textContent = "Very Well!"       
    }
    else if (scoreN >= 50) {
        pdisplay.textContent = "Not bad!"       
    }
    else if (scoreN >= 20) {
        pdisplay.textContent = "Far away!"       
    }
    else {
        pdisplay.textContent = "Not even close!"
    }
}

function newGame() {
    gamerunning = false
    resultdisplay.style.visibility = "hidden"   
    setTarget()
    if (Easy === true) {
        timer = 60
    }
    if (Medium === true) {
        timer = 45
    }
    if (Hard === true) {
        timer = 25
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
    gamerunning = true
}

setTarget()
updateBox()
requestAnimationFrame(gameLoop)