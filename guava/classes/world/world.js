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
        this.scenes = [];
        this.currentScene = 1;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height; 
        this.canvas = document.createElement("canvas");
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx = this.canvas.getContext("2d");  
    },

    addScene() {
        //this.ctx.drawImage(background)
    }

    setScene(i) {
        console.assert(
            i < this.scenes.length-1 && i > 0,
            "Scene number out of range"
        );
    }


}