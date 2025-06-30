import Closetitem from '../models/closetitemModel.js';

// #1 Retrieve All
//http://localhost:3000/syc/closetitems
const getAllClosetitems = async (req, res) => {
  // let db = database.getDb();

  // try {
  //   let collection = await db.collection('closetitems');
  //   let result = await collection.find({}).toArray();
  //   if (result.length > 0) {
  //     res.json(result);
  //   }
  // } catch (err) {
  //   res.status(500).json({ message: err.message });
  // }
  try {
    const closetitems = await Closetitem.find();
    console.log('closetitems are: ' + JSON.stringify(closetitems));
    res.json(closetitems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//#2 - Retrieve One
//http://localhost:3000/closetitems/12345
// const getClosetitem = async (req, res) => {
//   const query = { _id: new ObjectId(req.params.id) };
//   let db = database.getDb();

//   try {
//     let collection = await db.collection('closetitems');
//     let result = await collection.findOne(query);
//     if (result) {
//       res.json(result);
//     }
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

///#3 - Create one
const createClosetitem = async (req, res) => {
  const {
    category,
    name,
    season,
    size,
    desc,
    rating,
    dateCreated,
    imageId,
    user,
  } = req.body;

  const closetitemExists = await Closetitem.findOne({ name });

  if (closetitemExists) {
    res.status(404);
    throw new Error('Closetitem already exists');
  }

  const closetitem = await Closetitem.create({
    category,
    name,
    season,
    size,
    desc,
    rating,
    imageId,
    user,
  });

  if (closetitem) {
    res.status(201).json({
      category: closetitem.category,
      name: closetitem.name,
      season: closetitem.season,
      size: closetitem.size,
      desc: closetitem.desc,
      rating: closetitem.rating,
      imageId: closetitem.imageId,
      user: closetitem.user,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
};

///#4 - Update one
// const updateClosetitem = async (req, res) => {
//   const query = { _id: new ObjectId(req.params.id) };
//   const updates = {
//     $set: {
//       category: req.body.category,
//       name: req.body.name,
//       season: req.body.season,
//       size: req.body.size,
//       desc: req.body.desc,
//       rating: req.body.rating,
//     },
//   };

//   let db = database.getDb();

//   try {
//     let result = await db.collection('closetitems').updateOne(query, updates);
//     res.json(result);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

//#5 - Delete one
// const deleteClosetitem = async (req, res) => {
//   const query = { _id: new ObjectId(req.params.id) };
//   let db = database.getDb();

//   try {
//     const collection = db.collection('closetitems');
//     let result = await collection.deleteOne(query);
//     res.json(result);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

export {
  getAllClosetitems,
  //getClosetitem,
  createClosetitem,
  //updateClosetitem,
  //deleteClosetitem,
};
