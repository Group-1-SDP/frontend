import { useState } from "react";

interface ScheduleFormProps {
  addEvent: (name: string, slot: string, color: string) => void;
}

// const colorDefault = {
//   greenAccent: false,
//   yellowAccent: false,
//   blueAccent: false,
//   redAccent: false,
//   blackAccent: false,
//   greyAccent: false,
// };

function ScheduleForm({ addEvent }: ScheduleFormProps) {
  const [name, setName] = useState("");
  const [hours, setHours] = useState("");
  const [color, setColor] = useState("project-1");

  //   const [color, setColor] = useState<{ [key: string]: boolean }>(colorDefault);

  //   const getSelectedColor = (): string => {
  //     let selectedColor = Object.keys(color).find((c) => color[c]);
  //     if (selectedColor === undefined) {selectedColor = "greyAccent"}
  //     return selectedColor;
  //   };

  //   const selectColor = (colorValue: string) => {
  //     if (!color.hasOwnProperty(colorValue)) {
  //       return;
  //     }
  //     const updatedColor = Object.fromEntries(
  //       Object.entries(color).map(([key]) => [key, key === colorValue])
  //     );
  //     setColor(updatedColor);
  //   };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !hours.trim()) {
      return;
    }
    const hoursNumber = parseInt(hours);
    if (isNaN(hoursNumber) || hoursNumber < 0 || hoursNumber > 23) {
      return;
    }
    console.log(`Adding Event "${name}", "${hours}:00", "${color}"...`);
    addEvent(name, `${hours}:00`, color);
    setName("");
    setHours("");
    setColor("project-1");
  };

  return (
    <div className="p-4 my-4 rounded-xl flex items-center hover:shadow-xl shadow-sm transition duration-300 bg-white">
      <form
        action=""
        className="flex flex-col"
        onSubmit={handleSubmit}
        style={{ width: "100%" }}
      >
        <input
          type="text"
          className="outline-none mb-2"
          placeholder="What do you want to get done?"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="flex items-center">
          <input
            type="text"
            className="outline-none mb-2 w-6 text-center mr-1"
            placeholder="00"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
          />
          :<p className="w-6 text-center ml-1">00</p>
        </div>
        <select value={color} onChange={(e) => setColor(e.target.value)} className={`my-2`}>
          <option value="break">Grey</option>
          <option value="project-1">Green</option>
          <option value="project-2">Yellow</option>
          <option value="project-3">Blue</option>
          <option value="project-4">Red</option>
          <option value="project-5">Black</option>
        </select>
        {/* <div className="flex flex-row">
            {Object.keys(color).map((colorValue) => (
            <input
                type="checkbox"
                id={colorValue}
                checked={color[colorValue]}
                onChange={() => selectColor(colorValue)}
                className={`my-2 mr-2 p-2 outline-green-400 checked:bg-green-600`}
            />
            ))}
        </div> */}
        <button
          type="submit"
          className="p-2 bg-greenAccent text-white font-bold rounded-md hover:bg-green-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default ScheduleForm;
