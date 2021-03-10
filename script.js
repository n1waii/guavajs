import { Guava, Enums, Vector2 } from "./guava/guava.js";

const InputService = Guava.import("InputService");

const World = Guava.createWorld(0, 0, 700, 420);
const player = World.createObject("Rect", {
    position: new Vector2(),
    width: 30,
    height: 30,
    backgroundColor: "red"
});

setInterval(function() {
    World.scenes[World.currentScene].render(World);   
}, 5);

const FRICTION = 0.98;

let velX = 0;
let velY = 0;
let speed = 2;
let keysPressed = {};

InputService.onInput.Connect(key => {
    keysPressed[key] = true;
});

InputService.onInputEnded.Connect(key => {
    delete keysPressed[key];
});


function updateMovement() {
    requestAnimationFrame(updateMovement);

    if (keysPressed[Enums.KeyCode.W]) {
        if (velY > -speed) {
            velY--;
        }
    }
    
    if (keysPressed[Enums.KeyCode.S]) {
        if (velY < speed) {
            velY++;
        }
    }
    if (keysPressed[Enums.KeyCode.A]) {
        if (velX > -speed) {
            velX--;
        }
    }
    if (keysPressed[Enums.KeyCode.D]) {
        if (velX < speed) {
            velX++;
        }
    }
    
    velY *= FRICTION;
    velX *= FRICTION;
    player.position.y += velY;
    player.position.x += velX;
    
}
updateMovement();
    
