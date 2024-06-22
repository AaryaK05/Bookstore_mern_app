import { useEffect, useState } from "react";
import "./Book.css";
import axios from "axios";


let added=false;
export default function Book({ Name, Price, Url,ServerUrl}) {
  const [addedtocart,setAddedtocart]=useState(false);

  const handleAddtoCart=async()=>{
      const data={
        Name:Name,
        Price:Price,
        amount:1,
        Url:Url
      }
      axios.post(`${ServerUrl}/addtocart`,{
        username:localStorage.getItem('Username'),
        item:data
      }).then(response=>{
        console.log('done');
        setAddedtocart(true);
        localStorage.setItem(Name,'added');
        console.log(response.data);
      }).catch(err=>{
        console.log('Error!');
      });
      
      
      // added=true;
  }

  useEffect(()=>{
    const added=localStorage.getItem(Name);
    if(added){
      setAddedtocart(true);
    }
  },[]);

  return (
    <div className="BookContainer">
      <img src={Url} alt="book preview"/>
      <p id="BookName">{Name}</p>
        <b style={{textAlign:"center"}}>{Price}/-</b>
      <button id="add-to-cart" onClick={handleAddtoCart} className={addedtocart?'disabled':''} >
      {
        addedtocart? 
      <p>Added to Cart</p>
      :
      <p>Add to Cart</p>
      }
      </button>
    </div>
  );
}
