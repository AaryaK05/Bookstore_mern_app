import { Link } from 'react-router-dom';
import './pages.css'

export default function Login() {
  return (
    <div className='auth-page'>
      <p id='bookez'>Bookez</p>
      <div className='auth-form'>
        <p>Username</p>
        <input type='text' placeholder='enter username'/>
        <p>Password</p>
        <input type='password' placeholder='enter password'/>
        <input type='submit' value="submit"/>
        <Link to='/signin'>
          Don't have an account?
        </Link>
      </div>
    </div>
  );
}