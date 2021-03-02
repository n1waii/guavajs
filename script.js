import Guava from "./framework/guava.js";

const InputService = Guava.import("InputService");

InputService.onInput.Connect(function(inputObject) {
    console.log("running");
});