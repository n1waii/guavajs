import { Guava, Enums, Vector2 } from "./guava/guava.js";
import { Quad, Node } from "./guava/structures/quadtree.js";

const WIDTH = 700;
const HEIGHT = 400;

const World = Guava.createWorld(WIDTH, HEIGHT);
const InputService = Guava.import("InputService");

function createTargets() {
    for (let i = 0; i < 7; i++) {
        World.createObject("Rect", {
            position: new Vector2(15+(i*100), 30),
            width: 70,
            height: 20,
            name: "targetBox",
            backgroundColor: "blue"
        });
    };

    for (let i = 0; i < 6; i++) {
        World.createObject("Rect", {
            position: new Vector2(40+(i*100), 90),
            width: 70,
            height: 20,
            name: "targetBox",
            backgroundColor: "green"
        });
    };

    for (let i = 0; i < 5; i++) {
        World.createObject("Rect", {
            position: new Vector2(30+(i*130), 150),
            width: 100,
            height: 20,
            name: "targetBox",
            backgroundColor: "pink"
        });
    }
}

createTargets();

const player = World.createObject("Rect", {
    position: new Vector2(WIDTH/2-80/2, HEIGHT-100),
    width: 80,
    height: 20,
    backgroundColor: "red"
});

let keysPressed = {};

player.onTouched.Connect(otherElement => {
    otherElement.setProperty("backgroundColor", "green")
});

player.onTouchEnded.Connect(lastTouched => {
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
    
