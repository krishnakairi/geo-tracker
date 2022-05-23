export default {
  type: "object",
  properties: {
    peerId: { type: 'string' },
    offer: { type: 'string' }
  },
  required: ['peerId', 'offer']
} as const;
