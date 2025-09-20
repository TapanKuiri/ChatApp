import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './page/Login'
import Chat from './page/Chat'

const App = () => {
  return (
      
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/chat' element={<Chat />} />
      </Routes>
  )
}

export default App
