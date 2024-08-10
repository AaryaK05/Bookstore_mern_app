import { useEffect, useState } from "react";
import "./Book.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Book({ Name, Price, Url, ServerUrl }) {
  const [addedtocart, setAddedtocart] = useState(false);
  const navigate = useNavigate();

  const handleAddtoCart = async () => {
    const data = {
      Name: Name,
      Price: Price,
      amount: 1,
      Url: Url,
    };
    axios
      .post(`${ServerUrl}/addtocart`, {
        username: localStorage.getItem("Username"),
        item: data,
      })
      .then((response) => {
        setAddedtocart(true);
      })
      .catch((err) => {
        console.log("Error!");
      });
  };

  const handleBook = () => {
    navigate(`/book/${Name}/${addedtocart}`);
  };

  useEffect(() => {
    axios
      .get(`${ServerUrl}/findinCart`, {
        params: {
          Username: localStorage.getItem("Username"),
          Name: Name,
        },
      })
      .then((res) => {
        if (res.data == "Found") {
          setAddedtocart(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="BookContainer">
      <span id="BookClick" onClick={handleBook}>
        <img src={Url} alt="book preview" />
      </span>
        <div className="book-p" >
        <p id="BookName" onClick={handleBook}>{Name}</p>
        <b style={{ textAlign: "center" }}>{Price}/-</b>
        </div>

      <button
        id="add-to-cart"
        onClick={handleAddtoCart}
        className={addedtocart ? "disabled" : ""}
      >{addedtocart ? <p>Added to Cart</p> : <p>Add to Cart</p>}</button>
    </div>
  );
}
