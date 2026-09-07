import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";

const TABLE_NAME = process.env.TABLE_NAME;
const client = new DynamoDBClient({});

export const handler = async (event) => {
  try {
    const command = new ScanCommand({ TableName: TABLE_NAME });
    const data = await client.send(command);
    // Convert DynamoDB attribute values to plain JS objects
    const cleaned = data.Items.map(item => ({
      artist: item.artist?.S || '',
      song: item.song?.S || '',
      section: item.section?.S || ''
    }));
    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify(cleaned),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: err.message }),
    };
  }
};
