require('dotenv').config();
const connect = require('./connect.js');
const express = require('express');
const cors = require('cors');
const users = require('./routes/user.routes.js');
const closetitems = require('./routes/closetitem.routes.js');
const awsRoutes = require('./routes/aws.routes.js');
const multer = require('multer'); //to receive multi-part form data
const upload = multer();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(upload.any()); //from multer
app.use(users);
app.use(closetitems);
app.use(awsRoutes);

//const mongoose = require('mongoose');

//mongoose.connect(process.env.DATABASE_URL);
//const db = mongoose.connection;
//db.on('error', (error) => console.error(error));
//db.once('open', () => console.log('Connected to Database'));

//app.use('/syc/users', usersRouter);

//app.use('/syc/closetitems', closetitemsRouter);
app.listen(PORT, () => {
  connect.connectToServer();
  console.log(`Server is running on port ${PORT}`);
});
