import React, { useState } from "react";
import { Slider, ThemeProvider, createTheme } from "@mui/material";
import InputSwitch from "../../Utils/ReusableComponents/InputSwitch";

interface StudyGoal {
  dailyStudyGoal: number;
  sessionStudyGoal: number;
}

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

  const [scheduleEnabled, setScheduleEnabled] = useState<boolean>(true);

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
      </div>
    </ThemeProvider>
  );
};

export default StudyPlan;
