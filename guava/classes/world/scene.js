export default class Scene {
    #objects 

    constructor(world, objects) {
        this.world = world;
        this.objects = objects || [];
    }

    render() {
        if (this.objects !== undefined) {
            for (let i = 0; i < this.objects.length; i++) {
                let obj = this.objects[i];
                obj.clear(this.world);
                obj.render(this.world);
                console.log("rendering object in scene");
            }
        }
    }

    addObject(obj) {
        this.objects.push(obj);
    }
};