import Guava from "./framework/guava.js";

const InputService = Guava.import("InputService");

InputService.onInput.Connect(key => {
    console.log(key + " pressed");
});

InputService.onInputEnded.Connect(key => {
    console.log(key + " let go");
});

