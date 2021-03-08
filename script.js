console.log("GHERE");

import Guava from "./guava/guava.js";

const InputService = Guava.import("InputService");

const World = Guava.createWorld(0, 0, 700, 420);
const rect = World.createObject("Rect", {
    x: 10,
    y: 20,
    width: 40,
    height: 40,
});



InputService.onInput.Connect(key => {
    console.log(key + " pressed");
});

InputService.onInputEnded.Connect(key => {
    console.log(key + " let go");
});

