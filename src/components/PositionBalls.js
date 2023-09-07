const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

function PositionBalls({ positions, revealTeams, choosePosition }) {
  return (
    <>
      <h4>Choose team position</h4>
      <div>
        {shuffleArray(positions).map((position) => (
          <div
            className={`ball ball-red ${
              revealTeams ? 'reveal-team' : undefined
            }`}
            key={position}
            onClick={() => choosePosition(position)}
          >
            {position + 1}
          </div>
        ))}
      </div>
    </>
  );
}

export default PositionBalls;
