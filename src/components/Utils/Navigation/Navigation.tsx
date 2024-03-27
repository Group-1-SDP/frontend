import React, { useEffect } from "react";
import TopBar from "./TopBar";
import NavBar from "./NavBar";

type NavigationProps = {
  paddingLeft?: number;
};

function Navigation({ paddingLeft }: NavigationProps) {

  useEffect( () => {

  }, [])
  return (
    <>
      <div>
        <TopBar />
        <NavBar paddingLeft={paddingLeft} />
      </div>
    </>
  );
}

export default Navigation;
