import React, { useState } from 'react';
import './assets/Sample.css';
import { useNavigate } from 'react-router-dom'; 

const Sample = () => {
  const [surname, setSurname] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function loginUser(username, password) {
    try {
      const res = await fetch("https://fordemo-ot4j.onrender.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      console.log(data);
  
      navigate(`/GetUser/${data.code}`);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(surname, password);
  };

  return (
    <div className="form-container">
      <h2>Add</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Surname:</label>
          <input
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="button-group">
          <button type="submit">Add</button>
          <button type="button" onClick={() => navigate('/Patch')}>Patch</button>
          <button type="button" onClick={() => navigate('/DeleteUser')}>Delete</button>
        </div>
      </form>
    </div>
  );
};

export default Sample;