import { useState } from 'react';
import './App.css';

import WC_2026_R1_R2 from './draws/WC_2026_R1_R2';
import Select from './components/Select';
import ACL_2024_GS from './draws/ACL_2024_GS';
import ACC_2024_GS from './draws/ACC_2024_GS';

function App() {
  const [selectedDraw, setSelectedDraw] = useState('WC_2026_R1_R2');

  return (
    <main>
      <Select setSelectedDraw={setSelectedDraw} />
      {selectedDraw === 'WC_2026_R1_R2' ? (
        <WC_2026_R1_R2 />
      ) : selectedDraw === 'ACL_2024_GS' ? (
        <ACL_2024_GS />
      ) : selectedDraw === 'ACC_2024_GS' ? (
        <ACC_2024_GS />
      ) : (
        <h1>Coming Soon</h1>
      )}
    </main>
  );
}

export default App;
