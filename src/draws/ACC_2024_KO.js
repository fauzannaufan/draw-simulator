import { useState } from 'react';

import Pots from '../components/Pots';
import Balls from '../components/Balls';
import teams from '../teams/acc_2024_teams';
import BracketACC from '../components/BracketACC';

const clone = (arr) => {
  return JSON.parse(JSON.stringify(arr));
};

const pots = [
  ['WSF1', 'WSF2'],
  ['ASF1', 'ASF2'],
  ['KGZ1', 'IND1', 'SEA', 'TPE2'],
];

const teamsPlaceholder = {
  WSF1: ['BHR1', 'OMA1'],
  WSF2: ['LBN1', 'IRQ2'],
  ASF1: ['AUS1', 'MAS2'],
  ASF2: ['AUS2', 'CAM1'],
};

const original_positions = [
  [''],
  [''],
  [''],
  [''],
  [''],
  [''],
  [''],
  [''],
  ['', ''],
  ['', ''],
];

function ACC_2024_KO() {
  const [revealTeams, setRevealTeams] = useState(false);
  const [positions, setPositions] = useState(clone(original_positions));
  const [drawnTeams, setDrawnTeams] = useState([]);

  const drawAllTeams = () => {
    const westpot = [...pots[0]];
    westpot.sort((a, b) => 0.5 - Math.random());
    westpot.forEach(async (team) => await chooseTeam(team));

    const aseanpot = [...pots[1]];
    aseanpot.sort((a, b) => 0.5 - Math.random());
    aseanpot.forEach(async (team) => await chooseTeam(team));

    const interzonepot = [...pots[2]];
    interzonepot.sort((a, b) => 0.5 - Math.random());
    interzonepot.forEach(async (team) => await chooseTeam(team));
  };

  const resetDraw = () => {
    setDrawnTeams([]);
    setPositions(clone(original_positions));
  };

  const chooseTeam = (team) => {
    const chosenTeams = teamsPlaceholder[team];
    setPositions((prev) => {
      const teamsDrawn = prev.flat().filter((el) => el).length;
      const newPrev = [...prev];
      if (teamsDrawn < 4) {
        // west
        newPrev[teamsDrawn] = [chosenTeams[0]];
        newPrev[teamsDrawn + 1] = [chosenTeams[1]];
      } else if (teamsDrawn === 4) {
        newPrev[8] = [...chosenTeams];
      } else if (teamsDrawn === 6) {
        newPrev[9] = [...chosenTeams];
      } else {
        // interzone
        const mapping = {
          8: 4,
          9: 6,
          10: 5,
          11: 7,
        };
        newPrev[mapping[teamsDrawn]] = [team];
      }
      return newPrev;
    });

    setDrawnTeams((prev) => [...prev, team]);
  };

  return (
    <div className="acl">
      <div className="center">
        <button onClick={drawAllTeams} disabled={false}>
          Automatic Draw
        </button>
        <button onClick={resetDraw}>Restart Draw</button>
        <input
          type="checkbox"
          onChange={(e) => setRevealTeams(e.target.checked)}
        />{' '}
        Reveal Team
      </div>
      <div className="center">
        <h2>Draw Pots</h2>
        <Pots teams={teams} pots={pots} drawnTeams={drawnTeams} />
        {drawnTeams.length < 8 && (
          <Balls
            teams={teams}
            type="afc-cup"
            drawnTeams={drawnTeams}
            pots={pots}
            chooseTeam={chooseTeam}
            revealTeams={revealTeams}
          />
        )}
        {drawnTeams.length === 8 && <h2>Knockout Stage Bracket</h2>}
        <BracketACC teams={teams} positions={positions} />
      </div>
    </div>
  );
}

export default ACC_2024_KO;
