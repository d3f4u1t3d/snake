import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection, colors } from './snake.js'
import { update as updateFood, draw as drawFood } from './food.js'
import { outsideGrid, wrap } from './grid.js'

let lastRenderTime = 0
let gameOver = false
const gameBoard = document.getElementById('game-board')
export let colorcount = 1;
let collision_gamestate = 1;
var foodcolorupdater = false
var previouscolor = 0
collision_gamestate = prompt("Enter Collision State\n1.Collision\n0.No Collision")
//console.log(collision_gamestate)


function main(currentTime) {
    if (gameOver) {
        if (confirm('You Lost. Press ok to restart.')) {
            window.location = ''
        }
        return
    }
    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return

    //console.log('Render')
    lastRenderTime = currentTime
    //console.log(colorcount)
    update()
    draw(colorcount)
}

window.requestAnimationFrame(main)

function update() {
    updateSnake()
    foodcolorupdater = updateFood(colorcount)
    checkDeath()

    if (foodcolorupdater) {
        if (colorcount == 4) {
            previouscolor = 4
            colorcount = 0
        }
        else {
            previouscolor = colorcount
            ++colorcount
        }
        colors.unshift(previouscolor)
    }
}

function draw(colorcount) {
    gameBoard.innerHTML = ''
    drawFood(gameBoard, colorcount)
    drawSnake(gameBoard, previouscolor)

}
function checkDeath() {
    if (collision_gamestate == 1) { gameOver = outsideGrid(getSnakeHead()) || snakeIntersection() }
    else { wrap(getSnakeHead()) }
}