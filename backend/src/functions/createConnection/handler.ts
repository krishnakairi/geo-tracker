import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { v4 as uuidv4 } from 'uuid';
import Connections from './../../models/connection';
import schema from './schema';

const createConnection: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const { peerId, offer } = event.body;
  const connectionId = uuidv4();
  try {
    const newConnection = new Connections({
      id: connectionId,
      peerId: peerId,
      offer: offer
    });
    await newConnection.save()
    return formatJSONResponse({ connectionId, status: true, error: null });
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ connectionId, status: false, error })
    }
  }
};

export const main = middyfy(createConnection);
