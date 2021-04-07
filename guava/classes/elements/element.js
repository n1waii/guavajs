import Vector2 from "../userdata/vector2.js";
import { TouchedEvent, TouchEndedEvent } from "../events/touchedevent.js";

const CTX_PROP_MAPPINGS = {
    fillStyle: "backgroundColor",
    strokeStyle: "borderColor",
};

function clamp(number, min, max) {
  return Math.max(min, Math.min(number, max));
}

CanvasRenderingContext2D.prototype.roundRect = function (x, y, width, height, radius, fill, stroke) {
    var cornerRadius = { upperLeft: 0, upperRight: 0, lowerLeft: 0, lowerRight: 0 };
    if (typeof stroke == "undefined") {
        stroke = true;
    }
    if (typeof radius === "object") {
        for (var side in radius) {
            cornerRadius[side] = radius[side];
        }
    }

    this.beginPath();
    this.moveTo(x + cornerRadius.upperLeft, y);
    this.lineTo(x + width - cornerRadius.upperRight, y);
    this.quadraticCurveTo(x + width, y, x + width, y + cornerRadius.upperRight);
    this.lineTo(x + width, y + height - cornerRadius.lowerRight);
    this.quadraticCurveTo(x + width, y + height, x + width - cornerRadius.lowerRight, y + height);
    this.lineTo(x + cornerRadius.lowerLeft, y + height);
    this.quadraticCurveTo(x, y + height, x, y + height - cornerRadius.lowerLeft);
    this.lineTo(x, y + cornerRadius.upperLeft);
    this.quadraticCurveTo(x, y, x + cornerRadius.upperLeft, y);
    this.closePath();
    if (stroke) {
        this.stroke();
    }
    if (fill) {
        this.fill();
    }
} 

export default class Element {
    #world
    #events

    constructor(world, props) {
        this.#world = world;        
        this.position = new Vector2()
        this.width = 50;
        this.height = 50;
        this.anchorPoint = [0, 0];
        this.backgroundColor = "red";
        this.borderRadius = 0;
        this.name = "Element";
        this.border = "none";
        this.borderSize = 1;
        this.borderColor = "black";
        this.onTouched = new TouchedEvent(this);
        this.onTouchEnded = new TouchEndedEvent(this);
        this.#events = [this.onTouched, this.onTouchEnded]

        for (const [prop, value] of Object.entries(props)) {
            this.setProperty(prop, value);
        }
    }

    setProperty(prop, value) {
        console.assert(this[prop] !== undefined, "Property does not exist for element");
        this[prop] = value;
        return this;
    }

    render(world) {
        let scene = world.getCurrentScene();
        
        for (const [ctxProp, thisProp] of Object.entries(CTX_PROP_MAPPINGS)) {
            let propValue = this[thisProp]; 
            if (propValue) {
                world.ctx[ctxProp] = propValue;
            }
        }
        
        if (scene.isEnclosed()) {
            this.position.x = clamp(this.position.x, 0, world.canvas.width-this.width);
            this.position.y = clamp(this.position.y, 0, world.canvas.height-this.height);
        }
        
        world.ctx.roundRect(this.position.x, this.position.y, this.width, this.height, {
            upperLeft: this.borderRadius, upperRight: this.borderRadius, lowerLeft: this.borderRadius, lowerRight: this.borderRadius
        }, true, false)
    }

    Destroy() {
        for (event of this.#events) {
            event.Disconnect();
        }
    } 
}