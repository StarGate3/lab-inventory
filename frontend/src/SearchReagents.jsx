import  { useState } from 'react';

function SearchReagents() {
  const [filters, setFilters] = useState({
    name: "",
    cas_number: "",
    smiles: "",
    room: "",
    storage: "",
    shelf: ""
  });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obsługa zmian w polach formularza
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Funkcja wyszukująca – buduje URL z parametrami tylko dla niepustych wartości
  const searchReagents = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const url = new URL("http://localhost:8000/search/");
      Object.keys(filters).forEach((key) => {
        if (filters[key].trim() !== "") {
          url.searchParams.append(key, filters[key].trim());
        }
      });
      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error("Błąd podczas wyszukiwania");
      }
      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Wyszukiwanie reagentów</h2>
      <form onSubmit={searchReagents} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <div>
          <label>Nazwa:</label>
          <input type="text" name="name" value={filters.name} onChange={handleChange} />
        </div>
        <div>
          <label>CAS Number:</label>
          <input type="text" name="cas_number" value={filters.cas_number} onChange={handleChange} />
        </div>
        <div>
          <label>SMILES:</label>
          <input type="text" name="smiles" value={filters.smiles} onChange={handleChange} />
        </div>
        <div>
          <label>Pokój:</label>
          <input type="text" name="room" value={filters.room} onChange={handleChange} />
        </div>
        <div>
          <label>Storage:</label>
          <input type="text" name="storage" value={filters.storage} onChange={handleChange} />
        </div>
        <div>
          <label>Shelf:</label>
          <input type="text" name="shelf" value={filters.shelf} onChange={handleChange} />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Ładowanie..." : "Szukaj"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {results.length === 0 && !loading && <p>Brak wyników.</p>}
      <ul>
        {results.map((reagent) => (
          <li key={reagent.id}>
            <strong>{reagent.name}</strong> – CAS: {reagent.cas_number} – SMILES: {reagent.smiles} – Pokój: {reagent.room} – Storage: {reagent.storage} – Shelf: {reagent.shelf}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchReagents;
