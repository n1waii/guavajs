console.log("GHERE");

import Guava from "./guava/guava.js";

const InputService = Guava.import("InputService");

const World = Guava.createWorld(0, 0, 700, 420);
const player = World.createObject("Rect", {
    x: 0,
    y: 0,
    width: 30,
    height: 30,
    backgroundColor: "red"
});

setInterval(function() {
    World.scenes[World.currentScene].render(World);   
}, 5);


InputService.onInput.Connect(key => {
    console.log(key + " pressed");
    if (key == "w") {
        player.y -= 1;
    } else if (key == "s") {
        player.y += 1;
    } else if (key == "a") {
        player.x -= 1;
    } else if (key == "d") {
        player.x += 1;
    }
});

InputService.onInputEnded.Connect(key => {
    console.log(key + " let go");
});

