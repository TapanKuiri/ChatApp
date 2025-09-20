import React, { useEffect, useRef, useContext } from "react";
import { MessageContext } from "../context/MessageContext";

export default function ChatArea() {
  const { allMessages, code } = useContext(MessageContext);
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessages]);

  return (
    <div className="space-y-3">
      {allMessages.map((m, i) => {
        const isMyMessage = m.code === code;
        const time = new Date(m.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        return (
          <div key={i} className="flex flex-col">
            <div
              className={`p-3 rounded shadow-sm max-w-xs ${
                isMyMessage
                  ? "bg-blue-500 text-white ml-auto text-right"
                  : "bg-white text-black mr-auto text-left"
              }`}
            >
              <div>{m.text}</div>
              <div
                className={`text-xs mt-1 ${
                  isMyMessage ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {time}
              </div>
            </div>
          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
}
