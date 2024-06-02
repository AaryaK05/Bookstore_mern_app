import { useState } from "react";
import "./Book.css";
import axios from "axios";


export default function Book({ Name, Price, Url}) {
  const [amount, setAmount] = useState(0);
  const [cart,setCart]=useState([]);

  const handleAdd = () => {
    setAmount((amount) => amount + 1);
  };
  const handleSubstract = () => {
    if (amount != 0) {
      setAmount((amount) => amount - 1);
    }
  };

  const handleAddtoCart=async()=>{
    if(amount==0){
      setAmount(amount=>amount+1);
      const data={
        Name:Name,
        Price:Price,
        amount:amount,
        Url:Url
      }
      setCart(...cart,data);
    }
    else{
      const data={
        Name:Name,
        Price:Price,
        amount:amount,
        Url:Url
      }
      setCart(...cart,data);
    }
  }

  return (
    <div className="BookContainer">
      <img src={Url} />
      <p id="BookName">{Name}</p>
      <div className="BookAmount">
        <b>{Price}/-</b>
        <div>
          <button onClick={handleSubstract}>-</button>
          {amount}
          <button onClick={handleAdd}>+</button>
        </div>
      </div>
      <button id="add-to-cart" onClick={handleAddtoCart}>Add to Cart</button>
    </div>
  );
}
