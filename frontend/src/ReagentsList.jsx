import React, { useEffect, useState } from 'react';

function ReagentsList() {
  const [reagents, setReagents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchReagents = async () => {
    setLoading(true);
    try {
      // Zakładamy, że GET /search/ bez parametrów zwraca wszystkie reagenty
      const response = await fetch("http://localhost:8000/search/");
      if (!response.ok) {
        throw new Error("Błąd pobierania danych");
      }
      const data = await response.json();
      setReagents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReagents();
  }, []);

  return (
    <div>
      <h2>Lista Reagentów</h2>
      {loading && <p>Ładowanie...</p>}
      {error && <p style={{color: "red"}}>{error}</p>}
      {reagents.length === 0 && !loading && <p>Brak reagentów w bazie</p>}
      <ul>
        {reagents.map(reagent => (
          <li key={reagent.id}>
            <strong>{reagent.name}</strong> - CAS: {reagent.cas_number} - SMILES: {reagent.smiles} - Pokój: {reagent.room} - Storage: {reagent.storage} - Shelf: {reagent.shelf}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReagentsList;
