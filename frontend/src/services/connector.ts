import Initiator from "./initiator";
import NonInitiator from "./non-initiator";
import EventEmitter from 'eventemitter3';
import Connection from "./connection";
import API from "./api";

export default class Connector {
    private peer: Initiator | NonInitiator | null;
    private offer: string | null;
    private connections: Connection[];
    private event: EventEmitter;
    private api: API;

    constructor() {
        this.event = new EventEmitter();
        this.api = new API();
        this.connections = [];
        this.offer = null;
        this.peer = null;
    }

    async init(initaitor: boolean) {
        this.peer = (initaitor)? new Initiator({}) : new NonInitiator({});
        this.event.emit('peer', this.peer);
        if (this.peer instanceof Initiator) {
            this.offer = await this.peer.initate();
            this.event.emit('offer', this.offer)
        }
        return { peerId: this.peer.peerId, offer: this.offer };
    }

    async newConnection() {
        if (this.peer instanceof NonInitiator || this.peer === null || this.offer === null) {
            throw new Error('Invalid Action');
        }

        const { connectionId } = await this.api.createConnection({
            peerId: this.peer.peerId,
            offer: this.offer
        }).then((resp: any) => resp.data);

        const connection = new Connection(connectionId, this.peer, this.offer);
        this.connections.push(connection);
        return connection;
    }
}
