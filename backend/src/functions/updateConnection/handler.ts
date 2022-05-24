import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import Connections from './../../models/connection';
import schema from './schema';

const updateConnection: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const { answer } = event.body;
  const { connectionId } = event.pathParameters;
  try {
    const connection = await Connections.get(connectionId);
    connection.answer = answer;
    await connection.save()
    return formatJSONResponse({ connectionId, status: true, error: null });
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ connectionId, status: false, error })
    }
  }
};

export const main = middyfy(updateConnection);
