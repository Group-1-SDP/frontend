import React, { useEffect, useState } from "react";
import { Slider, ThemeProvider, createTheme } from "@mui/material";
import InputSwitch from "../../Utils/ReusableComponents/InputSwitch";
import { useAtom } from "jotai";
import { APILink, userIDAtom } from "../../Utils/GlobalState";
import { motion } from "framer-motion";

interface StudyGoal {
  dailyStudyGoal: number;
  sessionStudyGoal: number;
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#046244",
    },
  },
});

const dailyStudyIncrements = [
  { value: 2.083, label: "10 mins" },
  { value: 12.5, label: "1 hr" },
  { value: 25, label: "2 hrs" },
  { value: 50, label: "4 hrs" },
  { value: 75, label: "6 hrs" },
  { value: 100, label: "8 hrs" },
];

const sessionStudyIncrements = [
  { value: 1.0415, label: "5 mins" },
  { value: 12.5, label: "1 hr" },
  { value: 25, label: "2 hrs" },
  { value: 37.5, label: "3 hrs" },
  { value: 50, label: "4 hrs" },
  { value: 100, label: "8 hrs" },
];

const StudyPlan: React.FC = () => {
  const [studyGoals, setStudyGoals] = useState<StudyGoal>({
    dailyStudyGoal: 25,
    sessionStudyGoal: 25,
  });

  const handleStudyChange = (
    goal: keyof StudyGoal,
    _: React.ChangeEvent<{}>,
    value: number | number[]
  ) => {
    setStudyGoals((prev) => ({ ...prev, [goal]: value as number }));
  };

  const [scheduleEnabled, setScheduleEnabled] = useState<boolean>(false);

  const [userID] = useAtom(userIDAtom);
  const [apiResponse, setApiResponse] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        APILink + "/api/" + userID + "/update-study-goals",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            daily_study_goal: studyGoals.dailyStudyGoal,
            session_study_goal: studyGoals.sessionStudyGoal,
            scheduling_enabled: scheduleEnabled,
          }),
        }
      );

      const data = await response.json();

      if (response.status === 200) {
        // Handle success
        console.log("Successfully updated study goals");
        setApiResponse("Successfully updated study goals!");
      } else {
        // Handle error
        console.error(data.message); // Log the error message
        setApiResponse("An error occurred: " + data.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setApiResponse("An error occurred: " + error);
    }
  };

  useEffect(() => {
    const fetchStudyGoals = async () => {
      if (userID) {
        const response = await fetch(
          APILink + "/api/" + userID + "/get-study-goals",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          return;
        }

        const apiResponse = await response.json();

        if (response.status !== 200) {
          console.log("Error fetching study goals:");
          return;
        }

        const data = apiResponse.study_goals;

        if (data) {
          setStudyGoals({
            dailyStudyGoal: data.daily_study_goal,
            sessionStudyGoal: data.session_study_goal,
          });

          setScheduleEnabled(data.scheduling_enabled);
        }
      }
    };

    fetchStudyGoals();
  }, [userID]);

  return (
    <ThemeProvider theme={theme}>
      <div className="w-full h-full flex flex-col items-center">
        <div className="w-[640px]">
          <div className="bg-gray-100 my-2 py-2 px-6 rounded-xl">
            <h1 className="text-xl font-bold py-2">Daily Study Goal</h1>
            <Slider
              className="w-[80%] m-auto"
              value={studyGoals.dailyStudyGoal}
              onChange={(_: any, value: any) =>
                handleStudyChange("dailyStudyGoal", _, value as number)
              }
              aria-label="Daily Study Goal"
              valueLabelDisplay="off"
              step={null}
              marks={dailyStudyIncrements}
              min={0}
              max={100}
              sx={{
                "& .MuiSlider-thumb": {
                  backgroundColor: "#046244",
                },
                "& .MuiSlider-track": {
                  backgroundColor: "#046244",
                },
                "& .MuiSlider-rail": {
                  backgroundColor: "#046244",
                },
              }}
            />
            <p>x1.25 XP Bonus if Goal Achieved.</p>
          </div>
          <div className="bg-gray-100 my-2 py-2 px-6 rounded-xl">
            <h1 className="text-xl font-bold py-2">Session Study Goal</h1>
            <Slider
              className="w-[80%] m-auto"
              value={studyGoals.sessionStudyGoal}
              onChange={(_: any, value: any) =>
                handleStudyChange("sessionStudyGoal", _, value as number)
              }
              aria-label="Session Study Goal"
              valueLabelDisplay="off"
              step={null}
              marks={sessionStudyIncrements}
              min={0}
              max={100}
              sx={{
                "& .MuiSlider-thumb": {
                  backgroundColor: "#046244",
                },
                "& .MuiSlider-track": {
                  backgroundColor: "#046244",
                },
                "& .MuiSlider-rail": {
                  backgroundColor: "#046244",
                },
                "&.MuiSlider-track-": {
                  backgroundColor: "#046244",
                },
              }}
            />
            <p>
              10 XP Bonus if Goal Achieved, 1.25X Bonus for up to 30 mins
              overtime. <br /> Completing a session will activate the dispenser!
            </p>
          </div>

          <div className="bg-gray-100 my-2 py-2 px-6 rounded-xl">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold py-2">Enable Schedule</h1>
              <InputSwitch
                value={scheduleEnabled}
                onChange={() => {
                  setScheduleEnabled(!scheduleEnabled);
                }}
              />
            </div>

            <p>Earn extra XP for following the schedule.</p>
          </div>
        </div>

        <button
          className="w-[640px]  bg-greenAccent py-3 px-4 flex justify-center items-center rounded-xl text-white"
          onClick={handleSubmit}
        >
          Update
        </button>
        <motion.div
          key="apiResponse"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          exit={{ opacity: 0, y: -20 }}
        >
          {apiResponse}
        </motion.div>
      </div>
    </ThemeProvider>
  );
};

export default StudyPlan;
