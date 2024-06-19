import "./pages.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Book from "../components/Book/Book";
import { useEffect, useState } from "react";
import axios from "axios";
import Url from "../utils/ServerUrl";

export default function Home() {
  const [books, setBooks] = useState([]);
  const ServerUrl=Url;

  useEffect(() => {
   function getItems() {
       axios.get(`${Url}/getBooks`).then((response) => {
        const data = response.data;
        setBooks(data);
      });
    }
    getItems();
  }, []);

  return (
    <div className="home">
      <Header />
      <p id="landing-text">Browse the best books to offer!</p>
      <div className="home-body">
        <input placeholder="Search for..." />
        <div className="home-items">
          {books.map((b) => {
            return <Book key={b.id} Name={b.Name} Price={b.Price} Url={b.Url} ServerUrl={ServerUrl}/>;
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}
