const submitbtn = document.getElementById("submit-btn")
const startagainbtn = document.getElementById("start-again-btn")

const sliderR = document.getElementById("slider-r")
const sliderG = document.getElementById("slider-g")
const sliderB = document.getElementById("slider-b")

const valR = document.getElementById("val-r")
const valG = document.getElementById("val-g")
const valB = document.getElementById("val-b")

let targetR
let targetG
let targetB

let pdisplay = document.getElementById("phrase-display")

let round = document.getElementById("round-display")
let score = document.getElementById("score-display")
let best = document.getElementById("best-display")

let targetBox = document.getElementById("target-box")
let playerBox = document.getElementById("player-box")

let prevscore = 0
let roundC = 1

sliderR.addEventListener("input", updateNumberR)
sliderG.addEventListener("input", updateNumberG)
sliderB.addEventListener("input", updateNumberB)

submitbtn.addEventListener("click", checkAnswer)
startagainbtn.addEventListener("click", newGame)

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

function updateBox() {
    playerBox.style.backgroundColor = `rgb(${sliderR.value}, ${sliderG.value}, ${sliderB.value})`
}

function setTarget() {
    targetR = Math.floor(Math.random() * 256)
    targetG = Math.floor(Math.random() * 256)
    targetB = Math.floor(Math.random() * 256)
    targetBox.style.backgroundColor = `rgb(${targetR}, ${targetG}, ${targetB})`
}

function checkAnswer() {
    const points = Math.abs(sliderR.value - targetR) + Math.abs(sliderG.value - targetG) + Math.abs(sliderB.value - targetB)
    const scoreN = Math.round(100 - (points / 765) * 100)
    if (scoreN > prevscore)
    {
        best.textContent = scoreN
    }
    prevscore = scoreN
    score.textContent = scoreN
    roundC += 1
    round.textContent = roundC
    setTarget()
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
    setTarget()
    sliderR.value = 128
    valR.textContent = parseInt(sliderR.value)
    sliderG.value = 128
    valG.textContent = parseInt(sliderG.value)
    sliderB.value = 128
    valB.textContent = parseInt(sliderB.value)
    roundC = 1
    round.textContent = roundC
    score.textContent = "0"
    best.textContent = "—"
}

setTarget()
updateBox()