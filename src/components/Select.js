import { useState } from 'react';

const options = [
  {
    value: 'World Cup Qual',
    seasons: [
      {
        season: '2026',
        stages: [
          {
            id: 'WC_2026_R1_R2',
            name: 'Round 1 & 2',
          },
          {
            id: 'WC_2026_R3',
            name: 'Round 3',
          },
          {
            id: 'WC_2026_R4',
            name: 'Round 4',
          },
        ],
      },
    ],
  },
  {
    value: 'ACL',
    seasons: [
      {
        season: '2023-24',
        stages: [
          {
            id: 'ACL_2024_GS',
            name: 'Group Stage',
          },
          {
            id: 'ACL_202324_KO',
            name: 'Knockout Stage',
          },
        ],
      },
    ],
  },
  {
    value: 'AFC Cup',
    seasons: [
      {
        season: '2023-24',
        stages: [
          {
            id: 'ACC_202324_GS',
            name: 'Group Stage',
          },
          {
            id: 'ACC_202324_KO',
            name: 'Knockout Stage',
          },
        ],
      },
    ],
  },
];

function Select({ setSelectedDraw }) {
  const [selectedComp, setSelectedComp] = useState(options[0]);
  const [selectedSeason, setSelectedSeason] = useState(options[0].seasons[0]);

  return (
    <div className="div-select">
      <h2>Footyrankings Draw Simulator</h2>
      <select
        onChange={(e) => {
          let comp = options.find((el) => el.value === e.target.value);
          setSelectedComp(comp);
          setSelectedSeason(comp.seasons[0]);
          setSelectedDraw(comp.seasons[0].stages[0].id);
        }}
      >
        {options.map((option) => (
          <option key={option.value}>{option.value}</option>
        ))}
      </select>
      <select
        onChange={(e) => {
          let season = selectedComp.seasons.find(
            (el) => el.season === e.target.value
          );
          setSelectedSeason(season);
          setSelectedDraw(season.stages[0].id);
        }}
      >
        {selectedComp.seasons.map((option) => (
          <option key={option.season}>{option.season}</option>
        ))}
      </select>
      <select onChange={(e) => setSelectedDraw(e.target.value)}>
        {selectedSeason.stages.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
