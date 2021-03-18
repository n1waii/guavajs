import { Quad, Node } from "./structures/quadtree.js";
import { isColliding } from "./collisionhandler.js"
//import TouchedEvent from "./classes/events/touchedevent.js";

let ElementsTree = null;
let CollisionListeners = [];

function notifyEvent(event, ...args) {
    for (let i = 0; i < event.connections.length; ++i) {
        event.connections[i].callback(...args);
    }
}

function checkCollisions() {
    let collidingWith = {};
    for (const element of CollisionListeners) {
        if (collidingWith[element]) {
            notifyEvent(element.onTouched, collidingWith[element]);
            continue;
        }  
        const nodes = ElementsTree.getNodesFromPoint([element.position.x, element.position.y]);
        for (const node of nodes) {
            if (node.data === element) { continue; }
            if (isColliding(element, node.data)) {
                collidingWith[element] = node.data;
                collidingWith[node.data] = element;
                notifyEvent(element.onTouched, node.data);
                console.log("collided")
            }
        }
    }
}

function reset(world) {
    ElementsTree = new Quad([0, 0], [world.canvas.width, world.canvas.height]);
    CollisionListeners = [];
}

function run(world) {
    ElementsTree = new Quad([0, 0], [world.canvas.width, world.canvas.height]);
    for (const element of world.getCurrentScene().getObjects()) {
        ElementsTree.insert(Node([element.position.x, element.position.y], element));
    }
    checkCollisions();
}

function addCollisionListener(element) {
    if (CollisionListeners.indexOf(element) === -1) {
        CollisionListeners.push(element);
    }
}

function removeCollisionListener(element) {
    let index = CollisionListeners.indexOf()
    if (index) {
        CollisionListeners.splice(index, 1); 
    }
}

export {
    reset, run, addCollisionListener, removeCollisionListener
};