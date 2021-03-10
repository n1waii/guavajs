import Rect from "../elements/rect.js";
import Scene from "./scene.js";

const ELEMENTS = {
    Rect: Rect,
}

export default class World {
    #scenes
    #currentScene
    #canvas
    #ctx
    #width
    #height
    #x
    #y

    constructor(x, y, width, height) {
        this.scenes = [(new Scene(this, [], true))];
        this.currentScene = 0;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height; 
        this.canvas = document.createElement("canvas");
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx = this.canvas.getContext("2d"); 
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }

    addScene(scene) {
        console.assert(
            scene.constructor.name == "Scene",
            "Argument 1 is not a Scene object"
        );
        this.scenes.append(scene);
        //this.ctx.drawImage(background)
    }

    setScene(i) {
        console.assert(
            i < this.scenes.length-1 && i > 0,
            "Scene number out of range"
        );
    }

    getCurrentScene(index) {
        return this.scenes[this.currentScene];
    }

    createObject(name, props) {
        const obj = new ELEMENTS[name](props);
        this.scenes[this.currentScene].addObject(obj);
        return obj;
    }

};