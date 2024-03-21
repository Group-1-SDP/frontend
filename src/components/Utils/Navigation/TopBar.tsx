import { usernameAtom } from "../GlobalState";
import { useAtom } from "jotai";
import { CiCircleChevDown } from "react-icons/ci";
import UserDisplay from "../ReusableComponents/UserDisplay";

function topBar() {
  const [username] = useAtom(usernameAtom);
  return (
    <div className=" flex justify-end pr-4 w-full h-16 pt-2">
      <UserDisplay />
    </div>
  );
}

export default topBar;
