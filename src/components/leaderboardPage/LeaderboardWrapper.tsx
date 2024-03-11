import { useState } from "react";
import DropdownSwitcher from "../Utils/DropdownSwitcher";
import Podium from "./Podium";
import Leaderboard from "../Utils/Leaderboard/Leaderboard";

const friends = [
  { username: "Arsenal", points: 64, currentUser: false },
  { username: "Liverpool", points: 64, currentUser: false },
  { username: "Man City", points: 63, currentUser: false },
  { username: "Aston Villa", points: 55, currentUser: false },
  { username: "Tottenham", points: 53, currentUser: false },
  { username: "Man United", points: 47, currentUser: false },
  { username: "West Ham", points: 43, currentUser: false },
  { username: "Brighton", points: 42, currentUser: false },
  { username: "Wolves", points: 41, currentUser: false },
  { username: "Newcastle", points: 40, currentUser: false },
  { username: "Chelsea", points: 36, currentUser: false },
  { username: "Fulham", points: 35, currentUser: false },
  { username: "Bournemouth", points: 32, currentUser: false },
  { username: "Crystal Palace", points: 29, currentUser: false },
  { username: "Brentford", points: 26, currentUser: true },
  { username: "Everton", points: 25, currentUser: false },
  { username: "Nottingham Forest", points: 24, currentUser: false },
  { username: "Luton Town", points: 21, currentUser: false },
  { username: "Burnley", points: 14, currentUser: false },
  { username: "Sheffield United", points: 14, currentUser: false },
];

const leagues = [
  {
    name: "SDP Group 1",
    id: "#3452778",
    users: [
      {
        username: "Jonathan",
        points: getRandomNumber(1, 20),
        currentUser: true,
      },
      {
        username: "Matthieu",
        points: getRandomNumber(1, 20),
        currentUser: false,
      },
      { username: "Linus", points: getRandomNumber(1, 20), currentUser: false },
      { username: "Dylan", points: getRandomNumber(1, 20), currentUser: false },
      { username: "Lewis", points: getRandomNumber(1, 20), currentUser: false },
      { username: "Cem", points: getRandomNumber(1, 20), currentUser: false },
      { username: "Ross", points: getRandomNumber(1, 20), currentUser: false },
      { username: "Lyle", points: getRandomNumber(1, 20), currentUser: false },
      { username: "Pavel", points: getRandomNumber(1, 20), currentUser: false },
    ],
  },
  {
    name: "Premier League 2023/24",
    id: "#6949284",
    users: [
      { username: "Arsenal", points: 64, currentUser: false },
      { username: "Liverpool", points: 64, currentUser: false },
      { username: "Man City", points: 63, currentUser: false },
      { username: "Aston Villa", points: 55, currentUser: false },
      { username: "Tottenham", points: 53, currentUser: false },
      { username: "Man United", points: 47, currentUser: false },
      { username: "West Ham", points: 43, currentUser: false },
      { username: "Brighton", points: 42, currentUser: false },
      { username: "Wolves", points: 41, currentUser: false },
      { username: "Newcastle", points: 40, currentUser: false },
      { username: "Chelsea", points: 36, currentUser: false },
      { username: "Fulham", points: 35, currentUser: false },
      { username: "Bournemouth", points: 32, currentUser: false },
      { username: "Crystal Palace", points: 29, currentUser: false },
      { username: "Brentford", points: 26, currentUser: true },
      { username: "Everton", points: 25, currentUser: false },
      { username: "Nottingham Forest", points: 24, currentUser: false },
      { username: "Luton Town", points: 21, currentUser: false },
      { username: "Burnley", points: 14, currentUser: false },
      { username: "Sheffield United", points: 14, currentUser: false },
    ],
  },
];

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function LeaderboardWrapper() {
  // const [activeLeague, setActiveLeague] = useState<string>(leagues[0].name);
  // const [inactiveLeagues, setInactiveLeagues] = useState<string[]>(
  //   leagues.slice(1, -1).map((league) => league.name)
  // );

  // const changeLeague = (leagueName: string) => {

  //   const league = leagues.find((l) => l.name === leagueName);
  //   if (!league) return; // Return if the league doesn't exist

  //   const updatedInactiveLeagues = inactiveLeagues.filter(
  //     (l) => l !== leagueName
  //   );

  //   setInactiveLeagues(updatedInactiveLeagues);

  //   setInactiveLeagues([...updatedInactiveLeagues, activeLeague]);

  //   setActiveLeague(leagueName);
  // }

  friends.sort((a, b) => b.points - a.points);

  return (
    <div className="flex justify-center">
      <div className="w-[600px] m-10">
        <h1 className="text-4xl font-bold mb-10">Leaderboards</h1>

        <h2 className="text-2xl font-bold">Premier League 2023/24</h2>
        {/* <DropdownSwitcher  /> */}

        <Podium users={friends.slice(0, 3)} />

        {friends.length > 3 && <Leaderboard users={friends.slice(3, -1)} />}
      </div>
    </div>
  );
}

export default LeaderboardWrapper;
