import { getinputDirection } from "./input.js"

let slider = document.getElementById("speedController");
export var SNAKE_SPEED = 5;
slider.oninput = function () {
    SNAKE_SPEED = this.value;
}




export function update() { }