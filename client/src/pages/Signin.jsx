import { Link, useNavigate  } from 'react-router-dom';
import './pages.css'
import {useEffect, useState } from "react";
import axios from "axios";
import Url from '../utils/ServerUrl';


export default function Signin() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post(`${Url}/add_user`, {
      username: username,
      email:email,
      password: password,
    });
    if (response.status === 200) {
      navigate("/login")
    } else {
      alert(`Failed to signin`);
    }
  };

  return (
    <div className="auth-page">
      <p id="bookez">Bookez</p>
      <div className="auth-form">
        <form onSubmit={handleSubmit}>
          <p>Username</p>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="enter username"
            required
          />
          <p>Email</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="enter email"
            required
          />
          <p>Password</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="enter password"
            required
          />
          <input type="submit" value="submit" />
        </form>
        <Link to="/login">Go back to login</Link>
      </div>
    </div>
  );
}