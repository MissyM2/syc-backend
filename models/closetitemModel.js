import mongoose from 'mongoose';

const closetitemSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    itemName: { type: String, required: true },
    seasons: { type: [String], required: true },
    size: { type: String, required: true },
    desc: { type: String, required: false },
    rating: { type: String, required: false },
    imageId: { type: String, required: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
);

const Closetitem = mongoose.model('Closetitem', closetitemSchema);

export default Closetitem;
