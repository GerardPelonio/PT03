import React, { useState } from 'react';
import './assets/Sample.css';
import { Link, useNavigate } from 'react-router-dom';

const Patch = () => {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [surname, setSurname] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  async function patchUser(id, username, password) {
    try {
      const res = await fetch(`https://fordemo-ot4j.onrender.com/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      const text = await res.text();
      try {
        const data = JSON.parse(text);
        setMessage('User updated!');
        console.log(data);
      } catch {
        setMessage('Error: ' + text);
      }
    } catch (error) {
      setMessage('Error updating user.');
      console.error("Error:", error);
    }
  }

  const handlePatch = (e) => {
    e.preventDefault();
    if (!id) {
      setMessage('Please enter a valid User ID');
      return;
    }
    patchUser(id, surname, password);
  };

  const handleGetUser = async () => {
    try {
      const res = await fetch('https://fordemo-ot4j.onrender.com/users');
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const data = await res.json();
      const users = Array.isArray(data) ? data : data.users || [];
      const user = users.find(u => u._id === id || u.code === id);
      if (user) {
        navigate(`/GetUser/${user.code}`); 
      } else {
        setMessage('Invalid ID: user not found');
      }
    } catch (error) {
      setMessage('Error fetching users');
      console.error('Error:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Patch User</h2>
      <form onSubmit={handlePatch}>
        <div>
          <label>User ID:</label>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Surname:</label>
          <input
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="button-group">
          <button type="submit">Patch</button>
          <button type="button" onClick={() => navigate('/')}>Add</button>
          <button type="button" onClick={handleGetUser}>Get User</button>
        </div>
      </form>
      {message && <p style={{ color: message.includes('Error') ? 'red' : 'green' }}>{message}</p>}
    </div>
  );
};

export default Patch;