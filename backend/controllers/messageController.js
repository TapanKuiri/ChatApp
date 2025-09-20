import User from "../models/User.js";

// fetch all messages
export const getMessages = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ success: false, message: "Missing userId" });

    let user = await User.findById(userId);
    if (!user) {
      // create empty user doc if not exists
      user = await User.create({ _id: userId, messages: [] });
    }

    res.json({ success: true, messages: user.messages });
  } catch (err) {
    console.error("Error in getMessages:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// send new message
export const sendMessageRest = async (req, res) => {
  try {
    const { userId, newMsg } = req.body;
    console.log("Received newMsg:", newMsg);
    const { text, code } = newMsg || {};

    if (!userId || !text || !code) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    let user = await User.findById(userId);
    // console.log(user);
    if (!user) {
      // user = await User.create({ _id: userId, messages: [] });
      return res.status(400).json({ success: false, message: "User not found" });
    }

    user.messages.push({ text, code });
    await user.save();

    res.json({ success: true, message: "Message saved" });
  } catch (err) {
    console.error("Error in sendMessageRest:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
