import { useMemo, useState } from 'react';
import Groups from '../components/Groups';
import teams from '../teams/acle_2025_teams';

import '../styles/acle_2025.scss';
import Pots from '../components/Pots';
import Balls from '../components/Balls';
import west_probs from '../combinations/acle_2025_ls_west_QAT.json';
import east_probs from '../combinations/acle_2025_ls_east_CHN.json';
import FixturesACLE from '../components/FixturesACLE';

const clone = (arr) => {
  return JSON.parse(JSON.stringify(arr));
};

const original_groups = [
  ['', '', '', ''],
  ['', '', '', ''],
  ['', '', '', ''],
];

const wpots = [
  ['UAE1', 'KSA1', 'QAT1', 'IRN1', 'UZB1', 'IRQ1'],
  ['KSA2', 'QAT2', 'IRN2', 'UAE2', 'KSA3', 'QAT3'],
];

const epots = [
  ['JPN1', 'KOR1', 'CHN1', 'THA1', 'AUS1', 'MAS1'],
  ['JPN2', 'KOR2', 'CHN2', 'JPN3', 'KOR3', 'CHN3'],
];

const findPossibleProbs = (probs, groups) => {
  const tempgroups = clone(groups);
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

function ACLE_2025_LS() {
  const [wgroups, setWGroups] = useState(clone(original_groups));
  const [egroups, setEGroups] = useState(clone(original_groups));
  const [revealTeams, setRevealTeams] = useState(false);

  const drawnWTeams = useMemo(() => {
    return [...wgroups.flat().filter((el) => el)];
  }, [wgroups]);

  const drawnETeams = useMemo(() => {
    return [...egroups.flat().filter((el) => el)];
  }, [egroups]);

  const wGroupsWithPlaceholder = useMemo(() => {
    return [
      [
        wgroups[0][0] || 'A1',
        wgroups[0][1] || 'A2',
        wgroups[0][2] || 'A3',
        wgroups[0][3] || 'A4',
      ],
      [
        wgroups[1][0] || 'B1',
        wgroups[1][1] || 'B2',
        wgroups[1][2] || 'B3',
        wgroups[1][3] || 'B4',
      ],
      [
        wgroups[2][0] || 'C1',
        wgroups[2][1] || 'C2',
        wgroups[2][2] || 'C3',
        wgroups[2][3] || 'C4',
      ],
    ];
  }, [wgroups]);

  const eGroupsWithPlaceholder = useMemo(() => {
    return [
      [
        egroups[0][0] || 'D1',
        egroups[0][1] || 'D2',
        egroups[0][2] || 'D3',
        egroups[0][3] || 'D4',
      ],
      [
        egroups[1][0] || 'E1',
        egroups[1][1] || 'E2',
        egroups[1][2] || 'E3',
        egroups[1][3] || 'E4',
      ],
      [
        egroups[2][0] || 'F1',
        egroups[2][1] || 'F2',
        egroups[2][2] || 'F3',
        egroups[2][3] || 'F4',
      ],
    ];
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
    const teamIndexGroups = tempGroups.map((group) => {
      return group.map((team, idx) => pots[Math.floor(idx / 2)].indexOf(team));
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
        return group.map((team, idx) => pots[Math.floor(idx / 2)][team]);
      })
    );
  };

  const chooseTeam = (team, pots, probs, setGroups) => {
    setGroups((oldGroups) => {
      const newGroups = clone(oldGroups);
      const teamsDrawn = newGroups.flat().filter((el) => el).length;
      let indexGroupToFill = teamsDrawn % newGroups.length;
      const teamIndexGroups = newGroups.map((group) => {
        return group.map((team, idx) =>
          pots[Math.floor(idx / 2)].indexOf(team)
        );
      });
      const possibleProbs = findPossibleProbs(probs, teamIndexGroups);
      const potIndex = Math.floor(teamsDrawn / newGroups.length / 2);
      const chosenTeamIndex = pots[potIndex].indexOf(team);
      const possibleGroupIndex = [
        ...new Set(
          possibleProbs.map((x) =>
            x
              .map((el) => [el[potIndex * 2], el[potIndex * 2 + 1]])
              .findIndex((el) => el.includes(chosenTeamIndex))
          )
        ),
      ].sort((a, b) => {
        const teamInA = newGroups[a].filter((el) => el).length;
        const teamInB = newGroups[b].filter((el) => el).length;
        if (teamInA === teamInB) {
          return a - b;
        } else {
          return teamInA - teamInB;
        }
      });
      indexGroupToFill = possibleGroupIndex[0];
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
    <div className="acle">
      <div className="center">
        {/* <button onClick={drawAllTeams}>Automatic Draw</button> */}
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
          label="Column"
        />
        <Groups
          className="desktop"
          teams={teams}
          groups={egroups}
          firstGroupLetter="D"
          label="Column"
        />
        <div className="mobile">
          {epots.flat().length === drawnETeams.length && <h2>Draw Results</h2>}
          <Groups
            teams={teams}
            groups={[...wgroups, ...egroups]}
            label="Column"
          />
        </div>
        <FixturesACLE region="West" groups={wGroupsWithPlaceholder} />
        <FixturesACLE region="East" groups={eGroupsWithPlaceholder} />
      </div>
    </div>
  );
}

export default ACLE_2025_LS;
