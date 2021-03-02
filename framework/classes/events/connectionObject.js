export class ConnectionObject {
    
    constructor(event, callback) {
        this.event = event;
        this.connected = true;
        this.callback = callback;
    }

    Disconnect() {
        this.connected = false;
        let event = this.event;

        for (let i = 0; i < event.connections.length; ++i) {
            let c = event.connections[i];
            if (c == this.callback) {
                event.connections.splice(0, i);
            }
        }

        console.log("Disconnected connection object");
    }
}  