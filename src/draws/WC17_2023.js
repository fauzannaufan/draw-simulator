import { useMemo, useRef, useState } from 'react';

import teams from '../teams';
import Pots from '../components/Pots';
import Groups from '../components/Groups';
import Balls from '../components/Balls';

const pots = [
  ['IDN', 'BRA', 'MEX', 'FRA', 'ESP', 'JPN'],
  ['GER', 'MLI', 'ENG', 'KOR', 'ARG', 'ECU'],
  ['NZL', 'IRN', 'SEN', 'USA', 'UZB', 'MAR'],
  ['CAN', 'NCL', 'PAN', 'BFA', 'POL', 'VEN'],
];

const original_groups = [
  ['IDN', '', '', ''],
  ['', '', '', ''],
  ['', '', '', ''],
  ['', '', '', ''],
  ['', '', '', ''],
  ['', '', '', ''],
];

const clone = (arr) => {
  return JSON.parse(JSON.stringify(arr));
};

function WC17_2023() {
  const [revealTeams, setRevealTeams] = useState(false);
  const [groups, setGroups] = useState(clone(original_groups));

  const groupRef = useRef();

  const drawnTeams = useMemo(() => {
    return groups.flat().filter((el) => el);
  }, [groups]);

  const resetDraw = () => {
    setGroups(clone(original_groups));
  };

  const chooseTeamGroup = (team) => {
    setGroups((oldGroups) => {
      const newGroups = [...oldGroups];
      const teamsDrawn = newGroups.flat().filter((el) => el).length;
      const indexGroupToFill = teamsDrawn % groups.length;
      const positionGroupToFill = newGroups[indexGroupToFill].filter(
        (el) => el
      ).length;
      newGroups[indexGroupToFill][positionGroupToFill] = team;
      return newGroups;
    });
  };

  return (
    <div>
      <div className="center">
        <button onClick={() => {}}>Automatic Draw</button>
        <button onClick={resetDraw}>Restart Draw</button>
        <input
          type="checkbox"
          onChange={(e) => setRevealTeams(e.target.checked)}
        />{' '}
        Reveal Team
      </div>
      <div className="center">
        <h2>Seeding</h2>
        <Pots teams={teams} pots={pots} drawnTeams={drawnTeams} />
        {pots.flat().length === drawnTeams.length ? (
          <h2>Draw Results</h2>
        ) : (
          <Balls
            type="straight-starttop"
            drawnTeams={drawnTeams}
            pots={pots}
            chooseTeam={chooseTeamGroup}
            revealTeams={revealTeams}
          />
        )}
        <Groups teams={teams} groups={groups} ref={groupRef} />
      </div>
    </div>
  );
}

export default WC17_2023;
