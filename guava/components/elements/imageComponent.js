const ImageElementComponent = superclass => class extends superclass {
    constructor() {
        this.image = "";
        this.imageTransparency = 0;
    }
   
    setImage(element) {
        this.image = element;
    }
};

export default ImageElementComponent;