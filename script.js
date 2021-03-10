import Guava from "./guava/guava.js";

const InputService = Guava.import("InputService");
const RenderService = Guava.import("RenderService")

const World = Guava.createWorld(0, 0, 700, 420);
const player = World.createObject("Rect", {
    x: 0,
    y: 0,
    width: 30,
    height: 30,
    backgroundColor: "red"
});

let speed = 500;
let deltaTime;

InputService.onInput.Connect(key => {
    console.log(key + " pressed");
    if (key == "w") player.y -= speed * deltaTime;
    if (key == "s") player.y += speed * deltaTime;
    if (key == "a") player.x -= speed * deltaTime;
    if (key == "d") player.x += speed * deltaTime;
    if (key == "f") speed += 10;
});

InputService.onInputEnded.Connect(key => {
    console.log(key + " let go");
});

RenderService.update.Connect(dt => {
    deltaTime = dt;
    World.scenes[World.currentScene].render(World);
});

RenderService.start.Connect(e => {
    console.log("u better fwork")
});