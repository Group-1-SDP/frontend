import React from "react";
import TopBar from "../Utils/Navigation/TopBar.tsx";
import ModuleCodeInput from "./ModuleCodeInput.tsx";
import ModuleWrapper from "./ModuleWrapper.tsx";

function ModulesPage() {
  return (
    <div>
      <TopBar />
      <div className="flex justify-center items-center">
        <div className="flex space-x-40">
          <ModuleWrapper />
        </div>
      </div>
    </div>
  );
}

export default ModulesPage;
