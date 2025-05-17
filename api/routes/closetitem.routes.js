const express = require('express');

const ObjectId = require('mongodb').ObjectId;
const Closetitem = require('../models/closetitem.model');

let closetitemRoutes = express.Router();

// Getting all
closetitemRoutes.get('/', async (req, res) => {
  //res.send('Hello World');
  try {
    const closetitem = await Closetitem.find();
    res.json(closetitem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting One
closetitemRoutes.get('closetitems/:id', getClosetitem, (req, res) => {
  res.json(res.closetitem.id);
});

// Creating one
closetitemRoutes.post('/', async (req, res) => {
  const closetitem = new Closetitem({
    category: req.body.category,
    name: req.body.name,
    season: req.body.season,
    size: req.body.size,
    season: req.body.desc,
    rating: req.body.rating,
  });
  try {
    const newClosetitem = await closetitem.save();
    res.status(201).json(newClosetitem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating One
closetitemRoutes.patch('closetitems/:id', getClosetitem, async (req, res) => {
  if (req.body.category != null) {
    res.closetitem.category = req.body.category;
  }
  if (req.body.name != null) {
    res.closetitem.name = req.body.name;
  }
  if (req.body.season != null) {
    res.closetitem.season = req.body.season;
  }
  if (req.body.size != null) {
    res.closetitem.size = req.body.size;
  }
  if (req.body.desc != null) {
    res.closetitem.desc = req.body.desc;
  }
  if (req.body.rating != null) {
    res.closetitem.rating = req.body.rating;
  }
  try {
    const updatedClosetitem = await res.closetitem.save();
    res.json(updatedClosetitem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting One
closetitemRoutes.delete('closetitems/:id', getClosetitem, async (req, res) => {
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
    console.log('this is closet item' + closetItem);
    if (closetitem == null) {
      return res.status(404).json({ message: 'Cannot find closetitem' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.closetitem = closetitem;
  next();
}

module.exports = closetitemRoutes;
