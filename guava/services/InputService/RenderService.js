import { Event } from "../../classes/events/event.js";

export default {
    // runs when the the engine is awakened 
    start: new Event(),
    // runs every frame -> returns deltaTime
    update: new Event()
}