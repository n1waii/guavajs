export default class Scene {
    #world
    #objects 
    #hasBoundary

    constructor(world, objects, hasBoundary) {
        this.#world = world;
        this.#objects = objects || [];
        this.#hasBoundary = hasBoundary || false;
    }

    getObjects() {
        return this.#objects;
    }

    render() {
        let world = this.#world;

        world.ctx.clearRect(0, 0, world.canvas.width, world.canvas.height);
        for (const obj of this.#objects) {
            //obj.clear(this.#world);
            obj.render(world);
        }
    }

    isEnclosed() {
        return this.#hasBoundary;
    }

    addObject(obj) {
        this.#objects.push(obj);
    }
};