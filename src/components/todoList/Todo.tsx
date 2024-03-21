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

function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function getDayDescription(dateString: string): string {
  // Convert the date string to a Date object
  const date = new Date(dateString);

  // Get the current date
  const currentDate = new Date();

  // Set the time of currentDate to 00:00:00 to compare only the dates
  currentDate.setHours(0, 0, 0, 0);

  // Get the date for tomorrow
  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  tomorrowDate.setHours(0, 0, 0, 0);

  // Compare the dates
  if (date.getTime() === currentDate.getTime()) {
    return "Today"; // Date is today
  } else if (date.getTime() === tomorrowDate.getTime()) {
    return "Tomorrow"; // Date is tomorrow
  } else {
    return formatDate(date); // Date is neither today nor tomorrow
  }
}

export const Todo = ({
  task,
  deleteTask,
  toggleCompleted,
  timeFrame,
}: TodoProps) => {
  return (
    <div className="p-2 my-4 rounded-md flex items-center justify-between bg-white hover:bg-gray-100 transition duration-300">
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
        {timeFrame === "Today" || typeof task.date === "undefined" ? (
          <p></p>
        ) : (
          <p className="mr-4">{getDayDescription(task.date)}</p>
        )}
        <button type="button" onClick={() => deleteTask(task.id)}>
          <FaRegTrashCan />
        </button>
      </div>
    </div>
  );
};
