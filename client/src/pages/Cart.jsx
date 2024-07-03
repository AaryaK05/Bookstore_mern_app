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
    const [amount, setAmount] = useState(0);

    const handleAdd = () => {
        setAmount((amount) => amount + 1);
      };
      const handleSubstract = () => {
        if (amount != 0) {
          setAmount((amount) => amount - 1);
        }
      };

    const handleBuy=async()=>{
        const response=await axios.post(`${Url}/addOrder`,{
            username:localStorage.getItem("Username"),
            cart:cart
        });
        if(response.status===200){
            alert("Order Placed!");
            cart.map(c=>{
                localStorage.removeItem(c.Name);
            })
        }
        else{
            alert("Couldn't Place Order!");
        }
    }

    useEffect(()=>{
        axios.get(`${Url}/getCart`,{
            username:localStorage.getItem('Username')
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
                    return <>
                    <CartItem Url={c.Url} Name={c.Name} Price={c.Price} amount={c.amount} handleAdd={handleAdd} handleSubstract={handleSubstract}/>                   
                    <div style={{textAlign:'center',margin:'50px 0px'}}>
                    </div>
                        </>
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