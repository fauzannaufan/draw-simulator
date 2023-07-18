import { useMemo, useState } from 'react';
import Groups from '../components/Groups';
import teams from './acc_2024_teams';

import './acc_2024.scss';
import Pots from '../components/Pots';
import Balls from '../components/Balls';
import west_probs from '../combinations/acc_2024_gs_west.json';
import asean_probs from '../combinations/acc_2024_gs_asean.json';

const clone = (arr) => {
  return JSON.parse(JSON.stringify(arr));
};

const original_groups = [
  ['', '', '', ''],
  ['', '', '', ''],
  ['', '', '', ''],
];

const wpots = [
  ['JOR1', 'IRQ1', 'LBN1'],
  ['KUW1', 'BHR1', 'SYR1'],
  ['PLE1', 'IRQ2', 'LBN2'],
  ['KUW2', 'WPO1', 'WPO2'],
];

const apots = [
  ['VIE1', 'PHI1', 'MAS1'],
  ['AUS1', 'SGP1', 'IDN1'],
  ['MYA1', 'PHI2', 'MAS2'],
  ['AUS2', 'APO1', 'APO2'],
];

const findPossibleProbs = (probs, groups) => {
  const tempgroups = clone(groups).sort((a, b) => a[0] - b[0]);
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

function ACC_2024_GS() {
  const [wgroups, setWGroups] = useState(clone(original_groups));
  const [agroups, setAGroups] = useState(clone(original_groups));
  const [othergroups] = useState([
    ['IND1', 'BAN1', 'MDV1', 'SPO1'],
    ['TJK1', 'TKM1', 'KGZ1', 'CPO1'],
    ['MAC1', 'TPE1', 'MNG1', 'EPO1'],
  ]);
  const [revealTeams, setRevealTeams] = useState(false);

  const drawnWTeams = useMemo(() => {
    return [...wgroups.flat().filter((el) => el)];
  }, [wgroups]);

  const drawnATeams = useMemo(() => {
    return [...agroups.flat().filter((el) => el)];
  }, [agroups]);

  const drawAllTeams = () => {
    if (wpots.flat().length > drawnWTeams.length) {
      autoDraw(wgroups, drawnWTeams, wpots, west_probs, setWGroups);
    } else if (apots.flat().length > drawnATeams.length) {
      autoDraw(agroups, drawnATeams, apots, asean_probs, setAGroups);
    }
  };

  const autoDraw = (groups, drawnTeams, pots, probs, setGroups) => {
    const tempGroups = clone(groups);
    if (drawnTeams.length < tempGroups.length) {
      // complete pot 1
      const teamsDrawn = [...drawnTeams];
      for (let i = drawnTeams.length; i < pots[0].length; i++) {
        const pot1 = pots[0].filter((el) => !teamsDrawn.includes(el));
        const randomTeamIndex = Math.floor(Math.random() * pot1.length);
        tempGroups[i][0] = pot1[randomTeamIndex];
        teamsDrawn.push(pot1[randomTeamIndex]);
      }
    }

    const teamIndexGroups = tempGroups.map((group) => {
      return group.map((team, idx) => pots[idx].indexOf(team));
    });
    const possibleProbs = findPossibleProbs(probs, teamIndexGroups);
    const randomIndex = Math.floor(Math.random() * (possibleProbs.length + 1));
    const selectedProbs = possibleProbs[randomIndex];

    selectedProbs.sort((a, b) => {
      return (
        teamIndexGroups.findIndex((x) => x[0] === a[0]) -
        teamIndexGroups.findIndex((x) => x[0] === b[0])
      );
    });

    setGroups(
      selectedProbs.map((group) => {
        return group.map((team, idx) => pots[idx][team]);
      })
    );
  };

  const chooseTeam = (team, pots, probs, setGroups) => {
    setGroups((oldGroups) => {
      const newGroups = clone(oldGroups);
      const teamsDrawn = newGroups.flat().filter((el) => el).length;
      let indexGroupToFill = teamsDrawn % newGroups.length;
      if (teamsDrawn >= newGroups.length) {
        const teamIndexGroups = newGroups.map((group) => {
          return group.map((team, idx) => pots[idx].indexOf(team));
        });
        const possibleProbs = findPossibleProbs(probs, teamIndexGroups);
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
      const positionGroupToFill = newGroups[indexGroupToFill].filter(
        (el) => el
      ).length;
      newGroups[indexGroupToFill][positionGroupToFill] = team;
      return newGroups;
    });
  };

  const chooseTeamWest = (team) => {
    chooseTeam(team, wpots, west_probs, setWGroups);
  };

  const chooseTeamAsean = (team) => {
    chooseTeam(team, apots, asean_probs, setAGroups);
  };

  const resetDraw = () => {
    setWGroups((old) => {
      return old.map((group) => {
        return group.map((item) => '');
      });
    });
    setAGroups((old) => {
      return old.map((group) => {
        return group.map((item) => '');
      });
    });
  };

  return (
    <div className="acc">
      <div className="center">
        <button onClick={drawAllTeams}>Automatic Draw</button>
        <button onClick={resetDraw}>Restart Draw</button>
        <input
          type="checkbox"
          onChange={(e) => setRevealTeams(e.target.checked)}
        />{' '}
        Reveal Team
      </div>
      <div className="zones">
        <h2
          className={
            wpots.flat().length !== drawnWTeams.length
              ? 'round-ongoing'
              : 'round-finished'
          }
        >
          West Zone
        </h2>
        <h2
          className={
            wpots.flat().length === drawnWTeams.length &&
            apots.flat().length > drawnATeams.length
              ? 'round-ongoing'
              : 'round-finished'
          }
        >
          ASEAN Zone
        </h2>
        <div
          className={
            wpots.flat().length === drawnWTeams.length
              ? 'round-finished'
              : 'round-ongoing'
          }
        >
          <Pots teams={teams} pots={wpots} drawnTeams={drawnWTeams} />
          {wpots.flat().length > drawnWTeams.length && (
            <Balls
              teams={teams}
              type="straight-starttop"
              drawnTeams={drawnWTeams}
              pots={wpots}
              chooseTeam={chooseTeamWest}
              revealTeams={revealTeams}
            />
          )}
        </div>
        <div
          className={
            wpots.flat().length === drawnWTeams.length &&
            apots.flat().length > drawnATeams.length
              ? 'round-ongoing'
              : 'round-finished'
          }
        >
          <Pots teams={teams} pots={apots} drawnTeams={drawnATeams} />
          {wpots.flat().length === drawnWTeams.length &&
            apots.flat().length > drawnATeams.length && (
              <Balls
                teams={teams}
                type="straight-starttop"
                drawnTeams={drawnATeams}
                pots={apots}
                chooseTeam={chooseTeamAsean}
                revealTeams={revealTeams}
              />
            )}
        </div>
        <div className="mobile">
          {apots.flat().length === drawnATeams.length && <h2>Draw Results</h2>}
          <Groups
            teams={teams}
            groups={[
              ...wgroups,
              othergroups[0],
              othergroups[1],
              ...agroups,
              othergroups[2],
            ]}
          />
        </div>
      </div>
      <div className="groups desktop">
        {apots.flat().length === drawnATeams.length && <h2>Draw Results</h2>}
        <Groups
          teams={teams}
          groups={[...wgroups, othergroups[0], othergroups[1]]}
          firstGroupLetter="A"
        />
        <Groups
          teams={teams}
          groups={[...agroups, othergroups[2]]}
          firstGroupLetter="F"
        />
      </div>
    </div>
  );
}

export default ACC_2024_GS;
