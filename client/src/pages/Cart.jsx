// import CartItem from "../components/CartItem/CartItem";
import { useEffect, useState } from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import CartItem from "../components/CartItem/CartItem";
import { Link } from "react-router-dom";
import axios from "axios";
import Url from "../utils/ServerUrl";

export default function Cart(){
    let totalAmount=0;
    const [cart,setCart]=useState([]);
    const [cartExist,setCartExist]=useState(false);
    // const [quantity, setQuantity] = useState(0);

    // const handleAdd = () => {
    //     setAmount((amount) => amount + 1);
    //   };
    //   const handleSubstract = () => {
    //     if (amount != 0) {
    //       setAmount((amount) => amount - 1);
    //     }
    //   };

    const handleBuy=async()=>{
        const response=await axios.post(`${Url}/addOrder`,{
            username:localStorage.getItem("Username"),
            cart:cart,
            total:totalAmount
        });
        if(response.data=="Created"){
            alert("1st Order Placed!");
            window.location.href = "/";
        }else if(response.data=="Updated"){
            alert("Order Placed!");
            window.location.href = "/";
        }
        else{
            alert("Couldn't Place Order!");
        }
    }

    useEffect(()=>{
        axios.get(`${Url}/getCart`,{
            params:{
                username:localStorage.getItem('Username')
            }
        }).then(response=>{
            setCart(response.data.Cart);
            setCartExist(true);
        }).catch(err=>{
            console.log(err);
        })        
    },[])
  
    return(
        <>
            <Header/>
            
                {cartExist ? 
                cart.map((c)=>{
                    totalAmount+=c.Price;
                    {/* let quantity=c.amount; */}
                    {/* const handleAdd = () => {
                        console.log(quantity);
                      if (quantity == 5) {
                        return;
                      }
                      quantity+=1;
                    };
                    const handleSubstract = () => {
                      if (quantity == 1) {
                        return;
                      }
                      quantity-=1;
                    }; */}
                    return (
                    <CartItem key={Math.random()} Url={c.Url} Name={c.Name} Price={c.Price} amount={c.amount} 
                    // handleAdd={handleAdd} handleSubstract={handleSubstract} quantity={quantity}
                     ServerUrl={Url}/>                   
                    )                       
                })
                :  <p style={{textAlign:"center",marginTop:'100px',marginBottom:'300px'}}>No Items in Cart!</p>}
                {cartExist?
                <>
                <div style={{textAlign:'center',margin:'50px 0px'}}>

                <p>Total Amount:{totalAmount}</p>
                    <button><Link to="/">Contine Browsing other items</Link></button>
                    <button onClick={handleBuy}>Buy</button>
                    </div>
                </>:
                <>

                </>
                }
            <Footer/>
        </>
    )
}