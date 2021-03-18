import { Event } from "./event.js";
import * as PhysicsEngine from "../../physics.js";

export default class TouchedEvent extends Event {
    Connect(callback) {
        super.Connect(callback);
        PhysicsEngine.addCollisionListener(this.object);
    }
};