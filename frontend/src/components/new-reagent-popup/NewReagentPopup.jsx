import React, { useState } from 'react'
import { Input } from "../common/input";

export const NewReagentPopup = ({toggleShowPopup}) => {
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
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
            // const data = await response.json();
            // onAdded(data);
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
        <div onClick={() => toggleShowPopup()} className="overlay" style={{ width: '100%', position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="glass-effect" style={{ zIndex: 2, border: '0.5px solid rgba(118, 151, 244, 0.5)', width: '40%', borderRadius: '8px', paddingTop: 15, paddingBottom: 15 }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 20, fontSize: 24, fontWeight: "500", color: 'rgb(255, 255, 255)' }}>Dodaj nowy reagent</div>
                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', justifyContent: 'center', alignItems: 'center' }}>

                        <Input name="name" value={formData.name} onChange={handleChange} placeholder="Nazwa" required />
                        <Input name="cas_number" value={formData.cas_number} onChange={handleChange} placeholder="CAS Number" required />
                        <Input name="smiles" value={formData.smiles} onChange={handleChange} placeholder="SMILES" required />
                        <Input name="room" value={formData.room} onChange={handleChange} placeholder="Pokój" />
                        <Input name="storage" value={formData.storage} onChange={handleChange} placeholder="Storage" />
                        <Input name="shelf" value={formData.shelf} onChange={handleChange} placeholder="Shelf" />
                    </div>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', marginTop: 15 }}>

                        <button style={{ width: '33%' }} type="submit" disabled={loading}>
                            {loading ? "Dodawanie..." : "Dodaj"}
                        </button>
                    </div>
                </form>
            </div></div>
    )
}
