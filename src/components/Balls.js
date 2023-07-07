const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

function Balls({ pots, drawnTeams, chooseTeam, type }) {
  const potToDisplay =
    type === 'alternating'
      ? drawnTeams.length % pots.length
      : Math.floor(
          (pots.flat().length - drawnTeams.length - 1) / pots[0].length
        );
  const ballClass = ['ball-red', 'ball-green', 'ball-blue', 'ball-yellow'];

  return (
    <>
      <h4>Choose team to draw from Pot {potToDisplay + 1}</h4>
      <div>
        {pots
          .filter((_, index) => index === potToDisplay)
          .map((pot, index) => (
            <div key={'pot' + index}>
              {shuffleArray(
                pot.filter((team) => !drawnTeams.includes(team))
              ).map((team) => (
                <div
                  className={`ball ${ballClass[potToDisplay]}`}
                  key={team}
                  onClick={() => chooseTeam(team)}
                >
                  {team}
                </div>
              ))}
            </div>
          ))}
      </div>
    </>
  );
}

export default Balls;
