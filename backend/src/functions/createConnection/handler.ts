import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { DynamoDB } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

import schema from './schema';

const createConnection: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const dynamoDB = new DynamoDB({
    region: 'us-east-1'
  });

  const connectionId = uuidv4();

  await dynamoDB.putItem({
    TableName: 'ConnectionsTable',
    Item: {
      id: { S: connectionId },
      peerId: { S: event.body.peerId },
      offerId: { S: event.body.offer },
      created_at: { S: new Date().getTime().toString() },
    }
  }).promise()

  return formatJSONResponse({ connectionId });
};

export const main = middyfy(createConnection);
