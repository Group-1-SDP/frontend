import { useEffect, useState } from "react";
import Podium from "./Podium";
import Leaderboard from "./Leaderboard";
import LeagueSwitcher from "./LeagueSwitcher";
import { APILink, userIDAtom, usernameAtom } from "../Utils/GlobalState";
import { useAtom } from "jotai";

const initLeaderbaords = [
  {
    name: "SDP Group 1",
    id: "3452778",
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
];

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function LeaderboardWrapper() {
  const [leagues, setLeagues] = useState(initLeaderbaords);
  const [activeLeague, setActiveLeague] = useState<number>(0);
  const [userID] = useAtom(userIDAtom);
  const [currentUsername] = useAtom(usernameAtom);

  const inactiveLeagues = leagues
    .map((_, index) => index)
    .filter((index) => index !== activeLeague);

  const changeLeague = (newIndex: number) => {
    if (newIndex < 0 || newIndex >= leagues.length) {
      return;
    }

    setActiveLeague(newIndex);
  };

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await fetch(
          APILink + "/api/" + userID + "/friends-study-hours",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await response.json();
        if (response.status === 200) {
          const dynamicLeaderboard = {
            name: "Friends Study Hours",
            id: "WEEWOO",
            users: data
              .map((user: { username: string; study_hours_today: any }) => ({
                username: user.username,
                points: user.study_hours_today,
                currentUser: user.username === currentUsername,
              }))
              .sort(
                (a: { points: number }, b: { points: number }) =>
                  b.points - a.points
              ),
          };

          setLeagues((currentLeagues) => {
            const index = currentLeagues.findIndex(
              (league) => league.id === dynamicLeaderboard.id
            );
            if (index > -1) {
              return currentLeagues.map((league, idx) =>
                idx === index ? dynamicLeaderboard : league
              );
            } else {
              return [...currentLeagues, dynamicLeaderboard];
            }
          });
        } else {
          console.error("Failed to fetch leaderboard data:", data.message);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    if (currentUsername) {
      fetchLeaderboardData();
    }
  }, [userID, currentUsername]);

  const sortedUsers =
    leagues.length > activeLeague
      ? [...leagues[activeLeague].users].sort((a, b) => b.points - a.points)
      : [];

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

        {sortedUsers.length > 3 && <Leaderboard users={sortedUsers.slice(3)} />}
      </div>
    </div>
  );
}

export default LeaderboardWrapper;
