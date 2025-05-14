const express = require('express');
const cors = require('cors');

var corsOptions = {
  origin: 'http://localhost:3000',
};

const app = express();

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Missy Maloney application.' });
});

require('./routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('Server ready on port {PORT}.'));

module.exports = app;
