import mongoose from "mongoose";

const schema = mongoose.Schema;

const userSchema = new schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    repeat_password: { type: String, required: true },
    role: { type: String, default: "'customer'" },
  },
  { timestamps: true }
);


export default mongoose.model('User', userSchema, 'users')