import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // chat room / owner id
  senderId: { type: String, required: true }, // who sent it (same as userId in your use-case or "me")
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Message = mongoose.models.Message || mongoose.model("Message", messageSchema);
export default Message;
