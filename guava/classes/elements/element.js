import Vector2 from "../userdata/vector2.js";
import { TouchedEvent, TouchEndedEvent } from "../events/touchedevent.js";

const CTX_PROP_MAPPINGS = {
    fillStyle: "backgroundColor",
    strokeStyle: "borderColor",
};

function clamp(number, min, max) {
  return Math.max(min, Math.min(number, max));
}

export default class Element {
    constructor(props) {        
        this.position = new Vector2()
        this.width = 50;
        this.height = 50;
        this.anchorPoint = [0, 0];
        this.backgroundColor = "red";
        this.onTouched = new TouchedEvent(this);
        this.onTouchEnded = new TouchEndedEvent(this);

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
        
        world.ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}