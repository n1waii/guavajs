const CTX_PROP_MAPPINGS = {
    fillStyle: "backgroundColor",
    strokeStyle: "borderColor",
};

export default class Element {
    constructor(props) {        
        this.x = 0;
        this.y = 0;
        this.width = 50;
        this.height = 50;
        this.anchorPoint = [0, 0];
        this.backgroundColor = "red";

        for (const [prop, value] of Object.entries(props)) {
            this.setProperty(prop, value);
        }
    }

    setProperty(prop, value) {
        console.assert(this[prop] !== undefined, "Property does not exist for element");
        this[prop] = value;
        console.log(this[prop]);
        return this;
    }

    render(world) {
        //let scene = this.world.getScene();
        for (const [ctxProp, thisProp] of Object.entries(CTX_PROP_MAPPINGS)) {
            let propValue = this[thisProp]; 
            if (propValue) {
                world.ctx[ctxProp] = propValue;
            }
        }
        //console.log(this);
        world.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    clear(world) {
        world.ctx.clearRect(0, 0, world.canvas.width, world.canvas.height);
    }
}