function Pots({ teams, pots, drawnTeams }) {
  return (
    <div>
      {pots.map((pot, index) => (
        <table className="pot-table" key={'pot' + index}>
          <thead>
            <tr>
              <th>Pot {index + 1}</th>
            </tr>
          </thead>
          <tbody>
            {pot.map((team, indexteam) => (
              <tr
                className={drawnTeams.includes(team) ? 'drawn' : undefined}
                key={'team' + indexteam}
              >
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
                  <span className="label-desktop">
                    {teams[team]?.name || team}
                  </span>
                  <span
                    className={`label-mobile ${
                      team.includes('/') ? 'label-small' : undefined
                    }`}
                  >
                    {team}
                  </span>
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
