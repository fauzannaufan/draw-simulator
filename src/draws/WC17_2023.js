import { useEffect, useMemo, useRef, useState } from 'react';

import teams from '../teams';
import Pots from '../components/Pots';
import Groups from '../components/Groups';
import Balls from '../components/Balls';
import original_probs from '../combinations/wc_u17_pot12.json';
import PositionBalls from '../components/PositionBalls';

const pots = [
  ['IDN', 'BRA', 'MEX', 'FRA', 'ESP', 'JPN'],
  ['GER', 'MLI', 'ENG', 'KOR', 'ARG', 'ECU'],
  ['NZL', 'IRN', 'SEN', 'USA', 'UZB', 'MAR'],
  ['CAN', 'NCL', 'PAN', 'BFA', 'POL', 'VEN'],
];

const index_pots = [
  ['AFC1', 'SAM1', 'NAM1', 'EUR1', 'EUR2', 'AFC2'],
  ['EUR3', 'CAF1', 'EUR4', 'AFC3', 'SAM2', 'SAM3'],
  ['OFC1', 'AFC4', 'CAF2', 'NAM2', 'AFC5', 'CAF3'],
  ['NAM3', 'OFC2', 'NAM4', 'CAF4', 'EUR5', 'SAM4'],
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

const permutator = (inputArr) => {
  let result = [];

  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next));
      }
    }
  };

  permute(inputArr);

  return result;
};
const isValid = (arr) => {
  let countries = arr
    .map((x) =>
      x
        ? x
            .split('/')
            .map((y) => y.substring(0, 3))
            .flat()
        : x
    )
    .flat();
  let uniquec = [...new Set(countries)];
  return countries.length === uniquec.length;
};
const areGroupsValid = (groups) => {
  return groups.map((i) => isValid(i)).reduce((a, b) => a && b, true);
};

const findPossibleProbs = (probs, groups, teamsDrawn) => {
  const currentPot = Math.floor(teamsDrawn / groups.length);

  // Sort by pot 1 teams
  const tempgroups = clone(groups)
    .sort((a, b) => a[0] - b[0])
    .map((el) => el.slice(0, currentPot + 1));
  const unselected = [];
  tempgroups.forEach((group, idxgroup) => {
    group.forEach((team, idxteam) => {
      if (team === -1) {
        unselected.push([idxgroup, idxteam]);
      }
    });
  });
  return probs.filter((prob) => {
    const newprob = clone(prob);
    unselected.forEach((x) => {
      newprob[x[0]][x[1]] = -1;
    });
    return JSON.stringify(newprob) === JSON.stringify(tempgroups);
  });
};

const generateTeamIndexGroups = (groups) => {
  return groups.map((group) => {
    const teamIndexGroup = [-1, -1, -1, -1];
    group.forEach((team) => {
      if (!team) return;
      const teamIndex = pots.flat().findIndex((el) => el === team);
      teamIndexGroup[Math.floor(teamIndex / groups.length)] =
        teamIndex % groups.length;
    });
    return teamIndexGroup;
  });
};

function WC17_2023() {
  const [revealTeams, setRevealTeams] = useState(false);
  const [groups, setGroups] = useState(clone(original_groups));
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(null);
  const [positions, setPositions] = useState([]);
  const [probs, setProbs] = useState(clone(original_probs));

  const groupRef = useRef();

  const drawnTeams = useMemo(() => {
    return groups.flat().filter((el) => el);
  }, [groups]);

  const updateProbs = (groups1 = groups, drawnTeams1 = drawnTeams.length) => {
    const teamIndexGroups = generateTeamIndexGroups(groups1);
    const teamGroups = teamIndexGroups.map((group) => {
      return group.map((el, idx) => index_pots[idx][el]).filter((el) => el);
    });
    const possibles = [];
    permutator(index_pots[drawnTeams1 / 6]).forEach((b) => {
      const y = teamGroups.map((i, j) => [...i, b[j]]);
      if (!areGroupsValid(y)) return;

      possibles.push(
        y
          .map((pot) => {
            return pot.map((team, idx) => index_pots[idx].indexOf(team));
          })
          .sort((a, b) => a[0] - b[0])
      );
    });
    return possibles;
  };

  useEffect(() => {
    if (drawnTeams.length === 12 || drawnTeams.length === 18) {
      setProbs(updateProbs());
    }
  }, [drawnTeams]);

  const resetDraw = () => {
    setGroups(clone(original_groups));
    setSelectedGroupIndex(null);
    setSelectedTeam(null);
    setPositions([]);
    setProbs(clone(original_probs));
  };

  const chooseTeamGroup = (team) => {
    const newGroups = [...groups];
    const teamsDrawn = newGroups.flat().filter((el) => el).length;
    let indexGroupToFill = teamsDrawn % newGroups.length;
    if (teamsDrawn >= newGroups.length) {
      const teamIndexGroups = generateTeamIndexGroups(newGroups);
      const possibleProbs = findPossibleProbs(
        probs,
        teamIndexGroups,
        teamsDrawn
      );
      const potIndex = Math.floor(teamsDrawn / newGroups.length);
      const chosenTeamIndex = pots[potIndex].indexOf(team);
      const pot1teams = [
        ...new Set(
          possibleProbs.map((groups) => {
            return groups[
              groups.map((el) => el[potIndex]).indexOf(chosenTeamIndex)
            ][0];
          })
        ),
      ];
      indexGroupToFill = teamIndexGroups
        .map((group) => pot1teams.includes(group[0]))
        .indexOf(true);
    }
    setSelectedGroupIndex(indexGroupToFill);
    setSelectedTeam(team);
    if (teamsDrawn < newGroups.length) {
      setGroups((oldGroups) => {
        const newGroups = clone(oldGroups);
        newGroups[indexGroupToFill][0] = team;
        return newGroups;
      });
    } else {
      setPositions(
        groups[indexGroupToFill]
          .map((el, index) => (el ? false : index))
          .filter((el) => el)
      );
    }
  };

  const choosePosition = (index) => {
    setGroups((oldGroups) => {
      const newGroups = clone(oldGroups);
      newGroups[selectedGroupIndex][index] = selectedTeam;
      return newGroups;
    });
    setSelectedGroupIndex(null);
    setSelectedTeam(null);
    setPositions([]);
  };

  return (
    <div>
      <div className="center">
        {/* <button onClick={automaticDraw}>Automatic Draw</button> */}
        <button onClick={resetDraw}>Restart Draw</button>
        <input
          type="checkbox"
          onChange={(e) => setRevealTeams(e.target.checked)}
        />{' '}
        Reveal Team
      </div>
      <div className="center">
        <h2>Seeding</h2>
        <Pots
          teams={teams}
          pots={pots}
          drawnTeams={drawnTeams}
          selectedTeam={selectedTeam}
        />
        {pots.flat().length === drawnTeams.length ? (
          <h2>Draw Results</h2>
        ) : positions.length ? (
          <PositionBalls
            positions={positions}
            revealTeams={revealTeams}
            choosePosition={choosePosition}
          />
        ) : (
          <Balls
            type="straight-starttop"
            drawnTeams={drawnTeams}
            pots={pots}
            chooseTeam={chooseTeamGroup}
            revealTeams={revealTeams}
          />
        )}
        <Groups
          teams={teams}
          groups={groups}
          ref={groupRef}
          selectedIndex={selectedGroupIndex}
        />
      </div>
    </div>
  );
}

export default WC17_2023;
