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
                  {teams[team].country.split('/').map((el) => (
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
}

export default Pots;
