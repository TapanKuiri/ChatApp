import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatArea from "../components/ChatArea";
// import {MessageInput} from "../components/MessageInput";
import MessageInput from '../components/MessageInpute'
const A_ID = Number(import.meta.env.VITE_A_ID);
const T_ID = Number(import.meta.env.VITE_T_ID);
import Navbar from "../components/Navbar";

import { MessageContext } from "../context/MessageContext";

function Chat() {
  const { code } = useContext(MessageContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (code !== A_ID  && code !== T_ID) {
      console.log(code, A_ID, T_ID);
      navigate("/login");
    }
  }, [code, navigate]);

  // if (code !== A_ID && code !== T_ID) return null;

  return (
     <div className="flex flex-col h-screen relative">

    <Navbar/>
    <div className="min-h-screen bg-slate-300 flex flex-col mb-15 mt-12">
      <div className="flex-1 overflow-y-auto p-4 mt-10">
        <ChatArea />
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg">
        <MessageInput />
      </div>
    </div>
     </div>
  );
}

export default Chat;
