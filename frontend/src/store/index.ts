import create from 'zustand';
import produce from 'immer';
import Connector from '../services/connector';

const connector = new Connector();

const useStore = create(set => {
    // set connection state
    const setConnection = (id:string | null, changes:any) => set(produce((draft: any) => {
        if (id === null) {
            draft.connections.push({ id, ...changes })
        } else {
            const index = draft.connections.findIndex((conn: any) => conn.id === id);
            draft.connections[index] = { ...draft.connections[index], ...changes }
        }
    }));
    
    return {
        intiated: false,
        peerId: null,
        offer: null,
        init: async (initator: boolean) => {
            const { peerId, offer } = await connector.init(initator);
            set(produce((draft: any) => {
                draft.peerId = peerId;
                draft.offer = offer;
                draft.intiated = true;
            }))
        },
        connections: [],
        createConnection: async() => {    
            const connection = await connector.newConnection();
            try {
                setConnection(null, { ...connection, loading: true, connected: false });
                setConnection(connection.id, { loading: false });
            } catch(err) {
                setConnection(connection.id, { loading: false, error: err});
            }
        }
    }
})

export default useStore;
