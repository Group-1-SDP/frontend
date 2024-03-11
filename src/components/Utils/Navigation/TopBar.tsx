import { usernameAtom } from "../GlobalState";
import { useAtom } from "jotai";
import { CiCircleChevDown } from "react-icons/ci";

function topBar() {
  const [username] = useAtom(usernameAtom);
  return (
    <div className="flex justify-end pr-48 pt-3 w-full h-16">
      <div className="flex items-center space-x-4">
        <img className="rounded-full" src="https://placehold.co/55x55" />
        <div className="flex flex-col font-semibold">
          <h1>{username}</h1> <h1>level 0</h1>
        </div>
        <CiCircleChevDown size={30} />
      </div>
    </div>
  );
}

export default topBar;
