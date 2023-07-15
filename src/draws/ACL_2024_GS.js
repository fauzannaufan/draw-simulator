import { useMemo, useState } from 'react';
import Groups from '../components/Groups';
import teams from './acl_2024_teams';

import './acl_2024.css';
import Pots from '../components/Pots';

const original_groups = [
  ['', '', '', ''],
  ['', '', '', ''],
  ['', '', '', ''],
  ['', '', '', ''],
  ['', '', '', ''],
];

const wpots = [
  ['KSA1', 'IRN1', 'QAT1', 'UZB1', 'KSA2'],
  ['IRN2', 'QAT2', 'UZB2', 'KSA3', 'IRN3'],
  ['JOR1', 'TJK1', 'IRQ1', 'TKM1', 'IND1'],
  ['UAE1', 'KSA/UAE/JOR', 'IRN/UAE/BAN', 'QAT/UZB/OMA', 'QAT/UZB'],
];

const epots = [
  ['KOR1', 'JPN1', 'CHN1', 'THA1', 'KOR2'],
  ['JPN2', 'CHN2', 'THA2', 'KOR3', 'JPN3'],
  ['VIE1', 'PHI1', 'MAS1', 'AUS1', 'SGP1'],
  ['HKG1', 'KOR/HKG/VIE', 'JPN/HKG/IDN', 'CHN3/THA', 'CHN4/THA'],
];

function ACL_2024_GS() {
  const [wgroups, setWGroups] = useState(original_groups);
  const [egroups, setEGroups] = useState(original_groups);
  const [revealTeams, setRevealTeams] = useState(false);

  const drawnTeams = useMemo(() => {
    return [
      ...wgroups.flat().filter((el) => el),
      ...egroups.flat().filter((el) => el),
    ];
  }, [wgroups, egroups]);

  const drawAllTeams = () => {};

  const resetDraw = () => {
    setWGroups([...original_groups]);
    setEGroups([...original_groups]);
  };

  return (
    <div>
      <div className="center">
        <button onClick={drawAllTeams}>Automatic Draw</button>
        <button onClick={resetDraw}>Restart Draw</button>
        <input
          type="checkbox"
          onChange={(e) => setRevealTeams(e.target.checked)}
        />{' '}
        Reveal Team
      </div>
      <div className="regions">
        <h2>West Region</h2>
        <h2>East Region</h2>
        <Pots teams={teams} pots={wpots} drawnTeams={drawnTeams} />
        <Pots teams={teams} pots={epots} drawnTeams={drawnTeams} />
      </div>
      <div className="regions">
        <Groups teams={teams} groups={wgroups} firstGroupLetter="A" />
        <Groups teams={teams} groups={egroups} firstGroupLetter="F" />
      </div>
    </div>
  );
}

export default ACL_2024_GS;
