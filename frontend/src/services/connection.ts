import API from "./api";
import Initiator from "./initiator";
import NonInitiator from "./non-initiator";

export default class Connection {
    private peer: Initiator | NonInitiator;
    public id: string | null;
    private api: API;
    public connected: boolean;
    private offer: string;

    constructor(id: string, peer: Initiator | NonInitiator, offer: string) {
        this.id = id
        this.api = new API();
        this.connected = false;
        this.peer = peer;
        this.offer = offer;
    }

    async poll() {

    }

    
}
