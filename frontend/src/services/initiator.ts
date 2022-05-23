import { IInitiatorConfig } from "./../constatnts";
import Peer from "./peer";

export default class Initiator extends Peer {
    private offer: string | null;

    constructor(config: IInitiatorConfig) {
        super({ ...config, initiator: true });
        this.offer = null;
    }

    public async initate(): Promise<string> {
        const { sdp } = await this.once('signal');
        this.offer = sdp;
        this.event.emit('offer', this.offer);
        if (this.offer === null) {
            throw new Error('Unable to get offer');
        }
        return this.offer;
    }

    public accept(answer: string): void { 
        this.signal(answer, false);
        this.event.emit('accept', answer);
    }
}
