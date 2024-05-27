import './pages.css'
import Header from "../components/Header";
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className='home'>

      <Header />
      <p id='landing-text'>Browse the best books to offer!</p>
      <Footer/>
    
    </div>
  );
}
