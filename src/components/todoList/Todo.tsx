import { FaRegTrashCan } from "react-icons/fa6";

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  date?: string;
}

interface TodoProps {
  task: Task;
  deleteTask: (id: string) => void;
  toggleCompleted: (id: string) => void;
  timeFrame: string;
}

export const Todo = ({
  task,
  deleteTask,
  toggleCompleted,
  timeFrame,
}: TodoProps) => {
  return (
    <div className="p-2 m-2 rounded-md flex items-center justify-between hover:bg-gray-100 transition duration-300">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleCompleted(task.id)}
          className="mr-2"
        />
        <p
          className={`mr-2 ${
            task.completed ? "line-through text-gray-300" : ""
          }`}
        >
          {task.text}
        </p>
      </div>
      <div className="flex items-center ${task.completed ? 'line-through text-gray-300' : ''}">
        {timeFrame === "Today" ? <p></p> : <p className="mr-4">{task.date}</p>}
        <button type="button" onClick={() => deleteTask(task.id)}>
          <FaRegTrashCan />
        </button>
      </div>
    </div>
  );
};
