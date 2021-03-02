import InputService from "./services/InputService/inputService.js";

function notifyEvent(event, ...args) {
    for (let i = 0; i < event.connections.length; ++i) {
        event.connections[i].callback(args);
    }
}

class Guava { 
    constructor() {
        this.services = {
            InputService: InputService,
        };
        setInterval(function() {
            notifyEvent(this.services.InputService.onInput);
            // handle input and notify observers
        }, 1000);
    }

    import(serviceName) {
        return this.services[serviceName];
    }
};

const guava = new Guava();
//Object.freeze(guava);

export default guava;