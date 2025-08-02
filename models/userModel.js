import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
//import Closetitem from '../models/closetitemModel.js';

const homeAddressSchema = new mongoose.Schema(
  {
    street1: { type: String, required: true },
    street2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  {
    _id: false,
  }
);

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    homeAddress: homeAddressSchema,
    password: { type: String, required: true },
    profileImageId: { type: String, required: false },
    profileImageUrl: { type: String, required: true },
    closetitems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Closetitem' }],
    userRole: { type: String, enum: ['user', 'admin'], default: 'user' },
  },
  {
    timestamps: true,
  }
);

// hash user's password with salt before saving document to db
userSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// extend matchPassword function unto userSchema
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
