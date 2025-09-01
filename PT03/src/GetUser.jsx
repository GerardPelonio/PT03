import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {Link, useNavigate} from 'react-router-dom';
import './assets/Sample.css';

const GetUser = () => {
  const { code } = useParams();
  const [userJson, setUserJson] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUserByCode(code) {
      try {
        const res = await fetch(`https://fordemo-ot4j.onrender.com/users/${code}`);
        const text = await res.text();
        setUserJson(text);
        console.log(text);
      } catch (error) {
        setUserJson('Error fetching user.');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }
    getUserByCode(code);
  }, [code]);

  return (
    <div className="form-container">
      <h2>User JSON</h2>
      {loading ? <p>Loading...</p> : <pre>{userJson}</pre>}
      <div className = "button-group">
          <Link to = {"/"}>
            <button type="button">Add</button>
          </Link>
          <Link to = {"/Patch"}>
            <button type="button">Patch</button>
          </Link>
          <Link to = {"/DeleteUser"}>
            <button type="button">Delete</button>
          </Link>
      </div>
    </div>
  );
};

export default GetUser;