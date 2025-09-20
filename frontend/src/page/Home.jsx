// Home.jsx
import React from 'react'
import { ChatPage } from './ChatPage'
import { Message } from '../components/Message'

export const Home = () => {
  return (
    <div className="flex flex-col h-[80%]">
      {/* Chat area */}
      <div className="flex-1 overflow-y-auto">
        <ChatPage />
      </div>

      {/* Message box at bottom */}
      <Message />
    </div>
  )
}
