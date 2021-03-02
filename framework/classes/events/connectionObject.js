export default class ConnectionObject {
    constructor(event, callback) {
        this.event = event;
        this.connected = true;
        this.callback = callback;
    }

    Disconnect() {
        this.connected = false;
         
        for (let i = 0; i < this.connections.length; ++i) {
            let c = this.event.connections[i];
            if (c == callback) {
                this.event.connections.splice(0, i);
            }
        }
    }
}  