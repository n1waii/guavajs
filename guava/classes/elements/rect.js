import Element from "./element.js";
import RectComponent from "../../components/elements/rectComponent.js";

export default class Rect extends RectComponent(Element) {
    constructor(...args) {
        super(...args)
        this.border = "none";
        this.borderSize = 1;
        this.borderColor = "black";
        this.borderRadius = 0;
    }   
};

