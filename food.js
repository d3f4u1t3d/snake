import { onSnake, expandSnake } from './snake.js '
import { randomGridPosition } from './grid.js'
import { colorcount } from './game.js'

let food = getRandomFoodPosition()
const EXPANSION_RATE = 1

export function update(colorcount) {
    if (onSnake(food)) {
        expandSnake(EXPANSION_RATE)
        food = getRandomFoodPosition()
        return true
    }
    return false
}

export function draw(gameBoard, colorcount) {
    const foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x
    foodElement.classList.add(`foodColor${colorcount}`)
    gameBoard.appendChild(foodElement)
}

function getRandomFoodPosition() {
    let newFoodPosition
    while (newFoodPosition == null || onSnake(newFoodPosition)) {
        newFoodPosition = randomGridPosition()
    }
    return newFoodPosition
}