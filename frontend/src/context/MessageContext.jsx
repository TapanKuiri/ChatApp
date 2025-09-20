import React, { useEffect, useState, createContext } from "react";
import axios from "axios";

const backend = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
const userId = import.meta.env.VITE_APPLICATION_ID || "123";

export const MessageContext = createContext();

export const MessageContextProvider = (props) => {
  const [allMessages, setAllMessages] = useState([]);
  const [code, setCode] = useState(null);

  const getAllMessages = async () => {
    try {
      const res = await axios.post(`${backend}/api/messages/getMessages`, { userId });
      if (res.data.success) {
        setAllMessages(res.data.messages);
      }
    } catch (err) {
      console.log("Error fetching messages:", err);
    }
  };

  useEffect(() => {
    getAllMessages();
  }, []);

  return (
    <MessageContext.Provider value={{ allMessages, setAllMessages, code, setCode }}>
      {props.children}
    </MessageContext.Provider>
  );
};
