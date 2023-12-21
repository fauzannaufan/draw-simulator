const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

function Balls({
  teams,
  pots,
  drawnTeams,
  chooseTeam,
  type,
  revealTeams,
  title = '',
}) {
  let potToDisplay = 0;
  if (type === 'alternating') {
    potToDisplay = drawnTeams.length % pots.length;
  } else if (type === 'straight-starttop') {
    potToDisplay = Math.floor(drawnTeams.length / pots[0].length);
  } else if (type === 'straight-startbottom') {
    potToDisplay = Math.floor(
      (pots.flat().length - drawnTeams.length - 1) / pots[0].length
    );
  } else if (type === 'afc-cup') {
    if (drawnTeams.length < pots[0].length) {
      potToDisplay = 0;
    } else if (drawnTeams.length < pots[0].length + pots[1].length) {
      potToDisplay = 1;
    } else if (drawnTeams.length < pots.flat().length) {
      potToDisplay = 2;
    }
  }

  const ballClass = ['ball-red', 'ball-green', 'ball-blue', 'ball-yellow'];

  return (
    <>
      <h4>{title || `Choose team to draw from Pot ${potToDisplay + 1}`}</h4>
      <div>
        {pots
          .filter((_, index) => index === potToDisplay)
          .map((pot, index) => (
            <div key={'pot' + index}>
              {shuffleArray(
                pot.filter((team) => !drawnTeams.includes(team))
              ).map((team) => (
                <div
                  className={`ball ${ballClass[potToDisplay]} ${
                    revealTeams ? 'reveal-team' : undefined
                  }`}
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
