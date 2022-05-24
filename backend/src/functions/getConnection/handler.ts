import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import Connections from './../../models/connection';

const getConnection: ValidatedEventAPIGatewayProxyEvent<typeof Object> = async (event) => {
  const { connectionId } = event.pathParameters;
  try {
    const connection = await Connections.get(connectionId);
    return formatJSONResponse({ ...connection });
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ connectionId, status: false, error })
    }
  }
};

export const main = middyfy(getConnection);
