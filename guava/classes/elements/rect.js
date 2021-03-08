import Element from "./element.js";
import RectComponent from "../../components/elements/rectComponent.js";

export default class Rect extends RectComponent(Element) {
    constructor(...args) {
        console.log(...args);
        super(...args);
    }
};

