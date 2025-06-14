const express = require('express');
const router = express.Router();

router.get('/api/register', (req, res) => {
  res.send('List of users');
});

module.exports = router;
