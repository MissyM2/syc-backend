const express = require('express');
const router = express.Router();
const Closetitem = require('../models/closetitem.model');

// Getting all
router.get('/', async (req, res) => {
  //res.send('Hello World');
  try {
    const closetitem = await Closetitem.find();
    res.json(closetitem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting One
router.get('closetitems/:id', getClosetitem, (req, res) => {
  res.json(res.closetitem._id);
});

// Creating one
router.post('/', async (req, res) => {
  const closetitem = new Closetitem({
    name: req.body.name,
    emailAddress: req.body.emailAddress,
  });
  try {
    const newClosetitem = await closetitem.save();
    res.status(201).json(newClosetitem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating One
router.patch('closetitems/:id', getClosetitem, async (req, res) => {
  if (req.body.name != null) {
    res.subscriber.name = req.body.name;
  }
  if (req.body.email != null) {
    res.closetitem.email = req.body.emailAddress;
  }
  try {
    const updatedClosetitem = await res.closetitem.save();
    res.json(updatedClosetitem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting One
router.delete('closetitems/:id', getClosetitem, async (req, res) => {
  //res.send(res.closetitem._id);

  try {
    await Closetitem.deleteOne(res.closetitem._id);
    res.json({ message: 'Deleted Closetitem' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getClosetitem(req, res, next) {
  let closetitem;
  try {
    closetitem = await Closetitem.findById(req.params.id);
    if (closetitem == null) {
      return res.status(404).json({ message: 'Cannot find closetitem' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.closetitem = closetitem;
  next();
}

module.exports = router;
