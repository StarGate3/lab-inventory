import React, { useState } from 'react';

function AddReagent({ toggleShowPopup }) {


  return (
    <div>
      <button
        onClick={toggleShowPopup}
        >
        Dodaj reagent
      </button>

    </div>
  );
}

export default AddReagent;
