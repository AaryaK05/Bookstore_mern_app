import "./pages.css";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import User from "../assets/UserImg.png";
import { useEffect, useState } from "react";
import axios from "axios";
import Url from "../utils/ServerUrl";

export default function Profile() {
    const [username,setUsername]=useState('')
    const [email,setEmail]=useState('')

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("Username");
  };

  const handleRemove=()=>{

  }

  const uname = localStorage.getItem("Username");
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`${Url}/user_info`, {
        params:{
            username:uname
        },
      });
      if (response.status == 200) {
        setUsername(uname);
        setEmail(response.data.email);
      }else{
        alert(`Error fetching your data:${response.data}`)
      }
    }
    fetchData();
  },[]);

  return (
    <>
      <Header />
      <div className="profile-page">
        <p>User Details</p>
        <img
          src={User}
          className="UserProfile"
          style={{ width: 80, height: 80 }}
        />
        <div>
        Username:{username}
        </div>
        <div>
        Email:{email}
        </div>
        <div className="profile-buttons">
      <button onClick={handleLogout}>Log out</button>
      <button onClick={handleRemove}>Remove account</button>
        </div>
      </div>
      <Footer />
    </>
  );
}
