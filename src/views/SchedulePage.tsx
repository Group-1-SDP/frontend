import StudyPlan from "../components/SettingsPage/Tabs/StudyPlan";
import ScheduleWrapper from "../components/schedulePage/ScheduleWrapper";

function SchedulePage() {
  return (
    <div>
      <h1 className="font-light text-4xl">Schedule</h1>
      <ScheduleWrapper />
      <div className="">
        <h1 className="font-light text-4xl">Set Study Hours</h1>
        <div className="flex flex-start">
          <StudyPlan />
        </div>
      </div>
    </div>
  );
}

export default SchedulePage;
