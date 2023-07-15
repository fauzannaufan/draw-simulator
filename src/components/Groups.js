import { forwardRef } from 'react';

const Groups = forwardRef(({ groups, teams }, ref) => {
  return (
    <div ref={ref}>
      {groups.map((group, index) => (
        <table className="pot-table group-table" key={'group' + index}>
          <thead>
            <tr>
              <th>Group {String.fromCharCode(65 + index)}</th>
            </tr>
          </thead>
          <tbody>
            {group.map((team, indexteam) => (
              <tr key={'team' + indexteam}>
                <td>
                  {team.split('/').map((el) => (
                    <img
                      key={el}
                      src={`https://api.fifa.com/api/v3/picture/flags-sq-2/${el}`}
                      width="16"
                      alt={el}
                    />
                  ))}
                  &nbsp;
                  <span className="label-team">
                    {teams[team]?.name || team}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ))}
    </div>
  );
});

export default Groups;
