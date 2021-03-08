const SpriteComponent = superclass => class extends SpriteComponent {
    constructor() {
        this.costumes = [];
        this.costumeState = 0;
    }

    switchCostume(i) {
        console.assert(
            i < this.costumes.length-1 && i > 0,
            "Costume number out of range"
        );
        this.setImage(this.costumes[this.costumeState]);
    }

    addCostume(img) {
        this.costumes.append(img);
    },

    nextCostume() {
        this.costumeState = ((this.costumeState + 1) > this.costumes.length-1) ? 0 : this.costumeState + 1;
        this.switchCostume(costumeState);
    },

    getCurrentCustome() {
        return this.costumes[this.costumeState];
    },

    getCustomeState() {
        return this.costumeState;
    }
};

export default SpriteComponent;