function Pots({ teams, pots, drawnTeams, selectedTeam = '', labels = [] }) {
  return (
    <div>
      {pots.map((pot, index, array) => (
        <table className="pot-table" key={'pot' + index}>
          <thead>
            <tr>
              {labels.length ? (
                <th>
                  {labels[Math.floor(index / labels.length)]} Pot{' '}
                  {index +
                    1 -
                    Math.floor(index / labels.length) * labels.length}
                </th>
              ) : (
                <th>Pot {index + 1}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {pot.map((team, indexteam) => (
              <tr
                className={`${
                  drawnTeams.includes(team) ? 'drawn' : undefined
                } ${selectedTeam === team ? 'selected' : undefined}`}
                key={'team' + indexteam}
              >
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

export default Pots;
