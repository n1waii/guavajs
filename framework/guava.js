import InputService from "./services/InputService/inputService.js";
import GlobalEnums from "./globalEnums.js";

function notifyEvent(event, ...args) {
    for (let i = 0; i < event.connections.length; ++i) {
        event.connections[i].callback(args);
    }
}

class Guava { 
    #services

    constructor() {
        this.services = {
            InputService: InputService,
        };

        document.addEventListener("keydown", event => {
            if (event.key != "Unidentified") {
                notifyEvent(InputService.onInput, GlobalEnums.keyCode[event.key.toUpperCase()]);
            }
        });

        document.addEventListener("keyup", event => {
            notifyEvent(InputService.onInputEnded, GlobalEnums.keyCode[event.key.toUpperCase()]);
        });
        
        //this.gameLoop();
    }

    #gameLoop() {
        setInterval(function() {
            notifyEvent(InputService.onInput, "Test");
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