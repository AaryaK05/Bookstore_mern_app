import { Link } from "react-router-dom";
import "./pages.css";
import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async(event) => {
    event.preventDefault();
    const response=await axios.post('http://localhost:4010/find_user',{
      username:username,
      password:password
    });
    if(response.data=='User Found'){
      console.log('Success!');
    }
    else{
      console.log(`Error:${response.data}`);
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
        <Link to="/signin">Don't have an account?</Link>
      </div>
    </div>
  );
}
