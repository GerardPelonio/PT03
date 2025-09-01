import React, { useState } from 'react';
import './assets/Sample.css';
import { useNavigate } from 'react-router-dom';

const DeleteUser = () => {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [message, setMessage] = useState('');

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!id) {
      setMessage('Please enter a valid User ID or Code');
      return;
    }
    try {
      const res = await fetch(`https://fordemo-ot4j.onrender.com/users/${id}`, {
        method: 'DELETE',
      });
      const text = await res.text();
      if (res.ok) {
        setMessage('User deleted successfully!');
        console.log('Delete Response:', text);
      } else {
        setMessage(`Failed to delete user. Status: ${res.status} - ${text}`);
        console.log('Error Response:', text);
      }
    } catch (error) {
      setMessage('Error deleting user.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Delete User</h2>
      <form onSubmit={handleDelete}>
        <div>
          <label htmlFor="userId">User ID or Code:</label>
          <input
            type="text"
            id="userId"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
            placeholder="Enter User ID or Code (e.g., _id or code)"
          />
        </div>
        <div className="button-group">
          <button type="submit">Delete</button>
          <button type="button" onClick={() => navigate('/')}>Add</button>
          <button type="button" onClick={() => navigate('/Patch')}>Patch</button>
        </div>
      </form>
      {message && (
        <p style={{ color: message.includes('success') ? 'green' : 'red' }}>{message}</p>
      )}
    </div>
  );
};

export default DeleteUser;