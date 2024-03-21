import { TodoWrapper } from "../components/todoList/TodoWrapper";
import Navigation from "../components/Utils/Navigation/Navigation";

export const TodoList = () => {
  return (
    <div>
      <h1 className="font-light text-4xl">
        To-Do List
      </h1>
      <TodoWrapper />
    </div>
  );
};
