import { useState } from "react";
import "./CartItem.css";
import trashIcon from '../../assets/trash.jpg';
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function CartItem({ Url, Name, Price,amount,handleAdd,handleSubstract,ServerUrl }) {
  const handleCartItemRemove=()=>{
    const data={
      Name:Name,
      Price:Price,
      amount:1,
      Url:Url
    }
    axios.post(`${ServerUrl}/removeCartItem`,{
      item:data,
      Username:localStorage.getItem("Username")
    }).then(res=>{
      if(res.status==200){
        window.location.href = "/cart";
      }
    }).catch(err=>{
      console.log(err);
    })
  }
 

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
        <div>
          <img src={trashIcon} 
          alt="delete icon"
          className="deleteIcon"
          style={{ width: 40, height: 40 }}
          onClick={handleCartItemRemove}/>
          
        </div>
      </div>
    </div>
  );
}
