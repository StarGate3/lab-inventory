import React, { useState } from 'react';

function AddReagent({ onAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    cas_number: "",
    smiles: "",
    room: "",
    storage: "",
    shelf: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:8000/add_reagent/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        const errText = await response.text();
        throw new Error("Błąd dodawania reagentu: " + errText);
      }
      const data = await response.json();
      onAdded(data);
      setFormData({
        name: "",
        cas_number: "",
        smiles: "",
        room: "",
        storage: "",
        shelf: ""
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Dodaj nowy reagent</h2>
      {error && <p style={{color: "red"}}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Nazwa" required />
        <input name="cas_number" value={formData.cas_number} onChange={handleChange} placeholder="CAS Number" required />
        <input name="smiles" value={formData.smiles} onChange={handleChange} placeholder="SMILES" required />
        <input name="room" value={formData.room} onChange={handleChange} placeholder="Pokój" />
        <input name="storage" value={formData.storage} onChange={handleChange} placeholder="Storage" />
        <input name="shelf" value={formData.shelf} onChange={handleChange} placeholder="Shelf" />
        <button type="submit" disabled={loading}>
          {loading ? "Dodawanie..." : "Dodaj"}
        </button>
      </form>
    </div>
  );
}

export default AddReagent;
