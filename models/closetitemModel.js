import mongoose from 'mongoose';

const closetitemDetailsSchema = new mongoose.Schema({
  category: { type: String, required: true },
  seasons: { type: [String], required: true },
  size: { type: String, required: true },
  color: { type: String, required: true },
  occasion: { type: String, required: true },
});

const closetitemSchema = new mongoose.Schema(
  {
    closetType: {
      type: String,
      enum: ['personal', 'personalOnly', 'donation', 'sharing'],
      default: 'personal',
    },

    itemName: { type: String, required: true },
    itemDetails: { type: closetitemDetailsSchema, required: true },
    desc: { type: String, required: false },
    rating: { type: String, required: false },
    imageId: { type: String, required: false },
    imageUrl: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
);

const Closetitem = mongoose.model('Closetitem', closetitemSchema);

export default Closetitem;
