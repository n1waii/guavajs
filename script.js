import Guava from "./guava/guava.js";
import Rect from "./guava/classes/elements/rect.js"

const InputService = Guava.import("InputService");

InputService.onInput.Connect(key => {
    console.log(key + " pressed");
});

InputService.onInputEnded.Connect(key => {
    console.log(key + " let go");
});

let r = new Rect();
