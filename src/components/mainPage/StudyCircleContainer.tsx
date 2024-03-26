import { ActivityRings } from "@jonasdoesthings/react-activity-rings";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import {
  APILink,
  studyGoalSessionAtom,
  studyTimeSessionAtom,
  userIDAtom,
} from "../Utils/GlobalState";
import { phoneConnectedState, phoneConnectedTime } from "../../App";
import { SiHotjar } from "react-icons/si";

function StudyCircleContainer() {
  const [studyGoalSession] = useAtom(studyGoalSessionAtom);
  const [userID] = useAtom(userIDAtom);
  const [studyTimeSession, setStudyTimeSession] = useAtom(studyTimeSessionAtom);


  function convertMinutesToHHMM(seconds: number) {
    
    const minutes = Math.floor(seconds / 60);

    var hours = Math.floor(minutes / 60);
    var remainingMinutes = minutes % 60;

    var hoursString = hours.toString().padStart(2, "0");
    var minutesString = remainingMinutes.toString().padStart(2, "0");

    return hoursString + "hrs " + minutesString + "mins";
  }

  function percentageToHHMM(percent: number) {
    // Calculate total minutes in 8 hours
    const totalMinutes = 8 * 60;

    // Calculate the minutes based on the percentage
    const minutes = Math.round(totalMinutes * (percent / 100));

    // Calculate hours and remaining minutes
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    // Format the hours without leading zero if less than 10
    const formattedHours =
      hours < 10 ? String(hours) : String(hours).padStart(2, "0");

    // Format the minutes
    const formattedMinutes = String(remainingMinutes).padStart(2, "0");

    return `${formattedHours}hrs ${formattedMinutes}mins`;
  }

  // calculate the time in minutes + hours since the boxTime atom
  const calculateTimeSinceBoxTime = (boxTime: string) => {
    if (boxTime === "" || boxTime === undefined) {
      return { hours: 0, minutes: 0 };
    }
    const [datePart, timePart] = boxTime.split(", ");
    const [day, month, year] = datePart.split("/").map(Number);
    const [hour, minute, second] = timePart.split(":").map(Number);

    // Create a new Date object
    // Note: Month is 0-based in JavaScript's Date object
    const boxDate = new Date(year, month - 1, day, hour, minute, second);
    const currentDate = new Date();
    const diff = currentDate.getTime() - boxDate.getTime();
    const minutes = Math.floor(diff / 1000 / 60);
    const hours = Math.floor(minutes / 60);
    return { hours, minutes };
  };

  const [phoneConnected] = useAtom(phoneConnectedState);
  const [boxTime] = useAtom(phoneConnectedTime);
  const [phoneBoxTime, setPhoneBoxTime] = useState("0hrs 0mins");
  const [progress, setProgress] = useState(0);
  const [dispense, setDispense] = useState(0);

  useEffect(() => {
    if (phoneConnected) {
      const { hours, minutes } = calculateTimeSinceBoxTime(boxTime);
      setPhoneBoxTime(`${hours}hrs ${minutes}mins`);
      const totalMins = hours * 60 + minutes;
      setProgress(totalMins / ((studyGoalSession / 100) * 480));
      console.log(progress)
      
    } else {
      setStudyTimeSession(0);
      setProgress(0);
    }
  }, [phoneConnected, studyGoalSession, phoneBoxTime, progress]);

  // rerender every 1 minute if phone is connected
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (phoneConnected) {
      console.log("phone connected");
      interval = setInterval(() => {
        setStudyTimeSession((prevStudyTimeSession) => prevStudyTimeSession + 1); // Increment studyTimeSession by 1
      }, 1000);

    }

    return () => clearInterval(interval); // Cleanup function clears the interval when component unmounts or phoneConnected becomes false
  }, [phoneConnected]);

  useEffect(() => {
    setProgress((studyTimeSession / 60) / ((studyGoalSession / 100) * 480));
    // if (progress >= 0.1 && dispense === 0) {
    //   // emit socketio "task-complete"
    //   fetch(APILink + "/websocket/study-goal-reached", {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
    //   setDispense(1);
    // }
  }, [studyTimeSession, studyGoalSession]);

    

  return (
    <div className="w-[400px] h-[420px] shadow-md rounded-2xl">
      <div className=" px-5">
        <h1 className="text-xl font-bold">Current Study Session:</h1>
        <div className={`mt-[-30px] ${phoneConnected && "animate-pulse"}`}>
          <ActivityRings
            rings={[{ filledPercentage: progress, color: "#046244" }]}
          />
        </div>
        <div className=" flex justify-between">
          <div>
            <h1 className="text-xl font-bold">
              {percentageToHHMM(studyGoalSession)}
            </h1>
            <div className="flex items-center space-x-1">
              <div className="bg-[#9BC0B4] w-[15px] h-[15px] rounded-full"></div>
              <h2 className="text-[16px]">Goal</h2>
            </div>
          </div>
          <div className="text-right">
            <h1 className="text-xl font-bold">
              {convertMinutesToHHMM(studyTimeSession)}
            </h1>
            <div className="flex items-center space-x-1 justify-end">
              <h2 className="text-[16px]">This session</h2>
              <div className="bg-greenAccent w-[15px] h-[15px] rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudyCircleContainer;
