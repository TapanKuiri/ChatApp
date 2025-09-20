import express from "express";
import { getMessages, sendMessageRest } from "../controllers/messageController.js";

const router = express.Router();

router.post("/getMessages", getMessages);
router.post("/send", sendMessageRest);

export default router;
