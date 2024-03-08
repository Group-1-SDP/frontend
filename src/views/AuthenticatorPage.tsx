import { useRef, useState } from "react";
import Icon from "../components/Authenticator/Icon";
import Model from "../components/Utils/Model";
import Authenticator from "../components/Authenticator/Authenticator";

const AuthenticatorPage = () => {
  const canvasRef = useRef(null);

  return (
    <>
      <div className="relative z-10 pointer-events-none">
        <Icon />
        <div className="flex justify-center">
          <Authenticator />
        </div>
      </div>
      <canvas
        ref={canvasRef}
        className="absolute top-1/2 -translate-y-1/2 z-0"
      ></canvas>
      <Model
        canvasRef={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        zCamPosition={4}
        yCamPosition={1.5}
        FOV={50}
      />
    </>
  );
};

export default AuthenticatorPage;
