import InputService from "./services/InputService/inputService.js";
import GlobalEnums from "./globalEnums.js";
import World from "./classes/world/world.js"
import RenderService from "./services/InputService/RenderService.js";

let previousTime;

const SERVICES = {
    InputService: InputService,
    RenderService: RenderService
};

function notifyEvent(event, ...args) {
    for (let i = 0; i < event.connections.length; ++i) {
        event.connections[i].callback(args);
    }
}

function gameLoop() {
    requestAnimationFrame(gameLoop);

    let deltaTime = (Date.now() - previousTime) / 1000;
    previousTime = Date.now();

    notifyEvent(RenderService.update, deltaTime);
}

export default new class Guava {
    constructor() {
        // handling input events
        document.addEventListener("keydown", event => {
            if (event.key != "Unidentified") {
                notifyEvent(InputService.onInput, GlobalEnums.keyCode[event.key.toUpperCase()]);
            }
        });

        document.addEventListener("keyup", event => {
            notifyEvent(InputService.onInputEnded, GlobalEnums.keyCode[event.key.toUpperCase()]);
        });

        // initializing the game loop
        previousTime = Date.now();
        notifyEvent(RenderService.start);
        gameLoop();
    }

    import(serviceName) {
        return SERVICES[serviceName];
    }

    createWorld(x, y, width, height) {
        console.log("creating world");
        return new World(x, y, width, height);
    }
};