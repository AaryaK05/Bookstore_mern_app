import { Link } from 'react-router-dom';
import './Header.css';

export default function Header(){
    return (
      <div className="header">
        <Link to="/" id="home-logo">
          Bookez
        </Link>
        <nav className="header-links">
          <Link to="/cart">Cart</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/login">Login</Link>
        </nav>
      </div>
    );
}