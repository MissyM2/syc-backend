require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL);

mongosh "mongodb+srv://fdmclustersandbox.0zdlunl.mongodb.net/" --apiVersion 1 --username <db_username>

mongoose
  .connect('mongodb://0.0.0.0:27017/syc', {})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Connection error:', err));
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('MongoDB connection successful!');
});
db.on('disconnected', () => {
  console.log('MongoDB disconnected!');
});

// const cors = require('cors');

// var corsOptions = {
//   origin: 'http://localhost:3000',
// };

//app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
//app.use(express.urlencoded({ extended: true }));

const usersRouter = require('./routes/user.routes.js');
app.use('/users', usersRouter);

// simple route
// app.get('/', (req, res) => {
//   res.json({ message: 'Welcome to Thursday application.' });
// });

//require('./routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server ready on port ${PORT}.`));

module.exports = app;


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://<db_username>:<db_password>@fdmclustersandbox.0zdlunl.mongodb.net/?retryWrites=true&w=majority&appName=FDMClusterSandbox";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
