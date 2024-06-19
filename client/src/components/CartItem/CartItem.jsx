import { useState } from "react";
import "./CartItem.css";

export default function CartItem({ Url, Name, Price,amount,handleAdd,handleSubstract }) {
  // const [amount, setAmount] = useState(0);
 

  return (
    <div className="CartContainer">
      <img src={Url} />
        <p id="BookName">{Name}</p>
      <div>
        <div className="BookAmount">
          <b>{Price}/-</b>
          <div>
          <button onClick={handleSubstract}>-</button>
          {amount}
          <button onClick={(e)=>handleAdd}>+</button>
        </div>
        </div>
      </div>
    </div>
  );
}
