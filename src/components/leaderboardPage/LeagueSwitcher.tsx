import { useEffect, useState, useRef } from "react";

interface LeagueSwitcherProps {
  active: League;
  others: League[];
  switcher: (newIndex: number) => void;
}

export interface League {
  index: number;
  name: string;
}

export interface MenuItemProps {
  league: League;
  switchAction: (newValue: number) => void;
  closer: () => void;
}

function MenuItem({ league, switchAction, closer }: MenuItemProps) {
  const handleClick = () => {
    if (switchAction) {
      switchAction(league.index);
      closer();
    }
  };
  return (
    <button
      onClick={handleClick}
      className={
        "flex items-center p-2 mb-2 font-bold text-2xl text-left rounded-md hover:bg-gray-100 transition duration-300 "
      }
    >
      <div className="w-4 h-4 rounded-full mr-2 bg-yellowAccent"></div>
      {league.name}
    </button>
  );
}

function LeagueSwitcher({ active, others, switcher }: LeagueSwitcherProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, open]);

  return (
    <div className="relative">
      <div ref={dropdownRef}>
        <div
          style={{ cursor: "pointer" }}
          className="flex items-center p-2 my-4 font-bold text-4xl rounded-md hover:bg-gray-100 transition duration-300"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <div className="w-6 h-6 rounded-full mr-2 bg-greenAccent"></div>
          {active.name}
        </div>
        {open && (
          <div className="flex flex-col my-4">
            {others.map((league, index) => (
              <MenuItem
                key={index}
                league={league}
                switchAction={switcher}
                closer={() => setOpen(false)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default LeagueSwitcher;
