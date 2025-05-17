const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config({ path: './config.env' });

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(
  'mongodb+srv://fdmaloney:Apple-banana-1pear@cluster0.l5zk9ua.mongodb.net/syc?retryWrites=true&w=majority&appName=Cluster0',
  {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  }
);

let database;

module.exports = {
  connectToServer: () => {
    database = client.db('syc');
  },
  getDb: () => {
    return database;
  },
};
