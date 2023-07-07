function Results({ teams, results }) {
  return (
    <div>
      <table className="results-2legs">
        <tbody>
          {results.map((result, index) => (
            <tr key={'result' + index}>
              <td>
                {result.length > 0 && (
                  <>
                    <img
                      src={`https://api.fifa.com/api/v3/picture/flags-sq-2/${result[0]}`}
                      width="16"
                      alt={result[0]}
                    />
                  </>
                )}
                &nbsp;
                {teams[result[0]]?.name}
              </td>
              <td>v</td>
              <td>
                {result.length > 1 && (
                  <img
                    src={`https://api.fifa.com/api/v3/picture/flags-sq-2/${result[1]}`}
                    width="16"
                    alt={result[1]}
                  />
                )}
                &nbsp;
                {teams[result[1]]?.name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Results;
