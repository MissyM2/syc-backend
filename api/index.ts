require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(cors());
app.use(express.json());

const usersRouter = require('./routes/user.routes');
app.use('/syc/users', usersRouter);
const closetitemsRouter = require('./routes/closetitem.routes');
app.use('/syc/closetitems', closetitemsRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server Started on ${PORT}`));
