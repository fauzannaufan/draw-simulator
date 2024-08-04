import teams from '../draws/acle_2025_teams';

const FixturesACLE = ({ region, groups }) => {
  const getTeam = (x, y) => {
    const team = teams[groups[x][y]];
    if (team) {
      return (
        <>
          <img
            src={`https://api.fifa.com/api/v3/picture/flags-sq-2/${team.country}`}
            width="16"
          />
          &nbsp;
          <span className={`label-team ${team?.short_name ? 'desktop' : null}`}>
            {team?.name || team}
          </span>
          {team?.short_name && (
            <span className="label-team mobile">{team?.short_name}</span>
          )}
        </>
      );
    } else {
      return <span className="label-team">{groups[x][y]}</span>;
    }
  };

  return (
    <div>
      <h2>Fixtures - {region}</h2>
      <table className="fixtures">
        <tbody>
          <tr>
            <td rowSpan={2}>{getTeam(0, 0)}</td>
            <td className="versus" rowSpan={2}>
              vs
            </td>
            <td>{getTeam(1, 0)}</td>
            <td>{getTeam(2, 1)}</td>
          </tr>
          <tr>
            <td>{getTeam(1, 2)}</td>
            <td>{getTeam(2, 3)}</td>
          </tr>
          <tr>
            <td rowSpan={2}>{getTeam(0, 1)}</td>
            <td rowSpan={2} className="versus">
              vs
            </td>
            <td>{getTeam(2, 0)}</td>
            <td>{getTeam(1, 1)}</td>
          </tr>
          <tr>
            <td>{getTeam(2, 2)}</td>
            <td>{getTeam(1, 3)}</td>
          </tr>
          <tr>
            <td rowSpan={2}>{getTeam(0, 2)}</td>
            <td rowSpan={2} className="versus">
              vs
            </td>
            <td>{getTeam(1, 0)}</td>
            <td>{getTeam(2, 1)}</td>
          </tr>
          <tr>
            <td>{getTeam(2, 2)}</td>
            <td>{getTeam(1, 3)}</td>
          </tr>
          <tr>
            <td rowSpan={2}>{getTeam(0, 3)}</td>
            <td rowSpan={2} className="versus">
              vs
            </td>
            <td>{getTeam(2, 0)}</td>
            <td>{getTeam(1, 1)}</td>
          </tr>
          <tr>
            <td>{getTeam(1, 2)}</td>
            <td>{getTeam(2, 3)}</td>
          </tr>
          <tr>
            <td rowSpan={2}>{getTeam(1, 0)}</td>
            <td rowSpan={2} className="versus">
              vs
            </td>
            <td>{getTeam(2, 0)}</td>
            <td>{getTeam(0, 1)}</td>
          </tr>
          <tr>
            <td>{getTeam(2, 2)}</td>
            <td>{getTeam(0, 3)}</td>
          </tr>
          <tr>
            <td rowSpan={2}>{getTeam(1, 1)}</td>
            <td rowSpan={2} className="versus">
              vs
            </td>
            <td>{getTeam(0, 0)}</td>
            <td>{getTeam(2, 1)}</td>
          </tr>
          <tr>
            <td>{getTeam(0, 2)}</td>
            <td>{getTeam(2, 3)}</td>
          </tr>
          <tr>
            <td rowSpan={2}>{getTeam(1, 2)}</td>
            <td rowSpan={2} className="versus">
              vs
            </td>
            <td>{getTeam(2, 0)}</td>
            <td>{getTeam(0, 1)}</td>
          </tr>
          <tr>
            <td>{getTeam(0, 2)}</td>
            <td>{getTeam(2, 3)}</td>
          </tr>
          <tr>
            <td rowSpan={2}>{getTeam(1, 3)}</td>
            <td rowSpan={2} className="versus">
              vs
            </td>
            <td>{getTeam(0, 0)}</td>
            <td>{getTeam(2, 1)}</td>
          </tr>
          <tr>
            <td>{getTeam(2, 2)}</td>
            <td>{getTeam(0, 3)}</td>
          </tr>
          <tr>
            <td rowSpan={2}>{getTeam(2, 0)}</td>
            <td rowSpan={2} className="versus">
              vs
            </td>
            <td>{getTeam(0, 0)}</td>
            <td>{getTeam(1, 1)}</td>
          </tr>
          <tr>
            <td>{getTeam(0, 2)}</td>
            <td>{getTeam(1, 3)}</td>
          </tr>
          <tr>
            <td rowSpan={2}>{getTeam(2, 1)}</td>
            <td rowSpan={2} className="versus">
              vs
            </td>
            <td>{getTeam(1, 0)}</td>
            <td>{getTeam(0, 1)}</td>
          </tr>
          <tr>
            <td>{getTeam(1, 2)}</td>
            <td>{getTeam(0, 3)}</td>
          </tr>
          <tr>
            <td rowSpan={2}>{getTeam(2, 2)}</td>
            <td rowSpan={2} className="versus">
              vs
            </td>
            <td>{getTeam(0, 0)}</td>
            <td>{getTeam(1, 1)}</td>
          </tr>
          <tr>
            <td>{getTeam(1, 2)}</td>
            <td>{getTeam(0, 3)}</td>
          </tr>
          <tr>
            <td rowSpan={2}>{getTeam(2, 3)}</td>
            <td rowSpan={2} className="versus">
              vs
            </td>
            <td>{getTeam(1, 0)}</td>
            <td>{getTeam(0, 1)}</td>
          </tr>
          <tr>
            <td>{getTeam(0, 2)}</td>
            <td>{getTeam(1, 3)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FixturesACLE;
