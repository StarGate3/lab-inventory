import React, { useState } from 'react';
import ReagentsList from './ReagentsList';
import AddReagent from './AddReagent';
import SearchReagents from './SearchReagents';
import { NewReagentPopup } from "./components/new-reagent-popup/NewReagentPopup";

function App() {
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [openReagentPopup, setOpenReagentPopup] = useState(false);
  const toggleShowPopup = () => setOpenReagentPopup(!openReagentPopup)
  const handleAdded = () => {
    setRefreshFlag(!refreshFlag);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Lab Inventory</h1>
      <AddReagent onAdded={handleAdded} toggleShowPopup={toggleShowPopup} />
      {/* formularz popup dodawania reagentu */}
      {openReagentPopup &&

        <NewReagentPopup toggleShowPopup={toggleShowPopup} />
      }
      {/* Komponent wyszukiwania reagentów */}
      <SearchReagents />
      {/* Opcjonalnie: lista reagentów (odświeżana przez refreshFlag) */}
      <ReagentsList key={refreshFlag} />
    </div>
  );
}

export default App;
