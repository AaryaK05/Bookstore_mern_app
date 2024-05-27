import { Link } from 'react-router-dom';
import './pages.css'


export default function Signin() {
  return (
    <div className='auth-page'>
      <p id='bookez'>Bookez</p>
      <div className='auth-form'>
        <p>Username</p>
        <input type='text' placeholder='enter username'/>
        <p>Email</p>
        <input type='text' placeholder='enter email'/>
        <p>Password</p>
        <input type='password' placeholder='enter password'/>
        <input type='submit' value="submit"/>
        <Link to='/login'>
        Go back to Login
        </Link>
      </div>
    </div>
  );
}