import { useRef, useState } from "react";
import Icon from "../components/Authenticator/Icon";
import Model from "../components/Utils/Model";
import Authenticator from "../components/Authenticator/Authenticator";

const AuthenticatorPage = () => {
  const canvasRef = useRef(null);

  return (
    <>
      <div className="">
        <Authenticator />
      </div>
      {/* <canvas
        ref={canvasRef}
        className="absolute top-1/2 -translate-y-1/2 z-0"
      ></canvas>
      <Model
        canvasRef={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        zCamPosition={4}
        yCamPosition={1.5}
        FOV={75}
        rotateY={-2.3}
        mirror={true}
      /> */}
    </>
  );
};

export default AuthenticatorPage;
