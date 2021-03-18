import Rect from "../elements/rect.js";
import Scene from "./scene.js";

const ELEMENTS = {
    Rect: Rect,
}

const Worlds = [];

function worldRendering() {
    for (const world of Worlds) {
        world.getCurrentScene().render();
    }
}

setInterval(worldRendering, 1);

export default class World {
    #scenes
    #currentScene
    #width
    #height

    constructor(width, height) {
        this.#scenes = [new Scene(this, [], true)];
        this.#currentScene = 0;
        this.#width = width;
        this.#height = height; 
        this.canvas = document.createElement("canvas");
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx = this.canvas.getContext("2d"); 
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        Worlds.push(this);
    }

    addScene(scene) {
        console.assert(
            scene.constructor.name == "Scene",
            "Argument 1 is not a Scene object"
        );
        this.#scenes.push(scene);
    }

    setScene(i) {
        console.assert(
            i < this.scenes.length-1 && i > 0,
            "Scene number out of range"
        );
        this.#currentScene = i;
    }

    getCurrentScene() {
        return this.#scenes[this.#currentScene];
    }

    createObject(name, props) {
        const obj = new ELEMENTS[name](props);
        this.getCurrentScene().addObject(obj);
        return obj;
    }
};
