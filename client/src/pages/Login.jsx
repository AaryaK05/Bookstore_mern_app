import "./pages.css";
import { Link, redirect, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
// const url='https://bookstore-server-zctn.onrender.com';
const url='http://localhost:4010';


export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);  
  const navigate=useNavigate();


  useEffect(()=>{
    const localstorageGetInformation=localStorage.getItem('isLoggedIn')
    if(localstorageGetInformation=='1'){
      setIsLoggedIn(true);
      navigate('/');
    }
  })

  const handleSubmit = async(event) => {
    event.preventDefault();
    const response=await axios.post(`${url}/find_user`,{
      username:username,
      password:password
    });
    if(response.data==='User Found'){
      localStorage.setItem("isLoggedIn",'1')
      setIsLoggedIn(true);
      navigate('/');
    }
    else{
      alert(`Error:${response.data}`);
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
