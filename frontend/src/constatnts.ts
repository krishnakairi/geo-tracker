export interface IInitiatorConfig {
    stream?: any;
    wrtc?: any;
}

export interface INonInitiatorConfig {
    stream?: any;
    wrtc?: any;
}

export interface IPeerConfig {
    stream?: any;
    initiator: boolean;
    wrtc?: any;
}

export interface IConnection {
    id?: string;
    offer?: string;
    answer?: string;
    peerId?: string;
    created_at?: string;
    expire_at?: string;
}
