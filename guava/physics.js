import { Quad, Node } from "./structures/quadtree.js";

let Elements = null;
let CollisionListeners = {};

export {
    createEngine(world) {
        Elements = new Quad([0, 0], [world.canvas.width, world.canvas.height]);
        CollisionListeners = {};
    },

    run(world) {
        for (const element of CollisionListeners) do {
            
        }
    },

    addCollisionListener(element) {
        CollisionListeners[element] = true;
    }
};