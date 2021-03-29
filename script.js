import { Guava, Enums, Vector2 } from "./guava/guava.js";
import { Quad, Node } from "./guava/structures/quadtree.js";

const World = Guava.createWorld(700, 420);
const InputService = Guava.import("InputService");

const player = World.createObject("Rect", {
    position: new Vector2(30, 10),
    width: 30,
    height: 30,
    backgroundColor: "red"
});

const box = World.createObject("Rect", {
    position: new Vector2(700/2, 420/2),
    width: 80,
    height: 80,
    backgroundColor: "blue"
});

let keysPressed = {};

player.onTouched.Connect(otherElement => {
    console.log("hit")
    otherElement.setProperty("backgroundColor", "green")
});

player.onTouchEnded.Connect(lastTouched => {
    console.log("stopped hitting")
    lastTouched.setProperty("backgroundColor", "blue")
});

InputService.onInput.Connect(key => {
    keysPressed[key] = true;
});

InputService.onInputEnded.Connect(key => {
    delete keysPressed[key];
});

const FRICTION = 0.98;

let velX = 0;
let velY = 0;
let speed = 2;

setInterval(function() {
    if (player.position.x < box.position.x + box.width &&
    player.position.x + player.width > box.position.x &&
    player.position.y < box.position.y + box.height &&
    player.position.y + player.height > box.position.y) {
    } else {
        box.setProperty("backgroundColor", "blue")
    }
}, 1)

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
    let vec = new Vector2(
        player.position.x += velX,
        player.position.y += velY
    );

    for (let i = 0; i === 1; i += 0.01) {
        player.position.lerp(vec, i);
    }
}
updateMovement();
    
