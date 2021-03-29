import { Event } from "./event.js";
import * as PhysicsEngine from "../../physics.js";

class TouchedEvent extends Event {
    Connect(callback) {
        super.Connect(callback);
        PhysicsEngine.addCollisionListener(this.object);
    }
};

class TouchEndedEvent extends Event {
    Connect(callback) {
        super.Connect(callback);
        PhysicsEngine.addCollisionEndedListener(this.object);
    }
};

export { TouchedEvent, TouchEndedEvent }