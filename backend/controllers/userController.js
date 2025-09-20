import User from "../models/User.js";

export const loginUser = async (req, res) => {
  try {
    const { userId, password } = req.body;
    if (!userId || !password) {
      return res.status(400).json({ success: false, message: "Missing parameters" });
    }
    let code = null;

    // Check credentials
    if (userId === process.env.APPLICATION_ID && password === process.env.YOUR_PASSWORD) {
      code = 1234;
    } else if (userId === process.env.APPLICATION_ID && password === process.env.MY_PASSWORD) {
      code = 4321;
    } else {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // Ensure user exists in DB
    let user = await User.findById(userId);
    if (!user) {
      // user = new User({ _id: userId, messages: [] });
      // await user.save();
      // console.log("New user created:", userId);
      return res.status(400).json({ success: false, message: "User not found" });
    }

    return res.json({ success: true, message: code });
  } catch (err) {
    console.error("loginUser error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
