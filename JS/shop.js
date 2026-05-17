function buyPowerup(itemName, cost) {
    // STEP 1: Can they afford it?
    const success = spendCoins(cost)   // returns true or false

    // STEP 2a: Purchase failed
    if (!success) {
        showShopMessage("Not enough coins! 🪙", "red")
        return
    }

    // STEP 2b: Purchase succeeded — add to inventory
    addItem(itemName)

    // STEP 3: Update the UI to reflect new quantity
    updateItemDisplay(itemName)

    showShopMessage(`${itemName} purchased! You now have ${getItem(itemName)}.`, "green")
}

function showShopMessage(text, color) {
    const msg = document.getElementById("shop-message")

    // set color
    if (color === "green") {
        msg.style.color = "#64b496"
    }
    else {
        msg.style.color = "#e84040"
    }
    // set text
    msg.textContent = text
    msg.style.opacity = "1"

    // fade out after 2 seconds
    setTimeout(() => {
        msg.style.opacity = "0"
    }, 2000)
}

// Wire up each button
document.querySelector(".time-button").addEventListener("click", () => {
    buyPowerup("timeExtender", 100)
})
document.querySelector(".color-button").addEventListener("click", () => {
    buyPowerup("colorHint", 150)
})
document.querySelector(".skip-button").addEventListener("click", () => {
    buyPowerup("roundSkip", 90)
})
document.querySelector(".reroll-button").addEventListener("click", () => {
    buyPowerup("reroll", 70)
})
document.querySelector(".floor-button").addEventListener("click", () => {
    buyPowerup("scoreFloor", 130)
})