import { Quad, Node } from "./structures/quadtree.js";
import { isColliding } from "./collisionhandler.js"
//import TouchedEvent from "./classes/events/touchedevent.js";

let ElementsTree = null;
let CollisionListeners = [];
let CollisionEndedListeners = [];

let lastCollided = {};

async function notifyEvent(event, ...args) {
    for (let i = 0; i < event.connections.length; ++i) {
        event.connections[i].callback(...args);
    }
}

function checkCollisions() {
    let collidingWith = {};
    for (const element of CollisionListeners) {
        for (const otherElement of ElementsTree) {
            if (otherElement === element) { continue };
            if (collidingWith[otherElement]) {
                console.log('already')
                notifyEvent(collidingWith[otherElement].onTouched, otherElement);
                continue;
            };
            if (isColliding(element, otherElement)) {
                collidingWith[element] = otherElement;
                collidingWith[otherElement] = element;
                notifyEvent(element.onTouched, otherElement);
            } else {
                if (lastCollided[element]) {
                    notifyEvent(element.onTouchEnded, lastCollided[element]);
                }
            }
        }
        
        // const nodes = ElementsTree.getNodesFromPoint([element.position.x, element.position.y]);
        // for (const node of nodes) {
        //     if (node.data === element) { continue; }
        //     if (isColliding(element, node.data)) {
        //         collidingWith[element] = node.data;
        //         collidingWith[node.data] = element;
        //         notifyEvent(element.onTouched, node.data);
        //         console.log("collided")
        //     }
        // }
    }
    lastCollided = collidingWith;
}

function reset(world) {
    ElementsTree = [];
    CollisionListeners = [];
}

function run(world) {
    //ElementsTree = new Quad([0, 0], [world.canvas.width, world.canvas.height]);
    ElementsTree = world.getCurrentScene().getObjects();
    checkCollisions();
}

function addCollisionListener(element) {
    if (CollisionListeners.indexOf(element) === -1) {
        CollisionListeners.push(element);
    }
}

function removeCollisionListener(element) {
    let index = CollisionListeners.indexOf(element);
    if (index) {
        CollisionListeners.splice(index, 1); 
    }
}

function addCollisionEndedListener(element) {
    if (CollisionEndedListeners.indexOf(element) === -1) {
        CollisionEndedListeners.push(element);
    }
}

function removeCollisionEndedListener(element) {
    let index = CollisionEndedListeners.indexOf(element);
    if (index) {
        CollisionEndedListeners.splice(index, 1); 
    }
}

export {
    reset, run, addCollisionListener, removeCollisionListener, addCollisionEndedListener, removeCollisionEndedListener
};