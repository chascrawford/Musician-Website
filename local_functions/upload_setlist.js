const fs = require('fs');
const { DynamoDBClient, PutItemCommand } = require('@aws-sdk/client-dynamodb');
const { v4: uuidv4 } = require('uuid');

const TABLE_NAME = 'www.chascrawford.com-setlist';
const client = new DynamoDBClient({ region: 'us-east-1' });

const setlist = JSON.parse(fs.readFileSync('../angular/src/assets/data/setlist.json', 'utf8'));

async function upload() {
  for (const [section, entries] of Object.entries(setlist)) {
    for (const entry of entries) {
      const item = {
        id: { S: uuidv4() },
        artist: { S: entry.artist },
        song: { S: entry.song },
        section: { S: section }
      };
      const command = new PutItemCommand({
        TableName: TABLE_NAME,
        Item: item
      });
      try {
        await client.send(command);
        console.log(`Uploaded: ${entry.artist} - ${entry.song} (${section})`);
      } catch (err) {
        console.error('Error uploading:', item, err);
      }
    }
  }
}

upload();
