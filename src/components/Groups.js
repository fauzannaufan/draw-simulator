function Groups({ groups, teams }) {
  return (
    <div>
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
                  {teams[team]?.name || team}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ))}
    </div>
  );
}

export default Groups;
