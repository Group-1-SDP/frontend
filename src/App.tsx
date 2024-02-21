import { useState } from 'react'
import Authenticator from './views/Authenticator'
import MainPage from './views/MainPage'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TodoList } from './views/TodoList';
import Progress from './views/Progress';

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="todo" element={<TodoList/>}/>
        <Route path="progress" element={<Progress />}/>
      </Routes>
      
    </BrowserRouter>
    </>
  )
}

export default App
