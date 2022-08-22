import { getinputDirection } from "./input.js"

let slider = document.getElementById("speedController");
export var SNAKE_SPEED = 5;
slider.oninput = function () {
    SNAKE_SPEED = this.value;
}
//console.log(SNAKE_SPEED)
const snakeBody = [{ x: 10, y: 11 }]
export const colors = [0]
let newSegments = 0

export function update() {
    addSegments()
    const inputDirection = getinputDirection()
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = { ...snakeBody[i] }
    }

    snakeBody[0].x += inputDirection.x
    snakeBody[0].y += inputDirection.y
}

export function draw(gameBoard, colorcount) {
    let i = 0;
    snakeBody.forEach(segment => {
        const snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = segment.y
        snakeElement.style.gridColumnStart = segment.x
        snakeElement.className = `foodColor${colors[i]}`
        gameBoard.appendChild(snakeElement)
        i++
    })
}

export function expandSnake(amount) {
    newSegments += amount
}

export function onSnake(position, { ignoreHead = false } = {}) {
    return snakeBody.some((segment, index) => {
        if (ignoreHead && index === 0) return false
        return equalPositions(segment, position)
    })
}

function equalPositions(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y
}

function addSegments() {
    for (let i = 0; i < newSegments; i++) {
        snakeBody.push({ ...snakeBody[snakeBody.length - 1] })

    }
    newSegments = 0
}

export function getSnakeHead() {
    return snakeBody[0]
}

export function snakeIntersection() {
    return onSnake(snakeBody[0], { ignoreHead: true })
}