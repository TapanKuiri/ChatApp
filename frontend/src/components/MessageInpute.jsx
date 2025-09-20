import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
import { MessageContext } from "../context/MessageContext";

const backend = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
const userId = import.meta.env.VITE_APPLICATION_ID || "123";
const socket = io("http://localhost:3000");

export default function MessageInput() {
  const { allMessages, setAllMessages, code } = useContext(MessageContext);
  const [text, setText] = useState("");

  const sendMessage = async () => {
    if (!text.trim()) return;
    const newMsg = { text, code , createdAt: new Date().toISOString() };

    setAllMessages((prev) => [...prev, { ...newMsg }]); // optimistic update
    socket.emit("send_message", newMsg);
    setText("");

    try {
      await axios.post(`${backend}/api/messages/send`, { userId, newMsg });
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setAllMessages((prev) => [...prev, { ...data }]);
    });

    return () => socket.off("receive_message");
  }, []);

  return (
    <div className="p-3 bg-gray-400 flex gap-2 items-center">
      <textarea
        onChange={(e) => setText(e.target.value)}
        value={text}
        className="flex-1 border rounded p-2 resize-none bg-white"
        rows={1}
        placeholder="Type a message"
      />
      <button onClick={sendMessage} className="bg-blue-600 text-white px-4 py-2 rounded">
        Send
      </button>
    </div>
  );
}
