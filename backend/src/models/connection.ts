import * as dynamoose from "dynamoose";

const ConnectionSchema = new dynamoose.Schema({
    "id": {
        type: String,
        "hashKey": true
    },
    "peerId": String,
    "offer": String,
    "answer": String,
}, { timestamps: true });

// auto delete connection items after 5 mins
const TTL = 10 * 60
const expiresConfig = { 
    expires: { 
        ttl: TTL,
        attribute: 'ttl' 
    } 
}

const Connections = dynamoose.model('Connections', ConnectionSchema, expiresConfig);

export default Connections;
