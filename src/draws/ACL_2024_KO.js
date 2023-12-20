import { useState } from 'react';

import Pots from '../components/Pots';
import Bracket from '../components/Bracket';
import Balls from '../components/Balls';
import teams from './acl_2024_teams';
import west_probs from '../combinations/acl_2024_ko_west.json';
import east_probs from '../combinations/acl_2024_ko_east.json';

const clone = (arr) => {
  return JSON.parse(JSON.stringify(arr));
};

const original_wpots = [
  ['A1', 'B1', 'C1', 'D1', 'E1'],
  ['D2', 'C2', 'A2'],
];

const original_epots = [
  ['F1', 'G1', 'H1', 'I1', 'J1'],
  ['G2', 'F2', 'I2'],
];

const original_pairings = [
  ['', ''],
  ['', ''],
  ['', ''],
  ['', ''],
  ['', ''],
  ['', ''],
  ['', ''],
  ['', ''],
];

const findPossibleProbs = (probs, groups) => {
  const tempgroups = clone(groups).sort((a, b) => a[0].localeCompare(b[0]));
  const unselected = [];
  tempgroups.forEach((group, idxgroup) => {
    group.forEach((team, idxteam) => {
      if (team === '') {
        unselected.push([idxgroup, idxteam]);
      }
    });
  });
  return probs
    .map((prob) => {
      const newprob = prob.map((el) => [el[1], el[0]]);
      return newprob.sort((a, b) => {
        return a[0].localeCompare(b[0]);
      });
    })
    .filter((prob) => {
      const newprob = clone(prob);
      unselected.forEach((x) => {
        newprob[x[0]][x[1]] = '';
      });
      return JSON.stringify(newprob) === JSON.stringify(tempgroups);
    });
};

function ACL_2024_KO() {
  const [revealTeams, setRevealTeams] = useState(false);
  const [pairings, setPairings] = useState(clone(original_pairings));
  const [drawnWTeams, setDrawnWTeams] = useState([]);
  const [drawnETeams, setDrawnETeams] = useState([]);
  const [wpots, setWpots] = useState(clone(original_wpots));
  const [epots, setEpots] = useState(clone(original_epots));

  console.log(pairings);

  const drawAllTeams = () => {
    moveWestPot1ToPot2(wpots[0][Math.floor(Math.random() * 5)]);
    moveEastPot1ToPot2(epots[0][Math.floor(Math.random() * 5)]);

    const westpot2 = [...wpots[1]];
    westpot2.sort((a, b) => 0.5 - Math.random());
    westpot2.forEach((team) => selectWTeam(team));

    const westpot1 = [...wpots[0]];
    westpot1.sort((a, b) => 0.5 - Math.random());
    westpot1.forEach((team) => selectWTeam(team));

    const eastpot2 = [...epots[1]];
    eastpot2.sort((a, b) => 0.5 - Math.random());
    eastpot2.forEach((team) => selectETeam(team));

    const eastpot1 = [...epots[0]];
    eastpot1.sort((a, b) => 0.5 - Math.random());
    eastpot1.forEach((team) => selectETeam(team));
  };

  const resetDraw = () => {
    setWpots(clone(original_wpots));
    setEpots(clone(original_epots));
    setDrawnWTeams([]);
    setDrawnETeams([]);
    setPairings(clone(original_pairings));
  };

  const moveWestPot1ToPot2 = (team) => {
    setWpots((prev) => {
      let pot1 = prev[0];
      let pot2 = prev[1];
      let indexPot1 = pot1.findIndex((el) => el === team);
      pot1.splice(indexPot1, 1);
      pot2.push(team);
      return [pot1, pot2];
    });
  };

  const moveEastPot1ToPot2 = (team) => {
    setEpots((prev) => {
      let pot1 = prev[0];
      let pot2 = prev[1];
      let indexPot1 = pot1.findIndex((el) => el === team);
      pot1.splice(indexPot1, 1);
      pot2.push(team);
      return [pot1, pot2];
    });
  };

  const selectWTeam = (team) => {
    chooseTeam(team, 'west');
  };

  const selectETeam = (team) => {
    chooseTeam(team, 'east');
  };

  const chooseTeam = (team, region) => {
    const setDrawnTeams = region === 'west' ? setDrawnWTeams : setDrawnETeams;
    const probs = region === 'west' ? west_probs : east_probs;

    setPairings((prev) => {
      const otherPairings =
        region === 'west' ? clone(prev).slice(0, 4) : clone(prev).slice(4, 8);
      const newPairings =
        region === 'west' ? clone(prev).slice(4, 8) : clone(prev).slice(0, 4);

      const teamsDrawn = newPairings.flat().filter((el) => el).length;
      let indexPairingToFill = teamsDrawn % newPairings.length;
      if (teamsDrawn >= newPairings.length) {
        const possibleProbs = findPossibleProbs(probs, newPairings);
        const potIndex = Math.floor(teamsDrawn / newPairings.length);
        const pot1teams = [
          ...new Set(
            possibleProbs.map((groups) => {
              return groups[groups.map((el) => el[potIndex]).indexOf(team)][0];
            })
          ),
        ];
        indexPairingToFill = newPairings
          .map((group) => pot1teams.includes(group[0]))
          .indexOf(true);
      }
      const positionPairingsToFill = newPairings[indexPairingToFill].filter(
        (el) => el
      ).length;
      newPairings[indexPairingToFill][positionPairingsToFill] = team;
      return region === 'west'
        ? [...otherPairings, ...newPairings]
        : [...newPairings, ...otherPairings];
    });
    setDrawnTeams((prev) => [...prev, team]);
  };

  return (
    <div className="acl">
      <div className="center">
        <button onClick={drawAllTeams} disabled={wpots[0].length !== 5}>
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
        <Pots
          teams={teams}
          pots={[...wpots, ...epots]}
          drawnTeams={[...drawnWTeams, ...drawnETeams]}
          labels={['West', 'East']}
        />
        {wpots[1].length === 3 && (
          <Balls
            teams={teams}
            type="straight-starttop"
            drawnTeams={[]}
            pots={wpots}
            chooseTeam={moveWestPot1ToPot2}
            revealTeams={revealTeams}
          />
        )}
        {wpots[1].length === 4 && epots[1].length === 3 && (
          <Balls
            teams={teams}
            type="straight-starttop"
            drawnTeams={[]}
            pots={epots}
            chooseTeam={moveEastPot1ToPot2}
            revealTeams={revealTeams}
          />
        )}
        {epots[1].length === 4 && drawnWTeams.length < 8 && (
          <Balls
            teams={teams}
            type="straight-startbottom"
            drawnTeams={drawnWTeams}
            pots={wpots}
            chooseTeam={selectWTeam}
            revealTeams={revealTeams}
          />
        )}
        {drawnWTeams.length === 8 && drawnETeams.length < 8 && (
          <Balls
            teams={teams}
            type="straight-startbottom"
            drawnTeams={drawnETeams}
            pots={epots}
            chooseTeam={selectETeam}
            revealTeams={revealTeams}
          />
        )}
        <h2>Knockout Stage Bracket</h2>
        <Bracket teams={teams} pairings={pairings} />
      </div>
    </div>
  );
}

export default ACL_2024_KO;
