import { useMemo, useState } from 'react';
import Groups from '../components/Groups';
import teams from './acl_2024_teams';

import './acl_2024.scss';
import Pots from '../components/Pots';
import Balls from '../components/Balls';
import west_probs from '../combinations/acl_2024_gs_west.json';
import east_probs from '../combinations/acl_2024_gs_east.json';

const clone = (arr) => {
  return JSON.parse(JSON.stringify(arr));
};

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
  ['UAE1', 'KSA4', 'UAE2', 'UZB4', 'UZB3'],
];

const epots = [
  ['KOR1', 'JPN1', 'CHN1', 'THA1', 'KOR2'],
  ['JPN2', 'CHN2', 'THA2', 'KOR3', 'JPN3'],
  ['VIE1', 'PHI1', 'MAS1', 'AUS1', 'SGP1'],
  ['HKG1', 'KOR4', 'JPN4', 'CHN3', 'THA3'],
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

function ACL_2024_GS() {
  const [wgroups, setWGroups] = useState(clone(original_groups));
  const [egroups, setEGroups] = useState(clone(original_groups));
  const [revealTeams, setRevealTeams] = useState(false);

  const drawnWTeams = useMemo(() => {
    return [...wgroups.flat().filter((el) => el)];
  }, [wgroups]);

  const drawnETeams = useMemo(() => {
    return [...egroups.flat().filter((el) => el)];
  }, [egroups]);

  const drawAllTeams = () => {
    if (wpots.flat().length > drawnWTeams.length) {
      autoDraw(wgroups, drawnWTeams, wpots, west_probs, setWGroups);
    } else if (epots.flat().length > drawnETeams.length) {
      autoDraw(egroups, drawnETeams, epots, east_probs, setEGroups);
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

  const chooseTeamEast = (team) => {
    chooseTeam(team, epots, east_probs, setEGroups);
  };

  const resetDraw = () => {
    setWGroups((old) => {
      return old.map((group) => {
        return group.map((item) => '');
      });
    });
    setEGroups((old) => {
      return old.map((group) => {
        return group.map((item) => '');
      });
    });
  };

  return (
    <div className="acl">
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
        <h2
          className={
            wpots.flat().length !== drawnWTeams.length
              ? 'round-ongoing'
              : 'round-finished'
          }
        >
          West Region
        </h2>
        <h2
          className={
            wpots.flat().length === drawnWTeams.length &&
            epots.flat().length > drawnETeams.length
              ? 'round-ongoing'
              : 'round-finished'
          }
        >
          East Region
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
            epots.flat().length > drawnETeams.length
              ? 'round-ongoing'
              : 'round-finished'
          }
        >
          <Pots teams={teams} pots={epots} drawnTeams={drawnETeams} />
          {wpots.flat().length === drawnWTeams.length &&
            epots.flat().length > drawnETeams.length && (
              <Balls
                teams={teams}
                type="straight-starttop"
                drawnTeams={drawnETeams}
                pots={epots}
                chooseTeam={chooseTeamEast}
                revealTeams={revealTeams}
              />
            )}
        </div>
        <Groups
          className="desktop"
          teams={teams}
          groups={wgroups}
          firstGroupLetter="A"
        />
        <Groups
          className="desktop"
          teams={teams}
          groups={egroups}
          firstGroupLetter="F"
        />
        <div className="mobile">
          {epots.flat().length === drawnETeams.length && <h2>Draw Results</h2>}
          <Groups teams={teams} groups={[...wgroups, ...egroups]} />
        </div>
      </div>
    </div>
  );
}

export default ACL_2024_GS;
