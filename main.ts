// Increase threshold with Button A
input.onButtonPressed(Button.A, function () {
    soundThreshold = Math.min(soundThreshold + 10, 255)
    basic.showString("Threshold")
    basic.showNumber(soundThreshold)
})
// Show toggle history with Button A+B
input.onButtonPressed(Button.AB, function () {
    basic.showString("Toggles")
    basic.showNumber(toggleCount)
})
// Decrease threshold with Button B
input.onButtonPressed(Button.B, function () {
    soundThreshold = Math.max(soundThreshold - 10, 0)
    basic.showString("Threshold")
    basic.showNumber(soundThreshold)
})
/**
 * Initialize variables
 */
let lightOn = false
let soundLevel = 0
let animationStep = 0
let toggleCount = 0
let soundThreshold = 0
soundThreshold = 150
// On start: Show welcome message and clear the display
basic.showString("Voice Light")
basic.clearScreen()
// Forever loop to check sound level and toggle the light
basic.forever(function () {
    // Listening animation: Cycle through icons (diamond, square, heart)
    if (animationStep == 0) {
        basic.showIcon(IconNames.Diamond)
    } else if (animationStep == 1) {
        basic.showIcon(IconNames.Square)
    } else {
        basic.showIcon(IconNames.Heart)
    }
    animationStep = (animationStep + 1) % 3
    // Check sound level (simulates a clap or voice)
    soundLevel = input.soundLevel()
    if (soundLevel > soundThreshold) {
        toggleCount += 1
        if (lightOn) {
            lightOn = false
            basic.clearScreen()
            basic.showString("Light OFF")
        } else {
            lightOn = true
            basic.showLeds(`
                # # # # #
                # # # # #
                # # # # #
                # # # # #
                # # # # #
                `)
            basic.showString("Light ON")
        }
        basic.pause(1000)
    }
})
