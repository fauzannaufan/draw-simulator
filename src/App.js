import { useState } from 'react';
import './App.css';

import WC_2026_R1_R2 from './draws/WC_2026_R1_R2';
import Select from './components/Select';

function App() {
  const [selectedDraw, setSelectedDraw] = useState('WC_2026_R1_R2');

  return (
    <main>
      <Select setSelectedDraw={setSelectedDraw} />
      {selectedDraw === 'WC_2026_R1_R2' ? (
        <WC_2026_R1_R2 />
      ) : (
        <h1>Coming Soon</h1>
      )}
    </main>
  );
}

export default App;
