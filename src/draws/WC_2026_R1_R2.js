import { useMemo, useRef, useState } from 'react';
import teams from '../teams';

import Pots from '../components/Pots';
import Results from '../components/Results';
import Balls from '../components/Balls';
import Groups from '../components/Groups';
import {
  exportComponentAsJPEG,
  exportComponentAsPNG,
} from 'react-component-export-image';

const pots = [
  ['IDN', 'TPE', 'MDV', 'YEM', 'AFG', 'SGP', 'MYA', 'NEP', 'CAM'],
  ['MAC', 'MNG', 'BHU', 'LAO', 'BRU', 'BAN', 'TLS', 'PAK', 'GUM'],
];

const original_round2Pots = [
  ['JPN', 'IRN', 'AUS', 'KOR', 'KSA', 'QAT', 'IRQ', 'UAE', 'OMA'],
  ['UZB', 'CHN', 'JOR', 'BHR', 'SYR', 'VIE', 'PLE', 'KGZ', 'IND'],
  ['LBN', 'TJK', 'THA', 'PRK', 'PHI', 'MAS', 'TKM', 'KUW', 'HKG'],
  [],
];

const original_groups = [
  ['', '', '', ''],
  ['', '', '', ''],
  ['', '', '', ''],
  ['', '', '', ''],
  ['', '', '', ''],
  ['', '', '', ''],
  ['', '', '', ''],
  ['', '', '', ''],
  ['', '', '', ''],
];

function WC_2026_R1_R2() {
  const [results, setResults] = useState([[], [], [], [], [], [], [], [], []]);
  const [groups, setGroups] = useState(original_groups);
  const [round2Pots, setRound2Pots] = useState(original_round2Pots);
  const [revealTeams, setRevealTeams] = useState(false);

  const groupRef = useRef();
  const resultsRef = useRef();

  const drawnTeams = useMemo(() => {
    return results.flat().filter((el) => el);
  }, [results]);

  const drawnRound2Teams = useMemo(() => {
    return groups.flat().filter((el) => el);
  }, [groups]);

  const chooseTeam = (team) => {
    setResults((oldResults) => {
      const newResults = [...oldResults];
      const teamsDrawn = newResults.flat().filter((el) => el).length;
      const indexToFill = Math.floor(teamsDrawn / pots.length);
      newResults[indexToFill].push(team);
      return newResults;
    });

    setRound2Pots((old) => {
      const newPots = [...old];
      const pot4teams = [];
      results.forEach((result) => {
        if (result.length === 2) {
          pot4teams.push(`${result[0]}/${result[1]}`);
        }
      });
      newPots[3] = pot4teams;
      return newPots;
    });
  };

  const chooseTeamGroup = (team) => {
    setGroups((oldGroups) => {
      const newGroups = [...oldGroups];
      const teamsDrawn = newGroups.flat().filter((el) => el).length;
      const indexGroupToFill = teamsDrawn % groups.length;
      const positionGroupToFill =
        3 - newGroups[indexGroupToFill].filter((el) => el).length;
      newGroups[indexGroupToFill][positionGroupToFill] = team;
      return newGroups;
    });
  };

  const resetDraw = () => {
    setResults([[], [], [], [], [], [], [], [], []]);
    setRound2Pots(original_round2Pots);
    setGroups((old) => {
      return old.map((group) => {
        return group.map((item) => '');
      });
    });
  };

  const drawAllTeams = () => {
    if (drawnTeams.length < pots.flat().length) {
      const teamsDrawn = [...drawnTeams];
      for (let i = teamsDrawn.length + 1; i <= pots.flat().length; i++) {
        const currentPot = pots[(i + 1) % pots.length].filter(
          (el) => !teamsDrawn.includes(el)
        );
        const randomTeamIndex = Math.floor(Math.random() * currentPot.length);
        chooseTeam(currentPot[randomTeamIndex]);
        teamsDrawn.push(currentPot[randomTeamIndex]);
      }
    } else if (drawnRound2Teams.length < round2Pots.flat().length) {
      const teamsDrawn = [...drawnRound2Teams];
      for (let i = teamsDrawn.length; i < round2Pots.flat().length; i++) {
        const currentPot = round2Pots[
          Math.floor((round2Pots.flat().length - i - 1) / round2Pots[0].length)
        ].filter((el) => !teamsDrawn.includes(el));
        const randomTeamIndex = Math.floor(Math.random() * currentPot.length);
        chooseTeamGroup(currentPot[randomTeamIndex]);
        teamsDrawn.push(currentPot[randomTeamIndex]);
      }
    }
  };

  return (
    <>
      <div className="center">
        <button onClick={drawAllTeams}>Automatic Draw</button>
        <button onClick={resetDraw}>Restart Draw</button>
        <input
          type="checkbox"
          onChange={(e) => setRevealTeams(e.target.checked)}
        />{' '}
        Reveal Team
      </div>
      <div className="rounds">
        <div
          className={
            pots.flat().length === drawnTeams.length
              ? 'round-finished'
              : 'round-ongoing'
          }
        >
          <h2>Round 1</h2>

          <Pots teams={teams} pots={pots} drawnTeams={drawnTeams} />

          {pots.flat().length > drawnTeams.length && (
            <Balls
              type="alternating"
              drawnTeams={drawnTeams}
              pots={pots}
              chooseTeam={chooseTeam}
              revealTeams={revealTeams}
            />
          )}

          <Results teams={teams} results={results} ref={resultsRef} />
        </div>
        <div
          className={
            pots.flat().length === drawnTeams.length
              ? 'round-ongoing round2'
              : 'round-finished'
          }
        >
          <h2>Round 2</h2>

          <Pots teams={teams} pots={round2Pots} drawnTeams={drawnRound2Teams} />

          {pots.flat().length === drawnTeams.length &&
            round2Pots.flat().length > drawnRound2Teams.length && (
              <Balls
                type="straight"
                drawnTeams={drawnRound2Teams}
                pots={round2Pots}
                chooseTeam={chooseTeamGroup}
                revealTeams={revealTeams}
              />
            )}

          <Groups teams={teams} groups={groups} ref={groupRef} />

          {/* {pots.flat().length === drawnTeams.length &&
            round2Pots.flat().length === drawnRound2Teams.length && (
              <>
                <label
                  className="download"
                  onClick={() =>
                    exportComponentAsPNG(groupRef, {
                      fileName:
                        'World Cup 2026 Qualification Draw Simulation by Footyrankings',
                    })
                  }
                >
                  Download PNG
                </label>
                <label
                  className="download"
                  onClick={() =>
                    exportComponentAsJPEG(groupRef, {
                      fileName:
                        'World Cup 2026 Qualification Draw Simulation by Footyrankings',
                    })
                  }
                >
                  Download JPEG
                </label>
              </>
            )} */}
        </div>
      </div>
    </>
  );
}

export default WC_2026_R1_R2;
