import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatArea from "../components/ChatArea";
import MessageInput from '../components/MessageInpute';
import Navbar from "../components/Navbar";

const A_ID = Number(import.meta.env.VITE_A_ID);
const T_ID = Number(import.meta.env.VITE_T_ID);

import { MessageContext } from "../context/MessageContext";

function Chat() {
  const { code } = useContext(MessageContext);
  const navigate = useNavigate();
  const chatContainerRef = useRef(null);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    if (code !== A_ID && code !== T_ID) {
      navigate("/login");
    }
  }, [code, navigate]);

  // Handle keyboard on mobile
  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col h-screen relative">
      <Navbar />
      <div
        ref={chatContainerRef}
        style={{ height: windowHeight - 56 }} // 56px for Navbar
        className="bg-slate-300 flex flex-col mb-15 mt-12 overflow-hidden"
      >
        <div className="flex-1 overflow-y-auto p-4">
          <ChatArea />
        </div>
        <div className="w-full">
          <MessageInput />
        </div>
      </div>
    </div>
  );
}

export default Chat;
