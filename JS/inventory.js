// Every powerup has a unique key and starts at 0
const POWERUPS = ["timeExtender", "colorHint", "roundSkip", "reroll", "scoreFloor"]

// Get how many of a powerup you own
function getItem(name) {
    return parseInt(localStorage.getItem("inv_" + name)) || 0
}

// Add 1 to inventory (called after successful purchase)
function addItem(name) {
    localStorage.setItem("inv_" + name, getItem(name) + 1)
}

// Use 1 from inventory — returns false if you have none
function useItem(name) {
    const current = getItem(name)
    if (current <= 0) return false               // nothing to use
    localStorage.setItem("inv_" + name, current - 1)
    updateItemDisplay(name)
    return true                                  // successfully consumed
}

// Check if you own at least 1
function hasItem(name) {
    return getItem(name) > 0
}

function updateItemDisplay(name) {
    const el = document.getElementById("owned-" + name)
    if (el) el.textContent = `Owned: ${getItem(name)}`
}

// On page load, refresh all quantities
POWERUPS.forEach(p => updateItemDisplay(p))