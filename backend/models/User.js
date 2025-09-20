import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  text: { type: String, required: true },
  code: { type: Number, required: true }, // sender code (143 or 431)
  createdAt: { type: Date, default: Date.now }
}, { _id: false });

const userSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // application userId
  createdAt: { type: Date, default: Date.now },
  messages: [messageSchema]
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
