import React, { useState, useContext, useEffect, useRef } from "react";
import axios from "axios";
import io from "socket.io-client";
import { MessageContext } from "../context/MessageContext";

const backend = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
const userId = import.meta.env.VITE_APPLICATION_ID || "123";
const socket = io("http://localhost:3000");

export default function MessageInpute() {
  const { allMessages, setAllMessages, code } = useContext(MessageContext);
  const [text, setText] = useState("");
  const inputRef = useRef(null);

  const sendMessage = async () => {
    if (!text.trim()) return;
    const newMsg = { text, code, createdAt: new Date().toISOString() };

    setAllMessages((prev) => [...prev, { ...newMsg }]); // optimistic update
    socket.emit("send_message", newMsg);
    setText("");
    if (inputRef.current) inputRef.current.style.height = "auto"; // reset height

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

  const handleFocus = () => {
    setTimeout(() => {
      inputRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 300);
  };

  const handleInput = (e) => {
    setText(e.target.value);
    e.target.style.height = "auto"; // reset height
    e.target.style.height = `${e.target.scrollHeight}px`; // set to scrollHeight
  };

  return (
    <div className="p-2 bg-gray-400 flex gap-2 items-center sticky bottom-0 z-50">
      <textarea
        ref={inputRef}
        onFocus={handleFocus}
        onInput={handleInput}
        value={text}
        className="flex-1 border rounded-xl px-3 py-2 resize-none bg-white focus:outline-none focus:ring-1 focus:ring-blue-400"
        placeholder="Type a message"
      />
      <button
        onClick={sendMessage}
        className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
      >
        Send
      </button>
    </div>
  );
}
