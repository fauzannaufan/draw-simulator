import { forwardRef } from 'react';

const Groups = forwardRef(
  (
    { groups, teams, className, firstGroupLetter = 'A', selectedIndex = -1 },
    ref
  ) => {
    return (
      <div ref={ref} className={className}>
        {groups.map((group, index) => (
          <table
            className={`pot-table group-table ${
              index === selectedIndex ? 'selected' : undefined
            }`}
            key={'group' + index}
          >
            <thead>
              <tr>
                <th>
                  Group{' '}
                  {String.fromCharCode(firstGroupLetter.charCodeAt() + index)}
                </th>
              </tr>
            </thead>
            <tbody>
              {group.map((team, indexteam) => (
                <tr key={'team' + indexteam}>
                  <td>
                    {(team.includes('/') ? team : teams[team]?.country)
                      ?.split('/')
                      .map((el) => (
                        <img
                          key={el}
                          src={`https://api.fifa.com/api/v3/picture/flags-sq-2/${el.substring(
                            0,
                            3
                          )}`}
                          width="16"
                          alt={el}
                        />
                      ))}
                    &nbsp;
                    <span
                      className={`label-team ${
                        teams[team]?.short_name ? 'desktop' : null
                      }`}
                    >
                      {teams[team]?.name || team}
                    </span>
                    {teams[team]?.short_name && (
                      <span className="label-team mobile">
                        {teams[team]?.short_name}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ))}
      </div>
    );
  }
);

export default Groups;
