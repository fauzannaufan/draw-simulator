import Groups from './Groups';

const BracketACC = ({ positions, teams }) => {
  return (
    <div className="center afc-cup">
      <Groups groups={positions.slice(0, 4)} teams={teams} hideThead={true} />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '0.5fr 1fr 1fr 1fr 0.5fr',
          maxWidth: `${4 * 216}px`,
          margin: '0 auto',
        }}
      >
        <div />
        <div className="bracket-top">West Zone SF</div>
        <div />
        <div className="bracket-top">West Zone SF</div>
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
        <div className="bracket-top">West Zone Final</div>
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
        <div className="bracket-bottom">Interzone Final</div>
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
        <div className="bracket-bottom">Interzone SF 1</div>
        <div />
        <div className="bracket-bottom">Interzone SF 2</div>
        <div />
      </div>
      <Groups groups={positions.slice(4, 8)} teams={teams} hideThead={true} />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.5fr 1fr 1.5fr',
          maxWidth: `${4 * 216}px`,
          margin: '24px auto 0',
        }}
      >
        <div />
        <div className="bracket-bottom">ASEAN Final</div>
        <div />
      </div>
      <Groups groups={positions.slice(8, 10)} teams={teams} hideThead={true} />
    </div>
  );
};

export default BracketACC;
