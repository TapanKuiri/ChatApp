import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./config/mongoDB.js";
import messageRouter from "./routes/messageRouter.js";
import userRouter from "./routes/userRouter.js";
import "dotenv/config";

const app = express();
const server = http.createServer(app);

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/messages", messageRouter);
app.use("/api/users", userRouter);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  }
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("send_message", (data) => {
    console.log("Socket message:", data);
    socket.broadcast.emit("receive_message", data);
  });
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
