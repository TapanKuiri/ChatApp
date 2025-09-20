import React from "react";

export default function Navbar({ userId, onMarkRead }) {
  return (
    <div className="bg-gray-400 shadow p-3 flex items-center justify-between fixed top-0 left-0 right-0">
      <div className="font-semibold">  —  </div>
      <div className="flex items-center gap-3">
        {/* <button
          onClick={onMarkRead}
          className="bg-green-600 text-white px-3 py-1 rounded"
        > */}
          {/* Mark as read */}
        {/* </button> */}
      </div>
    </div>
  );
}
