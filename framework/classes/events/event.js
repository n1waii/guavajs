<<<<<<< HEAD
import { ConnectionObject } from "./connectionObject.js";
=======
import ConnectionObject from "./connectionObject.js";

export default class Event {
    #connections;
>>>>>>> origin/master

export class Event {    
    constructor() {
        this.connections = [];
    }

    Connect(callback) {
        console.assert(typeof(callback) == "function", "Argument 1 is not a function");
        
        let connObj = new ConnectionObject(this, callback);
        this.connections.push(connObj);

        return connObj;
    }
}