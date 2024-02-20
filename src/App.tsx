import { useState } from 'react'
import Authenticator from './views/Authenticator'
import MainPage from './views/MainPage'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TodoList } from './views/TodoList';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const topTodoItem = atomWithStorage('topTodo', "");
export const authenticated = atomWithStorage('userAuth', false);

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="todo" element={<TodoList/>}/>
      </Routes>
      
    </BrowserRouter>
    </>
  )
}

export default App
