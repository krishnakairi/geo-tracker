import SimplePeer from 'simple-peer';
import { v4 as uuidv4 } from 'uuid';
import { IPeerConfig } from './../constatnts';
import EventEmitter from 'eventemitter3';

export default class Peer {
    public peerId: string;
    public initiator: boolean;
    public peerInstance: SimplePeer.Instance;
    public event: EventEmitter;

    constructor(config: IPeerConfig) {
        this.peerId = uuidv4();
        this.initiator = config.initiator;
        this.event = new EventEmitter();

        this.peerInstance = new SimplePeer({
            stream: config.stream  || false,
            initiator: this.initiator,
            trickle: false,
            wrtc: config.wrtc
        });

        this.event.emit('created', this);

        this.peerInstance.on('connect', () => {
            this.event.emit('connect', this.peerInstance);
        })
    }

    public async destroy(): Promise<void> {
        this.peerInstance.removeAllListeners()
        await this.once('close');
        this.peerInstance.destroy();
        this.event.emit('close');
    }

    public async signal(data: any, waitForResponse?: boolean): Promise<any> {
        let response = null;
        this.peerInstance.signal(data);
        if (waitForResponse) {
            response = await this.once('signal')
        }
        return response;
    }

    public once(key: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.peerInstance.once(key, (response) => {
                resolve(response)
            });
            this.peerInstance.once('error', (error) => {
                reject(error);
                this.event.emit('error', error);
            });
        })
    }
}
