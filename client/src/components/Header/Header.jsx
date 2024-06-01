import './Header.css';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header(){
  const navigate=useNavigate();
  const localstorageGetInformation=localStorage.getItem('isLoggedIn')

  useEffect(()=>{
    console.log(localstorageGetInformation);
    if(localstorageGetInformation!='1'){
      navigate('/login');
    }
  });

    return (
      <div className="header">
        <Link to="/" id="home-logo">
          Bookez
        </Link>
        <nav className="header-links">
          <Link to="/cart">Cart</Link>
          <Link to="/profile">Profile</Link>
        </nav>
      </div>
    );
}