import Groups from './Groups';

const BracketACL = ({ pairings, teams }) => {
  return (
    <div className="center afc-cup">
      <Groups groups={pairings.slice(0, 4)} teams={teams} hideThead={true} />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '0.5fr 1fr 1fr 1fr 0.5fr',
          maxWidth: `${4 * 216}px`,
          margin: '0 auto',
        }}
      >
        <div />
        <div className="bracket-top">QF 3</div>
        <div />
        <div className="bracket-top">QF 4</div>
        <div />
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr 1fr',
          maxWidth: `${4 * 216}px`,
          margin: '0 auto',
        }}
      >
        <div />
        <div className="bracket-top">Semifinal East</div>
        <div />
      </div>
      <div
        style={{ height: '40px', borderRight: '1px solid gray', width: '50%' }}
      ></div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr 1fr',
          maxWidth: `${4 * 216}px`,
          margin: '0 auto',
        }}
      >
        <div />
        <div className="bracket-bottom">Semifinal West</div>
        <div />
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '0.5fr 1fr 1fr 1fr 0.5fr',
          maxWidth: `${4 * 216}px`,
          margin: '0 auto',
        }}
      >
        <div />
        <div className="bracket-bottom">QF 1</div>
        <div />
        <div className="bracket-bottom">QF 2</div>
        <div />
      </div>
      <Groups groups={pairings.slice(4, 8)} teams={teams} hideThead={true} />
    </div>
  );
};

export default BracketACL;
