import InputService from "./services/InputService/inputService.js";
import GlobalEnums from "./globalEnums.js";

const SERVICES = {
    InputService: InputService,
};

function notifyEvent(event, ...args) {
    for (let i = 0; i < event.connections.length; ++i) {
        event.connections[i].callback(args);
    }
}

function gameLoop() {
    setInterval(function() {
        notifyEvent(InputService.onInput, "Test");
        notifyEvent(this.services.InputService.onInput);
        // handle input and notify observers
    }, 1000);
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
    }

    import(serviceName) {
        return SERVICES[serviceName];
    }
};