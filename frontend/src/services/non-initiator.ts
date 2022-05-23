import { INonInitiatorConfig } from "./../constatnts";
import Peer from "./peer";

export default class NonInitiator extends Peer {
    private answer: string | null;

    constructor(config: INonInitiatorConfig) {
        super({ ...config, initiator: false });
        this.answer = null;
    }

    public async request(offer: string): Promise<string> {
        const { sdp } = await this.signal(offer, true);
        this.answer = sdp;
        this.event.emit('answer', this);
        if (this.answer === null) {
            throw new Error('Unable to request');
        }
        return this.answer;
    }
}