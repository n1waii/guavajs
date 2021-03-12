import InputService from "./services/InputService/inputService.js";
import GlobalEnums from "./globalEnums.js";
import World from "./classes/world/world.js";
import { Vector2 } from "./classes/userdata/userdata.js"

const SERVICES = {
    InputService: InputService,
};

function notifyEvent(event, ...args) {
    for (let i = 0; i < event.connections.length; ++i) {
        event.connections[i].callback(...args);
    }
}

function gameLoop() {
    setInterval(function() {
        notifyEvent(InputService.onInput, "Test");
        notifyEvent(this.services.InputService.onInput);
        // handle input and notify observers
    }, 1000);
}


const Guava = new class Guava {
    constructor() {
        // handling input events
        document.addEventListener("keydown", event => {
            if (event.key != "Unidentified") {
                notifyEvent(InputService.onInput, GlobalEnums.KeyCode[event.key.toUpperCase()]);
            }
        });

        document.addEventListener("keyup", event => {
            notifyEvent(InputService.onInputEnded, GlobalEnums.KeyCode[event.key.toUpperCase()]);
        });

    }

    import(serviceName) {
        return SERVICES[serviceName];
    }

    createWorld(...args) {
        return new World(...args);;
    }
}

export {
    GlobalEnums as Enums,
    Vector2,
    Guava
};