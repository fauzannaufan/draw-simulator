import { useState } from 'react';
import ReactGA from 'react-ga4';
import './App.css';

import WC_2026_R1_R2 from './draws/WC_2026_R1_R2';
import Select from './components/Select';
import ACL_2024_GS from './draws/ACL_2024_GS';
import ACC_2024_GS from './draws/ACC_2024_GS';
import WC17_2023 from './draws/WC17_2023';
import ACL_2024_KO from './draws/ACL_2024_KO';
import ACC_2024_KO from './draws/ACC_2024_KO';
import ACL2_2025_GS from './draws/ACL2_2025_GS';

function App() {
  const [selectedDraw, setSelectedDraw] = useState('ACL2_2025_GS');

  ReactGA.initialize('G-XS6MVXWCJ1');

  return (
    <main>
      <Select setSelectedDraw={setSelectedDraw} />
      {selectedDraw === 'WC_2026_R1_R2' ? (
        <WC_2026_R1_R2 />
      ) : selectedDraw === 'ACL_2024_GS' ? (
        <ACL_2024_GS />
      ) : selectedDraw === 'ACC_2024_GS' ? (
        <ACC_2024_GS />
      ) : selectedDraw === 'WC17_2023' ? (
        <WC17_2023 />
      ) : selectedDraw === 'ACL_2024_KO' ? (
        <ACL_2024_KO />
      ) : selectedDraw === 'ACC_2024_KO' ? (
        <ACC_2024_KO />
      ) : selectedDraw === 'ACL2_2025_GS' ? (
        <ACL2_2025_GS />
      ) : (
        <h1>Coming Soon</h1>
      )}
    </main>
  );
}

export default App;
