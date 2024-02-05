import { useState } from "react";
import Authenticator from "./views/Authenticator";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./views/MainPage";
import { TodoList } from "./views/TodoList";

function App() {
  const [authenticated, setAuthenticated] = useState(true);

  return (
    <BrowserRouter>
      <Routes>
        {!authenticated ? <Route path="/" element={<Authenticator />} /> : <Route path="/" element={<MainPage />} />}
        <Route path="todo" element={<TodoList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
