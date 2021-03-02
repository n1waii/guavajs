import InputService from "./services/inputService.js";

class Guava { 
    constructor() {
        this.services = {
            InputService: InputService,
        };
        setInterval(function() {
            InputService.onInput.Notify();
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