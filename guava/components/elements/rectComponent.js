const RectComponent = superclass => class extends superclass {
    constructor(...args) {
        super(...args);
        this.backgroundColor = "white";
        this.backgroundTransparency = 0;
        this.border = "none";
        this.borderSize = 1;
        this.borderColor = "black";
        this.borderRadius = 0;
    }

    setBorder(b, bSize, bColor, bRadius) {
        this.border = b || this.border;
        this.borderSize = bSize || this.borderSize;
        this.borderColor = bColor || this.borderColor;
        this.borderRadius = bRadius || this.borderRadius;
        return this;
    }
    
    setPosition(newX, newY) {
        this.x = newX;
        this.y = newY;
        console.log("set pos");
        return this;
    }

    setSize(newWidth, newHeight) {
        this.width = newWidth;
        this.height = newHeight;
        return this;
    }

    setWidth(newWidth) {
        this.width = newWidth;
        return this;
    }

    setHeight(newHeight) {
        this.height = newHeight;
        return this;
    }
};

export default RectComponent;