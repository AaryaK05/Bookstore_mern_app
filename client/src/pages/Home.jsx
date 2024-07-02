import "./pages.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Book from "../components/Book/Book";
import { useEffect, useState } from "react";
import axios from "axios";
import Url from "../utils/ServerUrl";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [sortname,setSortName]=useState(false);
  const [sortpriceascending,setSortPriceAscending]=useState(false);
  const [sortpricedescending,setSortPriceDescending]=useState(false);
  const ServerUrl = Url;

  const handleFilter=()=>{
    const genre = document.getElementById("selectGenre").value;
    const sortbypriceasc=sortpriceascending;
    const sortbypricedesc=sortpricedescending;
    const sortbyname=sortname;
    axios.post(`${Url}/applyFilter`,{
      genre:genre,
      sname:sortbyname,
      sortbypriceascending:sortbypriceasc,
      sortbypricedescending:sortbypricedesc
    }).then((response)=>{
      setBooks(response.data);
    }).catch(err=>{
      console.log(err);
    })
  }

  const handleSortPrice=(e)=>{
    // console.log(e.target.value);
    const sort=e.target.value;
    if(sort=='sortpriceascending'){
      setSortName(false);
      setSortPriceAscending(true);
      setSortPriceDescending(false);
    }else{
      setSortName(false);
      setSortPriceAscending(false);
      setSortPriceDescending(true);
    }
  }

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

        <div className="home-container">
          <div className="filters">
            <h4>Filters</h4>
              <div className="filter-content">
                <div>
                Genre:<br/>
                  <select id="selectGenre">
                    <option>all</option>
                    <option>coming of age</option>
                    <option>drama</option>
                    <option>fantasy</option>
                    <option>history</option>
                    <option>horror</option>
                    <option>mystery</option>
                    <option>philosphical</option>
                    <option>thriller</option>
                    <option>tragedy</option>
                    <option>suspense</option>
                  </select>
                </div>
                <hr/>
                <div className="sort">
                <input type="radio" id="sort_by_name" name="sort" value="sort_by_name" onChange={(e)=>setSortName(true)}/>
                <label for="sort_by_name">sort by name</label>
                </div>
                <hr/>
                <div className="sort">
                <input type="radio" id="sort_by_price_a" name="sort" value="sortpriceascending" onChange={handleSortPrice}/>
                <label for="sort_by_price_a">sort price asc</label>
                </div>
                <div className="sort">
                <input type="radio" id="sort_by_price_d" name="sort" value="sortpricedescending" onChange={handleSortPrice}/>
                <label for="sort_by_price_d">sort price des</label>
                </div>
                <div className="applybtn">
                <input type="submit" value="Clear" id="apply" />
                <input type="submit" value="Apply" id="apply" onClick={handleFilter}/>
                </div>
              </div>
          </div>

          <div className="home-items">
            {books.map((b) => {
              return (
                <Book
                  key={b._id}
                  Name={b.Name}
                  Price={b.Price}
                  Url={b.Url}
                  ServerUrl={ServerUrl}
                />
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
