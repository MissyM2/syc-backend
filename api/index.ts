const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Express on Vercel');
});


const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log('Server ready on port 5001.'));

module.exports = app;
