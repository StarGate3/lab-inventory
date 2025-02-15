import { useState } from 'react';
import ReagentsList from './ReagentsList';
import AddReagent from './AddReagent';
import SearchReagents from './SearchReagents';

function App() {
  const [refreshFlag, setRefreshFlag] = useState(false);

  const handleAdded = (newReagent) => {
    setRefreshFlag(!refreshFlag);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Lab Inventory</h1>
      <AddReagent onAdded={handleAdded} />
      {/* Komponent wyszukiwania reagentów */}
      <SearchReagents />
      {/* Opcjonalnie: lista reagentów (odświeżana przez refreshFlag) */}
      <ReagentsList key={refreshFlag} />
    </div>
  );
}

export default App;
