import Closetitem from '../models/closetitemModel.js';
import User from '../models/userModel.js';

// #1 Retrieve All (for admin only) (add group by)
const getAllClosetitems = async (req, res) => {
  try {
    const closetitems = await Closetitem.find().populate(
      'userId',
      'userName email'
    );
    console.log('closetitems are: ' + JSON.stringify(closetitems));
    res.json(closetitems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// #1 Retrieve All (for admin only) (add group by)
const getClosetitemsByUserId = async (req, res) => {
  console.log('must fix this to get user items');
  try {
    const userId = req.params.userId;
    console.log('getClosetitemsByUserId:what is req.params.userId ' + userId);
    const closetitems = await Closetitem.find({ user: userId });
    res.status(200).json({ closetitems });
  } catch (err) {
    console.log(err);
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
  try {
    const { category, itemName, seasons, size, desc, rating, imageId, userId } =
      req.body;
    console.log('createclosetitem:req.body ' + JSON.stringify(req.body));

    const closetitemExists = await Closetitem.findOne({ itemName });
    console.log('createclosetitem: exists ' + closetitemExists);

    if (closetitemExists) {
      res.status(404);
      throw new Error('Closetitem already exists');
    }

    const newClosetitem = new Closetitem({
      category,
      itemName,
      seasons,
      size,
      desc,
      rating,
      imageId,
      userId,
    });

    console.log(
      'createclosetitem:newClosetiem ' + JSON.stringify(newClosetitem)
    );

    const savedClosetitem = await newClosetitem.save();
    console.log(
      'createclosetitem:savedClosetiem ' + JSON.stringify(savedClosetitem)
    );

    // Update the user's closetitems array
    await User.findByIdAndUpdate(
      userId,
      {
        $push: { closetitems: savedClosetitem._id },
      },
      { new: true }
    );

    res.status(201).json(savedClosetitem);
  } catch (error) {
    res.status(500);
    throw new Error({ message: error.message });
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
  getClosetitemsByUserId,
  //getClosetitem,
  createClosetitem,
  //updateClosetitem,
  //deleteClosetitem,
};
