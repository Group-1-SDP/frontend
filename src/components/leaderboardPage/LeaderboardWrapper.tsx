import { useState } from "react";
import Podium from "./Podium";
import Leaderboard from "./Leaderboard";
import LeagueSwitcher from "./LeagueSwitcher";

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
    id: 3452778,
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
    id: 6949284,
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
  const [activeLeague, setActiveLeague] = useState<number>(0);
  const [inactiveLeagues, setInactiveLeagues] = useState<number[]>(
    Array.from({ length: leagues.length - 1 }, (_, i) => i + 1)
  );

  const changeLeague = (newIndex: number) => {
    if (newIndex < 0 || newIndex >= leagues.length) {
      return;
    }

    const updatedInactiveLeagues = inactiveLeagues.filter(
      (index) => index !== newIndex
    );

    setInactiveLeagues(updatedInactiveLeagues);

    setInactiveLeagues([...updatedInactiveLeagues, activeLeague]);

    setActiveLeague(newIndex);
  };

  friends.sort((a, b) => b.points - a.points);

  return (
    <div className="flex justify-center">
      <div className="w-full my-4">
        <LeagueSwitcher
          active={{
            index: activeLeague,
            name: leagues[activeLeague].name,
          }}
          others={inactiveLeagues.map((index) => ({
            index: index,
            name: leagues[index].name,
          }))}
          switcher={changeLeague}
        />

        <Podium users={leagues[activeLeague].users.slice(0, 3)} />

        {friends.length > 3 && (
          <Leaderboard users={leagues[activeLeague].users.slice(3, -1)} />
        )}
      </div>
    </div>
  );
}

export default LeaderboardWrapper;
