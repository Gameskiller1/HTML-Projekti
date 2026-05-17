function getCoins() {
    return parseInt(localStorage.getItem("coins")) || 0
}

function addCoins(amount) {
    localStorage.setItem("coins", getCoins() + amount)
    updateCoinDisplay()
}

// Returns TRUE if purchase succeeded, FALSE if broke
function spendCoins(amount) {
    if (getCoins() < amount) {
        return false
    }
    localStorage.setItem("coins", getCoins() - amount)
    updateCoinDisplay()
    return true
}

function updateCoinDisplay() {
    const amount = document.getElementById("coin-amount")
    if (amount) amount.textContent = getCoins()
}

updateCoinDisplay()
