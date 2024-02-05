import { useState } from 'react';
import MainPage from './views/MainPage';
import UserMenu from './components/mainPage/TopBar';
import { TodoList } from './views/TodoList';

function App() {

  return (
    <>
      <div>
        <TodoList /> 
      </div>
    </>
  )
}

export default App
