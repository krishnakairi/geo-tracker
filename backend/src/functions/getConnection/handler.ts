import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { DynamoDB } from 'aws-sdk';


const getConnection: ValidatedEventAPIGatewayProxyEvent<typeof Object> = async (event) => {
  const dynamoDB = new DynamoDB({
    region: 'us-east-1'
  });

  const result = await dynamoDB.getItem({
    TableName: 'ConnectionsTable',
    Key: {
      'id': {S: event.pathParameters.connectionId}
    },
  }).promise()

  return formatJSONResponse({ ... result });
};

export const main = middyfy(getConnection);
