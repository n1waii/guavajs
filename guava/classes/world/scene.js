export default class Scene {
    #world
    #objects 
    #hasBoundary

    constructor(world, objects, hasBoundary) {
        this.#world = world;
        this.#objects = objects || [];
        this.#hasBoundary = hasBoundary || false;
    }

    render() {
        for (let i = 0; i < this.#objects.length; i++) {
            let obj = this.#objects[i];
            obj.clear(this.#world);
            obj.render(this.#world);
        }
    }

    isEnclosed() {
        return this.#hasBoundary;
    }

    addObject(obj) {
        this.#objects.push(obj);
    }
};